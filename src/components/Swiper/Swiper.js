import React from 'react';
import Swiper from 'react-id-swiper';
import classes from './Swiper.module.css';
import image from '../../assets/img1.png';
import './Swiper.css';

class CoverFlowEffect extends React.Component {
  state = {
    number: 10
  }
  render(){
    const params = {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      coverflowEffect: {
        rotate: 30,
        stretch: 0,
        depth: 200,
        modifier: 1,
        slideShadows: true
      },
      pagination: {
        el: '.swiper-pagination'
      },
      loop: true,
      autoplay: {
        deplay:2500,
        disableOnInteraction: false
      }
    }
    const swiperListItems = [];
    for(let i = 0; i < this.state.number; i++){
      swiperListItems.push(<div className={classes.SwiperSlide} key={i}>
                                            <div className={classes.ImgBx}>
                                                <img src={image} alt="" />
                                            </div>
                                            <div className={classes.Details}>
                                                <h3>Trứng<br/><span>Tấu Hài</span></h3>
                                            </div>
                                          </div>);
    }
    return(
      <div className={classes.SwiperContainer}>
        <div className={classes.Title}>
            <h2>Món Ăn Theo Nguyên Liệu</h2>
            <span></span>
        </div>
        <Swiper {...params} style={{zIndex: '0'}}>
        {swiperListItems}
      </Swiper>
      </div>
    );
  }
};
export default CoverFlowEffect;