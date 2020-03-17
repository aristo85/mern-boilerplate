import React, {Component} from 'react';
import { registerUser } from '../../actions/user_actions';
import { connect } from 'react-redux';
import Leftmenu from "../navbar/leftmenu";

class Register extends Component {

    state = {
        lastname: "",
        name: "",
        username: "",
        email: "",
        password: "",
        passwordconfirmation: "",
        errors: []
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    displayErrors = errors => (
        errors.map((error, i) => <p key={i}>{error}</p> )
    )

    isFormValid = () => {
        let errors = [];
        let error;

        if (this.isFormEmpty(this.state)){
            error = { message: "Fill in all fields"};
            this.setState({ errors: errors.concat(error)});
        } else if (!this.isPasswordValid(this.state)) {
            error = { message: "password is invalid" };
            this.setState({ errors: errors.concat(error)});
        } else {
            return true;
        }
    }

    isPasswordValid = ({ password, passwordconfirmation }) => {
        return !(
            password.length < 6 ||
            passwordconfirmation.length < 6 ||
            password !== passwordconfirmation);
    }

    isFormEmpty = ({ lastname, name, username, email, password, passwordconfirmation}) => {
        return (
          !lastname.length ||
          !name.length ||
          !username.length ||
          !email.length ||
          !password.length ||
          !passwordconfirmation.length
        );
    }

    submitForm = event => {
        event.preventDefault();

        let dataToSubmit = {
            lastname: this.state.lastname,
            name: this.state.name,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            passwordconfirmation: this.state.passwordconfirmation
        }

        if (this.isFormValid()) {
            this.setState({ errors: [] })
            this.props.dispatch(registerUser(dataToSubmit))
                .then(response => {
                    if(response.payload.loginSuccess){
                        this.props.history.push('/login')
                    } else {
                        this.setState({
                            errors: this.state.errors.concat(" your attempt to send data to DB was failed")
                        })
                    }
                })
                .catch(err => {
                    this.setState({
                        errors: this.state.errors.concat(err)
                    });
                })
        } else {
            this.setState({
                errors: this.state.errors.concat("Form is not valid")
            })
        }
    }

    render() {
        return (
            <div className="container">
                <Leftmenu />
                <h2> Sign Up </h2>
                <div>
                    <form>
                        <div>
                            <label>Last Name</label><br/>
                            <input
                                name="lastname"
                                value={this.state.lastname}
                                onChange={e => this.handleChange(e)}
                                id="lastname"
                                type="text"
                                placeholder="last Name"
                            />
                        </div>
                        <div>
                            <label>Name</label><br/>
                            <input
                                name="name"
                                value={this.state.name}
                                onChange={e => this.handleChange(e)}
                                id="name"
                                type="text"
                                placeholder="Name"
                            />
                        </div>
                        <div>
                            <label>User Name</label><br/>
                            <input
                                name="username"
                                value={this.state.username}
                                onChange={e => this.handleChange(e)}
                                id="username"
                                type="text"
                                placeholder="username"
                            />
                        </div>
                        <div>
                            <label>Email</label><br/>
                            <input
                                name="email"
                                value={this.state.email}
                                onChange={e => this.handleChange(e)}
                                id="email"
                                type="email"
                                placeholder="Email"
                            />
                        </div>
                        <div>
                            <label>Password</label><br/>
                            <input
                                name="password"
                                value={this.state.password}
                                onChange={e => this.handleChange(e)}
                                id="password"
                                type="password"
                                placeholder="password"
                            />
                        </div>
                        <div>
                            <label>Password confirmation</label><br/>
                            <input
                                name="passwordconfirmation"
                                value={this.state.passwordconfirmation}
                                onChange={e => this.handleChange(e)}
                                id="passwordconfirmation"
                                type="password"
                                placeholder="repeat the password"
                            />
                        </div>

                        {this.state.errors.length ? (
                            <div>
                                {this.displayErrors(this.state.errors)}
                            </div>
                        ): null}

                        <div>
                            <button
                                type="submit"
                                name="action"
                                onClick={this.submitForm}
                            >
                                Create an account
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        );
    }
}

export default connect()(Register);