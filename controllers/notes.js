const Note = require('../models/Notes')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} =require('../errors')

const getAllNotes = async (req, res) => {
    const notes = await Note.find({ createdBy:req.user.userId }).sort('createdAt')
    res.status(StatusCodes.OK).json({ notes })
}
const getNotes = async (req, res) => {
    res.send('get notes')
}
const createNotes = async (req, res) => {
    req.body.createdBy = req.user.userId
    const note = await Note.create(req.body)
    res.status(StatusCodes.CREATED).json({ note })
}
const updateNotes = async (req, res) => {
    res.send('update notes')
}
const deleteNotes = async (req, res) => {
    res.send('delete notes')
}

module.exports = {
    getAllNotes,
    getNotes,
    createNotes,
    updateNotes,
    deleteNotes,
}