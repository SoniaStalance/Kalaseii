const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

router.post('/',
[
    check('name','Name is required').not().isEmpty(),
    check('email','Enter vaild email').isEmail(),
    check('password','Min password length is 6').isLength({min: 6})
],
async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors: errors.array()})
    }

    const {name, email, password} = req.body;

    try{
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({errors:[{msg: 'User already exits!'}]});
        }

        const avatar = gravatar.url(email,{
            s:"200",
            r:"pg",
            d:"mm"
        });
    
        user = new User({
            name,
            email,
            avatar,
            password
        });
    
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        //return jsonwebtoken (due)
        res.send('User Registered');
    }catch(err){
        console.log(err.message);
        res.status(500).send('Server error');
    }
    
});

module.exports = router;