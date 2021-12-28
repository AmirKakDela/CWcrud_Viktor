const Book = require("../models/Book.js");

class bookController {

    async getAllBooks(req, res) {
        try {
            const books = await Book.find();
            if (!books) return res.json([])
            return res.json(books);
        } catch (e) {
            return res.send({message: "Ошибка сервера при нахождении всех книг."});
            console.log('Ошибка сервера при getAllBooks', e);
        }
    }

    async createBook(req, res) {
        try {
            const candidateBook = await Book.findOne({name: req.body.name})
            if (candidateBook) return res.status(412).json({message: "Такая книга уже существует"});
            const book = new Book(req.body);
            book.save();
            console.log(book)
            return res.json(book);
        } catch (e) {
            return res.send({message: "Ошибка сервера при создании книги."});
            console.log('Ошибка сервера при createBook', e);
        }
    }

    async deleteBook(req, res) {
        try {
            const deletedBook = await Book.findByIdAndDelete(req.params.id);
            if (!deletedBook) return res.status(412).json({message: "Такой книги не существует"});
            return res.json({message: 'Книга успешно удалена'});
        } catch (e) {
            return res.send({message: "Ошибка сервера при удалении книги."});
            console.log('Ошибка сервера при deleteBook', e);
        }
    }

    async updateBook(req, res) {
        try {
            const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body);
            if (!updatedBook) return res.status(412).json({message: "Такой книги не существует"});
            console.log(updatedBook)
            return res.json({message: 'Книга успешно обновлена', updatedBook: req.body});
        } catch (e) {
            return res.send({message: "Ошибка сервера при обновлении книги."});
            console.log('Ошибка сервера при updateBook', e);
        }
    }
}

module.exports = new bookController();