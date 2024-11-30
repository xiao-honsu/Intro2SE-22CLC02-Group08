const path = require('path');
const fs = require('fs');

// Mock data file path
const mockDataPath = path.join(__dirname, '../mockData/admin.json');

// Fake database handler
const getMockData = () => {
  const data = fs.readFileSync(mockDataPath, 'utf8');
  return JSON.parse(data);
};

const saveMockData = (data) => {
  fs.writeFileSync(mockDataPath, JSON.stringify(data, null, 2));
};

// Admin model
const AdminModel = {
  findAll: () => {
    return getMockData();
  },

  findByPk: (id) => {
    const admins = getMockData();
    return admins.find((admin) => admin.AdminID === id) || null;
  },

  findOne: (condition) => {
    const admins = getMockData();
    return admins.find((admin) =>
      Object.keys(condition.where).every((key) => admin[key] === condition.where[key])
    );
  },

  create: (newAdmin) => {
    const admins = getMockData();
    const nextId = admins.length > 0 ? String(Number(admins[admins.length - 1].AdminID) + 1) : '1';

    
    const adminToSave = {
      AdminID: nextId,
      profilePicture: newAdmin.profilePicture || null, 
      ...newAdmin,
    };

    admins.push(adminToSave);
    saveMockData(admins);
    return adminToSave;
  },

  update: (updatedFields, condition) => {
    const admins = getMockData();
    const adminIndex = admins.findIndex((admin) =>
      Object.keys(condition.where).every((key) => admin[key] === condition.where[key])
    );

    if (adminIndex !== -1) {
      admins[adminIndex] = { ...admins[adminIndex], ...updatedFields };
      saveMockData(admins);
      return [1, [admins[adminIndex]]]; 
    }

    return [0, []]; 
  },

  destroy: (condition) => {
    let admins = getMockData();
    const initialLength = admins.length;
    admins = admins.filter(
      (admin) =>
        !Object.keys(condition.where).every((key) => admin[key] === condition.where[key])
    );

    saveMockData(admins);
    return initialLength - admins.length; 
  },
};

module.exports = AdminModel;
