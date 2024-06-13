const express = require('express');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const verifyToken = require('../middleware');
const router = express.Router();
const Attendences = require('../models/attendence.model')

router.post('/register', async (req, res) => {
    try {
        const { admincode, name, email, phone, password } = req.body;
        if (admincode !== process.env.ADMINCODE) {
            return res.status(401).json({
                message: 'Invalid secret code'
            });
        }
        const isUserExist = await User.findOne({ email: email });
        if (isUserExist) {
            return res.status(400).json({
                message: 'User already exists'
            });
        }
        const protectedPass = await bcrypt.hash(password, 10);
        const user = new User({
            rollnumber: null,
            name,
            email,
            phone,
            password: protectedPass,  // Ensure the password field is correctly named
            accounttype: 'admin'
        });
        await user.save();
        return res.status(201).json({
            message: 'Admin registered successfully'
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({
                message: 'User does not exist'
            });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                message: 'Invalid password'
            });
        }
        if (user.accounttype !== 'admin') {
            return res.status(400).json({
                message: 'You are not admin'
            });
        }
        const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: '2h' });
        return res.status(200).json({
            token, admin:true
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error'
        });
    }
});


router.get('/data', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const adminData = await User.findOne({ _id: userId });
        return res.status(200).json({
            adminData
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error'
        });
    }
});

//register student
router.post('/registerstudent', verifyToken, async (req, res) => {
    try {
        const userid = req.user.id;
        const isadmin = await User.findOne({ _id: userid });
        if (isadmin.accounttype !== 'admin') {
            return res.status(400).json({
                message: 'You are not admin'
            });
        }
        const { rollnumber, name, email, phone, password } = req.body;
        const isUserExist = await User.findOne({ email: email });
        if (isUserExist) {
            return res.status(400).json({
                message: 'Student already exists'
            });
        }
        const protectedPass = await bcrypt.hash(password, 10);
        const user = new User({
            rollnumber,
            name,
            email,
            phone,
            password: protectedPass,
            accounttype: 'student'
        });
        await user.save();
        return res.status(201).json({
            message: 'Student registered successfully'
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
})

//view all students
router.get('/viewstudents', verifyToken, async (req, res) => {
    const userid = req.user.id;
    const isadmin = await User.findOne({ _id: userid });
    if (isadmin.accounttype !== 'admin') {
        return res.status(400).json({
            message: 'You are not admin'
        });
    }
    const students = await User.find({ accounttype: 'student' });
    return res.status(200).json({
        students
    })
})

//view student profile
router.get('/viewstudentprofile/:id', verifyToken, async (req, res) => {
    const userid = req.user.id;
    const isadmin = await User.findOne({ _id: userid });
    if (isadmin.accounttype !== 'admin') {
        return res.status(400).json({
            message: 'You are not admin'
        });
    }
    const student = await User.findOne({ rollnumber: req.params.id });
    return res.status(200).json({
        student
    })

})

//update student
router.put('/updatestudent/:id', verifyToken, async (req, res) => {
    const userid = req.user.id;
    const isadmin = await User.findOne({ _id: userid });
    if (isadmin.accounttype !== 'admin') {
        return res.status(400).json({
            message: 'You are not admin'
        });
    }
    const { name, email, phone } = req.body;
    const student = await User.findByIdAndUpdate({ _id: req.params.id }, { name, email, phone }, { new: true });
    return res.status(200).json({
        student
    })
})

//delete student
router.delete('/deletestudent/:id', verifyToken, async (req, res) => {
    const userid = req.user.id;
    const isadmin = await User.findOne({ _id: userid });
    if (isadmin.accounttype !== 'admin') {
        return res.status(400).json({
            message: 'You are not admin'
        });
    }
    const student = await User.findOneAndDelete({ rollnumber: req.params.id });
    return res.status(200).json({
        message: 'Student deleted successfully'
    })
})

router.get('/viewattendances', verifyToken, async (req, res) => {
    const userid = req.user.id;
    const isadmin = await User.findOne({ _id: userid });
    if (isadmin.accounttype !== 'admin') {
        return res.status(400).json({
            message: 'You are not admin'
        });
    }
    const attendences = await Attendences.find();
    return res.status(200).json({
        attendences
    })
})

router.get('/summary', verifyToken, async (req, res) => {
    const totalAttendences = await Attendences.find().count();
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const startDate = new Date(currentYear, currentMonth, 1); // Start of the month
    const endDate = new Date(currentYear, currentMonth + 1, 1);
    const totalAttendencesMonth = await Attendences.countDocuments({
        checkin: {
          $gte: startDate,
          $lt: endDate
        }
      });
    const totalStudents = await User.find({ accounttype:'student' }).count();
    return res.status(200).json({
        attends: totalAttendences,
        attendmonth: totalAttendencesMonth,
        students : totalStudents,
    })
})

module.exports = router;
