import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import authenticateJWT from "./middlewares/authenticateJWT.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
app.use(express.json());

// Define routes and their target URLs
const routes = {
  "/task": "http://localhost:5001",
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
        [`^/task`]: "",
      },
      onProxyReq: restream
    })
  );
}

// Apply JWT authentication middleware before proxy routes
app.use("/auth", authRoutes);


const PORT = 5000;
app.listen(PORT, () => console.log("API GATEWAY STARTED"));
