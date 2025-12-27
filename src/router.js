import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { config } from "./config.js";
import { verifyAccessToken } from "./authentication.js";

export const router = express.Router();
// product sevices
router.use(
  // createProxyMiddleware sẻ chuyển tiếp các request đến các endpoint
  ["/products", "/toppings", "/categories"],
  verifyAccessToken,
  createProxyMiddleware({
    target: config.PRODUCT_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: (path, req) => req.baseUrl + path, // thêm lại path
  })
);
// product sevices
router.use(
  // createProxyMiddleware sẻ chuyển tiếp các request đến các endpoint
  ["/branches"],
  verifyAccessToken,
  createProxyMiddleware({
    target: config.BRANCH_SERVICE_URL, // đích đến request của client
    changeOrigin: true,
    pathRewrite: (path, req) => req.baseUrl + path,
  })
);
// staff service
router.use(
  // createProxyMiddleware sẻ chuyển tiếp các request đến các endpoint
  ["/staff"],
  verifyAccessToken,
  createProxyMiddleware({
    target: config.STAFF_SERVICE_URL, // đích đến request của client
    changeOrigin: true,
    pathRewrite: (path, req) => req.baseUrl + path,
  })
);
// order service
router.use(
  // createProxyMiddleware sẻ chuyển tiếp các request đến các endpoint
  ["/order"],
  verifyAccessToken,
  createProxyMiddleware({
    target: config.ORDER_SERVICE_URL, // đích đến request của client
    changeOrigin: true,
    pathRewrite: (path, req) => req.baseUrl + path,
  })
);
// report service
router.use(
  // createProxyMiddleware sẻ chuyển tiếp các request đến các endpoint
  ["/report"],
  verifyAccessToken,
  createProxyMiddleware({
    target: config.REPORT_SERVICE_URL, // đích đến request của client
    changeOrigin: true,
    pathRewrite: (path, req) => req.baseUrl + path,
  })
);
// auth service
router.use(
  ["/auth"],
  (req, res, next) => {
    // cho preflight đi qua
    if (req.method === "OPTIONS") return next();

    const isPublic =
      req.method === "POST" &&
      (
        req.path === "/login" ||
        req.path === "/refresh" ||
        req.path === "/change-password/request-otp" ||
        req.path === "/change-password/confirm"
      );

    if (isPublic) return next();
    return verifyAccessToken(req, res, next);
  },
  createProxyMiddleware({
    target: config.AUTH_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: (path, req) => req.baseUrl + path,
  })
);


