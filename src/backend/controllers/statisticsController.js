const statisticsModel = require('../models/StatisticsModel');
const accessHistoryModel = require('../models/AccessHistoryModel');
const userModel = require('../models/UserModel');

const statisticsController = {
    getStatistics: async (req, res) => {
        try {
            const startOfToday = new Date();
            startOfToday.setHours(0, 0, 0, 0);

            const endOfToday = new Date();
            endOfToday.setHours(23, 59, 59, 999);

            const todayVisitors = await accessHistoryModel.countDocuments({
                timestamp: { $gte: startOfToday, $lte: endOfToday },
                status: 'Logged In'
            });

            const totalUsers = await userModel.countDocuments();
            const statistics = await statisticsModel.findOneAndUpdate(
                {},
                { $set: { totalVisitToday: todayVisitors, totalUsers: totalUsers } },
                { sort: { date: -1 }, new: true }
            );

            if (!statistics) {
                return res.status(404).json({ success: false, message: 'Không tìm thấy thống kê' });
            }

            res.status(200).json({ success: true, statistics: { ...statistics.toObject(), todayVisitors } });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Lỗi hệ thống' });
        }
    },

};

module.exports = statisticsController;