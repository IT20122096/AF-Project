const express = require ('express');
let Topic = require("../models/topics");
let Criteria = require('../models/criterias');
let Group = require('../models/groups');
let Marks = require('../models/marks')
const router = express.Router();

//get all topics

router.get('/topics', async (req,res) =>{
    Topic.find().exec((err, topics) => {
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingTopics:topics   
                    
        });
        
    });
});
//get a specific topic

router.get('/topic/:id',(req,res) =>{
    

    let topicId = req.params.id;

    Topic.findById(topicId,(err, topic) => {
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            topic,
        });
    });
});

//update posts

router.put('/topic/update/:id',(req,res) => {
    Topic.findByIdAndUpdate(
        req.params.id,{$set:req.body},
        (err,topic)=>{
            if(err){
                return res.status(400).json({error:err});
            }
            return res.status(200).json({
                success:"Updated Succesfully"
            });
        
        }
    );
});

//get all ResearchGroups

router.get('/researchgroups', async (req,res) =>{
    Group.find().exec((err, researchgroups) => {
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingResearchgroups:researchgroups           
        });
    });
});

//get a specific ResearchGroup

router.get('/researchgroup/:id',(req,res) =>{
    

    let researchgroupId = req.params.id;

    Group.findById(researchgroupId,(err, researchgroup) => {
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            researchgroup,
        });
    });
});

//get marks criterias

router.get('/criterias', async (req,res) =>{
    
    Criteria.find({markingRubrikId:"62800237f9029c4e49caff1f"}).exec((err, criterias) => {
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingCriterias:criterias,           
        });
    });
});

//save marks

router.post('/criterias/save',(req, res) => {
    let newMark = new Marks(req.body);

    newMark.save((err) => {
        if(err){
            return res.status(400).json({
                error:err
            });
        }
            return res.status(200).json({
                success:"Marks saved successfully"
            });
        });
    
});

//generate report
router.get('/report', async (req,res) =>{
    Marks.find().exec((err, marks) => {
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingMarks:marks   
                    
        });
        
    });
});

module.exports = router;
