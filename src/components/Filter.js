import React from 'react';

function Filter(props) {

    const [categories, setCategories] = React.useState([
        'Основной',
        'Игры',
        'Фильмы',
        'Новости',
    ])

    const [active, setActive] = React.useState();

    const postFilter = (eo) => {
        props.changeFilter(eo.target.textContent);
        setActive(eo.target.textContent);
        if(eo.target.textContent === 'Очистить') {
            setActive();
        }
    }

    return(
        <div className='filter' id='filter'>
            {categories.map((category) =>{
                return (
                    <span onClick={postFilter} className={category === active ? 'active' : ''}>{category}</span>
                )
            })}
            <span className='clear' onClick={postFilter}>Очистить</span>
        </div>
    )
}

export default Filter;