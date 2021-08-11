import React, {useEffect} from 'react';
import Layout from '../../components/layouts'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import Input from '../../components/UI/Input'
import { useDispatch, useSelector} from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signup } from '../../actions/user.actions';
import { useState } from 'react';

/**
* @author
* @function Signup
**/

const Signup = (props) => {

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.user);

    useEffect(() => {
        if (!user.loading) {
          setFirstname("");
          setLastname("");
          setEmail("");
          setPassword("");
        }
      }, [user.loading]);
    
    if(auth.authenticate){
        return<Redirect to='/'/>
    }

    if(user.loading){
        return<p>Loading....</p>
    }


    const userSignup = (evnt) =>{

        evnt.preventDefault();

        const user = {
            firstname, lastname, email, password
        }
        dispatch(signup(user));
    }

    return (
        <Layout>
            <Container>
                <Row style={{ marginTop: '45px' }}>
                    <Col md={{ span: 5, offset: 3 }}>
                        <Form onSubmit= {userSignup}>
                            <Row>
                                <Col md={{ span: 6 }}>
                                    <Input
                                        label='First Name'
                                        placeholder='Enter firstname'
                                        value={firstname}
                                        type=''
                                        onChange={(e) => setFirstname(e.target.value)}
                                    />
                                </Col>
                                <Col md={{ span: 6 }}>
                                    <Input
                                        label='Last Name'
                                        placeholder='Enter lastname'
                                        value={lastname}
                                        type=''
                                        onChange={(e) => setLastname(e.target.value)}
                                    />
                                </Col>
                            </Row>
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
                                type=''
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

export default Signup