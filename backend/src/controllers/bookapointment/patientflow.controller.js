const AppointmentBook = require('../../models/bookAppointment.model');
// const Appointment = require('../models/Appointment');
const moment = require('moment-timezone');
const Doctor = require('../../models/doctor.model');

// Function to fetch today's appointments for a particular patient
// Function to fetch today's appointments for a particular patient
const getTodaysAppointmentsForPatient = async (req, res) => {
    try {
        const { patientId } = req.body; // Get the patientId from request body

        // Get today's date in 'YYYY-MM-DD' format
        const todayDate = moment().tz("Asia/Kolkata").format("YYYY-MM-DD");

        // Find all appointments for the patient for today and populate doctor and hospital details
        const appointments = await AppointmentBook.find({
            patientId,
            app_date: todayDate
        })
        .populate('doctorId', 'firstName hospitalName')  // Populate doctor's first name
        // .populate('hospitalId', 'hospitalName');  // Populate hospital's name

        if (!appointments || appointments.length === 0) {
            return res.status(404).json({ message: 'No appointments found for today.' });
        }

        // Format the startTime and endTime to Indian time format (h:mm A)
        const formattedAppointments = appointments.map(appointment => {
            const formattedStartTime = moment(appointment.startTime).tz("Asia/Kolkata").format("h:mm A");
            const formattedEndTime = moment(appointment.endTime).tz("Asia/Kolkata").format("h:mm A");

            return {
                appointmentType: appointment.appointmentType,
                // hospitalName: appointment.hospitalId.hospitalName, // Populated hospital name
                app_date: appointment.app_date,
                startTime: formattedStartTime, // Showing in h:mm A (Indian format)
                endTime: formattedEndTime,     // Showing in h:mm A (Indian format)
                patient_issue: appointment.patient_issue,
                doctorFirstName: appointment.doctorId.firstName ,// Populated doctor's first name
                doctorHospitalName: appointment.doctorId.hospitalName // Populated doctor's first name

            };
        });

        // Send the response with the formatted appointments
        return res.status(200).json({
            message: 'Today\'s appointments fetched successfully!',
            appointments: formattedAppointments
        });

    } catch (error) {
        // Handle any errors during the fetching process
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while fetching appointments.' });
    }
};


// Function to fetch appointments for a particular patient within a date range
const getAppointmentsForPatientInRange = async (req, res) => {
    try {
        const { patientId, fromDate, toDate } = req.body; // Get patientId, fromDate, and toDate from request body

        // Validate that fromDate and toDate are provided
        if (!fromDate || !toDate) {
            return res.status(400).json({ message: 'Both fromDate and toDate are required.' });
        }

        // Parse the dates to ensure they are in 'YYYY-MM-DD' format
        const formattedFromDate = moment(fromDate, "DD MMM YYYY", true).format("YYYY-MM-DD");
        const formattedToDate = moment(toDate, "DD MMM YYYY", true).format("YYYY-MM-DD");

        // Validate the date formats
        if (!moment(formattedFromDate, "YYYY-MM-DD", true).isValid() || !moment(formattedToDate, "YYYY-MM-DD", true).isValid()) {
            return res.status(400).json({ message: 'Invalid date format. Please use "DD MMM YYYY".' });
        }

        // Find appointments for the patient within the date range and populate doctor and hospital details
        const appointments = await AppointmentBook.find({
            patientId,
            app_date: { $gte: formattedFromDate, $lte: formattedToDate } // Filter by date range
        })
        .populate('doctorId', 'firstName')  // Populate doctor's first name
        .populate('hospitalId', 'hospitalName');  // Populate hospital's name

        if (!appointments || appointments.length === 0) {
            return res.status(404).json({ message: 'No appointments found for the specified date range.' });
        }

        // Format the startTime and endTime to Indian time format (h:mm A)
        const formattedAppointments = appointments.map(appointment => {
            const formattedStartTime = moment(appointment.startTime).tz("Asia/Kolkata").format("h:mm A");
            const formattedEndTime = moment(appointment.endTime).tz("Asia/Kolkata").format("h:mm A");

            return {
                appointmentType: appointment.appointmentType,
                hospitalName: appointment.hospitalId.hospitalName, // Populated hospital name
                app_date: appointment.app_date,
                startTime: formattedStartTime, // Showing in h:mm A (Indian format)
                endTime: formattedEndTime,     // Showing in h:mm A (Indian format)
                patient_issue: appointment.patient_issue,
                doctorFirstName: appointment.doctorId.firstName // Populated doctor's first name
            };
        });

        // Send the response with the formatted appointments
        return res.status(200).json({
            message: 'Appointments fetched successfully!',
            appointments: formattedAppointments
        });

    } catch (error) {
        // Handle any errors during the fetching process
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while fetching appointments.' });
    }
};



// Function to fetch all appointments for a particular patient with a specific doctor
// Function to fetch all appointments for a particular doctor
const getPatientAppointmentsWithDoctor = async (req, res) => {
    try {
        const { doctorId } = req.body; // Get doctorId from request body

        // Validate that doctorId is provided
        if (!doctorId) {
            return res.status(400).json({ message: 'doctorId is required.' });
        }

        // Find the doctor by doctorId and select the required fields
        const doctor = await Doctor.findById(doctorId).select('doctorname firstName gender image breakTime workingTime hospitalName qualification experience emergencyContactNumber description');

        // Check if the doctor exists
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found.' });
        }

      

        // Send the response with the appointments and doctor details
        return res.status(200).json({
            message: 'Appointments fetched successfully!',
            doctorDetails: {
                doctorname: doctor.doctorname,
                firstName: doctor.firstName,
                gender: doctor.gender,
                image: doctor.image,
                breakTime: doctor.breakTime,
                workingTime: doctor.workingTime,
                hospitalName: doctor.hospitalName,
                qualification: doctor.qualification,
                experience: doctor.experience,
                emergencyContactNumber: doctor.emergencyContactNumber,
                description: doctor.description,
            
            }
        });

    } catch (error) {
        // Handle any errors during the fetching process
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while fetching appointments.' });
    }
};




module.exports = {
     getTodaysAppointmentsForPatient,
    getAppointmentsForPatientInRange,
    getPatientAppointmentsWithDoctor

};
