import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
//middleware xác thực token cho các route
export const verifyAccessToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;
  // tách lấy token
  if (!token) return res.status(401).json({ message: "Thiếu access token" });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);// verify sẻ quăn lỗi nếu xác thự không thành công
    req.user = decoded; // gắn user vào request để cho những sevice biết ai đang truy cập 
    next(); // cho request đi tiếp
  } catch (err) {
    return res.status(401).json({
      message: "Access token không hợp lệ hoặc hết hạn",
      error: err.message,
    });
  }
};
