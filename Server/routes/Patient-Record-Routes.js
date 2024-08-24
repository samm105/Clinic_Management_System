const express = require('express');
const router = express.Router();
const PatientRecord = require('../src/schema/Patient-Records'); // Import the model

// GET all patient records
router.get('/', async (req, res) => {
    try {
        const patient = await PatientRecord.find();
        res.json(patient);
    } catch (err) {
        console.error("Error fetching records:", err);
        res.status(500).json({ message: err.message });
    }
});

// POST a new patient record
router.post('/', async (req, res) => {
    console.log("Received request body:", req.body); // Log the request body

    const patient = new PatientRecord({
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        numberOfVisits: req.body.numberOfVisits,
        condition: req.body.condition,
        history: req.body.history,
        token: req.body.token,
    });

    try {
        const newPatient = await patient.save();
        res.status(201).json(newPatient);
    } catch (err) {
        console.error("Error saving patient record:", err); // Log error for debugging
        res.status(400).json({ message: err.message });
    }
});


// PUT (update) a patient record
router.put('/:id', async (req, res) => {
    try {
        const patient = await PatientRecord.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(patient);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a patient record
router.delete('/:id', async (req, res) => {
    try {
        await PatientRecord.findByIdAndDelete(req.params.id);
        res.json({ message: 'Patient record deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
