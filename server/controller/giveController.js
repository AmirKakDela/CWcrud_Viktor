const Gives = require("../models/Gives.js");
const Book = require("../models/Book.js");
const Reader = require("../models/Reader.js");

class giveController {
    async getAllGives(req, res) {
        try {
            const gives = await Gives.find();
            if (!gives) return res.json([])
            const booksIds = []
            const readersIds = []

            for (let i = 0; i < gives.length; i++) {
                booksIds[i] = gives[i].book
                readersIds[i] = gives[i].reader
            }

            for (let i = 0; i < gives.length; i++) {
                if (booksIds.includes(gives[i].book)) {
                    const book = await Book.findById(gives[i].book)
                    gives[i].book = book
                }
                if (readersIds.includes(gives[i].reader)) {
                    const reader = await Reader.findById(gives[i].reader)
                    gives[i].reader = reader
                }
            }
            return res.json(gives);
        } catch (e) {
            console.log('Ошибка сервера при getAllGives', e);
            return res.send({message: "Ошибка сервера получении всех выдач."});
        }
    }

    async createGive(req, res) {
        try {
            const candidateGive = await Gives.findOne({book: req.body.book, reader: req.body.reader})
            if (candidateGive) return res.status(412).json({message: "Этому читателю уже была выдана данная книга"});

            const give = new Gives(req.body);
            give.save();

            const book = await Book.findById(give.book)
            console.log(book)
            if (book.count > 0) {
                book.count = book.count - 1
            } else {
                book.count = 0
            }
            console.log(book.count)

            book.save()


            console.log('give', give)
            return res.json(give);
        } catch (e) {
            return res.send({message: "Ошибка сервера при создании выдачи."});
            console.log('Ошибка сервера при createGive', e);
        }
    }


    async deleteGive(req, res) {
        try {
            const deletedGive = await Gives.findByIdAndDelete(req.params.id);
            if (!deletedGive) return res.status(412).json({message: "Такой выдачи не существует"});

            console.log(deletedGive)
            const book = await Book.findById(deletedGive.book)
            book.count = book.count + 1
            book.save()
            return res.json({message: 'Выдача успешно удалена'});
        } catch (e) {
            return res.send({message: "Ошибка сервера при удалении читателя."});
            console.log('Ошибка сервера при deleteReader', e);
        }
    }
}

module.exports = new giveController();