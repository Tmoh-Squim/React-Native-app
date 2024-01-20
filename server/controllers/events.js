const Event = require('../models/events')
const asyncHandler = require('express-async-handler')
const cloudinary = require('../utils/cloudinary')
const createEvent = asyncHandler(async(req,res,next)=>{
    try {
        const files = req.files
        console.log(req.files)
        const imageUrls = []
        for(const file of files){
            const result = await cloudinary.uploader.upload(file.path,{
                folder:"Ecommerce"
            })
            imageUrls.push(result.secure_url)
        }
        const eventData = req.body
        eventData.images = imageUrls
        const event = await Event.create(eventData)

        res.status(200).send({
            success:true,
            message:"Event created successfully",
            event
        })
    } catch (error) {
        next(res.send({message:"Error in creating event"}))
        console.log(error)
    }
})
const getEvents = asyncHandler(async(req,res,next)=>{
    try {
        const events = await Event.find({}).sort({createdAt:-1})
        res.status(200).send({
            success:true,
            message:"All events",
            events
        })
    } catch (error) {
        next(res.send({message:"Error in fetching events"}))
        console.log(error)
    }
})
const deleteEvent = asyncHandler(async(req,res,next)=>{
    try {
        const id = req.params.id

        const check = await Event.findById(id)
        if(!check){
            next(res.send({message:"Event with this id not found"}))
        }
        await Event.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:"Event deleted successfuly"
        })
    } catch (error) {
        next(res.send({message:"Error in deleting the event"}))
        console.log(error)
    }
})

module.exports = {createEvent,deleteEvent,getEvents}