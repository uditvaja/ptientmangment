
/* ------------------------------- DEFINE AREA ------------------------------ */
const express = require("express");
const router = express.Router();

// const { singleFileUpload } = require("../../../../helpers/upload");
const { dashboardController } = require("../../../../controllers");
const authenticAdmin = require("../../../../middlewares/adminAuth");


/* -------------------------- CREATE/SIGNUP DOCTOR ----------- */
router.get("/doctor-list",authenticAdmin, dashboardController.allDoctorList);



module.exports = router;
