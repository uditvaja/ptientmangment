/* ------------------------------- DEFINE AREA ------------------------------ */
const path = require("path");
const fs = require("fs");
const bcrypt = require('bcrypt'); // Import bcrypt
// const deleteFiles =require("../../../helpers/deletefile");
const Admin = require("../../models/admin.model");
const Doctor = require("../../models/doctor.model");

/* ------------------ NOTE : ALL DETAILS ABOUT DOCTOR  ------------------ */
/* ----------------------------- update Doctor profile ----------------------------- */

// const addDoctorByAdmin = async (req, res) => {
//   try {
//     const reqbody = req.body;

//     // Validate required fields
//     const { adminId, name, specialistType, country, state, email, password, phoneNumber, gender, age, city, doctorAddress, qualification, experience, workingTime, workOn, breakTime, patientCheckUpTime, description, onlineConsultationRate } = reqbody;

//     if (!adminId || !name || !specialistType) {
//       return res.status(400).json({
//         status: 400,
//         success: false,
//         message: 'adminId, name, and specialization are required fields!',
//       });
//     }

//     // Check if admin exists
//     const admin = await Admin.findById(adminId);
//     if (!admin) {
//       return res.status(404).json({ status: 404, success: false, message: `adminId ${adminId} not found` });
//     }

//  // Check if email is already registered for another doctor
//     const existingEmailDoctor = await Doctor.findOne({ email });
// if (existingEmailDoctor) {
//   return res.status(400).json({
//     status: 400,
//     success: false,
//     message: `Email ${email} is already registered.`,
//   });
// }

//   // Hash the password using bcrypt
//   const hashedPassword = await bcrypt.hash(password, 8); // 8 is the salt rounds, you can adjust it as needed

  
//     // Check if the doctor already exists
//     const existingDoctor = await Doctor.findOne({ adminId, name });

//    // Handle doctor's image upload
//     if (req.files && req.files.image) {
//       if (existingDoctor && existingDoctor.image) {
//         // If doctor already exists, we keep the existing image and don't overwrite it.
//         reqbody.image = existingDoctor.image; // Use existing image
//       } else {
//         // If doctor doesn't exist, we save the new image name
//         reqbody.image = req.files.image[0].filename;
//       }
//     }

//     // Handle signature image
//     if (req.files && req.files.signatureImage) {
//       if (existingDoctor && existingDoctor.signatureImage) {
//         // If doctor already exists, we keep the existing signature image and don't overwrite it.
//         reqbody.signatureImage = existingDoctor.signatureImage; // Use existing signature image
//       } else {
//         // If doctor doesn't exist, we save the new signature image name
//         reqbody.signatureImage = req.files.signatureImage[0].filename;
//       }
//     }

//     // If the doctor already exists, return an error
//     if (existingDoctor) {
//       return res.status(400).json({
//         status: 400,
//         success: false,
//         message: `Doctor with name ${name} already exists!`,
//       });
//     }


//     // Create a new doctor
//     const newDoctor = new Doctor({
//       name,
//       specialistType,
//       adminId, // Associate doctor with admin
//       image: reqbody.image || null , // If no image, set to null
//       signatureImage: reqbody.signatureImage || null, // If no signature image, set to null
//       country,
//       state,
//       email,
//       password:hashedPassword,
//       phoneNumber,
//       gender,
//       age,
//       city,
//       doctorAddress,
//       qualification,
//       experience,
//       workingTime,
//       workOn,
//       breakTime,
//       patientCheckUpTime,
//       description,
//       onlineConsultationRate,
//     });

//     // Save the doctor to the database
//     await newDoctor.save();

//     return res.status(201).json({
//       status: 201,
//       success: true,
//       message: 'Doctor added successfully!',
//       doctor: newDoctor,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       status: 500,
//       success: false,
//       message: 'An error occurred while adding the doctor.',
//       error: error.message,
//     });
//   }
// };



const cloudinary = require('../../config/cloudinaryConfig'); // Adjust the path as needed

const addDoctorByAdmin = async (req, res) => {
  try {
    const reqbody = req.body;

    // Validate required fields
    const { adminId, name, specialistType, country, state, email, password, phoneNumber, gender, age, city, doctorAddress, qualification, experience, workingTime, workOn, breakTime, patientCheckUpTime, description, onlineConsultationRate } = reqbody;

    if (!adminId || !name || !specialistType) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'adminId, name, and specialization are required fields!',
      });
    }

    // Check if admin exists
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ status: 404, success: false, message: `adminId ${adminId} not found` });
    }

    // Check if email is already registered for another doctor
    const existingEmailDoctor = await Doctor.findOne({ email });
    if (existingEmailDoctor) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: `Email ${email} is already registered.`,
      });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 8);

    // Upload images to Cloudinary
    let imageUrl = null;
    let signatureImageUrl = null;

    if (req.files && req.files.image) {
      const imageFile = req.files.image[0].path; // Use the path of the uploaded file
      const uploadResponse = await cloudinary.uploader.upload(imageFile);
      imageUrl = uploadResponse.secure_url; // Get the secure URL for the uploaded image
    }

    if (req.files && req.files.signatureImage) {
      const signatureFile = req.files.signatureImage[0].path; // Use the path of the uploaded file
      const signatureUploadResponse = await cloudinary.uploader.upload(signatureFile);
      signatureImageUrl = signatureUploadResponse.secure_url; // Get the secure URL for the uploaded signature
    }

    // Create a new doctor
    const newDoctor = new Doctor({
      name,
      specialistType,
      adminId,
      image: imageUrl,
      signatureImage: signatureImageUrl,
      country,
      state,
      email,
      password: hashedPassword,
      phoneNumber,
      gender,
      age,
      city,
      doctorAddress,
      qualification,
      experience,
      workingTime,
      workOn,
      breakTime,
      patientCheckUpTime,
      description,
      onlineConsultationRate,
    });

    // Save the doctor to the database
    await newDoctor.save();

    return res.status(201).json({
      status: 201,
      success: true,
      message: 'Doctor added successfully!',
      doctor: newDoctor,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      success: false,
      message: 'An error occurred while adding the doctor.',
      error: error.message,
    });
  }
};

// list api of doctor
const listDoctorAdmin = async (req, res) => {
  try {
    const { adminId } = req.params; // Assuming adminId is sent as a URL parameter
    const { page = 1, limit = 10 } = req.query; // Pagination parameters

    // Validate required fields
    if (!adminId) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'adminId is required!',
      });
    }

    // Check if admin exists
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ status: 404, success: false, message: `adminId ${adminId} not found` });
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Retrieve doctors associated with the adminId
    const doctors = await Doctor.find().select('name gender qualification specialistType workingTime patientCheckUpTime breakTime image').skip(skip).limit(limit).exec();
    const totalDoctors = await Doctor.countDocuments();

    return res.status(200).json({
      status: 200,
      success: true,
      message: 'Doctors retrieved successfully!',
      data: {
        doctors,
        total: totalDoctors,
        page: Number(page),
        totalPages: Math.ceil(totalDoctors / limit),
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      success: false,
      message: 'An error occurred while retrieving doctors.',
      error: error.message,
    });
  }
};

// search api 
const searchDoctorByAdmin = async (req, res) => {
  try {
    const { query } = req.query; // Get the search query from the request

    // Check if query parameter is provided
    if (!query) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Query parameter is missing.",
      });
    }

    // Use regular expression for case-insensitive search
    const regex = new RegExp(query, "i");

    // Search for doctors based on the provided query
    const doctors = await Doctor.find({
      $or: [
        { name: regex }, // Search by name
        { specialistType: regex }, // Search by specialistType
        // Add more fields to search if needed
      ],
    })
    .select('name gender qualification specialistType workingTime patientCheckUpTime breakTime image') // Select specific fields
    .exec(); // Execute the query

    if (doctors.length === 0) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "No doctors found matching the query.",
      });
    }

    // Return the found doctors
    return res.status(200).json({
      status: 200,
      success: true,
      message: "Doctors found.",
      data: doctors,
    });
  } catch (error) {
    // Handle any errors that occur during the search
    console.error("Error searching doctors:", error);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Internal server error.",
    });
  }
};


// list api doctors

const listAllDoctorByAdmin = async (req, res) => {
  try {
    const { adminId } = req.body; // Assuming adminId is sent as a URL parameter
   
    // Validate required fields
    if (!adminId) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'adminId is required!',
      });
    }

    // Check if admin exists
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ status: 404, success: false, message: `adminId ${adminId} not found` });
    }
  
    const doctors = await Doctor.find();

    return res.status(200).json({
      status: 200,
      success: true,
      message: 'Doctors retrieved successfully!',
      data:doctors
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      success: false,
      message: 'An error occurred while retrieving doctors.',
      error: error.message,
    });
  }
};





/* -------------------------- DELETE DOCTOR PROFILE WITH IMAGE------------------------- */
// const deleteDoctor = async (req, res) => {
//   try {
//     const userData = await Doctor.findById(req.params.doctorId);

//     if (!userData) {
//       return res.status(404).json({status:404,success:false, message: "Doctor Data not found" });
//     }
//     const DeletedData = await Doctor.findByIdAndDelete(req.params.doctorId, req.body, {
//       new: true,
//     });

//     deleteFiles("doctorImg/" + userData.image);

//     res.status(200).json({
//       status: 200,
//       success: true,
//       message: "List of Doctor Data successfully ",
//       user: DeletedData,
//     });

//   } catch (error) {
//     res.status(400).json({
//       status: 400,
//       success: false,
//       message: error.message,
//     });
//   }
// };

// const allCountryList = async (req, res) => {
//   try {
//     const country = await Country.find();

//     if (!country) {
//       return res.status(404).json({ message: "country list ata not found" });
//     }

//     res.status(200).json({
//       status: 200,
//       success: true,
//       message: "Country data get successfully ",
//       country: country,
//     });
//   } catch (error) {
//     res.status(404).json({
//       status: 404,
//       success: false,
//       message: error.message,
//     });
//   }
// };



module.exports = {
  addDoctorByAdmin,listDoctorAdmin,searchDoctorByAdmin,listAllDoctorByAdmin
//   deleteDoctor,allCountryList
};