import React from 'react';
import './books.scss'

const Books = () => {
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
                <tr>
                    <td>Gloria</td>
                    <td>Reeves</td>
                    <td>67439</td>
                    <td>10/18/1985</td>
                    <td>4</td>
                </tr>
                <tr>
                    <td>Graham</td>
                    <td>Bonner</td>
                    <td>90727</td>
                    <td>12/07/1983</td>
                    <td>4</td>
                </tr>
                <tr>
                    <td>Warren</td>
                    <td>Wheeler</td>
                    <td>99134</td>
                    <td>11/11/1984</td>
                    <td>2</td>
                </tr>
                </tbody>
            </table>

        </div>
    );
};

export default Books;