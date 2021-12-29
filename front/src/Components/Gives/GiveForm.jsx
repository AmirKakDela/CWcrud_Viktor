import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import * as yup from "yup";
import {Formik} from "formik";
import {getBooks} from "../../redux/thunkBookAction";
import {getReaders} from "../../redux/thunkReaderAction";

const GiveForm = (props) => {
    const dispatch = useDispatch();
    const readers = useSelector(state => state.readers.readers)
    const books = useSelector(state => state.books.books)

    const onSubmit = (e, values) => {
        e.preventDefault()
        console.log(values)
    }

    useEffect(() => {
        dispatch(getBooks())
        dispatch(getReaders())
    }, [])

    return (
        <Formik
            initialValues={props.editReader ? props.editReader : initialValues}
            // validationSchema={validationSchema}
            validateOnBlur
            validateOnChange={false}
            onSubmit={onSubmit}
        >
            {(formik) => {
                console.log(formik.values)
                return (
                    <form className="form" onSubmit={e => onSubmit(e, formik.values)}>
                        <label>Кому выдать книгу:
                            <select name="readerId"
                                    className="form__input"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.readerId}
                            >
                                <option value="" disabled>Выберите читателя</option>
                                {readers && readers.map(reader => {
                                    return (
                                        <option key={reader._id}
                                                value={reader._id}
                                                onChange={formik.handleChange}>{reader.firstName} {reader.lastName}</option>
                                    )
                                })}
                            </select>
                        </label>
                        {/*{formik.errors.firstName && formik.touched.firstName &&*/}
                        {/*    <p className="form__error-text">{formik.errors.firstName}</p>}*/}

                        <label>Какую книгу выбрал читатель:
                            <select name="bookId"
                                    className="form__input"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.bookId}
                            >
                                <option value="" disabled>Выберите книгу</option>
                                {books && books.map(book => {
                                    return (
                                        <option key={book._id}
                                                value={book._id}>{book.name}, ({book.author})</option>
                                    )
                                })}
                            </select>
                        </label>

                        <label>Дата выдачи
                            <input type="date"
                                   className="form__input"
                                   name="giveDate"
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}
                                   value={formik.values.giveDate}/>
                        </label>

                        <label>Дата сдачи
                            <input type="date"
                                   className="form__input"
                                   name="returnDate"
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}
                                   value={formik.values.returnDate}/>
                        </label>

                        {/*{formik.errors.lastName && formik.touched.lastName &&*/}
                        {/*    <p className="form__error-text">{formik.errors.lastName}</p>}*/}

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

export default GiveForm;


// const validationSchema = yup.object().shape({
//     firstName: yup.string().required('Это обязательное поле'),
//     lastName: yup.string().required('Это обязательное поле'),
//     tel: yup.string().required('Это обязательное поле')
// })

const initialValues = {
    bookId: '',
    readerId: '',
    giveDate: '',
    returnDate: '',
}