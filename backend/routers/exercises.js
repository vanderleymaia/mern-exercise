const router = require('express').Router()
let Exercise = require('../models/exercise.model')
const { route } = require('./users')

//GET ALL EXERCISES
router.route('/').get((req, res) => {
    Exercise.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ', +err))
})
//ADD AN EXERCISE
router.route('/add').post((req, res) => {
    const username = req.body.username
    const description = req.body.description
    const duration = Number(req.body.duration)
    const date = Date.parse(req.body.date)    

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date,
    });

    newExercise.save()
        .then(()=> res.json('Exercise added!'))
        .catch((e) =>{
            console.log('Error!');            
            return res.status(400).send(e.message)
        })
})
//FIND AN EXERCISE
router.route('/:id').get((req, res)=>{
    Exercise.findById(req.params.id)
    .then((exercise) => {
        if(!exercise)
        {
            console.log('Exercise not founded');            
            return res.status(401).send('Exercise not founded!')
        }
        console.log('');
        res.json(exercise)
    })
    .catch(err => res.status(400).json('Error: ', +err))
})
//DELETE AN EXERCISE
router.route('/:id').delete((req, res)=>{
    Exercise.findByIdAndDelete(req.params.id)
    .then(() => {
        console.log('Exercise deleted!');
        res.send('Exercise deleted!')
    })
    .catch(err => res.status(400).json('Error: ', +err))
})
//UPDATE AN EXERCISE
router.route('/update/:id').post((req, res)=>{
    Exercise.findByIdAndUpdate(req.params.id)
    .then((exercise)=>{
        exercise.username = req.body.username
        exercise.description = req.body.description
        exercise.duration = Number(req.body.duration)
        exercise.date = Date.parse(req.body.date)

        exercise.save()
            .then(()=> {res.
                console.log('Exercise updated');                
                json('Exercise updated!')
            })
            .catch((e)=>{
                console.log('Erro updating exercise!!! ', + e);
                return res.status(400).send(e.message)
            })
    })
})


module.exports = router