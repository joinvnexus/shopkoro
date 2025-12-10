import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "../models/User";

dotenv.config();

const run = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI missing in env");
    process.exit(1);
  }

  await mongoose.connect(uri);

  const email = process.env.ADMIN_EMAIL || "admin@shopkoro.com";
  const password = process.env.ADMIN_PASSWORD || "ChangeMe123!";
  const name = "Admin";

  const existing = await User.findOne({ email });
  if (existing) {
    existing.isAdmin = true;
    if (process.env.ADMIN_PASSWORD) {
      existing.password = password;
    }
    await existing.save();
    console.log(`✅ Admin ensured: ${email}`);
    await mongoose.connection.close();
    return;
  }

  const admin = await User.create({
    name,
    email,
    password,
    isAdmin: true,
  });

  console.log(`✅ Admin created: ${admin.email}`);
  console.log(`🔑 Password: ${password}`);
  await mongoose.connection.close();
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

