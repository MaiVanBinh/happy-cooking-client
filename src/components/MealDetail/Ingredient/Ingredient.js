import React from 'react';
import classes from './Ingredient.module.css';
const ingredient = (props) => {
    return (
        <section className={classes.Section}>
            <h1>Thành phần</h1>
            <div className={classes.Text} dangerouslySetInnerHTML={{__html: props.ingredients}}>
            </div>
        </section>
    );
}

export default ingredient;