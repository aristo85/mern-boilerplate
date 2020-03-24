import React, {Component} from 'react';
import {Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { connect } from 'react-redux';
import {logoutUser} from "../../actions/user_actions";


class NavbarMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    render() {
        return (
            <div style={{ position: "fixed", width: "100%", top: 0}}>
                <Navbar color="dark" dark expand="md">
                    <NavbarBrand href="/">Home</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            {/*<NavItem>*/}
                            {/*    <NavLink href="/about">LandingPage</NavLink>*/}
                            {/*</NavItem>*/}
                            {/*<NavItem>*/}
                            {/*    <NavLink href="/product/upload">Upload Product</NavLink>*/}
                            {/*</NavItem>*/}
                        </Nav>
                        {this.props.user.isAuth ?
                            <Nav navbar>
                                <NavItem>
                                    <NavLink onClick={() => logoutUser()} href="/login">Log Out</NavLink>
                                </NavItem>
                            </Nav> :
                            <Nav navbar>
                                <NavItem>
                                    <NavLink href="/login">Log In</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/register">Sign Up</NavLink>
                                </NavItem>
                            </Nav>
                        }
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    user: state.user.userData
})
export default connect(mapStateToProps)(NavbarMenu);