const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');

dotenv.config();

const runSeeder = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const adminEmail = 'admin@society.com';

  await Admin.deleteOne({ email: adminEmail });

  const hashedPassword = await bcrypt.hash('admin123', 10);

  await Admin.create({
    name: 'Super Admin',
    email: adminEmail,
    password: hashedPassword,
  });

  console.log('✅ Admin recreated with default credentials');
  mongoose.disconnect();
};

runSeeder();