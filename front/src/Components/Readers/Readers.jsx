import React, {useEffect, useState} from 'react';
import ReaderForm from "../Readers/ReaderForm";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {deleteReader, getReaders} from "../../redux/thunkReaderAction";

const Readers = () => {
    const readers = useSelector(state => state.readers.readers)
    const dispatch = useDispatch()
    const [lookForm, setLookForm] = useState(false);

    const handleOpenForm = () => {
        setLookForm(prev => !prev)
    }

    const handleDeleteReader = (id) => {
        console.log(id)
        dispatch(deleteReader(id))
    }


    useEffect(() => {
        dispatch(getReaders())
    }, [])


    return (
        <div>
            <button className="button"
                    onClick={handleOpenForm}
            >{lookForm ? 'Отменить' : 'Добавить читателя'}</button>
            {lookForm ?
                <ReaderForm
                />
                : null}

            <table className="table">
                <thead>
                <tr>
                    <th>Имя</th>
                    <th>Фамилия</th>
                    <th>Телефон</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {readers.map(reader => {
                    return <tr key={reader._id}>
                        <td>{reader.firstName}</td>
                        <td>{reader.lastName}</td>
                        <td>{reader.tel}</td>
                        <td>
                            <DeleteOutlined onClick={() => handleDeleteReader(reader._id)}/>
                            <EditOutlined onClick={() => {}}/>
                        </td>
                    </tr>
                })}
                </tbody>
            </table>
        </div>
    );
};

export default Readers;