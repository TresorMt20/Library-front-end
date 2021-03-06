import { faFastBackward, faFastForward, faList, faStepBackward, faStepForward, faTrash, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { Component } from 'react'
import { Button, Card, FormControl, InputGroup, Table } from 'react-bootstrap'
import Navcomp from './Navcomp'

export default class Userlist extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
            users:[],
            currentPage : 1,
            usersPerPage : 5
        };
        this.deleteUser=this.deleteUser.bind(this);
    }

    componentDidMount(){

        axios.get("http://localhost:8080/api/v2/users")
        .then(response=>response.data)
        .then((data) =>{
            this.setState({users:data});
        })
    };

    changePage = event =>{
        this.setState({
            [event.target.name]: parseInt(event.target.value)

        });
    };

    firstPage = () => {

        if(this.state.currentPage > 1){
            this.setState({
                currentPage: 1

            });
        }

    };

    prevPage = () => {

        if(this.state.currentPage > 1){
            this.setState({
                currentPage: this.state.currentPage - 1

            });
        }

    };

    
    
    lastPage = () => {

        if(this.state.currentPage < Math.ceil(this.state.users.length / this.state.usersPerPage)){
            this.setState({
                currentPage: Math.ceil(this.state.users.length / this.state.users.usersPerPage)

            });
        }

    };

    nextPage = event => {

        event.preventDefault();

        if(this.state.currentPage < Math.ceil(this.state.users.length / this.state.usersPerPage)){
            this.setState({
                currentPage: this.state.currentPage + 1

            });
        }

    };

    deleteUser (userid) {

        axios.delete("http://localhost:8080/api/v2/users"+userid)
        .then(res => {

            this.setState({ users : this.state.users.filter( user => user.id !==userid)});

        })

    }

    render() {

        const {users, currentPage,usersPerPage} = this.state;
        const lastIndex = currentPage * usersPerPage;
        const firstIndex = lastIndex - usersPerPage;
        const currentUsers = users.slice(firstIndex, lastIndex);
        const totalPages = users.length / usersPerPage;


        const pageNumCss = {
            width: "45px",
            border: "1px solid # 17A2B8",
            color: "#17A2B8",
            textAlign: "center",
            fontweight: "bold"

        };
        

        return (
            <div>
                <Navcomp/>
                <div>
                <Card className={"border border-dark bg-dark text-white"}>
                                <Card.Header><FontAwesomeIcon icon={faUsers}/> User List</Card.Header>
                                <Card.Body>
                                    <Table bordered hover striped variant="success">
                                        <thead>
                                            <tr>
                                                <td>Id</td>
                                                <td>Name</td>
                                                <td>Email </td>
                                                <td>Address</td>
                                                <td>Phone</td>
                                                <td>Actions</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { users.length===0 ?
                                                <tr>
                                                    <td colSpan="6">No Users Available</td>
                                                </tr>:
                                               currentUsers.map((user,index)=> (

                                                    <tr key={index}>
                                                        <td>{user.id}</td>
                                                        <td>{user.name}</td>
                                                        <td>{user.email}</td>
                                                        <td>{user.address}</td>
                                                        <td>{user.phone}</td>
                                                        <td>
                                                            <Button style={{marginLeft: "10px"}} size="sm" variant="outline-danger" onClick={ () => this.deleteUser(user.id)}><FontAwesomeIcon icon={faTrash}/></Button></td>
                                                    </tr>
                                                ))

                                            }
                                        </tbody>
                                    </Table>
                                </Card.Body>
                                <Card.Footer>
                                    <div style={{"float":"left"}}>
                                        Showing Page {currentPage} of {totalPages}
                                    </div>
                                    <div style={{"float":"right"}}>
                                        <InputGroup size="sm">
                                          <InputGroup.Prepend>
                                                <Button type="button" variant="outline-info" disabled={currentPage===1 ? true : false}
                                                onClick={this.firstPage} > 
                                               
                                                   <FontAwesomeIcon icon={faFastBackward}/> First
                                                </Button>
                                                <Button variant="outline-info" disabled={currentPage===1 ? true : false}
                                                onClick={this.prevPage}>
                                                
                                                <FontAwesomeIcon icon={faStepBackward}/>   Prev
                                                </Button>
                                          </InputGroup.Prepend>
                                            <FormControl style={pageNumCss} className={"bg-dark"} name="currentPage" value={currentPage}
                                            onChange={this.changePage}/>
                                          <InputGroup.Append>
                                          <Button variant="outline-info" disabled={currentPage===totalPages ? true : false}
                                          onClick={this.nextPage}>
                                          
                                             <FontAwesomeIcon icon={faStepForward}/> Next
                                                </Button >
                                                <Button variant="outline-info" disabled={currentPage===totalPages ? true : false}
                                                onClick={this.lastPage}>
                                                
                                                <FontAwesomeIcon icon={faFastForward}/>  Last
                                                </Button>
                                          </InputGroup.Append>
                                        </InputGroup>

                                    </div>
                                </Card.Footer>
                </Card>    

                </div>
            </div>
        )
    }
}
