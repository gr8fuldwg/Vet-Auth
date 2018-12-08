const express = require('express');
const path = require('path');

const app = express();

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
app.post('/api/users/signup', requiredFields, (req, res) => {
    res.json({
        message: 'You signed up!'
    })
})

app.post('/api/users/login', requiredFields, (req, res) => {
    res.json({
        message: 'You logged in!'
    })
})



app.listen(5000, () => console.log('Server started on port 5000'));

// Custom middleware:
function requiredFields(req, res, next) {
    if(!req.body.email || !req.body.password) {
        return res.sendStatus(400)
    } else {
        next()
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
