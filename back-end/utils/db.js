const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/madmin', { useUnifiedTopology: true, useNewUrlParser: true })

const Users = mongoose.model('users', {
    username: String,
    password: String
})

const Movies = mongoose.model('movies', {
    moviesName: String,
    moviesreview: String,
    actors: String,
    moviestime: String,
    moviesLogo: String
})


module.exports = {
    Users,
    Movies
}