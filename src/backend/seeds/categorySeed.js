const mongoose = require('mongoose');
const Category = require('../models/CategoryModel');


mongoose.connect('mongodb+srv://IntroSE22CLC02GR08:0822CLC02SE@introse22clc02gr08.y1sfi.mongodb.net/?retryWrites=true&w=majority&appName=IntroSE22CLC02GR08', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


const defaultCategories = [
    { categoryName: "Electronics", description: "Devices, gadgets, and accessories." },
    { categoryName: "Clothing", description: "Apparel and garments for men and women." },
    { categoryName: "Books", description: "Books, novels, and educational materials." },
    { categoryName: "Furniture", description: "Home and office furniture." },
    { categoryName: "Toys", description: "Toys and games for kids and adults." },
    { categoryName: "Beauty Products", description: "Cosmetics and personal care items." },
    { categoryName: "Sports Equipment", description: "Gear and equipment for sports." },
    { categoryName: "Automotive", description: "Car parts and accessories." },
    { categoryName: "Jewelry", description: "Gold, silver, and gemstone jewelry." },
    { categoryName: "Musical Instruments", description: "Instruments for music lovers." },
    { categoryName: "Kitchenware", description: "Utensils and tools for the kitchen." },
    { categoryName: "Gardening Tools", description: "Tools and supplies for gardening." },
    { categoryName: "Pet Supplies", description: "Products for your furry friends." },
    { categoryName: "Fitness Equipment", description: "Gym and workout equipment." },
    { categoryName: "Baby Products", description: "Items for babies and toddlers." },
    { categoryName: "Smart Home Devices", description: "Automation devices for home." },
    { categoryName: "Video Games", description: "Games and gaming accessories." },
    { categoryName: "Photography", description: "Cameras, lenses, and accessories." },
    { categoryName: "Handmade Crafts", description: "Handmade and artistic items." },
    { categoryName: "Stationery", description: "Office and school supplies." },
    { categoryName: "Shoes", description: "Footwear for all ages." },
    { categoryName: "Bags and Luggage", description: "Backpacks, handbags, and luggage." },
    { categoryName: "Watches", description: "Analog, digital, and smartwatches." },
    { categoryName: "Outdoor Gear", description: "Camping and hiking equipment." },
    { categoryName: "Home Decor", description: "Decorative items for the home." },
    { categoryName: "Board Games", description: "Games for friends and family." },
    { categoryName: "Skincare", description: "Products for skin health." },
    { categoryName: "Makeup", description: "Makeup products for all occasions." },
    { categoryName: "Perfumes", description: "Perfumes and fragrances." },
    { categoryName: "Art Supplies", description: "Tools and materials for art projects." },
    { categoryName: "Medical Supplies", description: "Health and medical equipment." },
    { categoryName: "Collectibles", description: "Rare and collectible items." },
    { categoryName: "Antiques", description: "Vintage and antique goods." },
    { categoryName: "DIY Tools", description: "Tools for home improvement." },
    { categoryName: "Car Electronics", description: "Electronics for vehicles." },
    { categoryName: "Travel Accessories", description: "Travel-friendly items." },
    { categoryName: "Lighting", description: "Lamps and lighting solutions." },
    { categoryName: "Hobbies", description: "Items for hobbies and interests." },
    { categoryName: "Craft Supplies", description: "Materials for crafting projects." },
    { categoryName: "Fishing Gear", description: "Rods, reels, and fishing supplies." },
    { categoryName: "Cycling", description: "Bicycles and cycling gear." },
    { categoryName: "Climbing Equipment", description: "Gear for rock climbing." },
    { categoryName: "Camping Gear", description: "Tents, sleeping bags, and more." },
    { categoryName: "Water Sports", description: "Gear for swimming and water sports." },
    { categoryName: "Winter Sports", description: "Skis, snowboards, and accessories." },
    { categoryName: "Surfing Equipment", description: "Boards and surfing gear." },
    { categoryName: "Drones", description: "Drones and drone accessories." },
    { categoryName: "Robotics", description: "Kits and tools for robotics enthusiasts." },
    { categoryName: "Virtual Reality", description: "VR headsets and accessories." }
];


const seedCategories = async () => {
    try {
        await Category.deleteMany(); 
        await Category.insertMany(defaultCategories);
        console.log("Default categories added successfully!");
        mongoose.connection.close();
    } catch (error) {
        console.error("Error seeding categories:", error);
        mongoose.connection.close();
    }
};

seedCategories();
