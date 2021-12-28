import React, {useEffect} from 'react';
import './books.scss'
import {useDispatch, useSelector} from "react-redux";
import {getBooks} from "../../redux/thunkAction";
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';


const Books = () => {
    const dispatch = useDispatch();
    const books = useSelector(state => state.books.books)
    console.log(books)

    useEffect(() => {
        dispatch(getBooks())
    }, [])
    return (
        <div>
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