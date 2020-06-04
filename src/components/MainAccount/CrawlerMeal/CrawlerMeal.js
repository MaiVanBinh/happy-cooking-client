import React from 'react';
import classes from './CrawlerMeal.module.css';
import Button from '../../UI/Button/Button';
import axios from '../../../axiosInstance';
import {connect} from 'react-redux';
import ListSearchMeal from '../../ListSearchMeal/ListSearchMeals';

class CrawlerMeal extends React.Component {
    state = {
        title: '',
        imageUrl: null,
        loading: false,
        listMeal: null
    }
    onChangeInputHandler = (event) => {
      this.setState({title: event.target.value});   
    };
    crawlerData = (event) => {
        event.preventDefault();
        let config = {
          headers: {
              Authorization: 'Bearer ' + this.props.token,
              'Content-Type': 'application/json'
          }
        }
        axios.post('/admin/ad/crawler-data?videoTitle=' + this.state.title,{}, config)
          .then(res => this.setState({listMeal: res.data.meals}))
          .catch(e => console.log(e));
    }
    render() {
        return (
            <section className={classes.Section}>
              <h1>Thông tin cá nhân của bạn</h1>
              <form onSubmit={this.crawlerData} className={classes.Form}>
                <div className={classes.Input}>
                    <label className={classes.Label}>Tên</label>
                    <input
                        type='text'
                        className={classes.InputElement}
                        onChange={this.onChangeInputHandler}
                        value={this.state.title}
                        placeholder="Nhập tên món ăn cần tìm kiếm"
                    />
                </div>
                <Button btnType="Success" type="submit">Gửi</Button>
              </form>
              {this.state.listMeal ? <ListSearchMeal meals={this.state.listMeal} /> : null}
            </section>
        );
    }
}
const mapStateToProps = (state) => {
    return {
      token: state.auth.token,
    };
  };

export default connect(mapStateToProps)(CrawlerMeal);