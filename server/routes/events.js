const express = require('express')
const {createEvent,getEvents,deleteEvent} = require("../controllers/events")
const {isAuthenticated} = require("../middlewares/auth")
const router = express()

router.post('/create-event',isAuthenticated,createEvent)
router.delete('/delete-event',isAuthenticated,deleteEvent)
router.get('/events',getEvents)

module.exports = router