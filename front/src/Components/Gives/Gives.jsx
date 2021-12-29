import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import ReaderForm from "../Readers/ReaderForm";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {getGives} from "../../redux/thunkGiveAction";

const Gives = () => {
    const dispatch = useDispatch();
    const [lookForm, setLookForm] = useState(false);
    const gives = useSelector(state => state.gives.gives)
    console.log(gives)
    const error = useSelector(state => state.error.error);

    const handleOpenForm = () => {
        setLookForm(prev => !prev)
    }

    useEffect(() => {
        dispatch(getGives())
    }, [])

    return (
        <div>
            {error ? <div className="main__error main__error_active">{error}</div> : null}
            <button className="button"
                    onClick={handleOpenForm}
            >{lookForm ? 'Отменить' : 'Создать выдачу'}</button>
            {lookForm ?
                <ReaderForm/>
                : null}

            <table className="table">
                <thead>
                <tr>
                    <th>Название книги</th>
                    <th>Имя читателя</th>
                    <th>Дата выдачи</th>
                    <th>Необходимо вернуть</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {gives.map(give => {
                    return <tr key={give._id}>
                        <td>{give.book}</td>
                        <td>{give.reader}</td>
                        <td>{give.dateGive}</td>
                        <td>{give.dateReturn}</td>
                        <td>
                            <DeleteOutlined onClick={() => {}}/>
                            <EditOutlined onClick={() => {}}/>
                        </td>
                    </tr>
                })}
                </tbody>
            </table>
        </div>
    );
};

export default Gives;