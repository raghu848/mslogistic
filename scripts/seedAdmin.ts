import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local or .env
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../lib/models/User';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mslogistic';
const ADMIN_NAME = process.env.ADMIN_NAME || 'Super Admin';
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || 'admin@mslogistics.com').toLowerCase().trim();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Admin@MSLogistic2026';

async function seedSuperAdmin() {
  console.log('🚀 Connecting to MongoDB:', MONGO_URI);
  await mongoose.connect(MONGO_URI);

  try {
    const existingAdmin = await User.findOne({ email: ADMIN_EMAIL });

    if (existingAdmin) {
      console.log(`ℹ️ Admin user with email "${ADMIN_EMAIL}" already exists.`);
      existingAdmin.password = ADMIN_PASSWORD; // pre-save hook will hash it
      existingAdmin.role = 'superadmin';
      existingAdmin.isActive = true;
      await existingAdmin.save();
      console.log('✅ Superadmin credentials updated successfully.');
    } else {
      console.log(`🌱 Seeding new Super Admin user: ${ADMIN_NAME} (${ADMIN_EMAIL})`);
      await User.create({
        name: ADMIN_NAME,
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        role: 'superadmin',
        isActive: true,
      });

      console.log('✅ Super Admin created successfully!');
    }

    console.log('--------------------------------------------------');
    console.log('🔑 Super Admin Credentials:');
    console.log(`   Email:    ${ADMIN_EMAIL}`);
    console.log(`   Password: ${ADMIN_PASSWORD}`);
    console.log(`   Role:     superadmin`);
    console.log('--------------------------------------------------');
  } catch (error) {
    console.error('❌ Failed to seed superadmin:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔒 Database disconnected.');
  }
}

seedSuperAdmin();
