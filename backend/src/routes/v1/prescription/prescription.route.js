
/* ------------------------------- DEFINE AREA ------------------------------ */
const express = require("express");
const router = express.Router();

// const { singleFileUpload } = require("../../../../helpers/upload");
const {   prescriptionController, precriptionPatientController } = require("../../../controllers");



/* -------------------------- CREATE/SIGNUP DOCTOR ----------- */
router.post("/create-prescription", prescriptionController.createPrescription);
router.get('/prescriptions-patient-id',prescriptionController.getPrescriptionsByPatientId);
router.get('/list-patient-id',prescriptionController.patientDetailFromDoctorIdInDoctorFlowAppointments);
router.get('/list-patient-id-prescription',prescriptionController.getPrescriptionDetailsByPatientId);
router.get('/list-patient-id-prescription-old',prescriptionController.getOldPrescriptionDetails);
router.get('/list-patient-all-appointment',prescriptionController.getAllAppointments);
router.get('/list-patient-all-appointment-searchinf-fromdate-todate',prescriptionController.getAppointmentsByDateRange);



router.get('/prescriptions-patient-id-list',precriptionPatientController.getPrescriptionsByPatientId);

// vibhu@321Sheladiya=Br

// mongodb+srv://vibhuSheladiya:vibhu@321Sheladiya=Br@cluster0.el1x5.mongodb.net/
// mongodb+srv://vibhuSheladiya:<db_password>@cluster0.el1x5.mongodb.net/

// mongodb+srv://vibhuSheladiya:vibhu@321Sheladiya=Br@cluster0.el1x5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

module.exports = router;


// vibhu321SheladiyaBr

// vibhuSheladiyacompany

// mongodb+srv://vibhuSheladiyacompany:<db_password>@cluster0.el1x5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

// mongodb+srv://vibhuSheladiyacompany:vibhu321SheladiyaBr@cluster0.el1x5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0