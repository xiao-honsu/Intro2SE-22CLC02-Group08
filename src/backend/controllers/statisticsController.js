const statisticsModel = require('../models/StatisticsModel');


const statisticsController = {
    getStatistics: async (req, res) => {
        try {
            const statistics = await statisticsModel.findOne().sort({ date: -1 }); 
            if (!statistics) {
                return res.status(404).json({ success: false, message: 'Không tìm thấy thống kê' });
            }
            res.status(200).json({ success: true, statistics });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Lỗi hệ thống' });
        }
    }

};

module.exports = statisticsController;