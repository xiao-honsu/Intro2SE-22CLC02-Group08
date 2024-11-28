// dùng để kiểm tra xem các trường nhập liệu có trường nào bị thiếu không
const validateRequest = (requiredFields) => {
    return (req, res, next) => {  
        const missingFields = requiredFields.filter((field) => {
            return !req.body[field] || req.body[field].trim() === '';
        });
  
        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Missing required fields: ${missingFields.join(", ")}`,
            });
        }
  
        next();
    };
};

module.exports = validateRequest;
  