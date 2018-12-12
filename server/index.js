const express = require('express');
const path = require('path');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = require('./models/user');

//set up environment variable
dotenv.config({ path: path.join(__dirname, '.env') });

//grab the mongo uri from the environment
const { MONGO_URI } = process.env;

//connect to the database
mongoose.connect(MONGO_URI, { useNewUrlParser: true });

//get the jwt secret
const { SECRET } = process.env;

const port = process.env.PORT || 5000;

//middleware: import
const bodyParser = require('body-parser');
const helmet = require('helmet');
const logger = require('morgan');
const compression = require('compression');


//middleware: use
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(compression());

const staticPath = path.resolve(__dirname, '../client/build');
app.use(express.static(staticPath));
app.use(helmet());
app.post('/api/users/signup', requiredFields, async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = new User({ email });
        user.hashPassword(password);
        await user.save();
        res.status(201).json({ message: 'successful' });
    } catch (e) {
        res.status(500).json({ message: 'Server Error' });
    }
});

app.post('/api/users/login', requiredFields, async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if(!user.isValidPassword(req.body.password)){
        return res.sendStatus(401);
    }
    const token = jwt.sign({ user }, SECRET, { expiresIn: '30min' })
    res.status(201).json({ token });
    
});

if (process.env.NODE_ENV === 'production') {
    app.use('*', (req, res) => {
        const index = path.join(staticPath, 'index.html');
        res.sendFile(index);
    });
}


app.get('/api/users/welcome', isAuthorized, (req, res) => {
    res.send('You are authorized');
});

app.listen(port, () => console.log('Server started on port 5000'));

// Custom middleware
function requiredFields(req, res, next) {
    if (!req.body.email || !req.body.password) {
        return res.sendStatus(400)
    } else {
        next()
    }
}
function isAuthorized(req, res, next){
    const token = req.headers['token']
    if(!token) {
        return res.sendStatus(401);
    }
    try {
        const { payload } = jwt.verify(token, SECRET);
        console.log(payload);
        next();
    } catch (error) {
        res.sendStatus(401);
    }

}


















// app.get('/api', (req, res) => {
//     res.json({
//         message: 'Welcome to the API'
//     });
// });

// app.post('api/posts', verifyToken, (req, res) => {
//     jwt.verify(req.token, 'secretkey', (err, authData) => {
//         if (err) {
//             res.sendStatus(403);
//         } else {
//             res.json({
//                 message: 'Post created....',
//             });
//         }
//     });
// });


// // User
// app.post('/api/login', (req, res) => {
//     const user = {
//         id: 1, 
//         username: 'jon',
//         email: 'jonjosephson1@gmail.com'
//     }

//     jwt.sign({ user }, 'secretkey', (err, token) => {
//         res.json({
//             token
//         });
//     });
// });

// // Authorization: Holder<access_token>

// // Verify Token
// function verifyToken(req, res, next) {
//     const holderHeader = req.headers['authorization'];
//     if (typeof holderHeader !== 'undefined') {
//         const holder = holderHeader.split(' ');
//         const holderToken = holder[1];
//         req.token = holderToken;
//         next();
//     } else {
//         res.sendStatus(403);
//     }
// }
