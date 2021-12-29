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

            const books = await Book.find({_id: booksIds})
            const readers = await Reader.find({_id: readersIds})

            for(let i = 0; i < gives.length; i++) {
                if(gives[i].book === books[i]._id.valueOf()) {
                    gives[i].book = books[i]
                }
                if(gives[i].reader === readers[i]._id.valueOf()) {
                    gives[i].reader = readers[i]
                }
            }


            return res.json(gives);
        } catch (e) {
            return res.send({message: "Ошибка сервера получении всех выдач."});
            console.log('Ошибка сервера при getAllGives', e);
        }
    }

    async createGive(req, res) {
        try {
            const candidateGive = await Gives.findOne({book: req.body.book, lastName: req.body.reader})
            console.log('candidateGive', candidateGive)
            if (candidateGive) return res.status(412).json({message: "Этому читателю уже была выдана данная книга"});
            const reader = new Gives(req.body);
            reader.save();
            return res.json(reader);
        } catch (e) {
            return res.send({message: "Ошибка сервера при создании выдачи."});
            console.log('Ошибка сервера при createGive', e);
        }
    }

    //
    // async deleteReader(req, res) {
    //     try {
    //         const deletedReader = await Reader.findByIdAndDelete(req.params.id);
    //         if (!deletedReader) return res.status(412).json({message: "Такого читателя не существует"});
    //         return res.json({message: 'Читатель успешно удален'});
    //     } catch (e) {
    //         return res.send({message: "Ошибка сервера при удалении читателя."});
    //         console.log('Ошибка сервера при deleteReader', e);
    //     }
    // }
    //
    // async updateReader(req, res) {
    //     try {
    //         const updatedReader = await Reader.findByIdAndUpdate({ _id: req.params.id }, req.body)
    //         return res.status(200).json({ message: 'Обновлено успешно', reader: updatedReader });
    //     } catch (e) {
    //         return res.send({message: "Ошибка сервера при обновлении читателя."});
    //         console.log('Ошибка сервера при updateReader', e);
    //     }
    // }
}

module.exports = new giveController();