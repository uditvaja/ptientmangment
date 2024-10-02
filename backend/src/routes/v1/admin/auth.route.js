
/* ------------------------------- DEFINE AREA ------------------------------ */
const express = require("express");
const router = express.Router();
const { authAdminController, adminController } = require("../../../controllers");
const { accessToken } = require("../../../middlewares/adminAuth");
const { singleFileUpload } = require("../../../helpers/upload");

/* ------------------------------- DOCTOR AUTH ------------------------------ */

/* -------------------------- CREATE/SIGNUP DOCTOR ----------- */
router.post("/create-admin", authAdminController.register);

/* -------------------------- LOGIN DOCTOR ----------- */
router.post("/admin-login", 
    // accessToken(),
 authAdminController.login);

// /* -------------------------- FORGOT PASSWORD DOCTOR ----------- */
router.post("/forgot-pass", authAdminController.forgotPass);

// /* -------------------------- VERIFY OTP DOCTOR ----------- */
router.post("/verify-otp", authAdminController.verifyOtp);

// /* -------------------------- RESET PASSWORD DOCTOR ----------- */
router.put("/reset-password", authAdminController.resetPassword);

// /* -------------------------- CHANGE PASSWORD DOCTOR ----------- */
router.post("/change-password", accessToken(), authAdminController.changePassword);

// /* -------------------------- UPDATE DOCTOR PROFILE DOCTOR ----------- */
router.put(
  "/update-admin-profile",
  accessToken(),
  singleFileUpload("/adminImg", "image"),
  adminController.updateAdminProfile
);

// /* -------------------------- DELTE DOCTOR PROFILE DOCTOR ----------- */
// router.delete(
//   "/delete-doc/:doctorId",
//   accessToken(),
//   doctorController.deleteDoctor
// );

// router.post("/social-login", 
// // accessToken(),
//  authController.socialLogin);

// router.get("/country-list", accessToken(), doctorController.allCountryList);

module.exports = router;
