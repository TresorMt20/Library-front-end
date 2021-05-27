import React, { Component } from 'react'
import { Button, ButtonGroup, Card ,Image,Table} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCaretDown, faCartPlus, faEdit, faEye, faList, faTrash} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Navcomp from './Navcomp';
export default class ViewCartIremComp extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            books:[]
        }
    }

    deleteBook = (bookid) => {
                    this.setState({
                        books: this.state.books.filter(book => book.id != bookid)

                    });
    }

    componentDidMount(){

        axios.get("http://localhost:8080/api/v/TheCart")
        .then(response=>response.data)
        .then((data) =>{
            this.setState({books:data});
        })
    }

   
    
    render() {
        return (
            <div>
                <div>
                <Navcomp/>
                </div>
                
                <table className="table table-striped table-bordered">
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
                                this.state.books.map(
                                    books=>
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
                                            
                                        <Button style={{marginLeft: "10px"}} size="sm" variant="outline-danger" onClick={this.deleteBook.bind(this, books.id)}><FontAwesomeIcon icon={faTrash}/></Button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                        

                    </table>
            </div>
        )
    }
}
