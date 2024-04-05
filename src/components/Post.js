import React from 'react';
import './Posts';
import testImg from '../logo512.png';

function Post(props) {
    return(
    <div className='post' id='post'>
        <span className='category'>{props.category}</span>
        <div className='postImg'>
            <img src={testImg}></img>
        </div>

        <div className='postInfo'>
            <h4>{props.title}</h4>
            <p>{props.description}</p>
        </div>
    </div>
    )
}

export default Post;