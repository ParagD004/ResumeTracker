export interface ResumeMeta {
  fileId: string;
  filename: string;
  uploadedAt: Date;
}

export interface JobPostingData {
  position: string;
  department: string;
  location: string;
  experience: string;
  openings: number;
  skills: string;
  description: string;
  salary: string;
  resumes?: ResumeMeta[];
}