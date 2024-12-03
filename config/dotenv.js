// const dotenv = require('dotenv');
// const path = require('path');

// // Determine the environment (default to development)
// const env = process.env.NODE_ENV || 'development';

// // Load the appropriate .env file based on the environment
// const envPath = path.resolve(__dirname, `../.env.${env}`);
// dotenv.config({ path: envPath });

// // Fallback to .env if no specific file exists for the environment
// dotenv.config();

// console.log(`Loaded environment: ${env.toUpperCase()}`);

// // Export environment variables (optional, for better validation)
// const requiredKeys = ['MONGO_URI', 'JWT_SECRET', 'PORT'];
// requiredKeys.forEach((key) => {
//   if (!process.env[key]) {
//     console.error(`Missing required key: ${key}`);
//     process.exit(1); // Exit if critical variables are missing
//   }
// });

// module.exports = {
//   mongoUri: process.env.MONGO_URI,
//   jwtSecret: process.env.JWT_SECRET,
//   port: process.env.PORT || 5000,
// };
