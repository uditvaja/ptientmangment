const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
//  doctorid:{
//     type:String,
//  },
// hospitalid:{

// },
patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'patient',  // Reference to the Patient model
  
},
doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'doctor',  // Reference to the Patient model
  
},
hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'hospital',  // Reference to the Patient model
  
},
patient_issue:{
type:String,
},
diseas_name:{
    type:String,
},
appointmentType:{
    type:String,
},

country:{
   type:String,
},
state:{
   type:String,
},
city:{
   type:String,
},

 app_date: {
    type: Date,
 },
 app_time:{
    type:String,
 },
 amount: {
    type: String,
    // required: [true, "Amount is required."],
  },
  specialist:{
type:String,
  },
  status: {
    type: Number,
    default: 0, //0-Pending,1-Completed,2-Cancelled,3-Accepted
  },
  cancel_reason: {
    type: String,
    default: "",
  },
 

});

const AppointmentBook = mongoose.model('appointmentBook', bookSchema);
module.exports = AppointmentBook;