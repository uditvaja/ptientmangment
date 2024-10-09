
/* ------------------------------- DEFINE AREA ------------------------------ */
const express = require("express");
const router = express.Router();

// const { singleFileUpload } = require("../../../../helpers/upload");
const { patintFlowBookappointmentController } = require("../../../controllers");



/* -------------------------- CREATE/SIGNUP DOCTOR ----------- */
router.get("/bookappointement-today-list-appointement-book", patintFlowBookappointmentController.getTodaysAppointmentsForPatient);
router.get("/searching-bookappointement-today-list-appointement-book", patintFlowBookappointmentController.getAppointmentsForPatientInRange);
router.get("/bookappointement-today-appointement-doctor-details-list", patintFlowBookappointmentController.getPatientAppointmentsWithDoctor);

router.get("/bookappointement-today-list-appointement-book", patintFlowBookappointmentController.getTodaysAppointmentsForPatient);
router.get("/searching-bookappointement-today-list-appointement-book", patintFlowBookappointmentController.getAppointmentsForPatientInRange);
router.get("/bookappointement-today-appointement-doctor-details-list", patintFlowBookappointmentController.getPatientAppointmentsWithDoctor);

router.get("/bookappointement-today-list-appointement-book", patintFlowBookappointmentController.getTodaysAppointmentsForPatient);
router.get("/searching-bookappointement-today-list-appointement-book", patintFlowBookappointmentController.getAppointmentsForPatientInRange);
router.get("/bookappointement-today-appointement-doctor-details-list", patintFlowBookappointmentController.getPatientAppointmentsWithDoctor);


module.exports = router;
