import { School } from "../model/SchoolSchema.js";
import {GetInTouch} from '../model/getInTouchContact.js'
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



export const TotalStaffInWholeSchoolController = async (req,res)=>{

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

