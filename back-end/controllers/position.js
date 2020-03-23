const movieModel = require('../models/position')
const fs = require('fs')
const path = require('path')

const findAll = async(req, res, next) => {
    res.set("Content-Type", 'application/json;charset=utf-8')
    console.log(999);
    let pageInfo = req.query;
    console.log(pageInfo);

    let result = await movieModel.findAll(pageInfo)
    console.log(888);

    console.log(result);

    if (result) {
        res.render('succ', {
            data: JSON.stringify({
                list: result
            })
        })
    } else {
        res.render('fali', {
            data: JSON.stringify({
                list: []
            })
        })
    }
}
const findOne = async(req, res, next) => {
    let id = req.query.id

    let result = await movieModel.findOne(id)
    if (result) {
        res.render('succ', {
            data: JSON.stringify(result)
        })
    } else {
        res.res.render('fail', {
            data: JSON.stringify(result)
        })
    }

}

const save = async(req, res, next) => {
    res.set('Content-Type', 'application/json; charset=utf-8')
    let data = req.body
    console.log(data);
    data.moviesLogo = req.filename
    console.log(data.moviesLogo);

    let result = await movieModel.save(data)
    if (result) {
        res.render('succ', {
            data: JSON.stringify({
                message: '数据添加成功'
            })
        })
    } else {
        res.redner('fail', {
            data: JSON.stringify({
                message: "添加数据失败"
            })
        })
    }
}

const update = async(req, res, next) => {
    console.log(0);
    let data = req.body
    console.log(data);
    if (req.filename === '') {
        delete data.moviesLogo
    } else {
        data.moviesLogo = req.filename
    }
    let result = await movieModel.update(data)

    if (result) {
        res.render("succ", {
            data: JSON.stringify({
                message: '数据修改成功'
            })
        })
    } else {
        res.render('fali', {
            data: JSON.stringify({
                message: "数据修改失败"
            })
        })
    }
}
const remove = async(req, res, next) => {
    let id = req.body.id
    console.log(id);

    let result = await movieModel.remove(id)

    if (result) {
        res.render('succ', {
            data: JSON.stringify({
                message: "数据删除成功"
            })
        })
    } else {
        res.render('fail', {
            data: JSON.stringify({
                message: '数据删除失败'
            })
        })
    }
}
const search = async(req, res, next) => {
    let { keywords } = req.body
    let result = await movieModel.search(keywords)

    if (result) {
        res.render('succ', {
            data: JSON.stringify({
                list: result
            })
        })
    } else {
        res.render('fail', {
            data: JSON.stringify({
                list: []
            })
        })
    }
}

module.exports = {
    findAll,
    save,
    update,
    remove,
    findOne,
    search
}