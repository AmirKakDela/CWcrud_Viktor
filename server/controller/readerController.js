const Reader = require("../models/Reader.js");
const Gives = require("../models/Gives.js");

class bookController {
    async getAllReaders(req, res) {
        try {
            const reader = await Reader.find();
            if (!reader) return res.json([])
            return res.json(reader);
        } catch (e) {
            console.log('Ошибка сервера при getAllReaders', e);
            return res.send({message: "Ошибка сервера получении все читателей."});
        }
    }

    async createReader(req, res) {
        try {
            const candidateReader = await Reader.findOne({firstName: req.body.firstName, lastName: req.body.lastName})
            console.log('candidateReader', candidateReader)
            if (candidateReader) return res.status(412).json({message: "Такой читатель уже существует"});
            const reader = new Reader(req.body);
            reader.save();
            return res.json(reader);
        } catch (e) {
            console.log('Ошибка сервера при createReader', e);
            return res.send({message: "Ошибка сервера при создании читателя."});
        }
    }

    async deleteReader(req, res) {
        try {
            const deletedReader = await Reader.findByIdAndDelete(req.params.id);
            if (!deletedReader) return res.status(412).json({message: "Такого читателя не существует"});

            const gives = await Gives.find({reader: deletedReader._id })
            // console.log(gives)

            for(let i = 0; i < gives.length; i++) {
                console.log(gives[i])
                await Gives.findByIdAndDelete(gives[i]._id)
            }

            return res.json({message: 'Читатель успешно удален'});
        } catch (e) {
            console.log('Ошибка сервера при deleteReader', e);
            return res.send({message: "Ошибка сервера при удалении читателя."});
        }
    }

    async updateReader(req, res) {
        try {
            const updatedReader = await Reader.findByIdAndUpdate({ _id: req.params.id }, req.body)
            return res.status(200).json({ message: 'Обновлено успешно', reader: updatedReader });
        } catch (e) {
            console.log('Ошибка сервера при updateReader', e);
            return res.send({message: "Ошибка сервера при обновлении читателя."});
        }
    }
}

module.exports = new bookController();