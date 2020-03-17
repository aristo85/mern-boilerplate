import React, {Component} from 'react';
import { Link } from "react-router-dom";
import FaAlignJustify from 'react-icons/lib/fa/beer';
import './navbar.css'

class Leftmenu extends Component {

    state = {
        nav: "topnav"
    }

    myFunction = () => {
        this.state.nav === "topnav"?
        this.setState({
            nav: "topnav responsive"
        }) : this.setState({
                nav: "topnav"
            })
    }

    render() {
        return (
            <div className={this.state.nav}>
                <Link to="/"><a >Home</a></Link>
                <Link to="/about"><a>About</a></Link>
                <a className="icon" onClick={this.myFunction}><FaAlignJustify />
                </a>
            </div>
        );
    }
}

export default Leftmenu;