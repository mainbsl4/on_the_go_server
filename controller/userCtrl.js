const prisma = require("../db/db.config");
const asyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');



const createUser = asyncHandler(async (req, res) => {
  try {
    const { userName, email, password, mobile, companyName, bisunessAdd, country, city  } = req.body;

    // Check if the user already exists
    const findUser = await prisma.user.findUnique({
      where: { email: email }
    });

    if (findUser) {
      throw new Error("User already exists");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await prisma.user.create({
      data: {
        userName: userName,
        email: email,
        password: hashedPassword, // Store the hashed password
        mobile: mobile,
        companyName: companyName,
        bisunessAdd: bisunessAdd,
        country: country,
        city: city

      }
    });

    // Generate JWT token
    const token = jwt.sign({ userId: newUser.id }, 'kothin_secret', { expiresIn: '1d' });

    console.log("New User Created:", newUser);

    res.json({ status: 200, newUser, token });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ status: 500, error: error.message });
  }
});





const loginUser = asyncHandler(async (req, res) => {
  const { credential, password } = req.body;

  // Validate input
  if (!credential || !password) {
    return res.status(400).json({ error: 'Email or mobile number and password are required' });
  }

  try {
    // Determine if the credential is an email or mobile number
    const isEmail = credential.includes('@');

    // Query database for user with provided email or mobile number and include visaApplies data
    const user = await prisma.user.findUnique({
      where: isEmail ? { email: credential } : { mobile: credential },
      include: {
        visa_apply: true,
        loan_request: true,
      }
    });

    // Verify user exists
    if (!user) {
      return res.status(401).json({ error: 'Invalid email/mobile or password' });
    }

    // Compare provided password with hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    // If passwords match, generate a JWT token
    if (passwordMatch) {
      const token = jwt.sign({ userId: user.id }, 'kothin_secret', { expiresIn: '1d' });
      // Send the user data and token in the response
      res.json({ user, token });
    } else {
      return res.status(401).json({ error: 'Invalid email/mobile or password' });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});






const getUsers = asyncHandler(async (req, res) => {
  const users = await prisma.user.findMany({
    include: {
      visa_apply: true,
      loan_request: true,
    }
  })
  return res.json({ status: 200, data: users })
})


const getUser = asyncHandler(async (req, res) => {

  const userId = req.params.id

  const user = await prisma.user.findFirst({
    where: {
      id: userId
    },
    include: { visa_apply: true, loan_request: true, },
  })
  return res.json({ status: 200, data: user })
});





const updateUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const { userName, email, password, mobile, created_at, companyName, bisunessAdd, country, city } = req.body;

  const userDataToUpdate = {}; // Initialize an empty object to store the fields to update

  // Check each field in the request body and add it to the userDataToUpdate object if it exists
  if (userName !== undefined) userDataToUpdate.firstName = firstName;
  if (email !== undefined) userDataToUpdate.email = email;
  if (password !== undefined) userDataToUpdate.password = password;
  if (mobile !== undefined) userDataToUpdate.mobile = mobile;
  if (companyName !== undefined) userDataToUpdate.companyName = companyName;
  if (bisunessAdd !== undefined) userDataToUpdate.bisunessAdd = bisunessAdd;
  if (country !== undefined) userDataToUpdate.country = country;
  if (city !== undefined) userDataToUpdate.city = city;
  if (created_at !== undefined) userDataToUpdate.created_at = created_at;

  // Update the user with the provided data
  await prisma.user.update({
    where: {
      id: userId
    },
    data: userDataToUpdate // Pass the userDataToUpdate object
  });

  res.json({ status: 200 });
});



const isUserApproved = asyncHandler(async (req, res) => {

  const userId = req.params.id

  try {
    // Update the user's isApproved field to true
    const updatedUserApproved = await prisma.user.update({
      where: { id: userId },
      data: { isApproved: true },
    });

    // Send the updated user as the response
    res.json(updatedUserApproved);
  } catch (error) {
    // Handle any errors that occur during the update
    res.status(500).json({ error: error.message });
  }
});




const deleteUser = asyncHandler(async (req, res) => {

  const userId = req.params.id

  await prisma.user.delete({
    where: {
      id: userId
    }
  })
  return res.json({ status: 200 })
});










module.exports = {
  createUser,
  loginUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  isUserApproved
  
};