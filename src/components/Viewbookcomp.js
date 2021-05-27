import axios from 'axios';
import React, { Component } from 'react'

export default class Viewbookcomp extends Component {
    
    constructor(props) {
        super(props)
    
        this.state = {
            id: this.props.match.params.id,
            books: {},
            carts:[]
        }
    }
    
    componentDidMount(){

        axios.get("http://localhost:8080/api/v/TheCart/cart")
        .then(response=>response.data)
        .then((data) =>{
            this.setState({carts:data});
        })
    }

    cancel(){
        this.props.history.push('/list');
    };

    componentDidMount(){
        axios.get("http://localhost:8080/api/v1/Books/"+this.state.id).then( res =>{
            this.setState({books: res.data});
        })
    }

    render() {
        return (
            <div>
                <div className="card col-md-6 offset-md-3">
                    <h3 className="text-center">View Book Details</h3>
                    <div className="card-body">
                        <div className="row">
                            <label>Book Title:  </label>
                            <div style={{color: "orange"}}>{this.state.books.title}</div>
                        </div>
                        <div className="row">
                            <label>Book Author:</label>
                            <div style={{color: "orange"}}>{this.state.books.author}</div>
                        </div>
                        <div className="row">
                            <label>Book ISBN Number:</label>
                            <div style={{color: "orange"}}>{this.state.books.isbnNumber}</div>
                        </div>
                        <div className="row">
                            <label> Price:</label>
                            <div style={{color: "orange"}}>{this.state.books.price}</div>
                        </div>
                        <div className="row">
                            <label>Book Language:</label>
                            <div style={{color: "orange"}}>{this.state.books.language}</div>
                        </div>
                    </div>
                </div>
                <div>
                <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                            <th>Id</th>
                                <th>Book Id</th>
                                <th>Guest Id</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.carts.map(
                                    cart=>
                                    <tr key={cart.id}>
                                    
                                    <td>{cart.book}</td>
                                    <td>{cart.guest}</td>
                                    <td>{cart.quantity}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                        

                    </table>
                </div>
                <div>
                 <button className="btn btn-success" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Go To Book List</button>
                 </div>
            </div>
        )
    }
}
