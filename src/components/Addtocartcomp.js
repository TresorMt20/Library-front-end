import axios from 'axios';
import React, { Component } from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { Button, Form } from 'react-bootstrap';

export default class Addtocartcomp extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            id: this.props.match.params.id,
            guestid: '',
            quantity_: '',
        }
        this.saveCart=this.saveCart.bind(this);
        this.changeidnumber=this.changeidnumber.bind(this);
        this.changeQuantity=this.changeQuantity.bind(this);
    }

    saveCart= (e) =>{
        e.preventDefault();
        let cart={book: this.state.id, guest: this.state.guestid,quantity: this.state.quantity_}

        axios.post("http://localhost:8080/api/v/TheCart",cart).then(res =>{
            this.props.history.push('/list');

        });
    };

    cancel(){
        this.props.history.push('/list');
    };

    changeidnumber=(event) =>{
        this.setState({guestid: event.target.value});
    };
    changeQuantity=(event) =>{
        this.setState({quantity_: event.target.value});
    };

    render() {
        return (
            <div>
                <div>
                <form>
                         <div className="form-group">
                                       <label>Id Number:</label>
                                       <input placeholder="Id numer" name="Description" className="form-control"
                                       value={this.state.guestid} onChange={this.changeidnumber}/>
                                   </div>
                                   <div className="form-group">
                                       <label>Quantity:</label>
                                       <input placeholder="quantity" name="Nationality" className="form-control"
                                       value={this.state.quantity_} onChange={this.changeQuantity}/>
                                   </div>

                                   <button className="btn btn-success" onClick={this.saveCart}>Save</button>

                        </form>
     
                </div>
                <button className="btn btn-success" onClick={this.cancel.bind(this)} style={{marginInlineEnd: "35px"}} c>Go To Book List</button>

            </div>
        )
    }
}
