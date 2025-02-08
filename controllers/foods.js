const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// router logic will go here - will be built later on in the lab

const pantryIndex = async (req, res) => {
    try{
        const currentUser = await User.findById(req.params.userId)
        console.log(currentUser.pantry)
        res.render('foods/index.ejs',
            {title: 'Your Pantry',
            pantry: currentUser.pantry,
        })
        } catch (error) {
        console.log(error)
        res.redirect('/')
        }
}

const newPantry = (req, res) => {
    res.render('foods/new.ejs', {title: 'Add New Pantry'})
}

const postNewPantry = async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId)
        currentUser.pantry.push(req.body)
        await currentUser.save()
        res.redirect(`/users/${currentUser._id}/foods`)

    } catch (e) {
        console.log(e)
        res.redirect('/')
    }
}

const deletePantry = async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId)
        currentUser.pantry.id(req.params.pantryId).deleteOne()
        await currentUser.save()
        res.redirect(`/users/${currentUser._id}/foods`)
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
}

const editPantry = async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId)
        const pantry = currentUser.pantry.id(req.params.pantryId)
        res.render('foods/edit.ejs', {
            title: pantry.name,
            pantry
        })
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
}

const updatePantry = async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId)
        const pantry = currentUser.pantry.id(req.params.pantryId)

        pantry.set(req.body)
        await currentUser.save()

        res.redirect(`/users/${currentUser.id}/foods`)

    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
}

module.exports = {
    router,
    pantryIndex,
    newPantry,
    postNewPantry,
    deletePantry,
    editPantry,
    updatePantry,
}