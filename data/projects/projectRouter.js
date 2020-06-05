// 1
const express = require('express');

// 7
const projectDb = require('../helpers/projectModel')

// 2
const router = express.Router();

// 4
// ========== 4a. POST ==============
router.post('/', (req, res) => {
    projectDb.insert(req.body)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Error adding project' })
        })
})

// ========== 4b. GET ==============
router.get('/', (req, res) => {
    projectDb.get()
        .then(projects => {
            // console.log(projects)
            res.status(200).json(projects)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'Error retrieving the projects'
            })
        })
});

router.get('/:id/actions', (req, res) => {
    projectDb.getProjectActions(req.params.id)
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'error getting actions from database'})
        })
})

// ========== 4c. PUT ==============
router.put('/:id', (req, res) => {
    const projectId = req.params.id
    const editProject = req.body

    projectDb.update(projectId, editProject)
        .then(project => {
            res.status(200).json({ message: 'Successfully edited', project })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: 'The project info could not be modified' })
        })
})

// ========== 4d. DELETE ==============
router.delete('/:id', (req, res) => {
    projectDb.remove(req.params.id)
        .then(project => {
            res.status(200).json({ message: 'successfully deleted' })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: 'Project could not be removed'})
        })
})

// 3 
module.exports = router;