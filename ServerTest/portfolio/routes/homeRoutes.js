const express = require('express')
const router = express.Router()
const HomeModel = require('../models/homeModel')
const cors = require('cors')

router.use(cors());

// GET all 
router.get('/', async (req, res)=>{
try{
  const home = await HomeModel.find();
  res.json({sucess:true, data: home})
}catch (err){
  console.error(err);
  res.json(500)({sucess:false, error: err.message})
}
})

// GET one by ID
router.get('/:id', async (req, res) =>{
  try{
    const homeID = await HomeModel.findById(req.params.id)
    if(!homeID){
      return res.status(404).json({sucess:false, error:'Home not found'})
    }
    res.json({sucess:true, data: homeID})
  }catch (err) {
    console.error(err);
    res.status(500).json({sucess:false, error:err.message})
  }
})

// POST create new home 
router.post('/', async (req, res)=>{
  try{
    const newHome = await HomeModel.create(req.body);
    res.status(201).json({sucess: true, data: newHome})
  }catch(err){
    console.error(err);
    res.status(500).json({sucess:false, error: err,nessage})
  }
})

// PUT update home by ID
router.put('/:id', async (req, res)=>{
  try{
    const updateHome = await HomeModel.findByIdAndUpdate(req.params.id, req.body, {new:true})
    if(!updateHome){
      return res.status(404).json({sucess:false, error: 'Home not found'})
    }
    res.json({sucess:true, data: updateHome})
  } catch(err){
    console.error(err);
    res.status(500).json({sucess:false, error: err.message})
  }
})

// DELETE home by ID
router.delete('/:id', async (req, res)=>{
  try{
  const deleteHome = await HomeModel.findByIdAndDelete(req.params.id);
  if(!deleteHome){
    return res.status(404).json({sucess:false, error:"Home not found"})
  }
  res.status({sucess:true, data: deleteHome})
} catch(err){
  console.error(err);
  res.status(500).json({sucess: false, error: err.message})
}
});

// DELETE all home
router.delete('/', async (req, res)=>{
  try{
    const deleteAll = await HomeModel.deleteMany({});
    res.json({sucess: true, data: deleteAll})
  } catch(err){
    console.error(err);
    res.status(500).json({sucess: false, error: err.message})
  }
})

module.exports = router