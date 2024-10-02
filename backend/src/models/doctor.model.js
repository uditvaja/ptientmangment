const { date } = require("joi");
const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    password: { type: String },
    token: { type: String },
    phoneNumber: { type: Number },
    refreshToken: { type: String },
    gender: {
      type: String,
    },
    age: {
        type: String,
      },
    image: { type: String },
    country: {
        type:String,
    },
    state:{
        type:String,
    },
    city: { type: String },
    zipcode:{
        type:String,
    },
    doctorAddress:{
        type:String
    },
    specialistType: { type: String},
    qualification:{
        type:String,
    },
    experience:{
        type:String,
    },
    workingTime:{
        type:String,
    },
    workOn:{
        type:String,
    }, 
    breakTime:{
        type:String,
    },
    patientCheckUpTime:{
        type:String,
    },
    description:{
        type:String,
    },
    signatureImage:{
        type:String
    },
onlineConsulationRate:{
    type:String,
},
doctorCurrentHospital:{
    type:String,
},
hospitalName:{
    type:String,
},
hospitalAddress:{
    type:String,
},
hospitalWebLink:{
    type:String,
},
emergencyContactNumber:{
    type:Number,
},

  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Declaring model for plan
const Doctor = mongoose.model("doctor", doctorSchema);
module.exports = Doctor;