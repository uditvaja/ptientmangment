// const mongoose = require("mongoose");

const AppointmentBook = require("../../models/bookAppointment.model");
const Prescription = require("../../models/prescription.model");
/* ------------------------------- CREATE Hospital  ------------------------------- */
const createPrescription= async (req, res) => {
  try {
    const reqBody = req.body;   
    const prescription = await Prescription.create(reqBody);
    if (!prescription) {
      throw new Error("Failed to create prescription");
    }
    res.status(200).json({
      status:200,
      message: "Successfully created a new prescription",
      success: true,
      data: prescription,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getPrescriptionsByPatientId = async (req, res) => {
    try {
      const { patientId } = req.body; // Get patientId from the request body
  
      // Fetch all appointments for the given patientId
      const appointments = await AppointmentBook.find({ patientId });
  
      if (!appointments || appointments.length === 0) {
        return res.status(404).json({
          status: 404,
          message: "No appointments found for the given patient",
          success: false,
        });
      }
  
      // Get all appointment IDs
      const appointmentIds = appointments.map(appointment => appointment._id);
  
      // Fetch prescriptions that match any of the appointment IDs
      const prescriptions = await Prescription.find({ appointmentId: { $in: appointmentIds } });
  
      if (!prescriptions || prescriptions.length === 0) {
        return res.status(404).json({
          status: 404,
          message: "No prescriptions found for the given patient",
          success: false,
        });
      }
  
      res.status(200).json({
        status: 200,
        message: "Successfully fetched all prescriptions",
        success: true,
        data: prescriptions,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  

  const patientDetailFromDoctorIdInDoctorFlowAppointments = async (req, res) => {
    try {
        const { doctorId, patientId } = req.body; // Extract doctorId and patientId from req.body

        if (!doctorId || !patientId) {
            return res.status(400).json({ message: 'Both doctorId and patientId are required in the request body.' });
        }

        // Find the last appointment where both doctorId and patientId match the request
        const lastAppointment = await AppointmentBook.findOne({
            doctorId: doctorId,         // Filter by doctorId from req.body
            patientId: patientId        // Filter by patientId from req.body
        })
        // Sort by app_date and endTime in descending order to get the latest appointment
        .sort({ app_date: -1, endTime: -1 })
        // Populate patient details
        .populate('patientId', 'first_name last_name phone_number gender age patient_address image')
        // Populate doctor details (assuming you have a Doctor model with name fields)
        .populate('doctorId', 'firstName')
        // Select specific fields from the appointment schema itself
        .select('appointmentType app_date endTime patient_issue');

        // Check if an appointment exists
        if (!lastAppointment) {
            return res.status(404).json({ message: 'No appointments found for the specified doctor and patient.' });
        }

        // Return the last appointment
        return res.status(200).json({
            message: 'Last appointment retrieved successfully.',
            appointment: lastAppointment
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while retrieving the last appointment.' });
    }
};

const getPrescriptionDetailsByPatientId = async (req, res) => {
    try {
        // Fetch all prescriptions with populated appointment and patient details
        const prescriptions = await Prescription.find()
          .populate({
            path: 'appointmentId', // Populate appointment details
            populate: {
              path: 'patientId', // Populate patient details inside the appointment
              select: 'first_name last_name phone_number age gender', // Select the required fields from Patient
            },
            select: 'appointmentType endTime', // Select the required fields from Appointment
          });
    
        if (prescriptions.length === 0) {
          return res.status(404).json({
            status: 404,
            message: "No prescriptions found",
            success: false,
          });
        }
    
        res.status(200).json({
          status: 200,
          message: "Successfully fetched all prescription details",
          success: true,
          data: prescriptions,
        });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
    };

    const getOldPrescriptionDetails = async (req, res) => {
        try {
          const currentDateTime = new Date(); // Get the current date and time
      
          // Fetch prescriptions with populated appointment and patient details where the appointment's endTime is in the past
          const prescriptions = await Prescription.find()
            .populate({
              path: 'appointmentId', // Populate appointment details
              match: { endTime: { $lt: currentDateTime } }, // Match appointments with endTime earlier than current time
              populate: {
                path: 'patientId', // Populate patient details inside the appointment
                select: 'first_name last_name phone_number age gender', // Select the required fields from Patient
              },
              select: 'appointmentType endTime app_date', // Select the required fields from Appointment
            });
      
          // Filter out prescriptions that don't have an old appointment (in case of null match due to filtering)
          const oldPrescriptions = prescriptions.filter(prescription => prescription.appointmentId);
      
          if (oldPrescriptions.length === 0) {
            return res.status(404).json({
              status: 404,
              message: "No old prescriptions found",
              success: false,
            });
          }
      
          res.status(200).json({
            status: 200,
            message: "Successfully fetched old prescriptions",
            success: true,
            data: oldPrescriptions,
          });
        } catch (error) {
          res.status(500).json({ success: false, message: error.message });
        }
      };
      
  
  
module.exports = {
    createPrescription,getPrescriptionsByPatientId,patientDetailFromDoctorIdInDoctorFlowAppointments,getPrescriptionDetailsByPatientId,getOldPrescriptionDetails
 
  };
