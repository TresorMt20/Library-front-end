import { faEnvelope, faIdCard, faLock, faSignInAlt, faUndo, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { Component } from 'react'
import { Button, Card, Col, Form, FormControl, InputGroup, Nav, Navbar, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default class Login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
        this.state=this.initialState;
    }
    initialState={
        email:'',password:'',id:''

    };

    credentialChange = event =>{
        this.setState({
            [event.target.name] : event.target.value

        });
    };

    resetLginForm = () =>{

        this.setState(() => this.initialState);
    };

    openLginForm = event =>{

        
        event.preventDefault();


        axios.get("http://localhost:8080/api/v2/users/"+this.state.id)
        .then(response => {

            
        if(this.state.email===response.data.email&&this.state.password===response.data.password){

            
            this.props.history.push(`/welcome`);

            }else{
                this.setState(() => this.initialState);
            }

        }).catch((error) => {

            console.error("Error - "+error);

        });


    };
    
    render() {

        const {email,password,id} =this.state;

        return (
            <div>
                 <div>
                <Navbar>
                <Nav className="navbar-right">
                    <Link to={"register"} className="nav-link"><FontAwesomeIcon icon={faUserPlus}/> Register</Link>
                    
                </Nav>
                </Navbar>
            </div>
            <Row className="justify-content-md-center">
                <Col xs={5}>
                    <Card className={"border border-dark bg-dark text-white"}>
                        <Card.Header>
                            <FontAwesomeIcon icon={faSignInAlt}/> Login

                        </Card.Header>
                        <Card.Body >

                        <Form.Row>
                                <Form.Group as={Col}>
                                    <InputGroup.Append>
                                      <InputGroup.Text><FontAwesomeIcon icon={faIdCard}/></InputGroup.Text> 
                                    </InputGroup.Append>

                                    <FormControl required autoComplete="off" type="text" name="id" value={id} onChange={this.credentialChange}
                                    className={"bg-dark text-white"} placeholder="Enter User Id"/>

                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col}>
                                    <InputGroup.Append>
                                      <InputGroup.Text><FontAwesomeIcon icon={faEnvelope}/></InputGroup.Text> 
                                    </InputGroup.Append>

                                    <FormControl required autoComplete="off" type="text" name="email" value={email} onChange={this.credentialChange}
                                    className={"bg-dark text-white"} placeholder="Enter Email Address"/>

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

                        </Card.Body>
                        <Card.Footer style={{"text-align":"right"}}>
                            <Button size="sm" type="button" variant="success" onClick={this.openLginForm}
                            disabled={this.state.email.length===0 || this.state.password.length===0}>
                                <FontAwesomeIcon icon={faSignInAlt}/> Login 
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
