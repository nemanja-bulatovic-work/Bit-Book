import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { fetchNumOfComments } from '../../../services/Comments';

class CommentsCount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentsCount: "-"
        }
    }

    componentDidMount() {
        fetchNumOfComments(this.props.postId)
            .then((commentsCount) => {
                this.setState({
                    commentsCount
                })
            })
    }

    render() {
        return (
            <Link className='right brown-text text-darken-4' to={`/feeds/${this.props.postId}`}>{this.state.commentsCount} Comments</Link>
        );
    }
}

export default CommentsCount;