import React from 'react';
import { Layout } from 'antd';
import './App.css';
const { Header, Footer, Sider, Content } = Layout;

function App() {
    return (
        <Layout>
            <Sider style=>
                <h1 style={{color: 'white'}}>Книги</h1>
                <h1 style={{color: 'white'}}>Читатели</h1>
                <h1 style={{color: 'white'}}>Выдачи</h1>
            </Sider>
            <Layout>
                <Header>Header</Header>
                <Content>Content</Content>
                <Footer>Footer</Footer>
            </Layout>
        </Layout>
    );
}

export default App;
