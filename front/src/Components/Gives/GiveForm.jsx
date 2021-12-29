import React from 'react';
import {useDispatch} from "react-redux";
import * as yup from "yup";
import {Formik} from "formik";
import MaskedInput from 'react-text-mask'

const GiveForm = (props) => {
    const dispatch = useDispatch();

    const onSubmit = (e, values) => {
        e.preventDefault()
        console.log(values)
    }

    return (
        <Formik
            initialValues={props.editReader ? props.editReader : initialValues}
            validationSchema={validationSchema}
            validateOnBlur
            validateOnChange={false}
            onSubmit={onSubmit}
        >
            {(formik) => {
                return (
                    <form className="form" onSubmit={e => onSubmit(e, formik.values)}>
                        <label>Имя читателя
                            <input type="text"
                                   placeholder="Введите имя..."
                                   className="form__input"
                                   name="firstName"
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}
                                   value={formik.values.firstName}
                            />
                        </label>
                        {formik.errors.firstName && formik.touched.firstName &&
                            <p className="form__error-text">{formik.errors.firstName}</p>}

                        <label>Фамилия читателя
                            <input type="text"
                                   placeholder="Введите фамилию..."
                                   className="form__input"
                                   name="lastName"
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}
                                   value={formik.values.lastName}/>
                        </label>
                        {formik.errors.lastName && formik.touched.lastName &&
                            <p className="form__error-text">{formik.errors.lastName}</p>}

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


const validationSchema = yup.object().shape({
    firstName: yup.string().required('Это обязательное поле'),
    lastName: yup.string().required('Это обязательное поле'),
    tel: yup.string().required('Это обязательное поле')
})

const initialValues = {
    firstName: '',
    lastName: '',
    tel: '',
}