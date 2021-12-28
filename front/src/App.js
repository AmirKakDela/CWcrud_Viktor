import React from 'react';
import {Layout} from 'antd';
import HeaderComponent from "./Components/Header/Header";
import './App.css';
import './index.css'
const {Footer, Sider, Content} = Layout;

function App() {
    return (
        <Layout>
            <Sider>
                <h1 style={{color: 'white'}}>Книги</h1>
                <h1 style={{color: 'white'}}>Читатели</h1>
                <h1 style={{color: 'white'}}>Выдачи</h1>
            </Sider>
            <Layout>
                <HeaderComponent/>
                <Content>Content</Content>
                <Footer>Footer</Footer>
            </Layout>
        </Layout>
    );
}

export default App;
