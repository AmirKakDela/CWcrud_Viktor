const Reader = require("../models/Reader.js");

class bookController {
    async getAllReaders(req, res) {
        try {
            const reader = await Reader.find();
            if (!reader) return res.json([])
            return res.json(reader);
        } catch (e) {
            return res.send({message: "Ошибка сервера при создании читателя."});
            console.log('Ошибка сервера при getAllReaders', e);
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
            return res.send({message: "Ошибка сервера при создании читателя."});
            console.log('Ошибка сервера при createReader', e);
        }
    }

    async deleteReader(req, res) {
        try {
            const deletedReader = await Reader.findByIdAndDelete(req.params.id);
            if (!deletedReader) return res.status(412).json({message: "Такого читателя не существует"});
            return res.json({message: 'Читатель успешно удален'});
        } catch (e) {
            return res.send({message: "Ошибка сервера при удалении читателя."});
            console.log('Ошибка сервера при deleteReader', e);
        }
    }

    async updateReader(req, res) {
        try {
            const updatedReader = await Reader.findByIdAndUpdate({ _id: req.params.id }, req.body)
            return res.status(200).json({ message: 'Обновлено успешно', reader: updatedReader });
        } catch (e) {
            return res.send({message: "Ошибка сервера при обновлении читателя."});
            console.log('Ошибка сервера при updateReader', e);
        }
    }
}

module.exports = new bookController();