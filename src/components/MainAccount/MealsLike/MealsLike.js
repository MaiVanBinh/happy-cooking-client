import React from 'react';
import classes from './MealsLike.module.css';
import MealLike from './MealLike/MealLike';
import Modal from '../../UI/Modal/Model';
import AddMeal from '../AddMeal/AddMeal';
import Button from '../../UI/Button/Button';
import axios from '../../../axiosInstance';

class MealsLike extends React.Component {
    state = {
        isAddNew: true,
        adding: false,
        isViewsMeal: true,
        updateMeal: null
    }

    componentDidMount() {
        if(!this.props.viewsMeal) {
            this.setState({isViewsMeal: false})
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps.viewsMeal !== this.props.viewsMeal){
            if(!this.props.viewsMeal) {
                this.setState({isViewsMeal: false});
            } else {
                this.setState({isViewsMeal: true, adding: false});
            }
        }
    }

    showAddHandler = () => {
        this.setState({adding: true, isAddNew: true});
    }

    updateMealClickHanlder = (mealId) => {
        axios.get('/meals/' + mealId)
            .then(res => {
                this.setState({updateMeal: res.data.meal, isAddNew: false})
            })
            .catch(e => {
                console.log(e);
            })
            this.setState({adding: true});
    }

    cancelAddMealHandler = () => {
        this.setState({adding: false, updateMeal: null});
    }

    render() {
        let mealsLike= <p style={{textAlign: 'center'}}>Không có món ăn nào trong danh sách</p>;
        if(this.props.list.length > 0){
            mealsLike = this.props.list.map(meal => {
                return (
                    <MealLike 
                        key={meal._id} 
                        meal={meal} 
                        mode={this.props.viewsMeal}
                        updateClick={() => this.updateMealClickHanlder(meal._id)}
                        show={!this.state.isViewsMeal}
                        />);
            });
        }
        return (
            <section className={classes.Section}>
                <h1>Danh sách món ăn bạn đã thêm</h1>
                {!this.props.viewsMeal ? 
                    <div className={classes.Button}>
                        <Button btnType='Success' clicked={this.showAddHandler}>Thêm món ăn mới</Button>
                    </div> : null}
                <Modal show={this.state.adding && !this.state.isViewsMeal} BackdropClicked={this.cancelAddMealHandler}>
                    <AddMeal mealUpdate={this.state.updateMeal} isAddNew={this.state.isAddNew} show={this.state.adding && !this.state.isViewsMeal} />
                </Modal>
                <div className={classes.Flex}>
                    <div className={classes.UserLikeMeal}>
                    {mealsLike}
                    </div>
                </div>
            </section>
        );
    }
}

export default MealsLike;