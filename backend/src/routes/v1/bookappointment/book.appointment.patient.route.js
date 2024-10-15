
const express = require("express");
const router = express.Router();
const {   bookapointmentPatientController, doctorFlowAppointmentController } = require("../../../controllers");
const authenticPatient = require("../../../middlewares/patientAuth");
const authenticDoctor = require("../../../middlewares/doctorAuth");




router.post("/create-appointment-book",
    authenticPatient, 
    bookapointmentPatientController.bookAppointment);

    router.post("/create-notes-date-time",
        authenticDoctor, 
        doctorFlowAppointmentController.createAppointmentNote);
    
    
router.post("/create-cancel-appointment",
    authenticDoctor, 
    bookapointmentPatientController.cancelAppointment);

    router.get("/docotr-list-by-id",
        authenticDoctor, 
        bookapointmentPatientController.doctorList);

        router.get("/appointment-previous",
            // authenticAdmin, 
            bookapointmentPatientController.appointmentListById);


            router.get("/appointment-list-cancel-date",
                // authenticAdmin, 
                bookapointmentPatientController.appointmentTypeOnlineList);

                router.get("/appointment-list-pending-status-patient",
                    // authenticAdmin, 
                    bookapointmentPatientController.appointmentTypeOnlineList);

                    
                router.get("/doctorflow-today-appointmentbook-date",
                    // authenticAdmin, 
                    doctorFlowAppointmentController.getTodayAppointments);

                    router.get("/doctorflow-upcoming-appointmentbook-date",
                        // authenticAdmin, 
                        doctorFlowAppointmentController.getUpcomingAppointments);

                        
                    router.get("/doctorflow-previous-appointmentbook-date",
                        // authenticAdmin, 
                        doctorFlowAppointmentController.getPreviousAppointments);

                        
                    router.get("/doctorflow-cancel-appointmentbook-date",
                        // authenticAdmin, 
                        doctorFlowAppointmentController.getCanceledAppointments);

                        router.delete("/doctorflow-delete-appointment-timeslot",
                            // authenticAdmin, 
                            doctorFlowAppointmentController.deleteAppDateAndTimeSlot);

                            router.put("/doctorflow-update-appointment-timeslot-date",
                                // authenticAdmin, 
                                doctorFlowAppointmentController.updateAppointmentDetails);


                                router.get("/searching-fromdate-todate-doctor",
                                    // authenticAdmin, 
                                    doctorFlowAppointmentController.getAppointmentsByDateRange);

                                    
                                router.get("/all-appointment-of-patient",
                                    // authenticAdmin, 
                                    doctorFlowAppointmentController.getAllAppointments);

                                    router.get("/details-of-patient",
                                        // authenticAdmin, 
                                        doctorFlowAppointmentController.getAllAppointments);


                                        // docotr flow in dash board
router.get('/patient-record-access',doctorFlowAppointmentController.getDetailsPatients)
router.get('/patient-record-access-seraching-month',doctorFlowAppointmentController.getDetailsPatientsSearching)


router.get('/patient-record-access-doctor-id',doctorFlowAppointmentController.patientDetailFromDoctorIdInDoctorFlowAppointments)

router.get('/patient-id-their-all-appointment-list',doctorFlowAppointmentController.getAppointmentsByDoctor)


    
module.exports = router;
