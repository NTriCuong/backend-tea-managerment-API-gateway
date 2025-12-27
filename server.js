import express from 'express' //sử dụng cú pháp import thay vì require do đã khai báo "type": "module" trong package.json
import morgan from 'morgan' //import morgan để log các request HTTP
import bodyParser from 'body-parser'
import cors from 'cors';
import {router} from './src/router.js';
import {config} from './src/config.js';
import {logger} from'./src/logger.js'
import {limiter} from './src/rate-limit.js';

const app = express() // thực thi express và nó sẻ trả về 1 đối tượng app 
// đối tượng này với những phương thức để xây dựng ứng dụng web
app.use(morgan('combined')) // xử dụng để xem log của resquest HTTP

app.use(logger);          // log custom
app.use(limiter);       // chặn spam

// cấu hình cors

const allowedOrigins = [
  "http://localhost:5001",     // FE chạy local (VD: Vite React)
  "http://localhost:5002",     // FE deploy thật (đổi thành domain thật của bạn)
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Request từ Postman, curl... (không có origin) => cho phép
      if (!origin) return callback(null, true);

      // Chỉ cho phép origin nằm trong danh sách
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Các origin lạ => chặn
      return callback(new Error("Not allowed by CORS"));
    },
    methods: "GET,PUT,POST,DELETE",
    credentials: true, // nếu bạn dùng cookie / Authorization
  })
);
app.use("/", router);

app.listen(config.PORT, () => {
  console.log(`API Gateway running on port ${config.PORT}`);
});
