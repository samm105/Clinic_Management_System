const mongoose = require("mongoose");

const patientRecordSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  numberOfVisits: { type: Number, required: true },
  condition: { type: String, required: true },
  history: { type: String, required: true },
  token: {type: Number, required: true}
});

const PatientRecordModel = mongoose.model("PatientRecord", patientRecordSchema);

module.exports = PatientRecordModel;
