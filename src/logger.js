 
export const logger =(req, res, next)=>{
    const createAt = Date.now();
    const user = req.user ? req.user.id : '';
    // log ra ngày giờ gửi request, method, url endpoint, mã trạng thái, thời gian xử lý
    res.on("finish", () => {
        const ms = Date.now() - createAt; // thời gian xử lý request
        console.log(
        `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ` +
            `status=${res.statusCode} time=${ms}ms${user}`
        );
    });
    next();
};
