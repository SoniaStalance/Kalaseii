const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const {check, validationResult} = require('express-validator');
const request = require('request');
const config = require('config');

/*
GET api/profile/me
get current user's profile 
private
*/
router.get('/me', auth, async (req,res)=>{
    try{
        
        const profile = await Profile.findOne({user: req.user.id}).populate('user', ['name', 'avatar']);
        
        if(!profile){
            
            return res.status(400).json({msg: 'There is no profile for this user'});
        }
        
        res.json(profile);
    }catch(err){
        
        console.log(err.msg);
        res.status(500).send('Server error!');
    }
});

/*
POST api/profile
create or update a user profile 
private
*/
router.post('/', [auth, [
    check('status','status is required').not().isEmpty(),
    check('skills','skills is required').not().isEmpty()
]], async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    
    const {
        company,
        website,
        email,
        phone,
        location,
        bio,
        status,
        skills,
        facebook,
        youtube,
        twitter,
        instagram,
        linkedin
    } = req.body;

    //build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if(email) profileFields.email = email;
    if(phone) profileFields.phone=phone;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;

    if(skills){
        profileFields.skills = skills.split(',').map(skill => skill.trim());
    }
    //build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (facebook) profileFields.social.facebook = facebook;
    if (twitter) profileFields.social.twitter = twitter;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;

    try{
        let profile = await Profile.findOne({user: req.user.id});
        if(profile){
            //update
            profile = await Profile.findOneAndUpdate({user: req.user.id}, {$set: profileFields}, {new: true});
            return res.json(profile);
        }

        //else create a new profile
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);

    }catch(err){
        console.log(err.msg);
        res.status(500).send('Server error');
    }
});

/*
GET api/profile
get all profiles 
public
*/

router.get('/', async(req, res)=>{
    try{
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    }catch(err){
        console.log(err.msg);
        res.status(500).send('Server Error');
    }
});

/*
GET api/profile/user/:user_id
get profile by user_id
public
*/

router.get('/user/:user_id', async(req, res)=>{
    try{
        const profile = await Profile.findOne({ user: req.params.user_id}).populate('user', ['name', 'avatar']);
        if(!profile){
            return res.status(400).json({msg: 'Profile not found'})
        }
        res.json(profile);
    }catch(err){
        if(err.kind == 'ObjectId'){
            return res.status(400).json({msg: 'PROFILE NOT FOUND'})
        }
        else{
        console.log(err.msg);
        res.status(500).send('Server Error');
        }
    }
});

/*
DELETE api/profile
DELETE profile, user, posts
private
*/

router.delete('/', auth, async(req, res)=>{
    try{
        //Remove Profile
        await Profile.findOneAndRemove({user: req.user.id});
        //Remove u=User
        await User.findOneAndRemove({_id: req.user.id});
        res.json({msg: 'User Removed'})
    }catch(err){
        console.log(err.msg);
        res.status(500).send('Server Error');
    }
});

/*
PUT api/profile/experience
add profile experience
private
*/
router.put('/experience', [ auth, [
    check('title','Title is required').not().isEmpty(),
    check('company','Company is required').not().isEmpty(),
    check('from','From date is required').not().isEmpty()
] ], 
async (req, res)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
         return res.status(400).json({errors: errors.array()});
    }

    const{
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;

    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }

    try{
        const profile = await Profile.findOne({user: req.user.id});
        //push will push at the end of the array
        //unshift will push to the beginning of the array

        profile.experience.unshift(newExp);
        await profile.save();

        res.json(profile);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

/*
DELETE experience by exp_id
private
*/
router.delete('/experience/:exp_id', auth, async (req, res)=>{
    try {
        const profile = await Profile.findOne({user: req.user.id});

        //get remove experience
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);

        profile.experience.splice(removeIndex, 1);
        await profile.save();

        res.json(profile);

    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server error');
    }
})

/*
PUT api/profile/project
add profile project
private
*/
router.put('/project', [ auth, [
    check('url1','URL is required').not().isEmpty(),
    check('location','Location is required').not().isEmpty(),
    check('title','Title is required').not().isEmpty(),
    check('proj_date','Date is required').not().isEmpty()
] ], 
async (req, res)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
         return res.status(400).json({errors: errors.array()});
    }

    const{
        url1,
        url2,
        location,
        title,
        proj_date,
        description
    } = req.body;

    const newPro = {
        url1,
        location,
        title,
        proj_date,
        description
    }

    if(url2) 
        newPro.url2 = url2;
    else
        newPro.url2 = null;

    try{
        const profile = await Profile.findOne({user: req.user.id});
        //push will push at the end of the array
        //unshift will push to the beginning of the array

        profile.project.unshift(newPro);
        await profile.save();

        res.json(profile);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

/*
DELETE project by pro_id
private
*/
router.delete('/project/:pro_id', auth, async (req, res)=>{
    try {
        const profile = await Profile.findOne({user: req.user.id});

        //get remove project
        const removeIndex = profile.project.map(item => item.id).indexOf(req.params.pro_id);

        profile.project.splice(removeIndex, 1);
        await profile.save();

        res.json(profile);

    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server error');
    }
})


module.exports = router;