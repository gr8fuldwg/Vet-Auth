const express = require('express');


const app = express();


app.post('/api/users/signup', (req, res) => {
    res.json({
        message: 'You signed up!'
    })
})

app.post('/api/users/login', (req, res) => {
    res.json({
        message: 'You logged in!'
    })
})

app.listen(5000, () => console.log('Server started on port 5000'));




















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
