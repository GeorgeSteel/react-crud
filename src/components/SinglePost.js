import React, { Component } from 'react'

export default class SinglePost extends Component {

    showPost = (props) => {
        if(!props.post) return null;
        const { title, body, userId } = props.post;

        return (
            <React.Fragment>
                <h1>{ title }</h1>
                <p>Author: { userId }</p>
                { body }
            </React.Fragment>
        )
    }

    render() {
        return (
        <div className="col-12 col-md-8">
            { this.showPost(this.props) }
        </div>
        )
    }
}
