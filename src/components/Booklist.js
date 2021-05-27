import React, { Component } from 'react';
import { Button, ButtonGroup, Card ,Image,Table} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCaretDown, faCartPlus, faEdit, faEye, faList, faTrash} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Mytoast from './Mytoast';
import {Link} from 'react-router-dom';
import Navcomp from './Navcomp';

export default class Booklist extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             books:[]
        }
        this.viewbook=this.viewbook.bind(this);
        this.addtocart=this.addtocart.bind(this);
    }

    componentDidMount(){

        axios.get("http://localhost:8080/api/v1/Books")
        .then(response=>response.data)
        .then((data) =>{
            this.setState({books:data});
        })
    }

    viewbook(id){
        this.props.history.push(`/view-book/${id}`);
    }
    addtocart(id){
        this.props.history.push(`/add-cart/${id}`);
    }

    deleteBook = (bookid) => {

        axios.delete("http://localhost:8080/api/v1/Books/"+bookid)
            .then(response => {

                if(response!=null){

                    this.setState({"show":true});
                    setTimeout(() => this.setState({"show":false}),3000);

                    this.setState({
                        books: this.state.books.filter(book => book.id != bookid)

                    });
                }else{
                this.setState({"show":false})
            }

            });
    }
    
    render() {
        return (

            <di>
                <Navcomp/>
                 <div style={{"display":this.state.show ? "block" : "none"}}>
                    <Mytoast show = {this.state.show} message = { "Book Deleted Successfully."} type = {"danger"}/>

                </div>

                <Card className={"border border-dark bg-dark text-white"}>
                                <Card.Header><FontAwesomeIcon icon={faList}/> Book List</Card.Header>
                                <Card.Body>
                                    <Table bordered hover striped variant="dark">
                                        <thead>
                                            <tr>
                                            <th>Title</th>
                                            <th>Author</th>
                                            <th>ISBN Number</th>
                                            <th>Price</th>
                                            <th>Language</th>
                                            <th style={{width: "25%"}}>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.books.length===0 ?
                                                <tr align="center">
                                            <td colSpan="6">No Books Available</td>
                                            </tr> :
                                            this.state.books.map((books) =>(
                                                <tr key={books.id}>
                                                    <td>
                                                        <Image src={books.coverPhotoURL} roundedCircle width="25" height="25"/>{'  '}
                                                        {books.title}
                                                    </td>
                                                    
                                                    <td>{books.author}</td>
                                                    <td>{books.isbnNumber}</td>
                                                    <td>{books.price}</td>
                                                    <td>{books.language}</td>
                                                    <td>
                                                        <ButtonGroup>
                                                            <Link to={"edit/"+books.id} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit}/></Link>{'     '}
                                                            <Button style={{marginLeft: "10px"}} size="sm" variant="outline-danger" onClick={this.deleteBook.bind(this, books.id)}><FontAwesomeIcon icon={faTrash}/></Button>
                                                                    <Button style={{marginLeft: "10px"}} onClick={ () => this.viewbook(books.id)} size="sm" variant="outline-secondary" type="button" >
                                                            <FontAwesomeIcon icon={faEye}/>   View
                                                                    </Button>
                                                                    <Button style={{marginLeft: "10px"}} onClick={ () => this.addtocart(books.id)} size="sm" variant="outline-success" type="button" >
                                                            <FontAwesomeIcon icon={faCartPlus}/> to cart
                                                                    </Button>
                                                                    
                                                        </ButtonGroup>
                                                    </td>
                                                </tr>
                                            ))
                                            }
                                            
                                        </tbody>
                                </Table>
                                </Card.Body>

                            </Card>

            </di>

               
            
        );
    }
}