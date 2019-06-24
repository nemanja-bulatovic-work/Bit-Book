import React, { Component } from 'react';

import M from 'materialize-css';
import './FloatingButton.css'

class FloatingButton extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }

        this.instances = null;

    }


    componentDidMount() {
        const createButtons = document.querySelectorAll('.modal')
        const instancesOfCreateButtons = M.Modal.init(createButtons)

        const actionButton = document.querySelector('.fixed-action-btn');
        const instancesOfActionButton = M.FloatingActionButton.init(actionButton);
    }



    render() {
        return (
            <>
                <div className="fixed-action-btn">
                    <button className="btn-floating btn-large red">
                        <i className="large material-icons">+</i>
                    </button>
                    <ul>
                        <li>Post
                            <button data-target="modalPost" className="btn modal-trigger btn-floating blue">
                                <i className="material-icons"></i>
                            </button>
                        </li>
                        <li>Image
                            <button data-target="modalImage" className="btn modal-trigger btn-floating green">
                                <i className="material-icons"></i>
                            </button>
                        </li>
                        <li>Video
                            <button data-target="modalVideo" className="btn modal-trigger btn-floating red">
                                <i className="material-icons"></i>
                            </button>
                        </li>
                    </ul>
                </div>

                <div id="modalPost" className="modal">
                    <div className="modal-content">
                        <h4>New Text Post</h4>
                        <div className="row">
                            <div className="input-field col s12">
                                <label className="active" htmlFor="post-content">Post content</label>
                                <input value={this.props.postContent} onChange={this.props.changeInputValues} id="post-content" name="postContent" type="text" className="validate" />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="modal-close blue waves-effect waves-blue btn">Close</button>
                        <button onClick={this.props.createTextPost} className="modal-close blue waves-effect waves-blue btn">Post</button>
                    </div>
                </div>

                <div id="modalImage" className="modal">
                    <div className="modal-content">
                        <h4>New Image Post</h4>
                        <div className="row">
                            <div className="input-field col s12">
                                <label className="active" htmlFor="image-url">Image URL</label>
                                <input value={this.props.imageUrl} onChange={this.props.changeInputValues} id="image-url" name="imageUrl" type="text" className="validate" />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="modal-close blue waves-effect waves-blue btn">Close</button>
                        <button onClick={this.props.createImagePost} className="modal-close blue waves-effect waves-blue btn">Post</button>
                    </div>
                </div>

                <div id="modalVideo" className="modal">
                    <div className="modal-content">
                        <h4>New Video Post</h4>
                        <div className="row">
                            <div className="input-field col s12">
                                <label className="active" htmlFor="video-url">YouTube video link</label>
                                <input value={this.props.videoUrl} onChange={this.props.changeInputValues} id="video-url" name="videoUrl" type="text" className="validate" />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="modal-close blue waves-effect waves-blue btn">Close</button>
                        <button onClick={this.props.createVideoPost} className="modal-close blue waves-effect waves-blue btn">Post</button>
                    </div>
                </div>
            </>
        );
    }
}

export default FloatingButton;