import React, { Component } from 'react';
import { fetchSinglePost } from '../../../services/Posts';
import { getDecodedId } from '../../../services/Users';
import { postComment, fetchCommentsByPostId, fetchDeleteComment } from '../../../services/Comments';

import './SinglePost.css'

class SinglePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: null,
            comments: [],
            commentInputValue: '',
        }

        this.changeValue = this.changeValue.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
        this.submitComment = this.submitComment.bind(this);
    }

    componentDidMount() {
        fetchSinglePost(this.props.match.params.id)
            .then((post) => {

                fetchCommentsByPostId(this.props.match.params.id)
                    .then((comments) => {
                        const reversedComments = comments.reverse()
                        this.setState({
                            post,
                            comments: reversedComments
                        })
                    })
            })
    }

    changeValue(e) {
        this.setState({
            commentInputValue: e.target.value,
        })
    }

    submitComment(e) {
        e.preventDefault();

        const body = {
            sid: Math.random() * 1000000,
            userId: getDecodedId(),
            postId: this.props.match.params.id,
            body: this.state.commentInputValue,
            isPublic: true
        }

        postComment(body)
            .then((comment) => {
                console.log(comment);

                fetchCommentsByPostId(this.props.match.params.id)
                    .then((comments) => {
                        const reversedComments = comments.reverse()
                        this.setState({
                            comments: reversedComments,
                            commentInputValue: ''
                        })
                    })
            })
    }

    deleteComment = (e) => {
        e.preventDefault();

        fetchDeleteComment(e.target.id)
            .then((res) => {
                console.log(res);

                fetchCommentsByPostId(this.props.match.params.id)
                    .then((comments) => {
                        const reversedComments = comments.reverse()
                        this.setState({
                            comments: reversedComments,
                            commentInputValue: ''
                        })
                    })
            })
    }

    showPost() {
        if (!this.state.post) {
            return <h1>Loading</h1>;
        }

        if (this.state.post.isText()) {
            return (
                <div key={this.state.post.id} className="row post">
                    <div className="col s12">
                        <div className="card teal lighten-4">
                            <div className="card-content brown-text text-darken-4">
                                <p className='center'>{this.state.post.text}</p>
                            </div>
                            <div className="card-action">
                                <a className='brown-text text-darken-4' href="/">Text post</a>
                                <a className='right brown-text text-darken-4' href="/">{this.state.comments.length} Comments</a>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else if (this.state.post.isPicture()) {
            return (
                <div key={this.state.post.id} className="row post">
                    <div className="col s12">
                        <div className="card teal lighten-4">
                            <div className="card-image">
                                <img src={this.state.post.imageUrl} alt='Something' />
                            </div>
                            <div className="card-action">
                                <a className='brown-text text-darken-4' href="/">Image post</a>
                                <a className='right brown-text text-darken-4' href="/">{this.state.comments.length} Comments</a>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div key={this.state.post.id} className="row post">
                    <div className="col s12">
                        <div className="card teal lighten-4">

                            <div key={this.state.post.id}>
                                <iframe title={this.state.post.id} width="100%" height='400px' src={this.state.post.videoUrl} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            </div>
                            <div className="card-action">
                                <a className='brown-text text-darken-4' href="/">Video post</a>
                                <a className='right brown-text text-darken-4' href="/">{this.state.comments.length} Comments</a>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    showComments() {
        return this.state.comments.map((comment) => {
            return (
                <div key={comment.id} className="row">
                    <div className="col s12">
                        <div className="card">
                            <div className="card-image">
                                {comment.userId === getDecodedId()
                                    ? <button id={comment.id} onClick={this.deleteComment} className='delete right'>x</button>
                                    : null
                                }
                                <img className='comment-image' src={comment.userAvatarUrl ? comment.userAvatarUrl : 'http://via.placeholder.com/125'} alt='Something' />
                            </div>
                            <div className="card-content">
                                <p>{comment.body}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    render() {
        return (
            <>
                {this.showPost()}
                <form method='POST' action='/'>
                    <input type='text' placeholder='Add your comment' value={this.state.commentInputValue} onChange={this.changeValue} />
                    <input type='submit' className='teal white-text' onClick={this.submitComment} disabled={this.state.commentInputValue ? false : true} />
                </form>
                {this.showComments()}
            </>
        );
    }
}

export default SinglePost;