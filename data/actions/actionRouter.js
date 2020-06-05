// 1
const express = require('express');

// 7
const actionDb = require('../helpers/actionModel')

// 2
const router = express.Router();

// 4
// ========== 4a. POST ==============
router.post('/', (req, res) => {
    actionDb.insert(req.body)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Error adding action' })
        })
})

// ========== 4b. GET ==============
router.get('/', (req, res) => {
    actionDb.get(req.params.id)
        .then(actions => {
            console.log('this is from actionrouter')
            res.status(200).json(actions)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'Error retrieving the actions'
            })
        })
});
// ========== 4c. PUT ==============
router.put('/:id', (req, res) => {
    const actionId = req.params.id
    const editAction = req.body

    actionDb.update(actionId, editAction)
        .then(action => {
            res.status(200).json({ message: 'Successfully edited', action })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: 'The project info could not be modified' })
        })
})

// ========== 4d. DELETE ==============
router.delete('/:id', (req, res) => {
    actionDb.remove(req.params.id)
        .then(action => {
            res.status(200).json({ message: 'action successfully deleted' })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: 'This action could not be removed'})
        })
})

// 3
module.exports = router;