import { School } from "../model/SchoolSchema.js";
import {GetInTouch} from '../model/getInTouchContact.js'
// ✅ Create School
export const createSchool = async (req, res) => {
  try {
    const { schoolName, academicSession, address, email, phone } = req.body;

    if (!schoolName || !academicSession || !address || !email || !phone) {
      return res.status(400).json({
        message: "All fields (schoolName, academicSession, address, email, phone) are required.",
      });
    }

    const newSchool = await School.create({
      schoolName,
      academicSession,
      address,
      email,
      phone,
    });

    res.status(201).json({
      message: "School created successfully.",
      school: newSchool,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error while creating school.",
      error: error.message,
    });
  }
};

// ✅ Update the only school record
export const updateSchool = async (req, res) => {
  try {
    const { schoolName, academicSession, address, email, phone } = req.body;

    const school = await School.findOne();
    if (!school) {
      return res.status(404).json({ message: "No school found to update." });
    }

    if (schoolName) school.schoolName = schoolName;
    if (academicSession) school.academicSession = academicSession;
    if (address) school.address = address;
    if (email) school.email = email;
    if (phone) school.phone = phone;

    await school.save();

    res.status(200).json({
      message: "School updated successfully.",
      school,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error while updating school.",
      error: error.message,
    });
  }
};

// ✅ Get the only school record
export const getSchool = async (req, res) => {
  try {
    const school = await School.findOne();
    if (!school) {
      return res.status(404).json({ message: "No school found." });
    }

    res.status(200).json({
      message: "School fetched successfully.",
      school,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error while fetching school.",
      error: error.message,
    });
  }
};




// import { GetInTouch } from "../model/GetInTouchSchema.js";
// get touch post api
export const createGetInTouch = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // ✅ Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        message: "All fields (name, email, message) are required.",
      });
    }

    // ✅ Save to database
    const newMessage = await GetInTouch.create({
      name,
      email,
      message,
    });

    res.status(201).json({
      message: "Message submitted successfully.",
      data: newMessage,
    });
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({
      message: "Server error while saving message.",
      error: error.message,
    });
  }
};




// Get latest/most recent contact message
export const getLatestContact = async (req, res) => {
  try {
    const latestContact = await GetInTouch.findOne()
      .sort({ createdAt: -1 });
    
    if (!latestContact) {
      return res.status(404).json({
        success: false,
        message: "No contacts found"
      });
    }
    
    res.status(200).json({
      success: true,
      data: latestContact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch latest contact",
      error: error.message
    });
  }
};
