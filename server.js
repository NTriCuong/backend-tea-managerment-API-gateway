import express from 'express' //sử dụng cú pháp import thay vì require do đã khai báo "type": "module" trong package.json
import morgan from 'morgan' //import morgan để log các request HTTP
import bodyParser from 'body-parser'
import cors from 'cors';
import router from './routes/index.js';
import { PORT } from './config.js';
import logger from './middlewares/logger.js';
import rateLimit from './middlewares/rateLimit.js';

const app = express() // thực thi express và nó sẻ trả về 1 đối tượng app 
// đối tượng này với những phương thức để xây dựng ứng dụng web
app.use(morgan('combined')) // xử dụng để xem log của resquest HTTP
app.use(bodyParser.urlencoded({ extended: false })) // Sử dụng body-parser để phân tích cú pháp URL-encoded trong các request
app.use(bodyParser.json()) // Sử dụng body-parser để phân tích cú pháp JSON trong các yêu cầu đến

app.use(cors());
app.use(express.json());
app.use(logger);          // log custom
app.use(rateLimit);       // chặn spam

app.use("/", router);
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
