
module.exports.authAdminController = require("./admin/register.controller");
module.exports.hospitalController = require("./hospital/hospital.controller");
module.exports.adminController = require("./admin/admin.controller");
module.exports.doctorController = require("./admin/doctor.controller");

module.exports.doctorAuthController = require("./doctor/doctor.auth.controller");

module.exports.doctorOwnController = require("./doctor/controller.doctor");



module.exports.patientAuthController = require("./patient/auh.patient.controller");

module.exports.patientController = require("./patient/patient.controller");

// /* --------------------------------- PATIRNT -------------------------------- */

module.exports.dashboardController = require("./admin/dashboard.controller");

module.exports.bookapointmentPatientController = require("./bookapointment/bookApointment.controller");

module.exports.doctorTimeSlotController = require("./doctor/timeslot.doctor.controller");

module.exports.doctorFlowAppointmentController = require("./bookapointment/doctorflow.controller");

module.exports.prescriptionController = require("./prescription/prescription.controller");

// module.exports.appointmentController = require("./Patient/app/appointment.controller");

// module.exports.faqController = require("./Doctor/web/faq.controller");

// module.exports.faqPatientController = require("./Patient/web/patient.faq.controller");

// module.exports.helpDoctorController = require("./Doctor/web/helpDoctor");

// module.exports.favoriteDoctorController = require("./Patient/app/favoritedoctor.controller");
