import React, {Component} from 'react';
import Leftmenu from "../navbar/leftmenu";
import {logoutUser} from "../../actions/user_actions";
import { connect } from 'react-redux';

class About extends Component {
    render() {
        return (
            <div>
                <Leftmenu />
                This is About page
                <button onClick={() => logoutUser()}>Log Out</button>
            </div>
        );
    }
}

export default connect()(About);