const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getDb } = require('../rent');
const router = express.Router();
const { ObjectId } = require('mongodb');

require('dotenv').config();

router.post('/register', async (req, res) => {
    const { fullName, email, username, password } = req.body;
    try {
        const usersCollection = getDb().collection('users');

        const userExists = await usersCollection.findOne( {username} );
        if(userExists) return res.status(400).json({ error: 'username already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = { fullName, email, username, password: hashedPassword };
        await usersCollection.insertOne(user);

        res.status(201).json({ message: 'user registered successfully' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const usersCollection = getDb().collection('users');

        const user = await usersCollection.findOne({ username });
        if(!user) return res.status(400).json({ message: 'invalid username or password' });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) return res.status(400).json({ message: 'invalid username or password' });

        const token = jwt.sign(
            { userId: user._id }, 
            process.env.JWT_SECRET, 
            {expiresIn: '1h'}
        );

        res.json({ token })
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access Denied' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid or expired token' });
        }
        req.userId = decoded.userId;
        next(); 
    });
};

router.get('/my-profile', authenticateToken, async (req, res) => {
    try {
        const db = getDb();
        const usersCollection = db.collection('users');
        const user = await usersCollection.findOne({ _id: new ObjectId(req.userId) });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({
            fullName: user.fullName,
            email: user.email,
            username: user.username,
        });
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;