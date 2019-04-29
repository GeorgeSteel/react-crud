import React, { Component } from 'react'

export default class Form extends Component {
    // Refs
    titleRef = React.createRef();
    contentRef = React.createRef();

    createPost = e => {
        e.preventDefault();

        const post = {
            title: this.titleRef.current.value,
            body: this.contentRef.current.value,
            userId: 7
        }

        this.props.createPost(post);
    }

    render() {
        return (
        <form className="col-8" onSubmit={ this.createPost }>
            <legend className="text-center">Create a new Post</legend>
            <div className="form-group">
                <label>Post Title</label>
                <input type="text" className="form-control" placeholder="Post Title" ref={this.titleRef}/>
            </div>
            <div className="form-group">
                <label>Post Content:</label>
                <textarea className="form-control" placeholder="Post Content" ref={ this.contentRef }></textarea>
            </div>
            <div className="form-group">
                <input type="submit" className="btn btn-primary" value="Create"/>
            </div>
        </form>
        )
    }
}
