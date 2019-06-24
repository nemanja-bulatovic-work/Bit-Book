import React, { Component } from 'react';

import { fetchRegister } from '../../services/Register';

import M from 'materialize-css';
import './Register.css';
import { fetchLogin } from '../../services/Login';

class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameInputValueReg: '',
            emailInputValueReg: '',
            passwordInputValueReg: '',
            emailInputValueLog: '',
            passwordInputValueLog: '',
            regValidate: null,
            logValidate: null,
            logButtonDisabled: false,
            regButtonDisabled: false,
        }

        this.instance = null;

        this.handleInputChange = this.handleInputChange.bind(this);
        this.sendRegisterReq = this.sendRegisterReq.bind(this);
        this.sendLoginReq = this.sendLoginReq.bind(this);
    }

    isValidEmailLogIn(value) {
        if (value === '') {
            return true;
        }
        if (!value.includes('@')) {
            return {
                error: 'Invalid email address'
            }
        }
        return true;
    }

    isValidPassLogIn(value) {
        if (value.length === 0) {
            return true;
        }
        if (value.length < 6) {
            return {
                error: 'Password must be min 6 characters'
            }
        }
        return true;
    }

    componentDidMount() {
        this.instance = M.Tabs.init(document.querySelector('.tabs'));
    }

    isValidEmailRegister(value) {
        if (value.length === 0) {
            return true;
        }
        if (!value.includes("@")) {
            return {
                error: 'Invalid email address'
            }
        }
        return true;
    }
    isValidPassRegister(value) {
        if (value.length === 0) {
            return true;
        }
        if (value.length < 6) {
            return {
                error: 'Password must be min 6 characters'
            }
        }
        return true;
    }


    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    sendRegisterReq(e) {
        e.preventDefault();

        const data = {
            name: this.state.nameInputValueReg,
            email: this.state.emailInputValueReg,
            password: this.state.passwordInputValueReg,
        }

        fetchRegister(data)
            .then((data) => {
                if (data.statusCode === 422) {
                    this.setState({
                        regValidate: data.message,
                        nameInputValueReg: '',
                        emailInputValueReg: '',
                        passwordInputValueReg: '',
                    })
                    return;
                }
                this.instance.select('login');
            })
    }

    sendLoginReq(e) {
        e.preventDefault();

        const data = {
            email: this.state.emailInputValueLog,
            password: this.state.passwordInputValueLog
        }

        fetchLogin(data)
            .then((data) => {
                if (data.accessToken) {
                    localStorage.setItem('user', data.accessToken);
                    this.props.logIn();
                }

                if (data.statusCode === 422) {
                    this.setState({
                        logValidate: 'Unable to login. Invalid credentials.',
                    })
                }

                console.log(data);
            })
    }

    render() {
        const logEmailRes = this.isValidEmailLogIn(this.state.emailInputValueLog);
        const logPassRes = this.isValidPassLogIn(this.state.passwordInputValueLog);
        const regEmailRes = this.isValidEmailRegister(this.state.emailInputValueReg);
        const regPassRes = this.isValidPassRegister(this.state.passwordInputValueReg);
        return (
            <>
                <div className='row'>
                    <div className='register col s6'>
                        <h1>BitBook Register and Login</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt et voluptatum aliquam accusamus consequuntur distinctio nulla consectetur, dolorum dignissimos necessitatibus commodi. Nulla, maxime sint architecto ex itaque harum quas, quidem iusto eligendi laudantium, magni maiores quos. Odio necessitatibus ipsa laboriosam?</p>
                    </div>
                    <div className='col s5'>
                        <div className="row">
                            <div className="col s12">
                                <ul className="tabs">
                                    <li className="tab col s6"><a href="#login">Login</a></li>
                                    <li className="tab col s6"><a className='active' href="#register">Register</a></li>
                                </ul>
                            </div>
                            <div id="login" className="col s12">
                                <form>
                                    <div className="form row">
                                        <div className="input-field col s12">
                                            <input name='emailInputValueLog' onChange={this.handleInputChange} placeholder="Email address" id="login-email" type="email" className="validate" value={this.state.emailInputValueLog} />
                                            <label htmlFor="login-email">Email</label>
                                            <p className='validate-message center'>{logEmailRes ? logEmailRes.error : null}</p>

                                        </div>
                                        <div className="input-field col s12">
                                            <input name='passwordInputValueLog' onChange={this.handleInputChange} placeholder='Minimum 6 characters' id="login-password" type="password" className="validate" value={this.state.passwordInputValueLog} />
                                            <label htmlFor="login-password">Password</label>
                                            <p className='validate-message center'>{logPassRes ? logPassRes.error : null}</p>
                                        </div>
                                    </div>
                                    <button disabled={logEmailRes.error || logPassRes.error} onClick={this.sendLoginReq} className='register col s12' type='submit'>Login</button>
                                    <p className='validate-message center'>{this.state.logValidate}</p>
                                </form>
                            </div>
                            <div id="register" className="col s12">
                                <form>
                                    <div className="form row">
                                        <div className="input-field col s12">
                                            <input onChange={this.handleInputChange} name='nameInputValueReg' placeholder="Full name" id="full-name" type="text" className="validate" value={this.state.nameInputValueReg} />
                                            <label htmlFor="full-name">Name</label>

                                        </div>
                                        <div className="input-field col s12">
                                            <input onChange={this.handleInputChange} name='emailInputValueReg' placeholder="Email address" id="register-email" type="email" className="validate" value={this.state.emailInputValueReg} />
                                            <label htmlFor="register-email">Email</label>
                                            <p className='validate-message center' >{regEmailRes ? regEmailRes.error : null}</p>
                                        </div>
                                        <div className="input-field col s12">
                                            <input onChange={this.handleInputChange} name='passwordInputValueReg' placeholder='Minimum 6 characters' id="register-password" type="password" className="validate" value={this.state.passwordInputValueReg} />
                                            <label htmlFor="register-password">Password</label>
                                            <p className='validate-message center'  >{regPassRes ? regPassRes.error : null}</p>
                                        </div>
                                    </div>
                                    <p className='validate-message center'>{this.state.regValidate}</p>
                                    <button disabled={regEmailRes.error || regPassRes.error} className='register col s12' type='submit' onClick={this.sendRegisterReq}>Register</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default RegisterPage;