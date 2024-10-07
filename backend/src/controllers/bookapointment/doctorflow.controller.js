const { formatToIST } = require('../../helpers/timeFormat'); // Import time formatting utility
const moment = require('moment');
const AppointmentBook = require('../../models/bookAppointment.model');
const Patient = require('../../models/patient.model');
const Doctor = require('../../models/doctor.model');



const getTodayAppointments = async (req, res) => {
    try {
        // Get today's date in 'YYYY-MM-DD' format
        const today = moment().format('YYYY-MM-DD');

        // Find all appointments where app_date matches today
        const todayAppointments = await AppointmentBook.find({
            app_date: today
        })
        .select('appointmentType app_date patient_issue diseas_name startTime') // Adjust fields as needed
        .populate('patientId', 'first_name last_name');

        // Check if any appointments were found
        if (!todayAppointments.length) {
            return res.status(404).json({ message: 'No appointments found for today.' });
        }

        // Format the startTime to Indian Standard Time (IST) for each appointment
        const formattedAppointments = todayAppointments.map(appointment => {
            const startTimeIST = moment(appointment.startTime).tz('Asia/Kolkata').format('h:mm A'); // Convert to IST in 'h:mm A' format
            return {
                ...appointment.toObject(),
                startTime: startTimeIST  // Overwrite startTime with formatted IST time
            };
        });

        // Return the list of today's appointments with formatted time
        return res.status(200).json({
            message: 'Today\'s appointments retrieved successfully.',
            appointments: formattedAppointments
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
        .select('appointmentType app_date patient_issue diseas_name startTime') // Adjust fields as needed
        .populate('patientId', 'first_name last_name');

        // Check if any upcoming appointments were found
        if (!upcomingAppointments.length) {
            return res.status(404).json({ message: 'No upcoming appointments found.' });
        }

        // Format the startTime to Indian Standard Time (IST) for each appointment
        const formattedAppointments = upcomingAppointments.map(appointment => {
            const startTimeIST = moment(appointment.startTime).tz('Asia/Kolkata').format('h:mm A'); // Convert to IST in 'h:mm A' format
            return {
                ...appointment.toObject(),
                startTime: startTimeIST  // Overwrite startTime with formatted IST time
            };
        });

        // Return the list of upcoming appointments with formatted time
        return res.status(200).json({
            message: 'Upcoming appointments retrieved successfully.',
            appointments: formattedAppointments
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
        .select('appointmentType app_date patient_issue diseas_name startTime') // Add startTime field
        .populate('patientId', 'first_name last_name');

        // Check if any previous appointments were found
        if (!previousAppointments.length) {
            return res.status(404).json({ message: 'No previous appointments found.' });
        }

        // Format startTime to IST
        const formattedAppointments = previousAppointments.map(appointment => ({
            ...appointment._doc,
            startTime: formatToIST(appointment.startTime) // Convert to IST
        }));

        // Return the list of previous appointments
        return res.status(200).json({
            message: 'Previous appointments retrieved successfully.',
            appointments: formattedAppointments
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
        .select('appointmentType app_date startTime  patient_issue diseas_name') // Adjust fields as needed
        // .populate('doctorId', 'firstName')
        .populate('patientId', 'first_name last_name')
       

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

        // Use $unset to remove the app_date and startTime fields from the appointment
        await AppointmentBook.findByIdAndUpdate(appointmentId, {
            $unset: { app_date: "", startTime: ""  ,endTime:""} // Unset both app_date and startTime
        });

        // Return success response
        return res.status(200).json({ message: 'app_date and startTime deleted successfully.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while deleting app_date and startTime.' });
    }
};


const updateAppointmentDetails = async (req, res) => {
    try {
        // Extract the appointmentId, app_date, doctorTimeSlot (app_time), and add_notes from the request body
        const { appointmentId, app_date, app_time, add_notes } = req.body;

        // Check if the appointment exists
        const appointment = await AppointmentBook.findById(appointmentId);

        // If no appointment is found, return an error
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found.' });
        }

        // Ensure the date is parsed correctly by explicitly specifying the format
        const formattedAppDate = moment(app_date, "DD MMM YYYY", true).format("YYYY-MM-DD");
        if (!moment(formattedAppDate, "YYYY-MM-DD", true).isValid()) {
            return res.status(400).json({ message: 'Invalid date format. Please use "DD MMM YYYY".' });
        }

        // Split app_time into startTime and endTime
        const [startTime, endTime] = app_time.split(' - ');

        // Validate and format startTime and endTime to IST timezone
        const formattedStartTime = moment.tz(`${app_date} ${startTime}`, "DD MMM YYYY h:mm A", "Asia/Kolkata").format(); // Convert to ISO format in IST
        const formattedEndTime = moment.tz(`${app_date} ${endTime}`, "DD MMM YYYY h:mm A", "Asia/Kolkata").format(); // Convert to ISO format in IST

        if (!moment(formattedStartTime).isValid() || !moment(formattedEndTime).isValid()) {
            return res.status(400).json({ message: 'Invalid time format. Please use "h:mm A".' });
        }

        // Use $set to update app_date, startTime, endTime, and add_notes fields
        const updatedAppointment = await AppointmentBook.findByIdAndUpdate(
            appointmentId,
            {
                $set: {
                    app_date: formattedAppDate,   // Set the new app_date
                    startTime: formattedStartTime, // Set the new startTime in IST
                    endTime: formattedEndTime,     // Set the new endTime in IST
                    add_notes                     // Set the new add_notes
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
        .select('appointmentType app_date startTime patient_issue diseas_name') // Adjust fields as needed
        // .populate('doctorId', 'firstName')
        .populate('patientId', 'first_name last_name')
        // .populate('doctorTimeSlot', 'timeslot'); // Populate hospital name

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

const getAllAppointments = async (req, res) => {
    try {
        // Get today's date in 'YYYY-MM-DD' format
        const today = moment().format('YYYY-MM-DD');

        // Find all appointments where app_date is before today
        const previousAppointments = await AppointmentBook.find()
 // Adjust fields as needed
        // .populate('doctorId', 'firstName')
        .populate('patientId', 'first_name last_name')
      

        // Return the list of previous appointments
        return res.status(200).json({
            message: 'all appointment list successfully.',
            appointments: previousAppointments
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while retrieving previous appointments.' });
    }
};

// const createAppointmentNote = async (req, res) => {
//     try {
//         // Extract appointment details from request body
//         const { app_date, app_time, notes } = req.body;

//         // Validate required fields
//         if (!app_date || !app_time || !notes) {
//             return res.status(400).json({ message: 'app_date, app_time, and notes are required.' });
//         }

//         // Ensure the date is parsed correctly
//         const formattedAppDate = moment(app_date, "DD MMM YYYY", true).format("YYYY-MM-DD");
//         if (!moment(formattedAppDate, "YYYY-MM-DD", true).isValid()) {
//             return res.status(400).json({ message: 'Invalid date format. Please use "DD MMM YYYY".' });
//         }

//         // Split app_time into startTime and endTime
//         const [startTime, endTime] = app_time.split(' - ');

//         // Validate startTime and endTime
//         const formattedStartTime = moment.tz(`${app_date} ${startTime}`, "DD MMM YYYY h:mm A", "Asia/Kolkata").format();
//         const formattedEndTime = moment.tz(`${app_date} ${endTime}`, "DD MMM YYYY h:mm A", "Asia/Kolkata").format();

//         if (!moment(formattedStartTime).isValid() || !moment(formattedEndTime).isValid()) {
//             return res.status(400).json({ message: 'Invalid time format. Please use "h:mm A".' });
//         }

//         // Create a new appointment note record
//         const newAppointmentNote = new AppointmentNote({ // Assuming you have an AppointmentNote model
//             app_date: formattedAppDate,
//             startTime: formattedStartTime,
//             endTime: formattedEndTime,
//             notes
//         });

//         // Save the appointment note to the database
//         await newAppointmentNote.save();

//         // Respond with success
//         return res.status(201).json({ message: 'Appointment note created successfully!', appointmentNote: newAppointmentNote });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: 'An error occurred while creating the appointment note.' });
//     }
// };

const createAppointmentNote = async (req, res) => {
    try {
        // Extract the appointmentId, app_date, doctorTimeSlot (app_time), and add_notes from the request body
        const { appointmentId, app_date, app_time, add_notes } = req.body;

        // Check if the appointment exists
        const appointment = await AppointmentBook.findById(appointmentId);

        // If no appointment is found, return an error
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found.' });
        }

        // Ensure the date is parsed correctly by explicitly specifying the format
        const formattedAppDate = moment(app_date, "DD MMM YYYY", true).format("YYYY-MM-DD");
        if (!moment(formattedAppDate, "YYYY-MM-DD", true).isValid()) {
            return res.status(400).json({ message: 'Invalid date format. Please use "DD MMM YYYY".' });
        }

        // Split app_time into startTime and endTime
        const [startTime, endTime] = app_time.split(' - ');

        // Validate and format startTime and endTime to IST timezone
        const formattedStartTime = moment.tz(`${app_date} ${startTime}`, "DD MMM YYYY h:mm A", "Asia/Kolkata").format(); // Convert to ISO format in IST
        const formattedEndTime = moment.tz(`${app_date} ${endTime}`, "DD MMM YYYY h:mm A", "Asia/Kolkata").format(); // Convert to ISO format in IST

        if (!moment(formattedStartTime).isValid() || !moment(formattedEndTime).isValid()) {
            return res.status(400).json({ message: 'Invalid time format. Please use "h:mm A".' });
        }

        // Use $set to update app_date, startTime, endTime, and add_notes fields
        const updatedAppointment = await AppointmentBook.findByIdAndUpdate(
            appointmentId,
            {
                $set: {
                    app_date: formattedAppDate,   // Set the new app_date
                    startTime: formattedStartTime, // Set the new startTime in IST
                    endTime: formattedEndTime,     // Set the new endTime in IST
                    add_notes                     // Set the new add_notes
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



const getDetailsPatients = async (req, res) => {
    try {
        // Aggregate to get last appointment details for each patient
        const previousAppointments = await AppointmentBook.aggregate([
            {
                $sort: { app_date: -1 } // Sort by app_date in descending order
            },
            {
                $group: {
                    _id: "$patientId", // Group by patientId
                    lastAppointment: { $first: "$$ROOT" } // Get the full last appointment document
                }
            },
            {
                $lookup: {
                    from: "patients", // Name of the patients collection
                    localField: "_id",
                    foreignField: "_id",
                    as: "patientDetails"
                }
            },
            {
                $unwind: "$patientDetails" // Unwind the array to get patient details
            },
            {
                $project: {
                    _id: 0,
                    patientId: "$_id",
                    appointmentType: "$lastAppointment.appointmentType", // Get appointment type
                    app_date: "$lastAppointment.app_date", // Get the last appointment date
                    app_time: "$lastAppointment.app_time", // Get the app_time from last appointment
                    patient_issue: "$lastAppointment.patient_issue", // Get patient issue
                    diseas_name: "$lastAppointment.diseas_name", // Get disease name
                    first_name: "$patientDetails.first_name",
                    last_name: "$patientDetails.last_name",
                    age: "$patientDetails.age",
                    gender: "$patientDetails.gender"
                }
            }
        ]);

        // Check if any appointments were found
        if (!previousAppointments.length) {
            return res.status(404).json({ message: 'No previous appointments found.' });
        }

        // Return the list of previous appointments
        return res.status(200).json({
            message: 'All appointment list retrieved successfully.',
            appointments: previousAppointments
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while retrieving previous appointments.' });
    }
};



module.exports = {createAppointmentNote,getDetailsPatients,getAllAppointments, getPreviousAppointments,getTodayAppointments,getAppointmentsByDateRange,getUpcomingAppointments ,updateAppointmentDetails,getCanceledAppointments,deleteAppDateAndTimeSlot};