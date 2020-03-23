var express = require('express');
var router = express.Router();

/* GET users listing. */
/* router.post('/registerin', function(req, res, next) {
    console.log(req.body);
    res.set('Cinntent-Type', 'application/json;charset-utf-8')
    res.render('succ', {
        data: JSON.stringify({
            message: '用户注册成功'
        })
    })
}); */

const { registerin, hasUsername, singin, isSignin, signout } = require('../controllers/users')

router.post('/registerin', hasUsername, registerin)
    // router.post('/registerin', function(req, res, next) {
    //     console.log(req.body)
    //     res.send('1111')
    // })
router.post('/singin', singin)
router.get('/isSignin', isSignin)
router.get('/signout', signout)

module.exports = router;