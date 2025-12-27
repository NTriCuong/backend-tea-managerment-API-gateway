// endpoint của các service
import dotenv from 'dotenv';
dotenv.config();
export const config = {
  PRODUCT_SERVICE_URL: process.env.PRODUCT_SERVICE_URL,
  BRANCH_SERVICE_URL: process.env.BRANCH_SERVICE_URL,
  ORDER_SERVICE_URL: process.env.ORDER_SERVICE_URL,
  REPORT_SERVICE_URL: process.env.REPORT_SERVICE_URL,
  STAFF_SERVICE_URL: process.env.STAFF_SERVICE_URL,
  AUTH_SERVICE_URL: process.env.AUTH_SERVICE_URL,
  PORT: 3000
};
