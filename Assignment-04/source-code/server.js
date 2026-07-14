const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3001;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/insuranceDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Insurance Policy Schema
const policySchema = new mongoose.Schema({
  name: String,
  type: String,
  coverage: Number,
  premium: Number
});

const Policy = mongoose.model('Policy', policySchema);

// Customer Schema
const customerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  policyType: String,
  message: String,
  date: { type: Date, default: Date.now }
});

const Customer = mongoose.model('Customer', customerSchema);

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/policies', async (req, res) => {
  const policies = await Policy.find();
  res.render('policies', { policies });
});

app.get('/quote', (req, res) => {
  res.render('quote');
});

app.post('/quote', async (req, res) => {
  const customer = new Customer(req.body);
  await customer.save();
  res.render('success', { customer });
});

app.get('/admin', async (req, res) => {
  const customers = await Customer.find().sort({ date: -1 });
  res.render('admin', { customers });
});

// Seed initial policies
app.get('/seed', async (req, res) => {
  await Policy.deleteMany({});
  const policies = [
    { name: 'Health Insurance', type: 'Health', coverage: 500000, premium: 15000 },
    { name: 'Life Insurance', type: 'Life', coverage: 1000000, premium: 20000 },
    { name: 'Car Insurance', type: 'Vehicle', coverage: 300000, premium: 8000 },
    { name: 'Home Insurance', type: 'Property', coverage: 2000000, premium: 25000 }
  ];
  await Policy.insertMany(policies);
  res.send('Database seeded!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
