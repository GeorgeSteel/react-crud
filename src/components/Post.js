import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export default class Post extends Component {
    confirmDelete = () => {
        const { id } = this.props.data;
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
                this.props.deletePost(id);
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
          })

        
    }

    render() {
    const { id, title } = this.props.data;

        return (
            <tr>
                <td>{ id }</td>
                <td>{ title }</td>
                <td>
                    <Link to={`/post/${id}`} className="btn btn-primary">Read</Link>
                    <Link to={`/edit/${id}`} className="btn btn-warning">Edit</Link>
                    <button 
                        className="btn btn-danger" 
                        onClick={ this.confirmDelete }
                        >
                        Delete
                    </button>
                </td>
            </tr>
        )
    }
    }
