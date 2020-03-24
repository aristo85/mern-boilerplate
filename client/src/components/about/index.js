import React, {Component} from 'react';
import { connect } from 'react-redux';
import NavbarMenu from "../navbar";

class About extends Component {
    render() {
        return (
            <div>
                <NavbarMenu />
                This is About page
            </div>
        );
    }
}

export default connect()(About);