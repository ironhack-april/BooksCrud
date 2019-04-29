const express = require('express');
const router  = express.Router();
const Author = require('../models/author')


router.get('/authors', (req,res,next)=>{
  Author.find().then(authorsFromDb=>{ //Found the authorsFromDb 
    res.render('authors', { authorsToHBS: authorsFromDb })
  })
})


//http://localhost:3000/author_detail/5cc7433733493add41ad77ef
router.get('/author_detail/:id', (req,res,next)=>{
  //Find our author in the database 
  Author.findById(req.params.id).then(authorFromDb=>{ //Got our author
      res.render('author_detail', {authorToHBS:authorFromDb})
  })
})


router.get('/authors/add', (req, res, next) => {
  res.render("user-add")
});

router.post('/authors/add', (req, res, next) => {
  const { name, lastName, nationality, birthday, pictureUrl } = req.body;
  const newAuthor = new Author({ name, lastName, nationality, birthday, pictureUrl})
  newAuthor.save()  //saving a new author
  .then((book) => {
    res.redirect('/books')
  })
  .catch((error) => {
    console.log(error)
  })
});

module.exports = router;
