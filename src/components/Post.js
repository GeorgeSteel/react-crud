import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Post extends Component {
    render() {
    const { id, title } = this.props.data;

        return (
        <tr>
            <td>{ id }</td>
            <td>{ title }</td>
            <td>
                <Link to={`/post/${id}`} className="btn btn-primary">Read</Link>
                <button className="btn btn-danger">Delete</button>
            </td>
        </tr>
        )
    }
    }
