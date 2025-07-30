import { Schema, model, models } from 'mongoose';

const JobPostingSchema = new Schema({
  position: { type: String, required: true },
  department: { type: String, required: true },
  location: { type: String, required: true },
  experience: { type: String, required: true },
  openings: { type: Number, required: true },
  skills: { type: String, required: true },
  description: { type: String, required: true },
  salary: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const JobPosting = models.JobPosting || model('JobPosting', JobPostingSchema);

export default JobPosting;











// import mongoose from "mongoose";

// const jobPostingSchema = new mongoose.Schema({
//     position: { type: String, required: true },
//     department: { type: String, required: true },
//     location: { type: String, required: true },
//     experience: { type: String, required: true },
//     openings: { type: Number, required: true },
//     skills: { type: String, required: true },
//     description: { type: String, required: true },
//     salary: { type: String, required: true },
// }, { timestamps: true });

// const JobPosting = mongoose.models.JobPosting || mongoose.model("JobPosting", jobPostingSchema);
// export default JobPosting;