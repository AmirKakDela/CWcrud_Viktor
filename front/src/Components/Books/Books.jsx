import React, {useEffect, useState} from 'react';
import './books.scss'
import {useDispatch, useSelector} from "react-redux";
import {getBooks} from "../../redux/thunkAction";
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';


const Books = () => {
    const dispatch = useDispatch();
    const books = useSelector(state => state.books.books)
    const [lookForm, setLookForm] = useState(false);

    useEffect(() => {
        dispatch(getBooks())
    }, [])


    return (
        <div>
            <button className="button"
                    onClick={() => setLookForm(prev => !prev)}
            >{lookForm ? 'Отменить' : 'Добавить книгу'}</button>
            { lookForm ? <BookForm/> : null}
            <table className="table">
                <thead>
                <tr>
                    <th>Название</th>
                    <th>Автор</th>
                    <th>Год выпуск</th>
                    <th>Количество</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {books.map(book => {
                    return <tr key={book._id}>
                        <td>{book.name}</td>
                        <td>{book.author}</td>
                        <td>{book.year}</td>
                        <td>{book.count}</td>
                        <td>
                            <span className="action"><DeleteOutlined/></span>
                            <span className="action"><EditOutlined/></span>
                        </td>
                    </tr>
                })}
                </tbody>
            </table>
        </div>
    );
};

export default Books;


const BookForm = () => {


    return <form className="form">
        <label htmlFor="name">Название книги
            <input type="text" id="name" placeholder="Введите название книги..." className="form__input"/>
        </label>

        <label> Автор
            <input type="text" placeholder="Введите автора..." className="form__input"/>
        </label>

        <label>Год выпуска
            <input type="number" placeholder="Введите год выпуска..." className="form__input"/>
        </label>

        <label> Количество книг
            <input type="number" placeholder="Введите количество книг..." className="form__input"/>
        </label>

        <button className="button">Сохранить</button>
    </form>
}