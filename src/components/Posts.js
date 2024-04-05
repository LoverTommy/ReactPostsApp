import React from 'react';
import Post from './Post';
import testImg from '../logo512.png';

function Posts(props) {
    return(
      <div className='posts' id='posts'>
        {props.data.map((postData)=>{
          return(
            <Post category={postData.category}
                title={postData.title}
                description={postData.description}
            />
          )
        })}
      </div>
    )
}

export default Posts;