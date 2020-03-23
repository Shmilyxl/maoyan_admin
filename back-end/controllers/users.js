const usersModel = require('../models/users')
const tools = require('../utils/tools')
const authMiddleware = require('../middleware/auth')

const registerin = async function(req, res, next) {
    res.set('Content-Type', 'application/json; charset=utf-8')
    let { username, password } = req.body
    console.log(req.body);

    let hash = await tools.hash(password)
    console.log(hash);

    let result = await usersModel.save({
        username,
        password: hash,
    })
    if (result) {
        res.render('succ', {
            data: JSON.stringify({
                message: '用户注册成功'
            })
        })
    } else {
        res.render('fail', {
            data: JSON.stringify({
                message: '用户注册失败'
            })
        })
    }
}

const hasUsername = async function(req, res, next) {
    res.set('Content-Type', 'application/json; charset=utf-8')
    let { username } = req.body
    let result = await usersModel.findOne({ username })
    if (result) {
        res.render('fail', {
            data: JSON.stringify({
                message: '用户名已经存在.'
            })
        })
    } else {
        next()
    }
}

const singin = async function(req, res, next) {
    res.set('Content-Type', 'application/json; charset=utf-8')
    let { username, password } = req.body

    let result = await usersModel.findOne({ username })


    if (result) {
        let compareResult = await tools.compare(password, result.password)
        console.log(compareResult);

        if (compareResult) {
            //!!!!session设置一定要在render之前
            req.session.username = username
            console.log(req.session.username);

            res.render('succ', {
                data: JSON.stringify({
                    type: "singin",
                    message: '用户登陆成功'
                })
            })
        } else {
            res.render('fail', {
                data: JSON.stringify({
                    message: '用户名或密码不正确'
                })
            })
        }
    } else {
        res.render('fail', {
            data: JSON.stringify({
                message: '用户名或密码不正确.'
            })
        })
    }
}

const isSignin = authMiddleware

const signout = function(req, res, next) {
    req.session = null
    res.render('succ', {
        data: JSON.stringify({
            message: '注销成功'
        })
    })
}
module.exports = {
    registerin,
    hasUsername,
    singin,
    isSignin,
    signout
}