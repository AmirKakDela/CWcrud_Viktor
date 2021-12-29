import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteReader, getReaders} from "../../redux/thunkReaderAction";
import ReaderForm from "../Readers/ReaderForm";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";

const Gives = () => {
    const [lookForm, setLookForm] = useState(false);
    const error = useSelector(state => state.error.error);

    const handleOpenForm = () => {
        setLookForm(prev => !prev)
    }

    return (
        <div>
            {error ? <div className="main__error main__error_active">{error}</div> : null}
            <button className="button"
                    onClick={handleOpenForm}
            >{lookForm ? 'Отменить' : 'Добавить читателя'}</button>
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
                </tr>
                </thead>
                <tbody>
                {/*{readers.map(reader => {*/}
                {/*    return <tr key={reader._id}>*/}
                {/*        <td>{reader.firstName}</td>*/}
                {/*        <td>{reader.lastName}</td>*/}
                {/*        <td>{reader.tel}</td>*/}
                {/*        <td>*/}
                {/*            <DeleteOutlined onClick={() => handleDeleteReader(reader._id)}/>*/}
                {/*            <EditOutlined onClick={() => handleEditReader(reader._id)}/>*/}
                {/*        </td>*/}
                {/*    </tr>*/}
                {/*})}*/}
                </tbody>
            </table>
        </div>
    );
};

export default Gives;