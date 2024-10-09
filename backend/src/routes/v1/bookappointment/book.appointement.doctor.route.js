
/* ------------------------------- DEFINE AREA ------------------------------ */
const express = require("express");
const router = express.Router();

// const { singleFileUpload } = require("../../../../helpers/upload");
const { patintFlowBookappointmentController } = require("../../../controllers");



/* -------------------------- CREATE/SIGNUP DOCTOR ----------- */
router.post("/", patintFlowBookappointmentController);



module.exports = router;
