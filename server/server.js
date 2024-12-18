const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const dotenv = require("dotenv");
const userRoutes = require("./routes/user");
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const User = require('./models/User');
dotenv.config();
const stripe = require('stripe')(`process.env.STRIPE_SECRET_KEY`);




const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(session({ secret: "food_ordering_secret", resave: false, saveUninitialized: true }));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const foodSchema = new mongoose.Schema({
restaurant: String,
location: String,
food: String,
price: Number,
image: String,
});

const Food = mongoose.model('Food', foodSchema);

const storage = multer.diskStorage({
destination: (req, file, cb) => {
cb(null, 'uploads/');
},
filename: (req, file, cb) => {
cb(null, `${Date.now()}-${file.originalname}`);
}
});
const upload = multer({ storage: storage });

app.post('/api/food', upload.single('image'), (req, res) => {
console.log('File:', req.file);
console.log('Body:', req.body);

const { restaurant, location, food, price } = req.body;
if (!req.file) {
return res.status(400).send('No file uploaded.');
}

const newFood = new Food({
restaurant,
location,
food,
price,
image: req.file.path,
});

newFood.save()
.then(food => res.status(201).send(food))
.catch(error => res.status(400).send(error));
});

app.use("/api", userRoutes);

app.get('/api/foods', (req, res) => {
Food.find()
.then(foods => res.send(foods))
.catch(error => res.status(500).send(error));
});

app.delete('/api/food/:id', (req, res) => {
Food.findByIdAndDelete(req.params.id)
.then(() => res.status(204).send())
.catch(error => res.status(500).send(error));
});

app.patch('/api/food/:id', upload.single('image'), (req, res) => {
const { restaurant, location, food, price } = req.body;
const update = {
restaurant,
location,
food,
price,
image: req.file ? req.file.path : req.body.image,
};
Food.findByIdAndUpdate(req.params.id, update, { new: true })
.then(food => res.status(200).send(food))
.catch(error => res.status(400).send(error));
});







app.get('/api/admins', (req, res) => {
User.find({ role: 'admin' })
.then(users => res.send(users))
.catch(error => res.status(500).send(error));
});

app.put('/api/admins/:id', (req, res) => {
const { email } = req.body;
User.findByIdAndUpdate(req.params.id, { email }, { new: true })
.then(user => res.status(200).send(user))
.catch(error => res.status(400).send(error));
});

app.delete('/api/admins/:id', (req, res) => {
User.findByIdAndDelete(req.params.id)
.then(() => res.status(204).send())
.catch(error => res.status(500).send(error));
});









app.get('/api/users', (req, res) => {
User.find({ role: 'user' })
.then(users => res.send(users))
.catch(error => res.status(500).send(error));
});

app.put('/api/users/:id', (req, res) => {
const { name, email, phone, password } = req.body;
User.findByIdAndUpdate(req.params.id, { name, email, phone, password }, { new: true })
.then(user => res.status(200).send(user))
.catch(error => res.status(400).send(error));
});

app.delete('/api/users/:id', (req, res) => {
User.findByIdAndDelete(req.params.id)
.then(() => res.status(204).send())
.catch(error => res.status(500).send(error));
});





const orderSchema = new mongoose.Schema({
items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Food' }],
deliveryLocation: String,
totalPrice: Number,
orderDate: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);

app.post('/api/orders', (req, res) => {
const { items, deliveryLocation, totalPrice } = req.body;
const newOrder = new Order({ items, deliveryLocation, totalPrice });

newOrder.save()
.then(order => res.status(201).send(order))
.catch(error => res.status(400).send(error));
});


app.post('/create-payment-intent', async (req, res) => {
    const { amount } = req.body;
  
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount, 
        currency: 'inr',
      });
  
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      res.status(500).send({
        error: error.message,
      });
    }
  });







app.get("/", (req, res) => res.send("Working 🤖..."));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

























