const moment = require('moment');
const AppointmentBook = require('../../models/bookAppointment.model');



const getTodayAppointments = async (req, res) => {
    try {
        // Get today's date in 'YYYY-MM-DD' format
        const today = moment().format('YYYY-MM-DD');

        // Find all appointments where app_date matches today
        const todayAppointments = await AppointmentBook.find({
            app_date: today
        })
        .select('appointmentType app_date  patient_issue diseas_name') // Adjust fields as needed
        // .populate('doctorId', 'firstName')
        .populate('patientId', 'first_name last_name')
        .populate('doctorTimeSlot', 'timeslot'); // Populate relevant fields

        // Check if any appointments were found
        if (!todayAppointments.length) {
            return res.status(404).json({ message: 'No appointments found for today.' });
        }

        // Return the list of today's appointments
        return res.status(200).json({
            message: 'Today\'s appointments retrieved successfully.',
            appointments: todayAppointments
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while retrieving today\'s appointments.' });
    }
};

const getUpcomingAppointments = async (req, res) => {
    try {
        // Get today's date in 'YYYY-MM-DD' format
        const today = moment().format('YYYY-MM-DD');

        // Find all appointments where app_date is after today
        const upcomingAppointments = await AppointmentBook.find({
            app_date: { $gt: today }
        })
        .select('appointmentType app_date  patient_issue diseas_name') // Adjust fields as needed
        // .populate('doctorId', 'firstName')
        .populate('patientId', 'first_name last_name')
        .populate('doctorTimeSlot', 'timeslot'); // Populate relevant fields

        // Check if any upcoming appointments were found
        if (!upcomingAppointments.length) {
            return res.status(404).json({ message: 'No upcoming appointments found.' });
        }

        // Return the list of upcoming appointments
        return res.status(200).json({
            message: 'Upcoming appointments retrieved successfully.',
            appointments: upcomingAppointments
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while retrieving upcoming appointments.' });
    }
};

const getPreviousAppointments = async (req, res) => {
    try {
        // Get today's date in 'YYYY-MM-DD' format
        const today = moment().format('YYYY-MM-DD');

        // Find all appointments where app_date is before today
        const previousAppointments = await AppointmentBook.find({
            app_date: { $lt: today }
        })
        .select('appointmentType app_date  patient_issue diseas_name') // Adjust fields as needed
        // .populate('doctorId', 'firstName')
        .populate('patientId', 'first_name last_name')
        .populate('doctorTimeSlot', 'timeslot');

        // Check if any previous appointments were found
        if (!previousAppointments.length) {
            return res.status(404).json({ message: 'No previous appointments found.' });
        }

        // Return the list of previous appointments
        return res.status(200).json({
            message: 'Previous appointments retrieved successfully.',
            appointments: previousAppointments
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while retrieving previous appointments.' });
    }
};

const getCanceledAppointments = async (req, res) => {
    try {
        // Find all appointments where status is 'canceled'
        const canceledAppointments = await AppointmentBook.find({
            status: 0
        })
        .select('appointmentType app_date  patient_issue diseas_name') // Adjust fields as needed
        // .populate('doctorId', 'firstName')
        .populate('patientId', 'first_name last_name')
        .populate('doctorTimeSlot', 'timeslot');

        // Check if any canceled appointments were found
        if (!canceledAppointments.length) {
            return res.status(404).json({ message: 'No canceled appointments found.' });
        }

        // Return the list of canceled appointments
        return res.status(200).json({
            message: 'Canceled appointments retrieved successfully.',
            appointments: canceledAppointments
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while retrieving canceled appointments.' });
    }
};




// Controller to delete app_date and doctorTimeSlot from appointment by appointmentId
const deleteAppDateAndTimeSlot = async (req, res) => {
    try {
        // Extract the appointmentId from the request body
        const { appointmentId } = req.body;

        // Check if the appointment exists
        const appointment = await AppointmentBook.findById(appointmentId);

        // If no appointment is found, return an error
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found.' });
        }

        // Use $unset to remove the app_date and doctorTimeSlot fields from the appointment
        await AppointmentBook.findByIdAndUpdate(appointmentId, {
            $unset: { app_date: "", doctorTimeSlot: "" }
        });

        // Return success response
        return res.status(200).json({ message: 'app_date and doctorTimeSlot deleted successfully.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while deleting app_date and doctorTimeSlot.' });
    }
};

const updateAppointmentDetails = async (req, res) => {
    try {
        // Extract the appointmentId and the new values from the request body
        const { appointmentId, app_date, doctorTimeSlot, add_notes } = req.body;

        // Check if the appointment exists
        const appointment = await AppointmentBook.findById(appointmentId);

        // If no appointment is found, return an error
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found.' });
        }

        const formattedAppDate = moment(app_date, "DD MMM YYYY", true).format("YYYY-MM-DD"); // For example, '11 Nov 2024'
        if (!moment(formattedAppDate, "YYYY-MM-DD", true).isValid()) {
            return res.status(400).json({ message: 'Invalid date format. Please use "DD MMM YYYY".' });
        }
        // Use $set to update app_date, doctorTimeSlot, and add_notes fields
        const updatedAppointment = await AppointmentBook.findByIdAndUpdate(
            appointmentId,
            {
                $set: {
                    app_date:formattedAppDate,           // Set the new app_date
                    doctorTimeSlot,     // Set the new doctorTimeSlot
                    add_notes           // Set the new add_notes
                }
            },
            { new: true } // Return the updated document
        );

        // Return success response with updated appointment details
        return res.status(200).json({
            message: 'Appointment details updated successfully.',
            updatedAppointment
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while updating appointment details.' });
    }
};

// Controller to get appointments within a specific date range
const getAppointmentsByDateRange = async (req, res) => {
    try {
        // Extract fromDate and toDate from query parameters
        const { fromDate, toDate } = req.query;

        // Validate the date formats and convert them to the required format
        const formattedFromDate = moment(fromDate, "DD-MM-YYYY", true);
        const formattedToDate = moment(toDate, "DD-MM-YYYY", true);

        if (!formattedFromDate.isValid() || !formattedToDate.isValid()) {
            return res.status(400).json({ message: 'Invalid date format. Please use "DD-MM-YYYY".' });
        }

        // Convert dates to ISO format (YYYY-MM-DDTHH:mm:ss.sssZ) for MongoDB queries
        const from = formattedFromDate.startOf('day').toISOString(); // Set to start of the day
        const to = formattedToDate.endOf('day').toISOString(); // Set to end of the day

        // Find appointments within the specified date range
        const appointments = await AppointmentBook.find({
            app_date: { $gte: from, $lte: to }
        })
        .select('appointmentType app_date app_time patient_issue doctorId hospitalId') // Select specific fields as needed
        .populate('doctorId', 'firstName lastName') // Populate doctor's first and last name
        .populate('hospitalId', 'hospital_name'); // Populate hospital name

        // Check if any appointments were found
        if (!appointments.length) {
            return res.status(404).json({ message: 'No appointments found in the specified date range.' });
        }

        // Return the list of appointments
        return res.status(200).json({
            message: 'Appointments retrieved successfully.',
            appointments
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while retrieving appointments.' });
    }
};


module.exports = { getPreviousAppointments,getTodayAppointments,getAppointmentsByDateRange,getUpcomingAppointments ,updateAppointmentDetails,getCanceledAppointments,deleteAppDateAndTimeSlot};