const app = require('../../server')
const request = require("supertest");


describe("GET /health", () => {
    it("should check status of health", async () => {
      const res = await request(app).get("/health");
      expect(res.statusCode).toBe(200);
    //   expect(res.body.length).toBeGreaterThan(0);
    });
  });

//   return request(app).post('/').send({ name: '123456789' }).expect(400);