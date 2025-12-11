import type { Express } from "express";
import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Product from "../models/Product";

let app: Express;
let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  // spin up in-memory Mongo and point server to it before importing app
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  process.env.MONGODB_URI = uri;
  process.env.NODE_ENV = "test";

  const mod = await import("../server");
  app = mod.default;
});

afterAll(async () => {
  await mongoose.connection.close();
  if (mongoServer) {
    await mongoServer.stop();
  }
});

afterEach(async () => {
  await Product.deleteMany({});
});

describe("Products API", () => {
  it("returns products list", async () => {
    await Product.create({
      name: "Test Product",
      description: "Test description",
      price: 99.99,
      image: "https://example.com/image.jpg",
      category: "Test",
      inStock: true,
    });

    const res = await request(app).get("/api/products").expect(200);

    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data[0].name).toBe("Test Product");
  });
});

