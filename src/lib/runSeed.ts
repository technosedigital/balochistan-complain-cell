import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';

// Load environment variables manually from .env
try {
  const envPath = path.resolve(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const envFile = fs.readFileSync(envPath, 'utf8');
    envFile.split('\n').forEach(line => {
      if (line.trim().startsWith('#') || !line.includes('=')) return;
      const firstEquals = line.indexOf('=');
      const key = line.substring(0, firstEquals).trim();
      let val = line.substring(firstEquals + 1).trim();
      if (val.startsWith('"') && val.endsWith('"')) {
        val = val.substring(1, val.length - 1);
      } else if (val.startsWith("'") && val.endsWith("'")) {
        val = val.substring(1, val.length - 1);
      }
      process.env[key] = val;
    });
  }
} catch (e) {
  console.warn('Failed to parse .env file:', e);
}

import { seedDatabase } from './dbService';
import User from '../models/User';
import Complaint from '../models/Complaint';
import News from '../models/News';
import Event from '../models/Event';
import Location from '../models/Location';
import Team from '../models/Team';

async function run() {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    console.error('Error: MONGODB_URI is not defined in the environment.');
    process.exit(1);
  }

  console.log('Connecting to MongoDB database at:', MONGODB_URI.replace(/:([^@]+)@/, ':****@'));
  
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB. Starting database seeding...');
    
    await seedDatabase();
    
    console.log('\n--- Database Collection Counts ---');
    console.log(`Users: ${await User.countDocuments()}`);
    console.log(`Complaints: ${await Complaint.countDocuments()}`);
    console.log(`News: ${await News.countDocuments()}`);
    console.log(`Events: ${await Event.countDocuments()}`);
    console.log(`Locations: ${await Location.countDocuments()}`);
    console.log(`Team Members: ${await Team.countDocuments()}`);
    console.log('----------------------------------\n');
    
    console.log('Seeding process completed.');
  } catch (error) {
    console.error('Seeding process failed with error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
    process.exit(0);
  }
}

run();
