import React from 'react';
import {Layout} from 'antd';
import './header.scss'

const {Header} = Layout;

const HeaderComponent = () => {
    return (
        <Header className="header">
            <h1 className="header__title">
                Библиотека
            </h1>
        </Header>
    );
};

export default HeaderComponent;