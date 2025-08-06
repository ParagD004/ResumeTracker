import { NextResponse } from 'next/server';
import JobPosting from '@/models/JobPosting';
import dbConnect from '@/lib/mongoose';
import { serverStorage } from '@/lib/appwrite';
import OpenAI from 'openai';

export async function POST(request: Request) {
  await dbConnect();
  const { jobId } = await request.json();
  if (!jobId) {
    return NextResponse.json({ success: false, error: 'Job ID is required' }, { status: 400 });
  }

  // Fetch job posting
  const job = await JobPosting.findById(jobId);
  if (!job) {
    return NextResponse.json({ success: false, error: 'Job posting not found' }, { status: 404 });
  }

  // Get resumes metadata
  const resumes = job.resumes || [];
  if (resumes.length === 0) {
    return NextResponse.json({ success: false, error: 'No resumes found' }, { status: 404 });
  }

  // Download PDFs from Appwrite and convert to base64
  const pdfContents = await Promise.all(resumes.map(async (resume: any) => {
    // serverStorage.getFileDownload returns ArrayBuffer or Buffer
    const fileBuffer = await serverStorage.getFileDownload(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!, resume.fileId);
    // If it's ArrayBuffer, convert to Buffer
    const nodeBuffer = Buffer.isBuffer(fileBuffer) ? fileBuffer : Buffer.from(fileBuffer);
    const base64 = nodeBuffer.toString('base64');
    return {
      fileId: resume.fileId,
      filename: resume.filename,
      base64,
    };
  }));

  // Prepare prompt for OpenAI
  const prompt = `You are a resume evaluator. Given the job details and a list of resumes (PDFs in base64), rank the resumes based on their suitability for the job.Also typos and punctuation errors, if any found rank the resume with less ranking.\nJob Details:\nPosition: ${job.position}\nDepartment: ${job.department}\nExperience: ${job.experience}\nSkills: ${job.skills}\nDescription: ${job.description}\nResumes: ${pdfContents.map(r => `Name: ${r.filename}, FileID: ${r.fileId}, PDF (base64): ${r.base64.slice(0, 100)}...`).join('\n')}\n\nReply ONLY with a JSON array of objects, each object must have at least 'fileId', 'name', and 'rank'. Do not include any explanation or extra text.`;

  // Call OpenAI
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'You are a resume evaluator.' },
      { role: 'user', content: prompt },
    ],
    temperature: 0.2,
  });

  // Parse OpenAI response (expecting a JSON)
  let rankedResumes = [];
  try {
    const content = completion.choices[0].message.content;
    if (!content) throw new Error('No content from OpenAI');
    try {
      rankedResumes = JSON.parse(content);
    } catch {
      // Fallback: extract JSON from response
      const match = content.match(/\[[\s\S]*\]/);
      if (match) {
        rankedResumes = JSON.parse(match[0]);
      } else {
        throw new Error('No JSON found in OpenAI response');
      }
    }
  } catch (e) {
    return NextResponse.json({ success: false, error: 'Failed to parse OpenAI response' }, { status: 500 });
  }

  return NextResponse.json({ success: true, data: rankedResumes });
}
