import React, { Component } from 'react'

import { Jumbotron } from 'react-bootstrap';
import Navcomp from './Navcomp';

export default class Welcome extends Component {
    render() {
        return (
            <div>
                <div><Navcomp/></div>
                <Jumbotron className="bg-dark text-white">
                    <h1>Welcome to the library</h1>
                    <p>
                    Someone said: “I have found the most valuable thing in my wallet is my library card.” Visit your library, get your library card, and you’ll be able to borrow a
                     print or electronic book, use free internet, or attend a course that will improve your digital skills.
                    </p>
                    <footer className="blockquote-footer">
                    Laura Bush

                    </footer>
                    </Jumbotron>
            </div>
        )
    }
}
