const express = require('express')
const {createEvent,getEvents,deleteEvent} = require("../controllers/events")
const {isAuthenticated} = require("../middlewares/auth")
const {upload} = require("../utils/multer")
const router = express()

router.post('/create-event',upload.array('images'),isAuthenticated,createEvent)
router.delete('/delete-event/:id',isAuthenticated,deleteEvent)
router.get('/events',getEvents)

module.exports = router