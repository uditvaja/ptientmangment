
/* ------------------------------- DEFINE AREA ------------------------------ */
const express = require("express");
const router = express.Router();
const { authAdminController, adminController, doctorController } = require("../../../controllers");
const { accessToken } = require("../../../middlewares/adminAuth");
const { singleFileUpload, multiDiffFileUpload } = require("../../../helpers/upload");

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


// router.post(
  //   "/add-docor-by-admin",
  //   // accessToken(),
//   multiDiffFileUpload("/doctorImg", [
//     { name: "signatureImage", maxCount: 1, allowedMimes: ["image/png", "image/jpeg", "image/jpg"] },
//     { name: "image", maxCount: 1, allowedMimes: ["image/png", "image/jpeg", "image/jpg"] },
//   ]),
//   // singleFileUpload("/doctorImg", "signatureImage"),
//   doctorController.addDoctorByAdmin
// );

const uploadMiddleware = multiDiffFileUpload("/doctorImg", [
  {
    name: "image",
    maxCount: 1,
    allowedMimes: ["image/jpeg", "image/png", "image/gif"], // Add allowed types
  },
  {
    name: "signatureImage",
    maxCount: 1,
    allowedMimes: ["image/jpeg", "image/png", "image/gif"], // Add allowed types
  },
]);

router.post(
  "/add-doctor-by-admin",
  accessToken(),
  uploadMiddleware,
  doctorController.addDoctorByAdmin
);

router.get("/list-docotr/:adminId",
  accessToken(),
  doctorController.listDoctorAdmin);

router.get("/search-docotr-by-admin",
  accessToken(),
  doctorController.searchDoctorByAdmin);

router.get("/list-all-docotr-by-admin",
  accessToken(), 
  doctorController.listAllDoctorByAdmin);



// router.post(
//   "/addBeautician",
//   authenticAdmin,
//   multiDiffFileUpload("public/images/beautician", [
//     { name: "banner", maxCount: 1, allowedMimes: ["image/png", "image/jpeg", "image/jpg"] },
//     { name: "image", maxCount: 1, allowedMimes: ["image/png", "image/jpeg", "image/jpg"] },
//   ]),
//   addBeautician
// );


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
