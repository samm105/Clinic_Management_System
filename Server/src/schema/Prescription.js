const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
    token: {
        type: Number, required: true, ref: 'PatientRecord'
    },
    medication: {
        type: String,
        required: true
    },
    dosage: {
        type: String,
        required: true
    },
    instructions: {
        type: String,
        required: true
    }
});


const Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = Prescription;
