import React, {useEffect, useState} from 'react';
import './books.scss'
import {useDispatch, useSelector} from "react-redux";
import {getBooks} from "../../redux/thunkAction";
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {Formik} from 'formik';
import * as yup from "yup";


const Books = () => {
    const dispatch = useDispatch();
    const books = useSelector(state => state.books.books)
    const [lookForm, setLookForm] = useState(false);
    const handleEditBook = (id) => {
        setLookForm(true)
        console.log(id)
    }

    useEffect(() => {
        dispatch(getBooks())
    }, [])


    return (
        <div>
            <button className="button"
                    onClick={() => setLookForm(prev => !prev)}
            >{lookForm ? 'Отменить' : 'Добавить книгу'}</button>
            {lookForm ? <BookForm/> : null}
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
                    return <tr key={book._id} onClick={() => handleEditBook(book._id)}>
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


const BookForm = (props) => {
    const validationSchema = yup.object().shape({
        name: yup.string().required(),
        author: yup.string().required(),
        year: yup.number().required().positive().integer().max(2021),
        count: yup.number().required().positive().integer()
    })

    const initialValues = props.editBook ? props.editBook : {
        name: '',
        author: '',
        year: '',
        count: '',
    }

    const onSubmit = (e, values) => {
        e.preventDefault()
        console.log(values)
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            validateOnBlur
            validateOnChange={false}
            onSubmit={onSubmit}
        >
            {(formik) => {
                console.log(formik)
                return (
                <form className="form" onSubmit={e => onSubmit(e, formik.values)}>
                    <label>Название книги
                        <input type="text"
                               placeholder="Введите название книги..."
                               className="form__input"
                               name="name"
                               onChange={formik.handleChange}
                               onBlur={formik.handleBlur}
                               value={formik.values.name}
                        />
                    </label>

                    <label> Автор
                        <input type="text"
                               placeholder="Введите автора..."
                               className="form__input"
                               name="author"
                               onChange={formik.handleChange}
                               onBlur={formik.handleBlur}
                               value={formik.values.author}/>
                    </label>

                    <label>Год выпуска
                        <input type="number"
                               placeholder="Введите год выпуска..."
                               className="form__input"
                               name="year"
                               onChange={formik.handleChange}
                               onBlur={formik.handleBlur}
                               value={formik.values.year}/>
                    </label>

                    <label> Количество книг
                        <input type="number"
                               placeholder="Введите количество книг..."
                               className="form__input"
                               name="count"
                               onChange={formik.handleChange}
                               onBlur={formik.handleBlur}
                               value={formik.values.count}/>
                    </label>

                    <button className="button"
                            type="submit"
                            disabled={!formik.isValid}
                    >Сохранить</button>
                </form>
            )}}
        </Formik>
    )
}