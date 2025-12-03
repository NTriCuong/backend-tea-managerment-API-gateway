
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,   // 1 phút
  max: 100,                  // tối đa 100 request / phút / IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "bạn đã gửi quá nhiều request vui lòng thử lại sau",
  },
});
export default limiter;