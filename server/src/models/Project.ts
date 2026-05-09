import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  summary: String,
  description: String,
  technologies: [String],
  github: String,
  demo: String,
  images: [{ src: String, alt: String }],
  video: String,
  featured: { type: Boolean, default: false },
  date: String,
  categories: [String],
  achievements: [String],
}, { timestamps: true });

export const Project = mongoose.model('Project', projectSchema);
