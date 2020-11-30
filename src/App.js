import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import Users from './components/Users';
import { Input, Button, Modal, Table } from 'antd';
import axios from 'axios';
import { UserOutlined } from '@ant-design/icons';


const baseUrl = 'https://arsene.azurewebsites.net/User'


function App() {

  const { Column, ColumnGroup } = Table;
  const [data, setData] = useState([]);
  const [insertarModal, setInsModal] = useState(false);
  const [modal, setModal] = useState(false);

  const abrirModal = () => {
    setModal(true);
  }
  const cerrarModal = () => {
    setModal(false);
  }

  const [setbaseUrl, setsetbaseUrl] = useState({
    nombre: '',
    lastname: '',
    email: '',

  })
  const handleChange = e => {
    const { name, value } = e.target;
    setsetbaseUrl(prevState => ({
      ...prevState,
      [name]: value
    }))
    console.log(setbaseUrl);
  }
  const peticionGet = async () => {
    await axios.get(baseUrl)
      .then(response => {
        setData(response.data);
      })
  }
  // eslint-disable-next-line
  useEffect(async () => {
    await peticionGet();
  }, [])

  const peticionPost = async () => {
    await axios.post(baseUrl, setbaseUrl)
      .then(response => {
        setData(data.concat(response.data))
        accionModal()
      })
  }

  const accionModal = () => {
    setInsModal(!insertarModal);
  }


  const bodyInsertar = (
    <div>
      <h3>User name</h3>
      <Input
        name="nombre"
        placeholder="User name"
        onChange={handleChange}

      />

      <h3>Last name</h3>
      <Input
        name="lastname"
        placeholder="Last name"
        onChange={handleChange}

      />
      <h3>Email</h3>
      <Input
        type="email"
        name="email"
        placeholder="email"
        onChange={handleChange}

      />

      <br />

    </div>
  )

  return (

    <div className="container">
      <div className="flex-large">
        <Users/>

        <Button
          type="primary"
          onClick={abrirModal}
        >
          <UserOutlined />Add User</Button>
        <Modal title="Add user"
          visible={modal}
          onCancel={cerrarModal}
          open={insertarModal}
          onClose={accionModal}
          onOk={cerrarModal}
        >
          {bodyInsertar}
          <div align="right">
            <Button
              type="primary"
              onClick={() => peticionPost()}

            >
              Save User </Button>
          </div>

        </Modal>
        
      </div>
      
      

      
      <Table dataSource={data}>

        <ColumnGroup>
          <Column title="User names" dataIndex="nombre" key="nombre" />
          <Column title="Last Name" dataIndex="lastname" key="lastname" />
          <Column title="Email" dataIndex="email" key="email" />
          <Column title="ID" dataIndex="id" key="id" />
        </ColumnGroup>

      </Table>,



    </div>

  );
}
export default App;
