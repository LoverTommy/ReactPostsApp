import React, { useState } from 'react';
import CreatePost from './components/CreatePost';
import Posts from './components/Posts';
import testImg from './logo512.png';
import Filter from './components/Filter';
import $ from 'jquery';

// function createApi() {
  //   $.ajax({
    //     url: 'https://fe.it-academy.by/AjaxStringStorage2.php', type: 'POST', cache: false, dataType: 'json',
    //     data: {f: 'INSERT', n: 'PEEPREACT_POSTSAPP_DATABASE', v: JSON.stringify([])}
    //   })
    // }
    
//     const DBUrl = 'https://fe.it-academy.by/AjaxStringStorage2.php';
//     const DBName = 'PEEPREACT_POSTSAPP_DATABASE';
//     var password = '';
    
//     const lockGetDB = () => {
//         password = Math.random();
      
//         $.ajax({
//             url: DBUrl, type: 'POST', cache: false, dataType: 'json',
//     data: {f: 'LOCKGET', n: DBName, p: password},
//     success: lockGetSuccess, error: ajaxError
//   })
// }

// const lockGetSuccess = (data) => {
//   const parseData = [{
//     category: 'Основной',
//     title: 'Введение',
//     description: 'Данная страница даёт вам возможность создать любой пост, который увидят все её пользователи.'
//   }]

//   $.ajax({
//     url: DBUrl, type: 'POST', cache: false, dataType: 'json',
//     data: {f: 'UPDATE', n: DBName, p: password, v: JSON.stringify(parseData)},
//     success: UpdateSuccess, error: ajaxError
//   })
// }

// const UpdateSuccess = () => {
//   console.log('updateSuccess')
// }

// const ajaxError = (jqXHR,statusStr,errorStr) => {
//   console.log(statusStr+' '+errorStr);
// }

// lockGetDB()

// ReadDB()



function App() {

  const [defaultPostData, updateDefaultPostData] = useState();
  
  const [postDataListener, updatePostData] = useState();

  const [pushNewData, pushNewDataFunc] = useState();

  var DBData = '';
  
  const DBUrl = 'https://fe.it-academy.by/AjaxStringStorage2.php';
  const DBName = 'PEEPREACT_POSTSAPP_DATABASE';
  var password = '';
  

  const ReadDB = () => {
    $.ajax({
      url: DBUrl, type: 'POST', cache: false, dataType: 'json',
      data: {f: 'READ', n: DBName},
      success: ReadSuccess, error: ajaxError
    })
  }
  
  const ReadSuccess = (data) => {
    DBData = JSON.parse(data.result);

    updateDefaultPostData(DBData);
    updatePostData(DBData);
  }
  
  const ajaxError = (jqXHR,statusStr,errorStr) => {
    console.log(statusStr+' '+errorStr);
  }

  const lockGetDB = () => {
    password = Math.random();
  
    $.ajax({
      url: DBUrl, type: 'POST', cache: false, dataType: 'json',
      data: {f: 'LOCKGET', n: DBName, p: password},
      success: lockGetSuccess, error: ajaxError
    })
  }
  
  const lockGetSuccess = (data) => {
    DBData = JSON.parse(data.result);

    DBData.push(pushNewData);
    
    pushNewDataFunc();

    $.ajax({
      url: DBUrl, type: 'POST', cache: false, dataType: 'json',
      data: {f: 'UPDATE', n: DBName, p: password, v: JSON.stringify(DBData)},
      success: UpdateSuccess, error: ajaxError
    })
  }
  
  const UpdateSuccess = () => {
    console.log('updateSuccess')
  }
  
  if(!defaultPostData) {
    window.addEventListener('load', ReadDB);
  }

  {pushNewData && 
    lockGetDB()
  }
  
  const savePostData = (getPostData) => {
    updateDefaultPostData([getPostData, ...defaultPostData])
    updatePostData([getPostData, ...defaultPostData])
    pushNewDataFunc(getPostData);
  }

  const changeFilter = (filter) => {
    const filterPosts = [];
    for(let i of defaultPostData) {
      if(filter == 'Очистить') {
        updatePostData(defaultPostData);
      }
      if(i.category == filter) {
        filterPosts.push(i);
        updatePostData(filterPosts);
      }
    }
  }

    return (
      <div className='main' id='main'>
        <CreatePost onSavePostData = {savePostData} ></CreatePost>
        <Filter changeFilter={changeFilter}></Filter>
        {
          postDataListener && <Posts data={postDataListener}></Posts>
        }
      </div>
    )

}

export default App;
