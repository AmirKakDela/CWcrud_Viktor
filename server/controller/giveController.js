const Gives = require("../models/Gives.js");

class giveController {
    async getAllGives(req, res) {
        try {
            const reader = await Gives.find();
            if (!reader) return res.json([])
            return res.json(reader);
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