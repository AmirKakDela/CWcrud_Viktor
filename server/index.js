const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

const bookRouter = require('./routes/book.route');
const readerRouter = require('./routes/reader.route');

app.use(cors())
app.use(express.json({ extended: true })); // подключаем json распознование
app.use('/api/books', bookRouter);
app.use('/api/readers', readerRouter);

async function start() {
    try {
        await mongoose.connect('mongodb+srv://admin:admin@cluster0.maiq4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        })
    } catch (error) {
        console.error(error)
    }
}

start();
