const path = require('path');
const fs = require('fs');

// Mock data file path
const mockDataPath = path.join(__dirname, '../mockData/user.json');

// Fake database handler
const getMockData = () => {
  const data = fs.readFileSync(mockDataPath, 'utf8');
  return JSON.parse(data);
};

const saveMockData = (data) => {
  fs.writeFileSync(mockDataPath, JSON.stringify(data, null, 2));
};

// User model
const UserModel = {
  findAll: () => {
    return getMockData();
  },

  findByPk: (id) => {
    const users = getMockData();
    return users.find((user) => user.UserID === id) || null;
  },

  findOne: (condition) => {
    const users = getMockData();
    return users.find((user) =>
      Object.keys(condition.where).every((key) => user[key] === condition.where[key])
    );
  },

  create: (newUser) => {
    const users = getMockData();
    const nextId = users.length > 0 ? String(Number(users[users.length - 1].UserID) + 1) : '1';
    const userToSave = { UserID: nextId, RegistrationDate: new Date().toISOString().split('T')[0], ...newUser };
    users.push(userToSave);
    saveMockData(users);
    return userToSave;
  },

  update: (updatedFields, condition) => {
    const users = getMockData();
    const userIndex = users.findIndex((user) =>
      Object.keys(condition.where).every((key) => user[key] === condition.where[key])
    );

    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updatedFields };
      saveMockData(users);
      return [1, [users[userIndex]]]; // Sequelize returns [affectedRows, updatedRows]
    }

    return [0, []]; // No updates
  },

  destroy: (condition) => {
    let users = getMockData();
    const initialLength = users.length;
    users = users.filter(
      (user) =>
        !Object.keys(condition.where).every((key) => user[key] === condition.where[key])
    );

    saveMockData(users);
    return initialLength - users.length; // Return number of rows deleted
  },
};

module.exports = UserModel;
