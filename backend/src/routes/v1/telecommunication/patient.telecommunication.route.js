

/* ------------------------------- DEFINE AREA ------------------------------ */
const express = require("express");
const router = express.Router();

// const { singleFileUpload } = require("../../../../helpers/upload");
const {  telecommunicationControllerPatientFlow } = require("../../../controllers");



/* -------------------------- CREATE/SIGNUP DOCTOR ----------- */
router.get("/telecom-today-appointment-patient", telecommunicationControllerPatientFlow.getTodayAppointmentsForPatient);
router.get("/telecom-upcomming-appointment-patient", telecommunicationControllerPatientFlow.getUpcomingAppointmentsForPatient);
router.get("/telecom-upcomming-appointment-search-patient-name-patient-flow", telecommunicationControllerPatientFlow.getUpcomingAppointmentsSearchForPatient);
router.get("/telecom-previous-appointment-patient", telecommunicationControllerPatientFlow.getPreviousAppointmentsForPatient);
router.get("/telecom-previous-appointment-search-patient-name-patient-flow", telecommunicationControllerPatientFlow.getPreviousAppointmentsSearchForPatient);
router.get("/telecom-cancel-appointment", telecommunicationControllerPatientFlow.getCanceledAppointmentsForPatient);
router.get("/telecom-cancel-appointment-search-patient-name", telecommunicationControllerPatientFlow.getCanceledAppointmentsSearchForPatient);
router.get("/telecom-after-join-call-appointment-reminder", telecommunicationControllerPatientFlow.getAppointmentDetailsByIdForPatient);
router.get("/telecom-after-join-call-appointment-reminder-patient-details", telecommunicationControllerPatientFlow.getAppointmentDetailsOfPatientByIdForPatient);

router.put('/telecom-create-call', telecommunicationControllerPatientFlow.updateJoinCall);






module.exports = router;
