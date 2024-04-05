import React, { useState } from 'react';
import closeIcon from '../images/close.png';

function CreatePost(props) {
    const [formShow, setFormShow] = React.useState(false);

    const showForm = () => {
        formShow ? setFormShow(false) : setFormShow(true);
    }

    const [nameInput, setNameInput] = useState();
    const [descriptionInput, setDescriptionInput] = useState();
    const [categoryInput, setCategoryInput] = useState();

    const [nameInputError, setNameInputError] = useState(true);
    const [descriptionInputError, setDescriptionInputError] = useState(true);
    const [categoryError, setCategoryError] = useState(true);
    
    const changeNameState = (eo) => {
        setNameInput(eo.target.value);

        if(eo.target.value.length < 4) {
            setNameInputError(true);
        }else {
            setNameInputError(false);
        }
    }

    const changeDescriptionState = (eo) => {
        setDescriptionInput(eo.target.value);


        if(eo.target.value.length < 20) {
            setDescriptionInputError(true);
        }else {
            setDescriptionInputError(false);
        }
    }

    const changeCategoryState = (eo) => {
        setCategoryInput(eo.target.value);
        setCategoryError(false);
    }

    function formSubmit(eo) {
        if(!nameInputError && !descriptionInputError && !categoryError) {
            eo.preventDefault();
            var postData = {
                title: nameInput,
                description: descriptionInput,
                category: categoryInput,
            }

            props.onSavePostData(postData);      

            setNameInput('');
            setDescriptionInput('');
            setCategoryInput('');

            setNameInputError(true);
            setDescriptionInputError(true);
            setCategoryError(true);

            setFormShow(false)
        }else {
            eo.preventDefault();
        }
    }

    return (
        <div className='createPost'>
            <button id='createPostButton' className='createPostButton' onClick={showForm}>Создать пост</button>

            <form className={`postForm ${formShow ? 'postShowAnimation' : ''} `} id='postForm' name='postForm' onSubmit={formSubmit}>
                <img onClick={showForm}src={closeIcon}></img>
                <div className='name'>
                <label>Название статьи:</label>
                <input type='text' name='postName' className='postName' id='postName' onChange={changeNameState} value={nameInput}></input>
                <span id='nameError' className={nameInputError ? 'error' : ''}>Ваше название должно быть не меньше 4 символов.</span>
                </div>

                <div className='description'>
                <label>Описание:</label>
                <textarea name='postDescription' className='postDescription' id='postDescription' onChange={changeDescriptionState} value={descriptionInput}></textarea>
                <span id='descriptionError' className={descriptionInputError ? 'error' : ''}>Ваше описание должно быть не маньше 20 символов.</span>
                </div>

                <div className='category'>
                <label>Категория:</label>
                <select onChange={changeCategoryState} value={categoryInput}>
                    <option></option>
                    <option>Основной</option>
                    <option>Игры</option>
                    <option>Фильмы</option>
                    <option>Новости</option>
                </select>
                <span id='categoryError' className={categoryError ? 'error' : ''}>Пожалуйста, выберите категорию к которой относится ваш пост.</span>
                </div>
                <button id='post' className='post'>Опубликовать</button>
            </form>
            
        </div>
    )
}

export default CreatePost;