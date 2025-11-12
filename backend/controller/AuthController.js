// controllers/authController.js
// import  from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../model/UserSchema.js';

/**
 * Login Controller with School Roles
 */
export const loginController = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Validate input
    if (!email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email, password, and role',
      });
    }

    // Validate role
    const validRoles = ['owner', 'principal', 'vicePrincipal', 'management', 'teacher', 'student'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role selected',
      });
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Check role match
    if (user.role !== role) {
      return res.status(403).json({
        success: false,
        message: `Access denied! Your role is ${user.role}, not ${role}`,
      });
    }

    // Generate token
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_TOKEN|| "bjndniwniwndiniwniwnxinx",
      { expiresIn: '7d' }
    );

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token: token,
      },
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
    });
  }
};

/**
 * Register Controller
 */
// controllers/authController.js


/**
 * Register Controller with Auto Role Assignment
 * First user -> Owner
 * Then sequentially: Principal, Vice Principal, Management, Teacher
 * After that -> All new users get Student role
 */
export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email',
      });
    }

    // Password validation
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters',
      });
    }

    // Check existing user
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User already exists with this email',
      });
    }

    // Auto-assign role based on registration order
    const roleHierarchy = [
      'owner',
      'principal',
      'vicePrincipal',
      'management',
      'teacher',
    ];

    let assignedRole = 'student'; // Default role

    // Check how many users exist
    const userCount = await User.countDocuments();

    // Assign role based on user count
    if (userCount < roleHierarchy.length) {
      assignedRole = roleHierarchy[userCount];
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: assignedRole,
    });

    // Generate token
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_TOKEN,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: `User registered successfully as ${assignedRole}`,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token: token,
      },
    });

  } catch (error) {
    console.error('Registration error:', error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'User already exists with this email',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
    });
  }
};
