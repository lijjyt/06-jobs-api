const Note = require('../models/Notes')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} =require('../errors')

const getAllNotes = async (req, res) => {
    const notes = await Note.find({ createdBy:req.user.userId }).sort('createdAt')
    res.status(StatusCodes.OK).json({ notes })
}
const getNotes = async (req, res) => {
    const {
        user:{userId},
        params:{id:noteId}
        } = req
    
    const note = await Note.findOne({
        _id:noteId,createdBy:userId
    })
    if(!note){
        throw new NotFoundError(`No note found`)
    }
    res.status(StatusCodes.OK).json({ note })
}
const createNotes = async (req, res) => {
    req.body.createdBy = req.user.userId
    const note = await Note.create(req.body)
    res.status(StatusCodes.CREATED).json({ note })
}
const updateNotes = async (req, res) => {
    const {
        body:{title},
        user:{userId},
        params:{id:noteId}
        } = req
    if (title === ''){
        throw new BadRequestError('Name required')
    }

    const note = await Note.findByIdAndUpdate(
        {_id:noteId, createdBy:userId}, 
        req.body, 
        {new:true, runValidators:true}
    )
    if (!note) {
        throw new NotFoundError(`No note with that name`)
    }
    res.status(StatusCodes.OK).json({ note })

}
const deleteNotes = async (req, res) => {
    const {
        user:{userId},
        params:{id:noteId}
        } = req

    const note = await Note.findByIdAndRemove(
        {_id:noteId, createdBy:userId}, 
    )
    if (!note) {
        throw new NotFoundError(`No note with that name`)
    }
    res.status(StatusCodes.OK).json({ msg: "The entry was deleted." });
}

module.exports = {
    getAllNotes,
    getNotes,
    createNotes,
    updateNotes,
    deleteNotes,
}