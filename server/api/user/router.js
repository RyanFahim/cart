const express = require('express')
const { validateUser } = require('./model')
const checkToken = require('../../middleware/authentication')
const { createUser, getAllUsers, getIndividualUser, updateUser, deleteUser, loginUser, createAdmin} = require('./controller')
const router = express.Router();

router.post('/add', createUser )
router.post('/addAdmin', createAdmin )
router.post('/login', loginUser)
router.post('/getAll', getAllUsers)
router.post('/getIndividual', getIndividualUser)
router.post('/update', updateUser)
router.post('/delete', deleteUser)
// router.post('/upload', checkToken, upload.single('image'), uploadFile)


module.exports = router