import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Nav from './Nav/Nav';
import Posts from './Posts';
import SinglePost from './SinglePost';
import Form from './Form';
import Edit from './Edit';
import Swal from 'sweetalert2';

export default class Router extends Component {

    state = {
        posts: []
    }

    componentDidMount() {
        this.getPosts();
    }

    getPosts = () => {
        axios.get(`https://jsonplaceholder.typicode.com/posts`)
             .then(resp => {
                 this.setState({
                     posts: resp.data
                 });
             })
             .catch(err => console.error(err));
    }

    deletePost = id => {
        axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
             .then(resp => {
                 if (resp.status === 200) {
                     const posts = [...this.state.posts];
                     let result = posts.filter(post => (
                         post.id !== id
                     ));

                     this.setState({
                         posts: result
                     });                     
                 }
             })
             .catch(err => console.error(err));
    }

    createPost = post => {
        axios.post(`https://jsonplaceholder.typicode.com/posts`, { post })
            .then(resp => {
                if (resp.status === 201) {
                    Swal.fire(
                        'Post Created!',
                        'A new Post has been created!',
                        'success'
                    );

                    let postID = { id: resp.data.id };
                    const newPost = Object.assign({}, resp.data.post, postID);

                    this.setState(prevState => ({
                        posts: [...prevState.posts, newPost]
                    })); 
                } else {
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!'
                    });
                }
            })
            .catch(err => console.error(err));
    }

    updatePost = currentPost => {
        const { id } = currentPost;

        axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, { currentPost })
            .then(resp => {
                console.log(resp);
                if (resp.status === 200) {
                    Swal.fire(
                        'Post Updated!',
                        'A Post has been updated!',
                        'success'
                    );

                    let postID = resp.data.id;
                    const posts = [...this.state.posts];

                    const editPost = posts.findIndex(post => postID === post.id);

                    posts[editPost] = currentPost;

                    this.setState({ posts });
                } else {
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!'
                    });
                }
            })
            .catch(err => console.error(err));
    }

    render() {
        return (
        <BrowserRouter>
            <div className="container">
                <div className="row justify-content-center">
                    <Header/>
                    <Nav/>
                    <Switch>
                        <Route exact path="/" render={ () => {
                            return(
                                <Posts
                                    posts={ this.state.posts }
                                    deletePost={this.deletePost}
                                />
                            )
                        } }/>
                        <Route exact path="/post/:id" render={ props => {
                            const id = props.location.pathname.replace('/post/', '');
                            const posts = this.state.posts;
                            let filter;

                            filter = posts.filter(post => (
                                post.id === Number(id)
                            ));

                            return (
                                <SinglePost
                                    post={ filter[0] }
                                />
                            )
                        } } />
                        <Route exact path="/create" render={ () => {
                            return(
                                <Form
                                    createPost={ this.createPost }
                                />
                            )
                        } }/>
                        <Route exact path="/edit/:id" render={ props => {
                            const id = props.location.pathname.replace('/edit/', '');
                            const posts = this.state.posts;
                            let filter;

                            filter = posts.filter(post => (
                                post.id === Number(id)
                            ));

                            return (
                                <Edit
                                    post={ filter[0] }
                                    updatePost={ this.updatePost }
                                />
                            )
                        } } />
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
        )
    }
}
