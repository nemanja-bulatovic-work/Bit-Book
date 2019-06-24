import React, { Component } from 'react';
import { fetchPosts, fetchCreatePost, fetchDeletePost } from '../../../services/Posts';
import FloatingButton from '../FloatingButton';
import PostItem from './PostItem';

class PostsFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            allPosts: true,
            onlyImages: false,
            onlyVideos: false,
            onlyText: false,
            postContent: '',
            imageUrl: '',
            videoUrl: '',

        }

        this.changeInputValues = this.changeInputValues.bind(this);
        this.createTextPost = this.createTextPost.bind(this);
        this.createImagePost = this.createImagePost.bind(this);
        this.createVideoPost = this.createVideoPost.bind(this);
        this.deletePost = this.deletePost.bind(this);

        this.filterText = this.filterText.bind(this);
        this.filterVideos = this.filterVideos.bind(this);
        this.filterImages = this.filterImages.bind(this);
        this.allPosts = this.allPosts.bind(this);
    }

    changeInputValues(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentDidMount() {
        fetchPosts()
            .then((posts) => {
                const reversedPosts = posts.reverse()
                this.setState({
                    posts: reversedPosts
                })
            })
    }

    createTextPost(e) {
        e.preventDefault()

        const body = {
            sid: Math.random() * 1000000,
            type: 'text',
            text: this.state.postContent,
            isPublic: true
        }

        fetchCreatePost(body)
            .then((post) => {
                console.log(post);
                fetchPosts()
                    .then((posts) => {
                        const reversedPosts = posts.reverse()
                        this.setState({
                            posts: reversedPosts
                        })
                    })
            })
    }

    createImagePost(e) {
        e.preventDefault()

        const body = {
            sid: Math.random() * 1000000,
            type: 'image',
            imageUrl: this.state.imageUrl,
            isPublic: true
        }

        fetchCreatePost(body)
            .then((post) => {
                console.log(post);
                fetchPosts()
                    .then((posts) => {
                        const reversedPosts = posts.reverse()
                        this.setState({
                            posts: reversedPosts
                        })
                    })
            })
    }

    createVideoPost(e) {
        e.preventDefault()

        const body = {
            sid: Math.random() * 1000000,
            type: 'video',
            videoUrl: this.state.videoUrl,
            isPublic: true,
        }

        fetchCreatePost(body)
            .then((post) => {
                console.log(post);
                fetchPosts()
                    .then((posts) => {
                        const reversedPosts = posts.reverse()
                        this.setState({
                            posts: reversedPosts
                        })
                    })
            })
    }

    deletePost(e) {
        e.preventDefault();

        fetchDeletePost(e.target.id)
            .then((res) => {
                console.log(res);

                fetchPosts()
                    .then((posts) => {
                        const reversedPosts = posts.reverse()
                        this.setState({
                            posts: reversedPosts
                        })
                    })
            })
    }

    showPosts() {
        if (!this.state.posts.length) {
            return <h1 className='center'>Loading...</h1>
        }

        if (this.state.allPosts) {
            return this.state.posts.map((post) => {
                if (post.isText()) {
                    return (
                        <PostItem deletePost={this.deletePost} key={post.id} post={post} type='Text' />
                    )
                } else if (post.isPicture()) {
                    return (
                        <PostItem deletePost={this.deletePost} key={post.id} post={post} type='Image'
                        />
                    )
                } else {
                    return (
                        <PostItem deletePost={this.deletePost} key={post.id} post={post} type='Video' />
                    )
                }
            })
        } else if (this.state.onlyImages) {
            return this.state.posts.map((post) => {
                if (post.isPicture()) {
                    return (
                        <PostItem deletePost={this.deletePost} key={post.id} post={post} type='Image' />
                    )
                }
                return null;
            })
        } else if (this.state.onlyText) {
            return this.state.posts.map((post) => {
                if (post.isText()) {
                    return (
                        <PostItem deletePost={this.deletePost} key={post.id} post={post} type='Text' />
                    )
                }
                return null;
            })
        } else {
            return this.state.posts.map((post) => {
                if (post.isVideo()) {
                    return (
                        <PostItem deletePost={this.deletePost} key={post.id} post={post} type='Video' />
                    )
                }
                return null
            })
        }
    }

    filterText(e) {
        this.setState({
            allPosts: false,
            onlyImages: false,
            onlyVideos: false,
            onlyText: true,
        })
    }

    filterVideos(e) {
        this.setState({
            allPosts: false,
            onlyImages: false,
            onlyVideos: true,
            onlyText: false,
        })
    }

    filterImages(e) {
        this.setState({
            allPosts: false,
            onlyImages: true,
            onlyVideos: false,
            onlyText: false,
        })
    }

    allPosts(e) {
        this.setState({
            allPosts: true,
            onlyImages: false,
            onlyVideos: false,
            onlyText: false,
        })
    }

    render() {
        return (
            <>
                <div className='row'>
                    <button className="waves-effect waves-light btn col s3" onClick={this.allPosts}>All Posts</button>
                    <button className="waves-effect waves-light btn col s3" onClick={this.filterImages}>Images</button>
                    <button className="waves-effect waves-light btn col s3" onClick={this.filterVideos}>Videos</button>
                    <button className="waves-effect waves-light btn col s3" onClick={this.filterText}>Text</button>
                </div>
                {this.showPosts()}
                <FloatingButton changeInputValues={this.changeInputValues} postContent={this.state.postContent} imageUrl={this.state.imageUrl} videoUrl={this.state.videoUrl} createTextPost={this.createTextPost} createImagePost={this.createImagePost} createVideoPost={this.createVideoPost} />
            </>
        );
    }
}

export default PostsFeed;