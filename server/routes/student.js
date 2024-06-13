const express = require('express');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const verifyToken = require('../middleware');
const Attendence = require('../models/attendence.model');
const router = express.Router();


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
                message: 'Invalid credentials'
            });
        }

        const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: '2h' });
        return res.status(200).json({
            token
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
        const studentdata = await User.findOne({ _id: userId });
        return res.status(200).json({
            studentdata
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error'
        });
    }
});

router.post('/checkin', verifyToken, async (req, res) => {
    const studentId = req.user.id;
    const attend = new Attendence({
        studentId,
        checkin: Date.now()
    })
    await attend.save();
    current = Date.now();
    return res.status(200).json({
        current
    })
})

router.post('/checkout', verifyToken, async (req, res) => {
    try {
        const studentId = req.user.id; 
        const currentTime = Date.now();

        // Find the most recent check-in where checkout is null for this student
        const remained = await Attendence.findOne({ studentId: studentId, checkout: null });

        if (!remained) {
            return res.status(400).json({
                message: 'No check-in record found or already checked out'
            });
        }

        const checkinTime = new Date(remained.checkin).getTime();
        const twoHoursAgo = currentTime - (2 * 60 * 60 * 1000);

        if (checkinTime > twoHoursAgo) {
            return res.status(400).json({
                message: 'You can only check out after 2 hours from check-in'
            });
        }

        // Update the check-out time
        remained.checkout = currentTime;
        const stayTime = currentTime - checkinTime;
        remained.stayTime = stayTime;
        await remained.save();

        return res.status(200).json({
            message: 'Check-out successful',
            attendance: remained
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
});


router.get('/viewattendances', verifyToken, async (req, res) => {
    try {
        const studentid = req.user.id;
        const attendences =  await Attendence.find({ studentId: studentid });
        return res.status(200).json({
            attendences
        })
    }
    catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error'
        })
    }
})
router.get('/summary', verifyToken, async (req, res) => {
    const studentId = req.user.id;
    const totalAttendences = await Attendence.countDocuments({ studentId });

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const startDate = new Date(currentYear, currentMonth, 1); 
    const endDate = new Date(currentYear, currentMonth + 1, 1);

    const totalAttendencesMonth = await Attendence.countDocuments({
      studentId,
      checkin: {
        $gte: startDate,
        $lt: endDate
      }
    });


    return res.status(200).json({
      attends: totalAttendences,
      attendmonth: totalAttendencesMonth
    });
});

module.exports = router;
