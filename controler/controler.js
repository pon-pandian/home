const data = require('../model/data.json');
const fs = require('fs');
const path = require('path');
const DATA_FILE = path.join(__dirname, '../model/data.json');

const readData = () => {
if (!fs.existsSync(DATA_FILE)) {
return { total: 0, results: [] };
}
const data = fs.readFileSync(DATA_FILE, 'utf8');
return JSON.parse(data);
};

const writeData = (data) => {
fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

module.exports = {
    
    showAll : (req, res,next) => {
            const data = readData();
            res.json(data);  
        },
    show :  (req, res) => {
        const data = readData();
        const user = data.results.find((u) => u.id === parseInt(req.params.id));
        if (!user) {
        return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
        },
    remove : (req, res) => {
        const data = readData();
        const userIndex = data.results.findIndex((u) => u.id === parseInt(req.params.id));
        if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
        }
        const deletedUser = data.results.splice(userIndex, 1); 
        data.total = data.results.length; 
        writeData(data);
        res.json(deletedUser);
        } ,
    attach : (req, res) => {
        const data = readData();
        const newUser = {
        id: data.results.length ? data.results[data.results.length - 1].id + 1 : 1, 
        ...req.body,
        };
        data.results.push(newUser);
        data.total = data.results.length; 
        writeData(data);
        res.status(201).json(newUser);
        },
    update : (req, res) => {
        const data = readData();
        const userIndex = data.results.findIndex((u) => u.id === parseInt(req.params.id));
        if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
        }
        data.results[userIndex] = { ...data.results[userIndex], ...req.body };
        writeData(data);
        res.json(data.results[userIndex]);
        }
};



