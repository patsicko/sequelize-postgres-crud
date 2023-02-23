import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import sequelize from './config/database.js';
import User from './models/User.js';
import dotenv from "dotenv"



const app = express();

dotenv.config()
app.use(bodyParser.json());
app.use(cors());

// Define routes
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
});

app.post('/users', async (req, res) => {
  const { username, email } = req.body;
  try {
    const user = await User.create({ username, email });
    res.json(user);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(user);
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to retrieve user' });
  }
});

app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { username, email } = req.body;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        res.status(404).json({ error: 'User not found' });
      } else {
        await user.update({ username, email }); 
        res.json(user);
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to update user' });
    }
  });
  

app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      await user.destroy();
      res.json({ message: 'User deleted successfully' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// Test the connection and synchronization
async function testSequelize() {
  try {
    // Authenticate and log success message
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Synchronize models and log success message
    await sequelize.sync();
    console.log('All models were synchronized successfully.');
  } catch (error) {
   
    console.error('Error:', error);
  }
}

const port=process.env.port;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  
testSequelize();


