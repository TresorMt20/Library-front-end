import React, { Component } from 'react';
import { Card, Form,Button, Col} from 'react-bootstrap';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faList, faPlusSquare, faSave,faUndo} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Mytoast from './Mytoast';

export default class Addbook extends Component {
    constructor(props) {
        super(props)
    
        this.state = this.initialState;
        this.submitBook=this.submitBook.bind(this);
        this.bookChange=this.bookChange.bind(this);
        this.state.show=false;
    }

    initialState={
       id:'' ,title:'', author:'', coverPhotoURL:'', isbnNumber:'', price:'',language:''

    };

    componentDidMount(){

        const bookId=+this.props.match.params.id;

        if(bookId){

            this.findBookById(bookId);
     
        }

    }

    findBookById = (bookId) => {

        axios.get("http://localhost:8080/api/v1/Books/"+bookId)
        .then(response => {

            if(response.data !=null){
                this.setState({
                    id: response.data.id,
                    title: response.data.title,
                    author: response.data.author,
                    coverPhotoURL: response.data.coverPhotoURL,
                    isbnNumber: response.data.isbnNumber,
                    price: response.data.price,
                    language: response.data.language

                });
            }

        }).catch((error) => {

            console.error("Error - "+error);

        });


    }

    resetBook =()=>{
        this.setState(()=> this.initialState);
    };


    submitBook = event => {

        event.preventDefault();

        const book={
            title: this.state.title,
            author: this.state.author,
            coverPhotoURL: this.state.coverPhotoURL,
            isbnNumber: this.state.isbnNumber,
            price: this.state.price,
            language: this.state.language

        };

            axios.post("http://localhost:8080/api/v1/Books",book)
            .then(response => {
            if(response.data != null){
                this.setState({"show":true, "method":"put"});
                setTimeout(() => this.setState({"show":false}),3000);
            }else{
                this.setState({"show":false})
            }
        });
        
        this.setState(this.initialState);
       
    };


    updateBook = event =>{

        event.preventDefault();

        const book={
            id: this.state.id,
            title: this.state.title,
            author: this.state.author,
            coverPhotoURL: this.state.coverPhotoURL,
            isbnNumber: this.state.isbnNumber,
            price: this.state.price,
            language: this.state.language

        };

            axios.put("http://localhost:8080/api/v1/Books",book)
            .then(response => {
            if(response.data != null){
                this.setState({"show":true, "method":"put"});
                setTimeout(() => this.setState({"show":false}),3000);
                setTimeout(() => this.bookList(),3000);
            }else{
                this.setState({"show":false})
            }
        });


    };

    bookChange = event =>{
        this.setState({
            [event.target.name]:event.target.value
        });

    }

    bookList = () =>{
        return this.props.history.push("/list");

    };



    render() {

        const {title,author,coverPhotoURL,isbnNumber,price,language}=this.state;

        return (

            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <Mytoast show = {this.state.show} message = {this.state.method === "put" ? "Book Updated Successfully." : "Book Saved Successfully."} type = {"success"}/>

                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header> <FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} /> {this.state.id ? "Update Book" : "Add New Book"}
                </Card.Header>
                
                <Form onReset={this.resetBook} onSubmit={this.state.id ? this.updateBook : this.submitBook} id="bookFormId">
                <Card.Body> 

                    <Form.Row>
                        <Form.Group as={Col} controlid="formGridTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control required autoComplete="off"
                           type="text"  name="title" 
                            value={title}
                            onChange={this.bookChange}
                            className={"bg-dark text-white"}
                             placeholder="Enter Book Title" />
                        </Form.Group>   
                        <Form.Group as={Col} controid="formGridAuthor">
                            <Form.Label>Author</Form.Label>
                            <Form.Control required autoComplete="off"
                             type="text" name="author" 
                             value={author}
                            onChange={this.bookChange}
                             className={"bg-dark text-white"} placeholder="Enter Book Author" />
                        </Form.Group>
                    </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlid="formGridCoverPhotoURL">
                                <Form.Label>Cover Photo URL</Form.Label>
                                <Form.Control required autoComplete="off"
                                 type="text" name="coverPhotoURL"
                                 value={coverPhotoURL}
                                 onChange={this.bookChange}
                                 className={"bg-dark text-white"} placeholder="Enter Book Book Cover Photo URL" />
                            </Form.Group>
                            <Form.Group as={Col} controid="formGridISBNNumber">
                                <Form.Label>ISBN Number</Form.Label>
                                <Form.Control required autoComplete="off"
                               type="text" name="isbnNumber" 
                               value={isbnNumber}
                            onChange={this.bookChange}
                               className={"bg-dark text-white"} placeholder="Enter Book ISBN Number" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                        <Form.Group as={Col} controid="formGridPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control required autoComplete="off"
                             type="text" name="price"
                             value={price}
                             onChange={this.bookChange}
                             className={"bg-dark text-white"} placeholder="Enter Book Price" />
                        </Form.Group>
                        <Form.Group as={Col} controid="formGridLanguage">
                            <Form.Label>Language</Form.Label>
                            <Form.Control required autoComplete="off"
                             type="text" name="language" 
                             value={language}
                            onChange={this.bookChange}
                             className={"bg-dark text-white"} placeholder="Enter Book Language" />
                        </Form.Group>
                    </Form.Row>
                </Card.Body>
                   <Card.Footer style={{"textAlign":"right"}}>
                       
                   <Button size="sm" variant="success" type="submit">
                   <FontAwesomeIcon icon={faSave}/>   {this.state.id ? "Update" : "Save"}
                        </Button>{'  '}
                        <Button size="sm" variant="info" type="reset">
                   <FontAwesomeIcon icon={faUndo}/>   Reset
                        </Button>
                        {'  '}
                        <Button size="sm" variant="info" type="button" onClick={this.bookList.bind()}>
                   <FontAwesomeIcon icon={faList}/>   Book List
                        </Button>

                   </Card.Footer>
                   </Form>

            </Card>

            </div>
            
        );
    }
}
