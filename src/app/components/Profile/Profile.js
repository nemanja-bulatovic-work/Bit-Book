import React from 'react';
import Modal from '../Modal/Modal'
import PropTypes from 'prop-types';

const Profile = (props) => {
    return (
        <div className="row center profile">
            <div className="col s12 ">
                <div className="">
                    {props.isShowing ? <Modal className="modal" show={props.isShowing} close={props.closeModal} user={props.user} handleSubmit={props.handleSubmit} /> : null}
                    <div className="card-image">
                        <img src={props.user.avatarUrl} alt="" className="circle responsive-img " />
                        <h5 className="card-title">{`${props.user.firstName} ${props.user.lastName}`}</h5>
                    </div>

                    {props.closeModal ?
                        <button data-target="modal1" className="btn modal-trigger" onClick={props.openModal} >Edit Profile</button> :
                        null}

                    <div className="card-content">
                        <p>{props.user.biography}</p>
                    </div>
                    <div className="card-action">
                        <div className="chip"><i className="fab fa-cuttlefish"></i> {props.comments.length} Comments  </div>
                        <div className="chip"><i className="fab fa-cuttlefish"></i> {props.posts.length} posts </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    comments: PropTypes.array.isRequired,
    posts: PropTypes.array.isRequired,
}

export default Profile;