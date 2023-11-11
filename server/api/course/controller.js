const  Course = require('./model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('../../config.json')


const addCourse = async(req,res) =>{
    
    // const courseData = req.body;

    try{
        //Check if course already exist or not
        const existingCourse = await Course.findOne({ name: req.body.name })
        if (existingCourse) {
            return res.status(200).json({
                success: false,
                message: "Course already exist"
            })
        }

    //     const newCourse = await new Course(req.body)
    // // console.log(req.body)
    //     newCourse.save()
        const newCourse = await new Course(req.body);

        const savedCourse = await newCourse.save()

        res.status(200).json({
            success: true,
            message: 'New Course created',
            // body: savedCourse
        })
        

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: res.error
        })
    }
}

//Show all Courses
const getAllCourses = async (req, res) => {

    try {
        const allCourses = await Course.find()
        res.status(200).json({
            success: true,
            body: allCourses
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Server Error"

        })
    }
}

//Show individual Course
const getIndividualCourse = async (req, res) => {
    try {
        const { id } = req.query

        const Course = await Course.find({ _id: id })

        res.status(200).json({
            success: true,
            message: "All Courses displayed",
            body: Course
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message

        })
    }
}

//update Course
const updateCourse = async (req, res) => {

    try {
        const { id } = req.query

        const updatedCourse = await Course.findByIdAndUpdate(id, {
            name: req.body.name,
            type: req.body.type,
            category: req.body.category,
            details: req.body.details,
            price: req.body.price,
            
        }, { new: true })

        res.status(200).json({
            success: true,
            message: "Course updated",
            body: updatedCourse
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Server Error"

        })
    }


}

//delete Course
const deleteCourse = async (req, res) => {
    try {
        const { id } = req.query

        const deleteCourse = await Course.findByIdAndDelete(id)

        res.status(200).json({
            success: true,
            message: "Course deleted",
            body: deleteCourse
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error

        })
    }
}


module.exports = {
    addCourse,
    getAllCourses,
    getIndividualCourse,
    updateCourse,
    deleteCourse
    

}