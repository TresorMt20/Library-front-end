import { faAddressBook, faEnvelope, faLock, faPhone, faRegistered, faSignInAlt, faUndo, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { Component } from 'react'
import { Button, Card, Col, Form, FormControl, InputGroup, Nav, Navbar, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default class Register extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
        }
        this.state=this.initialState;
        this.saveRegister=this.saveRegister.bind(this);
    }


    initialState={
        email:'',password:'',phonenumber:'',username:'',adres:''

    };

    saveRegister= (e) =>{
        e.preventDefault();
        let regist={email: this.state.email, name: this.state.username,password: this.state.password,address: this.state.adres,phone: this.state.phonenumber}

        axios.post("http://localhost:8080/api/v2/users/",regist).then(res =>{
            this.props.history.push('/users');

        });
    };

    credentialChange = event =>{
        this.setState({
            [event.target.name] : event.target.value
        });
    };

    resetLginForm = () =>{

        this.setState(() => this.initialState);
    };

    

    openLginForm = () =>{

    };
    
    render() {

        const {email,password,phonenumber,username,adres} =this.state;

        return (
            <div>
                 <div>
                <Navbar>
                <Nav className="navbar-right">
                    <Link to={"log-out"} className="nav-link"><FontAwesomeIcon icon={faSignInAlt}/> Login</Link>
                    
                </Nav>
                </Navbar>   
            </div>
            <Row className="justify-content-md-right">
                <Col xs={5}>
                    <Card className={"border border-success bg-secondary text-white"}>
                        <Card.Header>   
                            <FontAwesomeIcon icon={faUserPlus}/> Register

                        </Card.Header>
                        <Card.Body >
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <InputGroup.Append>
                                      <InputGroup.Text><FontAwesomeIcon icon={faEnvelope}/></InputGroup.Text> 
                                    </InputGroup.Append>

                                    <FormControl required autoComplete="off" type="text" name="email" value={email} onChange={this.credentialChange}
                                    className={"bg-dark text-white"} placeholder="Enter Email Address"/>

                                </Form.Group>

                                <Form.Group as={Col}>
                                    <InputGroup.Append>
                                      <InputGroup.Text><FontAwesomeIcon icon={faUser}/></InputGroup.Text> 
                                    </InputGroup.Append>

                                    <FormControl required autoComplete="off" type="text" name="username" value={username} onChange={this.credentialChange}
                                    className={"bg-dark text-white"} placeholder="Enter Name"/>

                                </Form.Group>
                            </Form.Row>

                                

                            <Form.Row>
                                <Form.Group as={Col}>
                                    <InputGroup.Append>
                                      <InputGroup.Text><FontAwesomeIcon icon={faAddressBook}/></InputGroup.Text> 
                                    </InputGroup.Append>

                                    <FormControl required autoComplete="off" type="text" name="adres" value={adres} onChange={this.credentialChange}
                                    className={"bg-dark text-white"} placeholder="Enter Address"/>

                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col}>
                                    <InputGroup.Append>
                                      <InputGroup.Text><FontAwesomeIcon icon={faLock}/></InputGroup.Text> 
                                    </InputGroup.Append>

                                    <FormControl required autoComplete="off" type="password" name="password" value={password} onChange={this.credentialChange}
                                    className={"bg-dark text-white"} placeholder="Enter Password"/>

                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col}>
                                    <InputGroup.Append>
                                      <InputGroup.Text><FontAwesomeIcon icon={faPhone}/></InputGroup.Text> 
                                    </InputGroup.Append>

                                    <FormControl required autoComplete="off" type="text" name="phonenumber" value={phonenumber} onChange={this.credentialChange}
                                    className={"bg-dark text-white"} placeholder="Enter Phone number"/>

                                </Form.Group>
                            </Form.Row>

                        </Card.Body>
                        <Card.Footer style={{"text-align":"right"}}>
                            <Button size="sm" type="button" variant="success" onClick={this.saveRegister}
                            disabled={this.state.email.length===0 || this.state.password.length===0}>
                                <FontAwesomeIcon icon={faRegistered}/> Register 
                            </Button>{'  '}
                            <Button size="sm" type="button" variant="info" onClick={this.resetLginForm}
                            disabled={this.state.email.length===0 && this.state.password.length===0}>
                            <FontAwesomeIcon icon={faUndo}/> Reset
                            </Button>
                        </Card.Footer>
                    </Card>
                </Col>

            </Row>
            </div>
        )
    }
}
