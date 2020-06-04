import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Layout from './hoc/Layout/Layout';
import Homepage from './Pages/HomePage/Homepage';
import AccountPage from './Pages/AccountPage/AccountPage';
import MealPage from './Pages/MealPage/MealPage';
import MealDetailPage from './Pages/MealDetailPage/MealDetailPage';
import Auth from './Pages/Auth/Auth';
import Logout from './Pages/Auth/Logout/Logout';
import ResetPassword from './Pages/Auth/ResetPassword/ResetPassword';
import {connect} from 'react-redux';
import * as action from './store/actions/index'; 

class App extends React.Component {
  componentWillMount() {
    this.props.onTryAutoSignUp();
  }
  render() {
    let routes ;
    if(this.props.isAuthenticated){
      routes = (
        <Switch>
          <Route path="/login" component={Auth} />
          <Route path="/logout" component={Logout} />
          <Route path="/meals/:id"  component={MealDetailPage}/>
          <Route path="/meals"  component={MealPage}/>
          <Route path="/meals" exact  render={() => <h1>This is developing</h1>}/>
          <Route path="/account"  component={AccountPage}/>
          <Route path="/reset-password" component={ResetPassword} />
          <Route path="/" exact component={Homepage}/> 
        </Switch>
      );
    } else {
      routes = (
        <Switch>
          <Route path="/reset-password" component={ResetPassword} />
          <Route path="/login" component={Auth} />
          <Route path="/account"  component={AccountPage}/>
          <Route path="/meals/:id"  component={MealDetailPage}/>
          <Route path="/meals" component={MealPage} />
          <Route path="/" exact component={Homepage} /> 
          <Redirect to='/' />
        </Switch>
      );
    }
    return (
      <div className="App">
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token != null
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(action.authCheckState())
  }
} 

export default connect(mapStateToProps, mapDispatchToProps)(App);
