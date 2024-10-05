
const express = require("express");
const router = express.Router();
const {   bookapointmentPatientController } = require("../../../controllers");
const authenticAdmin = require("../../../middlewares/patientAuth");



router.post("/create-appointment-book",
    // authenticAdmin, 
    bookapointmentPatientController.bookAppointment);


    router.get("/docotr-list-by-id",
        // authenticAdmin, 
        bookapointmentPatientController.doctorList);

        router.get("/appointment-previous",
            // authenticAdmin, 
            bookapointmentPatientController.appointmentListById);


            router.get("/appointment-list-online-status",
                // authenticAdmin, 
                bookapointmentPatientController.appointmentTypeOnlineList);

                router.get("/appointment-list-pending-status",
                    // authenticAdmin, 
                    bookapointmentPatientController.appointmentTypeOnlineList);
    
module.exports = router;
