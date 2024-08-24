const express = require('express');
const router = express.Router();
const Prescription = require('../src/schema/Prescription');

// CREATE a new prescription
router.post('/', async (req, res) => {
    const { token, medication, dosage, instructions } = req.body;

    try {
        const prescription = new Prescription({
            token,
            medication,
            dosage,
            instructions
        });

        const savedPrescription = await prescription.save();
        res.status(201).json(savedPrescription);
    } catch (err) {
        console.error("Error saving prescription:", err);
        res.status(400).json({ message: err.message });
    }
});

// READ all prescriptions for a specific patient by token
router.get('/:token', async (req, res) => {
    try {
        const prescriptions = await Prescription.find({ token: req.params.token });
        if (prescriptions.length === 0) {
            return res.status(404).json({ message: 'No prescriptions found for this token' });
        }
        res.json(prescriptions);
    } catch (err) {
        console.error("Error fetching prescriptions:", err);
        res.status(500).json({ message: err.message });
    }
});

// UPDATE a prescription by ID
router.put('/:id', async (req, res) => {
    const { medication, dosage, instructions } = req.body;

    try {
        const updatedPrescription = await Prescription.findByIdAndUpdate(
            req.params.id,
            { medication, dosage, instructions },
            { new: true }
        );

        if (!updatedPrescription) {
            return res.status(404).json({ message: 'Prescription not found' });
        }

        res.json(updatedPrescription);
    } catch (err) {
        console.error("Error updating prescription:", err);
        res.status(400).json({ message: err.message });
    }
});

// DELETE a prescription by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedPrescription = await Prescription.findByIdAndDelete(req.params.id);

        if (!deletedPrescription) {
            return res.status(404).json({ message: 'Prescription not found' });
        }

        res.json({ message: 'Prescription deleted successfully' });
    } catch (err) {
        console.error("Error deleting prescription:", err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
