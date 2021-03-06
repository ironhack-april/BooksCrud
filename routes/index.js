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




//http://localhost:3000/book_detail/5cc7433733493add41ad77fb
router.get('/book_detail/:id', (req,res,next)=>{
  Book.findById(req.params.id).populate('author').then(book=>{
    res.render('book_detail', {book})
  })
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


router.get('/book/:id', (req, res, next) => {
  let bookId = req.params.id;
  if (!/^[0-9a-fA-F]{24}$/.test(bookId)) { 
    return res.status(404).render('not-found');
  }
  Book.findOne({'_id': bookId})
    .populate('author')
    .then(book => {
      if (!book) {
          return res.status(404).render('not-found');
      }
      res.render("book-detail", { book })
    })
    .catch(next)
});



router.get('/books/delete', (req,res,next) => {
  console.log('did i hit this route?????????????????',req.query)
  Book.findByIdAndDelete(req.query.book_id).then(deletedThing=> {
    res.redirect('/books')
  })
})

module.exports = router;
