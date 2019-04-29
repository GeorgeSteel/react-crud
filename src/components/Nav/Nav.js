import React from 'react';
import { Link } from 'react-router-dom';
import './nav.css';

const Nav = () => {
    return (
        <nav className="col-12 col-md-8">
            <Link to={'/'}>All Posts</Link>
            <Link to={'/create'}>New Post</Link>
        </nav>
    );
};

export default Nav;