import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getDecodedId } from '../../../services/Users';
import CommentsCount from './CommentsCount';
import PropTypes from "prop-types";

class PostItem extends Component {
    constructor(props) {
        super(props);
        this.state = {}

    }

    static propTypes = {
        post: PropTypes.object.isRequired,
        type: PropTypes.string.isRequired,
        deletePost: PropTypes.func.isRequired,
    }

    render() {
        return (
            <div className="row">
                <div className="col s12">
                    <div className="card teal lighten-4">
                        {this.props.post.userId === getDecodedId()
                            ? <button id={this.props.post.id} onClick={this.props.deletePost} className='delete right'>x</button>
                            : null
                        }
                        {this.props.type === 'Text'
                            ? <div className="card-content brown-text text-darken-4">
                                <p className='center'>{this.props.post.text}</p>
                            </div>
                            : null}

                        {this.props.type === 'Image'
                            ? <div className="card-image">
                                <img src={this.props.post.imageUrl} alt='Something' />
                            </div>
                            : null}

                        {this.props.type === 'Video'
                            ? <div>
                                <iframe title={this.props.post.id} width="100%" height='400px' src={this.props.post.videoUrl} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            </div>
                            : null}

                        <div className="card-action">
                            <Link to={`/feeds/${this.props.post.id}`} className='brown-text text-darken-4'>{this.props.type} post</Link>
                            <CommentsCount postId={this.props.post.id} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PostItem;