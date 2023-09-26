import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import authenticateJWT from "./auth/middlewares/authenticateJWT.js";
import authRoutes from "./auth/routes/authRoutes.js";
import morgan from "morgan";
import chalk from "chalk";
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
app.use(
  morgan(function (tokens, req, res) {
    return (
      chalk.green(tokens.method(req, res)) +
      " " +
      chalk.blue(tokens.url(req, res)) +
      " " +
      chalk.green(tokens.status(req, res))
    );
  })
);

// Define routes and their target URLs
const routes = {
  "/task": "http://localhost:5001",
  "/team": "http://localhost:5002",
  "/notification":"http://localhost:5003",
};

// restream parsed body before proxying
var restream = function(proxyReq, req, res, options) {
    if (req.body) {
        let bodyData = JSON.stringify(req.body);
        // incase if content-type is application/x-www-form-urlencoded -> we need to change to application/json
        proxyReq.setHeader('Content-Type','application/json');
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
        // stream the content
        proxyReq.write(bodyData);
    }
}

// Create a proxy for each route
for (const route in routes) {
  const target = routes[route];
  app.use(route, (req, res, next) => {
    console.log(`Proxying request to ${target}`);
    next();
  });
  app.use(
    route,
    authenticateJWT,
    createProxyMiddleware({
      target,
      changeOrigin: true,
      pathRewrite: {
        [`^/team`]: "",
        ['^/notification']:""
      },
      onProxyReq: restream
    })
  );
}

// Apply JWT authentication middleware before proxy routes
app.use("/auth" ,authRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log("API GATEWAY STARTED ON " + PORT));
