const express = require('express');
const router = express.Router();

router.get('/register',(req,res) => {
    res.render('../views/AuthorizationPages/registration');
});

router.get('/login',(req,res) => {
    res.render('../views/AuthorizationPages/login');
});

router.get('/restartPassword',(req,res) => {
    res.render('../views/AuthorizationPages/restart');
});

module.exports = router;