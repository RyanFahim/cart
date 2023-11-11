const express = require('express')
const router = express.Router();

const { addCourse, getAllCourses, getIndividualCourse, updateCourse,  deleteCourse} = require("./controller")

router.post('/add', addCourse)
router.get('/show', getAllCourses)
router.post('/update', updateCourse)
router.post('/delete', deleteCourse)
router.post('/showIndividual', getIndividualCourse)

module.exports = router