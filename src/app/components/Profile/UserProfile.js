import React, { Component } from 'react';
import Profile from './Profile';
import { fetchUserById } from '../../../services/Users';

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            comments: [],
            posts: [],
            isShowing: false
        }
    }

    componentDidMount() {
        fetchUserById(this.props.match.params.id)
            .then(user => {
                this.setState({
                    user: user,
                    comments: user.comments,
                    posts: user.posts
                })
            })
    }

    render() {

        if (!this.state.user) {
            return null;
        }

        return (
            <>
                <Profile isShowing={this.state.isShowing} user={this.state.user} comments={this.state.comments} posts={this.state.posts} closeModal={this.closeModal} openModal={this.openModal} />
            </>
        );
    }
}

export default UserProfile;