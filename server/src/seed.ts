import 'dotenv/config';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import { User } from './models/User.js';
import { Profile } from './models/Profile.js';
import { Project } from './models/Project.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDataDir = resolve(__dirname, '../../public/data');

function loadJson<T>(file: string): T {
  const raw = readFileSync(resolve(publicDataDir, file), 'utf-8');
  return JSON.parse(raw) as T;
}

// Strip mongoose-injected _id fields recursively so insert doesn't conflict
function stripIds<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map(stripIds) as unknown as T;
  }
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      if (k === '_id') continue;
      out[k] = stripIds(v);
    }
    return out as T;
  }
  return value;
}

async function seed() {
  await connectDB();
  console.log('Seeding database from public/data/...');

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@portfolio.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  const existingUser = await User.findOne({ email: adminEmail });
  if (!existingUser) {
    await User.create({ email: adminEmail, password: adminPassword });
    console.log(`Admin user created: ${adminEmail}`);
  } else {
    console.log('Admin user already exists');
  }

  const profileData = stripIds(loadJson<Record<string, unknown>>('profile.json'));
  await Profile.deleteMany({});
  await Profile.create(profileData);
  console.log('Profile seeded');

  const projectsData = stripIds(loadJson<Record<string, unknown>[]>('projects.json'));
  await Project.deleteMany({});
  await Project.insertMany(projectsData);
  console.log(`${projectsData.length} projects seeded`);

  console.log('Seed complete!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});
