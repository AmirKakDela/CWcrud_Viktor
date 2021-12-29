const Book = require("../models/Book.js");
const Gives = require("../models/Gives.js");

class bookController {

    async getAllBooks(req, res) {
        try {
            const books = await Book.find();
            if (!books) return res.json([])
            return res.json(books);
        } catch (e) {
            console.log('Ошибка сервера при getAllBooks', e);
            return res.send({message: "Ошибка сервера при нахождении всех книг."});
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
            console.log('Ошибка сервера при createBook', e);
            return res.send({message: "Ошибка сервера при создании книги."});
        }
    }

    async deleteBook(req, res) {
        try {
            const deletedBook = await Book.findByIdAndDelete(req.params.id);
            if (!deletedBook) return res.status(412).json({message: "Такой книги не существует"});

            const gives = await Gives.find({book: deletedBook._id })

            for(let i = 0; i < gives.length; i++) {
                console.log(gives[i])
                await Gives.findByIdAndDelete(gives[i]._id)
            }

            return res.json({message: 'Книга успешно удалена'});
        } catch (e) {
            console.log('Ошибка сервера при deleteBook', e);
            return res.send({message: "Ошибка сервера при удалении книги."});
        }
    }

    async updateBook(req, res) {
        try {
            const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body);
            if (!updatedBook) return res.status(412).json({message: "Такой книги не существует"});
            console.log(updatedBook)
            return res.json({message: 'Книга успешно обновлена', updatedBook: req.body});
        } catch (e) {
            console.log('Ошибка сервера при updateBook', e);
            return res.send({message: "Ошибка сервера при обновлении книги."});
        }
    }
}

module.exports = new bookController();