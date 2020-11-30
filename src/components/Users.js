import React, { Fragment } from 'react';
import { Button, Col, Row, Input  } from 'antd';



const Users= () =>{
    return(
        <Fragment>
    
          <form>  
          <div className="container">
            <h1>Cleaver Test</h1>
            
                <Row>
                <Col span={8}>
                  <Input
                  type="primary"
                  className="input"
                  name="nombre"
                  placeholder="Search User"
                  ></Input>
                </Col>
                
              
                <Col>
                <Button
                type="primary">
                Search
                </Button>
                </Col>
                </Row>
          </div>
          
          </form>
    
    </Fragment>
    )
}

export default Users;
