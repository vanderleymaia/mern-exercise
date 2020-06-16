const router = require('express').Router()
let User = require('../models/user.model')


//GET ALL USERS
router.route('/').get((req, res) =>{
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ', + err))
})
//ADD A USER
router.route('/add').post((req, res) => 
{
    const username = req.body.username
    const newUser = new User({username})

    newUser.save()
        .then(()=>
        {
            res.json('User added')
        }).catch((e)=>{
            console.log('Error, user not added');            
            return res.status(400).send(e.message)
        })
})
//FIND A USER
router.route('/:id').get( async(req, res) =>{
    try
    {
        const user = await User.findById(req.params.id)
        console.log('User founded assyncronlsy!');    
        res.send(user)
    }
    catch(e)
    {
        console.log('user not founded!')
        return res.status(404).json(e.message)
    }

})

// router.route('/:id').get((req, res) =>{
//     User.findById(req.params.id)
//         .then((user) =>{
//             res.send(user)
//             console.log('User founded!');
            
//         }).catch((e) =>
//         {
//             console.log('Error user not founded!');
//             res.status(404).send(e.message)
//         })
// })

//DELETE A USER
router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(()=>{
            res.send('User deleted')
            console.log('User deleted');            
        }).catch((e)=>{
            console.log('User not deleted!');
            res.status(400).send(e.message)
        })        
})
//UPDATE A USER
router.route('/update/:id').post((req, res) => {
    User.findByIdAndUpdate(req.params.id)
        .then((user) => {
            user.username = req.body.username

            user.save()
                .then(() => {
                    console.log('User updated');
                    res.send('User updated')
                }).catch((e) => {
                    console.log('Error updating user!');
                    return res.status(400).send(e.message)
                })
        })
})





module.exports = router