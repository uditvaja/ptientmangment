const Admin = require("../../models/admin.model");
const Doctor = require("../../models/doctor.model");
const Patient = require("../../models/patient.model");

const searchDoctorAndPatientist = async (req, res) => {
    try {
      const { query } = req.query;
  
      // Check if query parameter is provided
      if (!query) {
        return res.status(404).json({
          status: 404,
          success: false,
          message: "Query parameter is missing.",
        });
      }
      // Use a regular expression for case-insensitive search
      const regex = new RegExp(query, "i");
  
      // Search in Doctor model
      const doctorResults = await Doctor.find({
        firstName: regex, // Adjust to match the field you are searching against
      });
  
      // Search in Specialist model
      const specialistResults = await Patient.find({
        first_name: regex, // Adjust to match the field you are searching against
      });
  
      // Combine the results from both models
      const combinedResults = [...doctorResults, ...specialistResults];
  
      if (combinedResults.length === 0) {
        return res.status(404).json({
          status: 404,
          success: false,
          message:
            "No matching doctors or specialists found for the given query.",
        });
      }
      // If results are found, return a success response with the combined search results
      res.status(200).json({
        status: 200,
        success: true,
        message: "Search data retrieved successfully.",
        searchResults: combinedResults,
      });
    } catch (error) {
      // console.error("Error in searchDoctorSpecialist:", error);
      res
        .status(500)
        .json({ status: 500, success: false, error: "Internal Server Error" });
    }
  };

  const allDoctorList = async (req, res) => {
    try {
      const { adminId } = req.body; // Get the adminId from request body
  
      // Check if adminId is provided
      if (!adminId) {
        return res.status(400).json({ message: 'Admin ID is required.' });
      }
  
      // Check if the adminId exists in the database
      const admin = await Admin.findById(adminId); // Assuming 'Admin' is your model for admins
  
      // If admin is not found, return an error
      if (!admin) {
        return res.status(404).json({ message: 'Admin not found.' });
      }
  
      // If admin exists, proceed to fetch the doctor list
      const doctors = await Doctor.find();
  
      // Send the doctor list with a success message
      res.status(200).json({ success: true, doctors, message: 'All doctor list is done' });
  
    } catch (error) {
      // Handle any errors during the fetching process
      console.error('Error fetching doctors:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  module.exports = {
    searchDoctorAndPatientist,
    allDoctorList

  }
