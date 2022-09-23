const router = require('express').Router();
const Room = require('../models/Rooms');
const Message = require("../models/Message");
const UserModel = require("../models/User");
const ApiError = require("../exceptions/api-error");
const bcrypt = require("bcrypt");


router.get('/', async (req, res) => {
    try {
        const rooms = await Room.find({}, {name: 1}).sort({name: 1})
        return res.json(rooms)
    } catch (e) {
        res.status(400).json(e)
    }
})


// get room by name with all mssgs
// router.get('/:room', async (req, res) => {
//     try {
//         console.log(req.params.room)
//         return Room.findOne(req.params.room);
//     } catch (e) {
//         res.status(400).json(e)
//     }
// })

//create room
router.post('/', async (req, res) => {
    try {
        const {name} = req.body;
        const room = await Room.create({name});
        res.status(201).json(room);
    } catch (e) {
        let msg;
        if (e.code === 11000) {
            msg = "Room already exists"
        } else {
            msg = e.message;
        }
        console.log(e);
        res.status(400).json(msg)
    }
})

router.put('/:id', async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);

        if (!room) throw ApiError.BadRequest(`Room not found!!!`);

        const updates = ["name"];
        updates.forEach((property) => {
            if (req.body[property]) room[property] = req.body[property];
        });


        await room.save();
        res.status(201).json(room);
    } catch (e) {
        let msg;
        if (e.code === 11000) {
            msg = "Room already exists"
        } else {
            msg = e.message;
        }
        console.log(e);
        res.status(400).json(msg)
    }
})


router.delete('/:room', async (req, res) => {
    try {
        const rooms = await Room.findOneAndDelete({name: req.params.room});
        const mssgsInRooms = await Message.find({to: req.params.room}).remove()
        return res.status(200).json({rooms, mssgsInRooms});
    } catch (e) {
        res.status(400).json(e)
    }
})


module.exports = router
