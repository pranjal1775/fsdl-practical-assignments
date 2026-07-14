# Insurance Website - Node.js & MongoDB

A simple functional insurance website built with Node.js, Express, and MongoDB.

## Features
- Home page with insurance overview
- Policies page displaying all insurance plans from MongoDB
- Quote request form (saves to MongoDB)
- Admin dashboard to view customer requests
- Responsive design

## Prerequisites
- Node.js installed
- MongoDB installed and running

## Setup Instructions

1. Install dependencies:
```
npm install
```

2. Make sure MongoDB is running on localhost:27017

3. Start the server:
```
npm start
```

4. Visit http://localhost:3000/seed to populate initial policies

5. Open http://localhost:3000 in your browser

## Routes
- `/` - Home page
- `/policies` - View all insurance policies
- `/quote` - Request a quote
- `/admin` - View customer requests
- `/seed` - Seed database with sample policies

## Database Collections
- **policies** - Insurance policy details
- **customers** - Customer quote requests
