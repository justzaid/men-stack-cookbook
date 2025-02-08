const User = require("../models/user")

const userHome = async (req, res) => {
    try {
        const users = await User.find();
        res.render('users/index.ejs', {
            title: 'Cookbook Community',
            users
        });

    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
}

const showUserPantry = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
        res.render('users/show.ejs', {
            title: 'User Pantry',
            user
        })
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
}

module.exports = {
    userHome,
    showUserPantry,
}