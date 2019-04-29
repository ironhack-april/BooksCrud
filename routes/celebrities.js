const express = require('express');
const router  = express.Router();
//const Celeb = require('../models/celeb')

router.get('/famous', (req,res,next)=>{
  res.send('famous celebrities')
})


module.exports = router;
