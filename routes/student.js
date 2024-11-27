const express = require('express');
const db = require('../db');
const router = express.Router();

// Add a new student
router.post('/students', (req, res) => {
    const {
        name,
        gender,
        class: studentClass,
        dob,
        religion,
        enrollmentDate,
        fatherName,
        motherName,
        email,
        phone,
        occupation,
        address,
    } = req.body;

    const query = `
        INSERT INTO students 
        (name, gender, class, dob, religion, enrollment_date, father_name, mother_name, email, phone, father_occupation, address)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(
        query,
        [name, gender, studentClass, dob, religion, enrollmentDate, fatherName, motherName, email, phone, occupation, address],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: 'Student added', studentId: results.insertId });
        }
    );
});

// Get all students
router.get('/students', (req, res) => {
    const query = 'SELECT * FROM students';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
});

// Update a student
router.put('/students/:id', (req, res) => {
    const { id } = req.params;
    const {
        name,
        gender,
        class: studentClass,
        dob,
        religion,
        enrollmentDate,
        fatherName,
        motherName,
        email,
        phone,
        occupation,
        address,
    } = req.body;

    const query = `
        UPDATE students
        SET name = ?, gender = ?, class = ?, dob = ?, religion = ?, enrollment_date = ?, 
            father_name = ?, mother_name = ?, email = ?, phone = ?, father_occupation = ?, address = ?
        WHERE id = ?`;

    db.query(
        query,
        [name, gender, studentClass, dob, religion, enrollmentDate, fatherName, motherName, email, phone, occupation, address, id],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(200).json({ message: 'Student updated' });
        }
    );
});

// Delete a student
router.delete('/students/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM students WHERE id = ?';

    db.query(query, [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Student deleted' });
    });
});

module.exports = router;
