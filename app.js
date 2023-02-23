
// import sequelize from './config/database.js';
// import User from './models/User.js';



// // Test the connection and synchronization
// async function testSequelize() {
//     try {
//       // Authenticate and log success message
//       await sequelize.authenticate();
//       console.log('Connection has been established successfully.');
  
//       // Synchronize models and log success message
//       await sequelize.sync();
//       console.log('All models were synchronized successfully.');
  
//       // Create a new user and log success message

//       const user = await User.create({
//         username: 'Sostene',
//         email: 'sostene@gmail.com'
//       });
//       console.log('User created successfully:', user.toJSON());
  
//     } catch (error) {
//       // Log any errors that occur
//       console.error('Error:', error);
//     } finally {
//       // Close the connection when done
//       await sequelize.close();
//       console.log('Connection has been closed successfully.');
//     }
//   }
  
//   // Call the function to test Sequelize
//   testSequelize();