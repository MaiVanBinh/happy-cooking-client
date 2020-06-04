import React from 'react';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import classes from './CheckMeal.module.css';
import axios from '../../../axiosInstance';
import {connect} from 'react-redux';

class CheckMeal extends React.Component {
    state = {
        content: {
            mode: true,
            isSignup: true,
            elementType: 'input',
            elementConfig: {
                type: 'textarea',
                placeholder: 'Nhập bình luận'
            },
            value: '',
            validation: {
                required: true,
                minLength: 2
            },
            valid: false,
            touched: false
        },
        show: false,
        page: 1
    }

    inputChangeHandler = (event) => {
        const content = {...this.state.content};
        content.value = event.target.value;
        this.setState({content: content})
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        let config = {
            headers: {
                Authorization: 'Bearer ' + this.props.token,
                'Content-Type': 'application/json'
            }
          }
        axios.patch('/meals/' + this.props.mealId+'/meal-comfirm', {
            content: this.state.content.value,
            mode: this.state.mode
        }, config)
        .then(res => {
            console.log(res.data)
        })
        .catch(e => {
            console.log(e);
        })
    }

    render() {
        return(
            <section className={classes.Section}>
                <h1>Xác nhận món ăn</h1>
                <form className = {classes.CommentBox} onSubmit={this.onSubmitHandler}>
                    <h4>Tin nhắn xác nhận</h4>
                    <Input
                        elementType={"textarea"}
                        elementConfig={this.state.content.elementConfig}
                        value={this.state.content.value}
                        touched={this.state.content.touched}
                        changed={this.inputChangeHandler}
                        invalid={!this.state.content.valid}
                        shouldValidate={this.state.content.validation}
                    />
                    <Button btnType="Success" type="submit" clicked={() => (this.setState({mode: true}))} disabled={this.state.content.value === ''}>Thông qua</Button>
                    <Button btnType="Danger" type="submit" clicked={() => (this.setState({mode: false}))} disabled={this.state.content.value === ''}>Không thông qua</Button>
                </form>
            </section>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token
    }
}
export default connect(mapStateToProps)(CheckMeal);