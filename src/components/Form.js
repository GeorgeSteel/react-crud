import React, { Component } from 'react'

export default class Form extends Component {
  render() {
    return (
      <form className="col-8">
        <legend className="text-center">Create a new Post</legend>
        <div className="form-group">
            <label>Post Title</label>
            <input type="text" className="form-control" placeholder="Post Title"/>
        </div>
        <div className="form-group">
            <label>Post Content:</label>
            <textarea className="form-control" placeholder="Post Content"></textarea>
        </div>
        <div className="form-group">
            <input type="submit" className="btn btn-primary" value="Create"/>
        </div>
      </form>
    )
  }
}
