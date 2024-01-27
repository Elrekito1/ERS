const express = require('express');
const router = express.Router();
const AboutModel = require('../models/aboutModel');
const cors = require('cors'); // Importe o CORS

// Adicione o middleware CORS para as rotas de /about
router.use(cors());

// GET all about 
router.get('/about', async (req, res)=>{
    try{
        const about = await AboutModel.find();
        res.json({success: true, data: about});
    } catch (err) {
        console.error(err);
        res.status(500).json({success:false, error: err.message})
    }
})

// GET one about by ID
router.get('/about/:id', async (req, res)=>{
    try{
        const aboutID = await AboutModel.findById(req.params.id);
        if(!aboutID){
            return res.status(404).json({success:false, error:'About not found' })
        }
        res.json({success: true, data: aboutID})
    } catch (err){
        console.error(err);
        res.status(500).json({success:false, error: err.message})
    }
});

// POST create new about
router.post('/about', async (req, res)=>{
    try{
        const newAbout = await AboutModel.create(req.body);
        res.status(201).json({success: true, data: newAbout})
    } catch(err){
        console.error(err);
        res.status(500).json({success: false, error: err.message})
    }
});

// PUT update about by ID
router.put('/about/:id', async (req, res)=>{
    try{
        const updateAbout = await AboutModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(!updateAbout){
            return res.status(404).json({success:false, error: 'About not found'})
        }
        res.json({success: true, data: updateAbout})
    } catch (err){
        console.error(err);
        res.status(500).json({success: false, error: err.message})
    }
});

// DELETE about by ID
router.delete('/about/:id', async (req, res)=>{
    try{
        const deleteAbout = await AboutModel.findByIdAndDelete(req.params.id);
        if(!deleteAbout){
            return res.status(404).json({success:false, error:'About not found'})
        }
        res.json({success: true, data: deleteAbout})    
    } catch(err){
        console.error(err);
        res.status(500).json({success: false, error: err.message})
    }
});

// DELETE all about
router.delete('/about', async (req, res) => {
    try {
        const deleteAll = await AboutModel.deleteMany({});
        res.json({ success: true, data: deleteAll });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});


module.exports = router;
