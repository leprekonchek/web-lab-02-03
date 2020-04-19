import React from 'react';
import {Link, useHistory} from 'react-router-dom';

const Add = () => {
    const history = useHistory();
    let today = new Date();
    today = String(today.getMonth() + 1).padStart(2, '0')
        + '.' + String(today.getDate()).padStart(2, '0')
        + '.' + today.getFullYear();

    const addRecipe = async ({name, shortDesc, longDesc, category}) => {
        return await fetch('http://localhost:3001/recipes', {
            method: 'POST',
            body: JSON.stringify({
                name,
                category,
                image: '',
                shortDesc: shortDesc,
                longDesc: longDesc,
                createDate: today,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    };

    return (
        <div style={{margin: "10%"}}>
            <form onSubmit={async (e) => {
                e.persist();
                e.preventDefault();
                const {target: {elements: {name, short, long, category}}} = e;
                await addRecipe({
                    name: name.value,
                    shortDesc: short.value,
                    longDesc: long.value,
                    category: category.value,
                });
                history.push('/recipes');
            }}>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <input type="text" name="name" placeholder="Name"/>
                    <input type="text" name="short" placeholder="Ingredients"/>
                    <textarea name="long" placeholder="Steps how to prepare"/>
                    <input type="text" name="category" placeholder="Category"/>
                    <input type="submit" value="Додати рецепт"/>
                </div>
            </form>
        </div>
    );
}

export default Add;
