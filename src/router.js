import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import {
  PRODUCT_SERVICE_URL,
  BRANCH_SERVICE_URL,
  ORDER_SERVICE_URL,
  REPORT_SERVICE_URL,
  EMPLOYEE_SERVICE_URL
} from './config.js';

const router = express.Router();
// product sevices
router.use( // createProxyMiddleware sẻ chuyển tiếp các request đến các endpoint 
  ["/products", "/toppings", "/categories"],
  createProxyMiddleware({
    target: PRODUCT_SERVICE_URL,
    changeOrigin: true,
    // KHÔNG pathRewrite, vì service cũng đang dùng y chang path này
  })
);
// product sevices
router.use( // createProxyMiddleware sẻ chuyển tiếp các request đến các endpoint 
  ["/branches"],
  createProxyMiddleware({
    target: BRANCH_SERVICE_URL,// đích đến request của client
    changeOrigin: true,
    pathRewrite: { "^/branches": "" }, // /products → /
  })
);