import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();
let taskProxy = createProxyMiddleware({
  target: "http://localhost:5001",
  changeOrigin: true,
});
app.use("/task", taskProxy);
app.listen(3000);

// http://localhost:3000/api/foo/bar -> http://www.example.org/api/foo/bar
