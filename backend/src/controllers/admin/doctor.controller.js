/* ------------------------------- DEFINE AREA ------------------------------ */
const path = require("path");
const fs = require("fs");

// const deleteFiles =require("../../../helpers/deletefile");
const Admin = require("../../models/admin.model");
const Doctor = require("../../models/doctor.model");

/* ------------------ NOTE : ALL DETAILS ABOUT DOCTOR  ------------------ */
/* ----------------------------- update Doctor profile ----------------------------- */

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

    // Handle doctor's image upload
    if (req.file) {
      // Check if the doctor already exists and remove the old image if it does
      const existingDoctor = await Doctor.findOne({ adminId, name }); // Adjust the query as necessary
      if (existingDoctor && existingDoctor.image) {
        const doctorImagePath = path.join(__dirname, '/../../../public/doctorImg', existingDoctor.image);
        if (fs.existsSync(doctorImagePath)) {
          fs.unlinkSync(doctorImagePath);
        }
      }
      reqbody.image = req.file.filename; // Save the new doctor's image name
    }

    // Handle signature image
    if (req.files && req.files.signatureImage) {
      // Check if the doctor already exists and remove the old signature image if it does
      const existingDoctor = await Doctor.findOne({ adminId, name }); // Adjust the query as necessary
      if (existingDoctor && existingDoctor.signatureImage) {
        const signaturePath = path.join(__dirname, '/../../../public/doctorImg', existingDoctor.signatureImage); // Change to doctor's image directory
        if (fs.existsSync(signaturePath)) {
          fs.unlinkSync(signaturePath);
        }
      }
      reqbody.signatureImage = req.files.signatureImage[0].filename; // Save the new signature image name
    }

    // Create a new doctor
    const newDoctor = new Doctor({
      name,
      specialistType,
      adminId, // Associate doctor with admin
      image: reqbody.image || null, // If no image, set to null
      signatureImage: reqbody.signatureImage || null, // If no signature image, set to null
      country,
      state,
      email,
      password,
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

module.exports = addDoctorByAdmin;




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
    addDoctorByAdmin,
//   deleteDoctor,allCountryList
};