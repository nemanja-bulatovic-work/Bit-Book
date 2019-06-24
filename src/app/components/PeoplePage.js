import React, { Component } from 'react';
import { fetchUsers } from '../../services/Users';
import { Link } from 'react-router-dom';

import './PeoplePage.css'

class PeoplePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            inputValue: '',
        }

        this.changeValue = this.changeValue.bind(this);
    }

    componentDidMount() {
        fetchUsers().then((users) => {
            this.setState({
                users
            })
        })
    }

    changeValue(e) {
        this.setState({
            inputValue: e.target.value
        })
    }

    showSearch() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <form>
                        <div className="input-field">
                            <input id="search" type="search" required value={this.state.inputValue} onChange={this.changeValue} />
                            <label className="label-icon" htmlFor="search">
                                <i className="fas fa-search"></i>
                            </label>
                        </div>
                    </form>
                </div>
            </nav>
        );
    }

    showPeople() {
        return this.state.users
            .filter((user) => {
                const fullName = `${user.firstName} ${user.lastName}`;
                return fullName.toLowerCase().includes(this.state.inputValue.toLowerCase())
            })
            .map((user) => (
                <div key={user.id} className='row user clearfix valign-wrapper'>
                    <div className='image left col s2'>
                        <img className="img-people" src={user.avatarUrl} alt='Something..' />
                    </div>
                    <div className='info col s9'>
                        <h5><Link to={`profile/${user.id}`}>{`${user.firstName} ${user.lastName}`}</Link></h5>
                        <p>Short user description: {user.biography}</p>
                    </div>
                    <div className='right col s1'>
                        <p>Registered on: <b>{user.createdAt}</b></p>
                    </div>
                </div>
            )
            )
    }

    render() {
        return (
            <>
                {this.showSearch()}
                {this.showPeople()}
            </>
        )
    }
}

export default PeoplePage;