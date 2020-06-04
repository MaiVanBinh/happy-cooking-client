import React from 'react';
import classes from './SwiperItem.module.css';
import image from '../../../assets/img1.png';

const swiperItem = (props) => {
    return(
    <div className={classes.SwiperSlide}>
        <div className={classes.ImgBx}>
            <img src={require('../../../assets/img1.png')} alt="" />
        </div>
        <div className={classes.Details}>
            <h3>Trứng<br/><span>Tấu Hài</span></h3>
        </div>
      </div>
    )
};

export default swiperItem;