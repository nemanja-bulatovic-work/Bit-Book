import React, { Component } from 'react';
import { fetchLoggedInUser } from '../../../services/Users'
import Profile from './Profile';
import UpdateProfile from '../../../services/UpdateProfile'
import { getDecodedId } from '../../../services/Users';

import './MyProfile.css'

class MyProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null,
            comments: [],
            posts: [],
            isShowing: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.fetchUserData();
    }

    fetchUserData = () => {
        fetchLoggedInUser()
            .then(user => {
                console.log(user);
                this.setState({
                    user: user,
                    comments: user.comments,
                    posts: user.posts
                })
            })
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.fetchUserData();
        }
    }

    handleSubmit = (body) => (e) => {
        e.preventDefault();

        UpdateProfile(getDecodedId(), body)
            .then((user) => {
                this.setState({
                    user: {
                        avatarUrl: user.avatarUrl,
                        firstName: user.name.first,
                        lastName: user.name.last,
                        biography: user.about.bio
                    }
                })
            })

        this.closeModal();
    }

    openModal = () => {
        this.setState({
            isShowing: true
        });
    }

    closeModal = () => {
        this.setState({
            isShowing: false
        });
    }

    render() {
        if (!this.state.user) {
            return null;
        }

        return (
            <>
                <Profile isShowing={this.state.isShowing} user={this.state.user} comments={this.state.comments} posts={this.state.posts} closeModal={this.closeModal} openModal={this.openModal} handleSubmit={this.handleSubmit} />
            </>
        )
    }
}

export default MyProfile