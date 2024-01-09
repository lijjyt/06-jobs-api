const express = require('express')
const router = express.Router()

const {getAllNotes, getNotes, createNotes, updateNotes, deleteNotes} = require('../controllers/notes')

router.route('/').post(createNotes).get(getAllNotes)
router.route('/:id').get(getNotes).delete(deleteNotes).patch(updateNotes)


module.exports = router