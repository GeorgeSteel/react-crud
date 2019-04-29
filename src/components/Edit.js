import React, { Component } from 'react'

export default class Edit extends Component {
   // Refs
    titleRef = React.createRef();
    contentRef = React.createRef();

    editPost = e => {
        e.preventDefault();

        const post = {
            title: this.titleRef.current.value,
            body: this.contentRef.current.value,
            userId: 7,
            id: this.props.post.id
        }

        this.props.updatePost(post);
    }

    loadForm = () => {
        if(!this.props.post) return null;

        const { title, body } = this.props.post;

        return(
            <form className="col-8" onSubmit={ this.editPost }>
                <legend className="text-center">Update Post</legend>
                <div className="form-group">
                    <label>Post Title</label>
                    <input type="text" className="form-control" defaultValue={title} placeholder="Post Title" ref={this.titleRef}/>
                </div>
                <div className="form-group">
                    <label>Post Content:</label>
                    <textarea className="form-control" defaultValue={body} placeholder="Post Content" ref={ this.contentRef }></textarea>
                </div>
                <div className="form-group">
                    <input type="submit" className="btn btn-primary" value="Update Post"/>
                </div>
            </form>
        );
    }

    render() {
        return (
            <React.Fragment>
                { this.loadForm() }
            </React.Fragment>
        )
    }
    }
