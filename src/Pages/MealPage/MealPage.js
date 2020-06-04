import React from 'react';
import './MealPage.css';
import ListSearchMeal from '../../components/ListSearchMeal/ListSearchMeals';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions/index';
import Pagination from '../../components/Paginator/Paginator';

class MealPage extends React.Component {
    state= {
        page: 1,
        title:  null,
        role: 'user'
    }
    componentDidMount() {
        let updateSearch=null;
        const query = new URLSearchParams(this.props.location.search);
        for(let param of query.entries()) {
            updateSearch = param[1];
        }
        this.setState({title: updateSearch, role: this.props.role});
        this.props.onFetchMeals(this.state.page, updateSearch, this.props.role);
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.location.search!==this.props.location.search){
            let updateSearch=null;
            const query = new URLSearchParams(this.props.location.search);
            for(let param of query.entries()) {
                updateSearch = param[1];
            }
            this.setState({title: updateSearch, page: 1})
            this.props.onFetchMeals(1, updateSearch, this.props.role);
        }
    }
    
    nextPageHandler = () => {
        const updatePage = this.state.page + 1;
        this.setState({page: updatePage});
        this.props.onFetchMeals(updatePage, this.state.title,  this.props.role);
    }
    prevPageHandler = () => {
        const updatePage = this.state.page - 1;
        this.setState({page: updatePage});
        this.props.onFetchMeals(updatePage, this.state.title,  this.props.role);
    }
    render() {
        return(
            <div>
                <section className="sec work">
                    <ListSearchMeal meals={this.props.meals}/>
                </section>
                <Pagination 
                        next={this.props.hasNextPage}
                        prev={this.props.hasPrevPage}
                        nextClicked={this.nextPageHandler}
                        prevClicked={this.prevPageHandler}
                        />
            </div>
        );
    }
}
const mapStateToProps  = state => {
    return {
        meals: state.meals.meals,
        loading: state.meals.loading,
        hasNextPage: state.meals.hasNextPage,
        hasPrevPage: state.meals.hasPrevPage,
        currentPage: state.meals.currentPage,
        role: state.auth.role
    }
} 

const mapDispatchToProps = dispatch => {
    return {
        onFetchMeals: (page, search, role) => dispatch(actionTypes.fetchMeals(page, search, role))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MealPage);