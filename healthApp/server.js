const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// MongoDB Connection String (Redacted for security reasons)
const mongoURI = 'mongodb+srv://[REDACTED]';

mongoose.connect(mongoURI, {
  // Parses the URL and ensures that the connection is made in a safe and efficient manner. 
  useNewUrlParser: true,
  // Ensures that the connection to the database is maintained and handles any errors that may occur.
  useUnifiedTopology: true,
})

  // When the conecction to the databse is successful, the console will display a message stating whether or not the connection was successful.
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

const userInformation = new mongoose.Schema({

  // Defines the schema for the user information.
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  sex: { type: String, required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  heart_rate: { type: [Number], default: [] },
  blood_pressure: { type: [{ systolic: Number, timestamp: String }], default: [] },
  calorie_intake: { type: Number, default: 0 },
  water_intake: { type: Number, default: 0 },
});

// Model for the users information which is used to interact with the database.
const UserInfo = mongoose.model('UserInfo', userInformation, 'user_info');







//Creates a new user in the database taking the users username, password, sex, height, and weight.
app.post('/add-user', async (req, res) => {
  const { username, password, sex, height, weight } = req.body;

  // If the user does not provide all of the fields, the server will return a message stating that the required fields are missing.
  if (!username || !password || !sex || !height || !weight) {
    return res.status(400).json({ message: 'Missing required fields' });
  }


  try {
    const existingUser = await UserInfo.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    // Hashes the users password using bcrypt for security purposes. 
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserInfo({
      username,
      password: hashedPassword,
      sex,
      height,
      weight,
    });

    // Saves the new user to the database, and returns a message stating that the user was created successfully.
    await newUser.save();
    res.status(201).json({ message: 'User created successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating account', error });
  }
});


// Login aspect, the users username and password are checked in the server to verify if the user exists
// If the user does not exits, or if the password is incorrect, the server will notify the user that the username or password is incorrect.
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserInfo.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Incorrect username or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect username or password' });
    }

    res.status(200).json({ success: true, message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});



// Updates the users heart rate into the database and returns a message saying that the heart rate was updated successfully.
app.post('/update-heart-rate', async (req, res) => {
  const { username, heartRate } = req.body;

  try {
    const user = await UserInfo.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    user.heart_rate.push(heartRate);
    await user.save();
    res.status(200).json({ message: 'Heart rate updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating heart rate', error });
  }
});


// Updates the users blood pressure (systolic) into the database and returns a message saying that the blood pressure was updated successfully.
app.post('/update-blood-pressure', async (req, res) => {
  const { username, systolic } = req.body;

  if (!username || !systolic) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const user = await UserInfo.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const timestamp = new Date().toLocaleString();
    user.blood_pressure.push({ systolic, timestamp });
    await user.save();
    res.status(200).json({ message: 'Blood pressure updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating blood pressure', error });
  }
});


// Updates the users calorie intake into the database and returns a message saying that the calorie intake was updated successfully.
app.post('/update-calories', async (req, res) => {
  const { username, calories } = req.body;

  if (!username || !calories) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const user = await UserInfo.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    user.calorie_intake = (user.calorie_intake || 0) + calories;
    await user.save();
    res.status(200).json({
      message: 'Calories updated successfully',
      totalCalories: user.calorie_intake,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating calories', error });
  }
});


// Updates the users water intake (gallons) into the database and returns a message saying that the water intake was updated successfully.
app.post('/update-water-intake', async (req, res) => {
  const { username, gallons } = req.body;

  if (!username || !gallons) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const user = await UserInfo.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    user.water_intake = (user.water_intake || 0) + gallons;
    await user.save();
    res.status(200).json({
      message: 'Water intake updated successfully',
      totalWaterIntake: user.water_intake,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating water intake', error });
  }
});


// Fetches the users information from the database and returns it (Summary Page that is currently being worked on)
app.get('/users', async (req, res) => {
  try {
    const users = await UserInfo.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching users', error });
  }
});


//Confirming that the server is running and on what specific port.
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));