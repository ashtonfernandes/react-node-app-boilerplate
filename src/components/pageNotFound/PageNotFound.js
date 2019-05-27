import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './PageNotFound.css';

class PageNotFound extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }

    render() {
        return (
            <div className="home-container">
                <div className="home-header">
                    <div>Page Not Found</div>
                    <br />
                    <Link to="/">Go Home!</Link>
                </div>
            </div>
        );
    }
}

export default PageNotFound;
