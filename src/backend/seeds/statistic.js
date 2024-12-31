const mongoose = require('mongoose');
const StatisticsModel = require('../models/StatisticsModel');

mongoose.connect('mongodb+srv://IntroSE22CLC02GR08:0822CLC02SE@introse22clc02gr08.y1sfi.mongodb.net/?retryWrites=true&w=majority&appName=IntroSE22CLC02GR08', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const seedStatistics = async () => {
    try {
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);

        const statistics = new StatisticsModel({
            date: startOfToday,
            totalUsers: 0, 
            totalVisitToday: 0,
            currentVisitors: 0,
        });

        await statistics.save();
        console.log('Seeded statistics data successfully');

        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding statistics data:', error);
        mongoose.connection.close();
    }
};

seedStatistics();
