import React from 'react';
import Banner from '../../components/Banner/Banner';
import Swiper from '../../components/Swiper/Swiper';
import Aux  from '../../hoc/Auxiliary/Auxiliary';
import Meals from '../../components/MealsBox/MealsBox';
import Contact from '../../components/Contact/Contact';

class Homepage extends React.Component {
    render() {
        return(
            <Aux>
                <Banner />
                <Swiper />
                <Meals />
                <Contact />
            </Aux>
        );
    }
}

export default Homepage;