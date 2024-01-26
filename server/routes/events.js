const express = require('express')
const {createEvent,getEvents,deleteEvent} = require("../controllers/events")
const {isAuthenticated,isAdmin} = require("../middlewares/auth")
const {upload} = require("../utils/multer")
const router = express()

router.post('/create-event',upload.array('images'),isAuthenticated,isAdmin,createEvent)
router.delete('/delete-event/:id',deleteEvent)
router.get('/events',getEvents)

module.exports = router