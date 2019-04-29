const express = require('express');
const router  = express.Router();
const Book = require('../models/book')
/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/books/add', (req, res, next) => {
  res.render("book-add");
})



router.get('/books', (req,res,next) =>{  //triggered when going to books page 
  Book.find().then( booksFromDb =>{  //find all books in the database 
    res.render('books', { booksInHBS : booksFromDb }) //send all the books to the books.hbs file 
  })
})

//"/books/edit?book_id={{_id}}
router.post('/books/edit', (req,res,next)=>{
  let id = req.query.book_id;  //Id of book 
  let { title, description, author, rating } = req.body //stuff we changed 
  
  Book.findByIdAndUpdate(id, { title, description, author, rating })
    .then(updatedBook=>{
      res.redirect('/books')
  })

})

router.get('/books/edit', (req, res, next) => {
  console.log(' we need the id', req.query.book_id)
  Book.findById(req.query.book_id).then(thisIsOurBookFromDB=> {
    res.render('book-edit', {book: thisIsOurBookFromDB})
  })

});


router.post('/books/add', (req, res, next) => {
  const { title, author, description, rating } = req.body; //stuff that i wrote 
  const newBook = new Book({ title, author, description, rating});
  newBook.save() //Call to our databse to save stuff 
  .then((book) => {
    console.log('saved!!!')
    res.redirect('/books'); //How do we make a new route?
  })
  .catch((error) => {
    console.log(error);
  })
});





router.get('/books/delete', (req,res,next) => {
  console.log('did i hit this route?????????????????',req.query)
  Book.findByIdAndDelete(req.query.book_id).then(deletedThing=> {
    res.redirect('/books')
  })
})

module.exports = router;
