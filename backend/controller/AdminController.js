import { School } from "../model/SchoolSchema.js";
import { GetInTouch } from '../model/getInTouchContact.js'
import { Event } from "../model/EventSchema.js";
import { EmergencyNotice } from "../model/EmergencyNoticeSchema.js";
import UserSchema from "../model/UserSchema.js";
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




// Get All contact message
export const getAllContact = async (req, res) => {
  try {
    const latestContact = await GetInTouch.find()


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



// get contact delete controller

export const getContactDelete = async (req, res, next) => {
  try {
    const id = req.params.id;

    const deletedContact = await GetInTouch.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact deleted successfully",
      deletedContact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete contact",
      error: error.message,
    });
  }
};




export const createEventController = async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();

    res.status(201).json({
      success: true,
      message: "Event created successfully!",
      event,
    });
  } catch (error) {
    console.error("Create Event Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create event",
      error: error.message,
    });
  }
};



export const viewAllEventsController = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1, createdAt: -1 });

    if (!events.length) {
      return res.status(404).json({
        success: false,
        message: "No events found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Events fetched successfully",
      total: events.length,
      events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch events",
      error: error.message,
    });
  }
};



export const updateEventById = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedEvent = await Event.findByIdAndUpdate(id, req.body, {
      new: true, // return updated document
      runValidators: true, // validate before update
    });

    if (!updatedEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      event: updatedEvent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update event",
      error: error.message,
    });
  }
};


export const DeleteEventController = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found or already deleted",
      });
    }

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
      deletedEvent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete event",
      error: error.message,
    });
  }
};




// import { EmergencyNotice } from "../Model/EmergencyNoticeSchema.js";

// ✅ Create Emergency Notice Controller
export const createEmergencyNoticeController = async (req, res) => {
  try {
    const { title, description, roles, category, expiryDate } = req.body;

    // 🧩 Automatically add creator info from token/user session
    const createdBy = req.user?.name || req.user?.role || "System";

    if (!title || !description || !roles || roles.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Title, description, and at least one role are required.",
      });
    }

    const newNotice = new EmergencyNotice({
      title,
      description,
      roles,
      category,
      expiryDate,
      createdBy,
    });

    await newNotice.save();

    res.status(201).json({
      success: true,
      message: "🚨 Emergency Notice created successfully!",
      notice: newNotice,
    });
  } catch (error) {
    console.error("❌ Error creating emergency notice:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to create emergency notice.",
      error: error.message,
    });
  }
};



export const TotalStaffInWholeSchoolController = async (req, res) => {

  try {



    const TotalStaff = await UserSchema.find({ role: { $ne: 'owner' } }).select("-password");

    if (!TotalStaff) {
      return res.status(404).json({
        success: false,
        message: "staff not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "staff found successfully",
      TotalStaff,
    });
  } catch (error) {

    console.error("❌ Error creating total staff whole school controller:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to create emergency notice.",
      error: error.message,
    });
  }
}


export const ViewAllEmergencyNotice = async (req, res) => {
  try {
    const TotalEmergencyNotice = await EmergencyNotice.find();

    if (!TotalEmergencyNotice || TotalEmergencyNotice.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No notices found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Total notices found successfully",
      TotalEmergencyNotice,
    });
  } catch (error) {
    console.error("❌ Error total Emergency notice controller:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch emergency notices.",
      error: error.message,
    });
  }
};





// controllers/emergencyNoticeController.js

// import EmergencyNotice from "../models/EmergencyNotice.js";

// ✅ Update Emergency Notice by ID
export const updateEmergencyNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, roles, expiryDate } = req.body;

    // Validate required fields
    // if (!title || !description || !category) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Title, description, and category are required fields",
    //   });
    // }

    // Check if notice exists
    const existingNotice = await EmergencyNotice.findById(id);
    if (!existingNotice) {
      return res.status(404).json({
        success: false,
        message: "Emergency notice not found",
      });
    }

    // Update the notice
    const updatedNotice = await EmergencyNotice.findByIdAndUpdate(
      id,
      {
        title: title.trim(),
        description: description.trim(),
        category,
        roles: roles || [],
        expiryDate: expiryDate || null,
      },
      {
        new: true, // Return the updated document
        runValidators: true, // Run mongoose validations
      }
    );

    res.status(200).json({
      success: true,
      message: "Emergency notice updated successfully",
      notice: updatedNotice,
    });

  } catch (error) {
    console.error("❌ Error updating emergency notice:", error.message);
    
    // Handle validation errors
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        error: error.message,
      });
    }

    // Handle invalid ID format
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid notice ID format",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update emergency notice",
      error: error.message,
    });
  }
};





// controllers/emergencyNoticeController.js

// import EmergencyNotice from "../models/EmergencyNotice.js";

// ✅ Delete Emergency Notice by ID
export const deleteEmergencyNotice = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if notice exists
    const existingNotice = await EmergencyNotice.findById(id);
    
    if (!existingNotice) {
      return res.status(404).json({
        success: false,
        message: "Emergency notice not found",
      });
    }

    // Delete the notice
    await EmergencyNotice.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Emergency notice deleted successfully",
      deletedNotice: {
        id: existingNotice._id,
        title: existingNotice.title,
      },
    });

  } catch (error) {
    console.error("❌ Error deleting emergency notice:", error.message);

    // Handle invalid ID format
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid notice ID format",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to delete emergency notice",
      error: error.message,
    });
  }
};





// controllers/staffController.js
// controllers/staffController.js
// import UserSchema from "../models/UserSchema.js"; // Your User model import
import bcrypt from "bcryptjs";

export const updateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    console.log("📝 Update Request:", { id, name, email, role }); // Debug log

    // Validation
    if (!name || !email || !role) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and role are required",
      });
    }

    // Validate role
    const validRoles = ["principal", "vicePrincipal", "management", "teacher", "student"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role specified",
      });
    }

    // Check if user exists
    const existingUser = await UserSchema.findById(id);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "Staff member not found",
      });
    }

    // Build update object
    const updateData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      role: role,
    };

    // Only update password if provided
    if (password && password.trim()) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    console.log("🔄 Updating with data:", updateData); // Debug log

    // Update staff member
    const updatedStaff = await UserSchema.findByIdAndUpdate(
      id,
      updateData,
      { 
        new: true, 
        runValidators: true 
      }
    ).select("-password");

    console.log("✅ Updated successfully:", updatedStaff); // Debug log

    res.status(200).json({
      success: true,
      message: `Staff updated successfully. Role changed to ${role}`,
      staff: updatedStaff,
    });

  } catch (error) {
    console.error("❌ Error updating staff:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update staff",
      error: error.message,
    });
  }
};




// controllers/staffController.js
// import UserSchema from "../models/UserSchema.js";

// ✅ Delete Staff/Principal
export const deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("🗑️ Delete Request for ID:", id); // Debug log

    // Check if staff member exists
    const existingStaff = await UserSchema.findById(id);
    
    if (!existingStaff) {
      return res.status(404).json({
        success: false,
        message: "Staff member not found",
      });
    }

    // Prevent deletion of owner role (optional security check)
    if (existingStaff.role === "owner") {
      return res.status(403).json({
        success: false,
        message: "Cannot delete owner account",
      });
    }

    // Delete the staff member
    await UserSchema.findByIdAndDelete(id);

    console.log("✅ Staff deleted successfully:", existingStaff.name); // Debug log

    res.status(200).json({
      success: true,
      message: "Staff deleted successfully",
      deletedStaff: {
        id: existingStaff._id,
        name: existingStaff.name,
        email: existingStaff.email,
        role: existingStaff.role,
      },
    });

  } catch (error) {
    console.error("❌ Error deleting staff:", error.message);

    // Handle invalid MongoDB ID format
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid staff ID format",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to delete staff",
      error: error.message,
    });
  }
};
