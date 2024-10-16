const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
 patientId:{
    // type:String,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'patient',
 },
 doctorId:{
    // type:String,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'doctor',
 },
 mdecinename:{
    type:Array
 },strenght:{
    type:Array,
 },
 dose:{
    type:Array,
 },
 duration:{
    type:Array,
 },
 when_to_take:{
type:Array,
 },
 appointmentId:{
// type:String,
type: mongoose.Schema.Types.ObjectId,
ref: 'appointmentBook',
 },
 additional_notes:{
    type:String
 },
 image: {
   public_id: { type: String },
   url: { type: String },
 },
 description:{
   type:String,
 },
 date: {
   type: Date,
   default: Date.now  // Automatically sets the current date
 },
});

const Prescription = mongoose.model('prescription', prescriptionSchema);
module.exports = Prescription;