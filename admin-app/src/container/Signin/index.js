import React, { useEffect, useState } from 'react'
import Layout from '../../components/layouts'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import Input from '../../components/UI/Input'
import { login } from '../../actions'
import { useDispatch, useSelector} from 'react-redux'
import { Redirect } from 'react-router-dom'


/**
* @author
* @function Signin
**/

const Signin = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    if(auth.authenticate){
        return<Redirect to='/'/>
    }

    const userLogin = (evnt)=>{

        evnt.preventDefault();

        const user = { 
            email, password
        }
        dispatch(login(user));
    }
    return (
        <Layout>
            <Container>
                <Row style={{marginTop: '45px'}}>
                    <Col md={{span: 5, offset: 3}}>
                        <Form onSubmit = {userLogin}>
                        <Input
                                label='email'
                                placeholder='Enter email'
                                value={email}
                                type=''
                                onChange={(e) => setEmail(e.target.value)}
                            />
                             <Input
                                label='password'
                                placeholder='Enter password'
                                value={password}
                                type='password'
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )

}

export default Signin;