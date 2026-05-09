import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  hero: {
    name: String,
    title: String,
    location: String,
    description: String,
    metrics: [{ value: String, label: String }],
    focusAreas: [{ title: String, description: String }],
    socials: [{ label: String, href: String, external: Boolean }],
  },
  about: {
    summary: String,
    story: String,
    highlights: [{ title: String, description: String }],
  },
  skills: [{
    title: String,
    icon: String,
    items: [String],
  }],
  experience: [{
    role: String,
    company: String,
    location: String,
    period: String,
    stack: [String],
    highlights: [String],
  }],
  education: [{
    degree: String,
    school: String,
    period: String,
    description: String,
  }],
  certifications: [{
    name: String,
    issuer: String,
    year: String,
    credentialUrl: String,
    image: String,
  }],
  languages: [{
    name: String,
    level: String,
  }],
  contact: {
    email: String,
    summary: String,
    methods: [{
      label: String,
      value: String,
      href: String,
      external: Boolean,
    }],
  },
  cvUrl: String,
}, { timestamps: true });

export const Profile = mongoose.model('Profile', profileSchema);
