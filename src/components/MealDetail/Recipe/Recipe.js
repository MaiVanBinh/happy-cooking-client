import React from 'react';
import classes from './Recipe.module.css';
const ingredient = (props) => {
    return (
        <section className={classes.Section}>
            <h1>Công thức</h1>
            <div className={classes.Text} dangerouslySetInnerHTML={{__html: props.recipe}}></div>
        </section>
    );
}

export default ingredient;