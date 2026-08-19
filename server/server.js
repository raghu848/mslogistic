require('dotenv').config({ path: '.env.local' });
require('dotenv').config();

const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 MS LOGISTIC Express API Server running on port ${PORT}`);
  });
});
