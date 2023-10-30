const express = require("express");

const bodyParser = require("body-parser");

const fs = require("fs");

const app = express();

const port = 3000;

app.use(bodyParser.json());

const booksData = fs.readFileSync("books.json");

const books = JSON.parse(booksData);

app.get("/books", (req, res) => {
  res.json(books);
});

app.post("/books", (req, res) => {
  const newBook = req.body;

  books.push(newBook);

  fs.writeFileSync("books.json", JSON.stringify(books, null, 2));
  res.status(201).json(newBook);
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const updatedBook = req.body;

  if (bookId >= 0 && bookId < books.length) {
    books[bookId] = updatedBook;
    fs.writeFileSync("books.json", JSON.stringify(books, null, 2));
  } else {
    res.status(404).json({ error: "Índice inválido." });
  }
  res.json(books);
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;

  if (bookId >= 0 && bookId < books.length) {
    const removedBook = books.splice(bookId, 1)[0];
    res.json(removedBook)
    fs.writeFileSync("books.json", JSON.stringify(books, null, 2));
    
  } else {
    res.status(404).json({error:"Libro no encontrado"});
    res.json(books);
  }
    
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
