
const Doctor = require('../../models/doctor.model'); // Make sure to adjust the path to your Doctor model
const Patient = require("../../models/patient.model");
const moment = require("moment-timezone");
const AppointmentBook = require('../../models/bookAppointment.model'); // Adjust path as needed

// Controller to handle booking an appointment

const bookAppointment = async (req, res) => {
    try {
        // Extract appointment details from request body
        const { appointmentType, country, state, city, patient_issue, diseas_name, doctorId, hospitalId, patientId, app_time, app_date ,specialist} = req.body;

        // Optional: Validate other required fields
        if (!appointmentType || !country || !state || !city) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Ensure the date is parsed correctly by explicitly specifying the format
        const formattedAppDate = moment(app_date, "DD MMM YYYY", true).format("YYYY-MM-DD"); // For example, '11 Nov 2024'
        if (!moment(formattedAppDate, "YYYY-MM-DD", true).isValid()) {
            return res.status(400).json({ message: 'Invalid date format. Please use "DD MMM YYYY".' });
        }

        // Parse the time in IST (Indian Standard Time)
        const formattedAppTime = moment.tz(`${app_date} ${app_time}`, "DD MMM YYYY h:mm A", "Asia/Kolkata").format(); // Convert to ISO format in IST
        if (!moment(formattedAppTime).isValid()) {
            return res.status(400).json({ message: 'Invalid time format. Please use "h:mm A".' });
        }

        // Create a new appointment record
        const newAppointment = new AppointmentBook({
            appointmentType,
            country,
            specialist,
            state,
            city,
            patient_issue,
            diseas_name,
            patientId,
            doctorId,
            hospitalId,
            app_date: formattedAppDate,    // Keeping formatted date
            app_time: formattedAppTime     // Storing time in ISO format with IST timezone
        });

        // Save the appointment to the database
        await newAppointment.save();

        // Respond with success
        return res.status(201).json({ message: 'Appointment booked successfully!', appointment: newAppointment });
    } catch (error) {
        // Handle any errors during the booking process
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while booking the appointment.' });
    }
};

// Controller to get a simple list of doctors
// Controller to get a doctor by doctorId
const doctorList = async (req, res) => {
    try {
        // Extract doctorId from request parameters
        const { doctorId } = req.body;
        const { patientId } = req.body; // Assuming patientId comes from the request body

        // Check if the patient exists in the database
        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found.' });
        }

        // Fetch the doctor by ID from the database
        const doctor = await Doctor.findById(doctorId).select('hospitalName qualification image breakTime description workingTime experience specialistType firstName lastName gender');    

        // Check if the doctor was found
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found.' });
        }

        // Return the doctor's details
        return res.status(200).json({ message: 'Doctor retrieved successfully.', doctor });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while retrieving the doctor.' });
    }
};


// Controller to get a doctor by doctorId
const appointmentListById = async (req, res) => {
    try {
        // Extract doctorId from request parameters
        const { appointmentId } = req.body;

        // Fetch the doctor by ID, but only return specific fields
        const appointment = await AppointmentBook.findById(appointmentId).select('appointmentType app_date app_time')  .populate('doctorId', 'firstName');;

        // Check if the doctor was found
        if (!appointment) {
            return res.status(404).json({ message: 'Doctor not found.' });
        }

        // Return only the selected doctor's details
        return res.status(200).json({ message: 'Doctor retrieved successfully.', appointment });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while retrieving the doctor.' });
    }
};






// Controller to get all appointments filtered by multiple statuses (e.g., upcoming, scheduled, pending, canceled)
const appointmentTypeOnlineList = async (req, res) => {
    try {
        const { patientId } = req.body;

        // Check if the patient exists in the database
        const patientExists = await Patient.findById(patientId);

        // If patient does not exist, send SMS and return an error response
        if (!patientExists) {

            // Return a response indicating the patient was not found
            return res.status(404).json({ message: 'Patient not found.' });
        }
        // Get today's date in 'YYYY-MM-DD' format
        const today = moment().format('YYYY-MM-DD');

        // Use the $or operator to filter by multiple statuses
        const appointments = await AppointmentBook.find({
            app_date: { $gte: today }, // Appointments today or in the future
            $or: [{ status: '0' }],
            patientId: patientId // Add patientId to filter appointments for the specific patient
        })
        .select('appointmentType app_date app_time status patient_issue')
        .populate('doctorId', 'firstName').populate('hospitalId', 'hospital_name');; // Populate doctor's first name

        // Check if any appointments were found
        if (!appointments.length) {
            return res.status(404).json({ message: 'No appointments found for the specified statuses.' });
        }

        // Return the list of filtered appointments
        return res.status(200).json({
            message: 'Appointments retrieved successfully.',
            appointments
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while retrieving appointments.' });
    }
};











module.exports = {
    bookAppointment,doctorList,appointmentListById,appointmentTypeOnlineList
};
