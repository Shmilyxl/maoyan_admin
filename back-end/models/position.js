const { Movies } = require('../utils/db')


const save = (data) => {
        let movies = new Movies(data)
        return movies.save()
    }
    /* const findAll = async() => {
            return await Movies.find({}).sort({ _id: -1 })
        } */
const findAll = async({ start, count }) => {
    console.log(start, count);

    let list = await Movies.find({}).sort({ _id: -1 }).limit(~~count).skip(~~start)
    let total = await Movies.find({}).count()
    return {
        list,
        total
    }
}
const findOne = async(id) => {
    return await Movies.findById(id)
}

const update = async(data) => {
    return await Movies.findByIdAndUpdate(data.id, data)
}
const remove = async(id) => {
    return await Movies.findByIdAndDelete(id)
}
const search = async(keywords) => {
    let reg = new RegExp(keywords, 'gi')
    return await Movies.find({}).or([{ moviesName: reg }])
}
module.exports = {
    save,
    findAll,
    update,
    findOne,
    remove,
    search
}