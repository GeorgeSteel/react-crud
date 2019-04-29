import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Nav from './Nav/Nav';
import Posts from './Posts';
import SinglePost from './SinglePost';

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
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
        )
    }
}
