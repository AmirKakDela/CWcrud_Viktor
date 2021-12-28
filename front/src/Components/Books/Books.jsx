import React, {useCallback, useEffect, useState} from 'react';
import './books.scss'
import {useDispatch, useSelector} from "react-redux";
import {createBook, deleteBook, getBooks} from "../../redux/thunkAction";
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {Formik} from 'formik';
import * as yup from "yup";


const Books = () => {
    const dispatch = useDispatch();
    const books = useSelector(state => state.books.books)
    const [bookForEdit, setBookForEdit] = useState({})
    const [lookForm, setLookForm] = useState(false);

    const handleEditBook = (id) => {
        setLookForm(true)
        const book = books.find(book => book._id === id)
        setBookForEdit(book)
    }

    const handleCloseForm = () => {
        setLookForm(false)
    }

    const handleDeleteBook =  useCallback((id) => {
        dispatch(deleteBook(id))
    }, [])

    useEffect(() => {
        dispatch(getBooks())
    }, [])


    return (
        <div>
            <button className="button"
                    onClick={() => setLookForm(prev => !prev)}
            >{lookForm ? 'Отменить' : 'Добавить книгу'}</button>
            {lookForm ?
                <BookForm handleCloseForm={handleCloseForm}
                          bookForEdit={bookForEdit}
                />
                : null}

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
                            <DeleteOutlined onClick={() => handleDeleteBook(book._id)}/>
                            <EditOutlined onClick={() => handleEditBook(book._id)}/>
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
    const dispatch = useDispatch();
    const validationSchema = yup.object().shape({
        name: yup.string().required('Это обязательное поле'),
        author: yup.string().required('Это обязательное поле'),
        year: yup.number().required('Это обязательное поле')
            .positive('Год выпуска не может быть отрицательным')
            .integer().max(2021, 'Год выпуска не может быть больше, чем нынешний год'),
        count: yup.number().required('Это обязательное поле').positive('Количество не может быть отрицательным').integer()
    })

    console.log(props.bookForEdit)

    const initialValues = props.bookForEdit ? props.bookForEdit : {
        name: '',
        author: '',
        year: '',
        count: '',
    }

    const onSubmit = (e, values) => {
        e.preventDefault()
        if (values.name && values.author && values.year) {
            dispatch(createBook(values))
            props.handleCloseForm();
        }
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
                        {formik.errors.name && formik.touched.name &&
                            <p className="form__error-text">{formik.errors.name}</p>}

                        <label> Автор
                            <input type="text"
                                   placeholder="Введите автора..."
                                   className="form__input"
                                   name="author"
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}
                                   value={formik.values.author}/>
                        </label>
                        {formik.errors.author && formik.touched.author &&
                            <p className="form__error-text">{formik.errors.author}</p>}

                        <label>Год выпуска
                            <input type="number"
                                   placeholder="Введите год выпуска..."
                                   className="form__input"
                                   name="year"
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}
                                   value={formik.values.year}/>
                        </label>
                        {formik.errors.year && formik.touched.year &&
                            <p className="form__error-text">{formik.errors.year}</p>}

                        <label> Количество книг
                            <input type="number"
                                   placeholder="Введите количество книг..."
                                   className="form__input"
                                   name="count"
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}
                                   value={formik.values.count}/>
                        </label>
                        {formik.errors.count && formik.touched.count &&
                            <p className="form__error-text">{formik.errors.count}</p>}

                        <button className="button"
                                type="submit"
                                disabled={!formik.isValid}
                        >Сохранить
                        </button>
                    </form>
                )
            }}
        </Formik>
    )
}