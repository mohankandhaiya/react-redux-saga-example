import React, { Component } from 'react'
import './App.css';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import LoginForm from "./login";
import SignUpForm from "./signup";
import Topics from "./topics";
import Index from "./commentpage";
import Categories from "./categories";
import Navbar from "./Navbar/index";
import TopicsTable from "./drawers/topics";
import CategoryTable from "./drawers/categories";
import Testing from "./testing";
import CategoryCard from "./card";
import AddTopics from "./drawers/addTopics";
import EditTopics from "./drawers/editTopics";
import CommentPage from "./commentpage";
import Test from "./mini"
import Modals from "./modal";
import Demo from "./modal/min";
import SearchInput from "./search";

// const fakeAuth = {
//     isAuthenticated: false,
//     authenticate(auth){
//         this.isAuthenticated = true;
//         setTimeout(auth, 100)
//     },
//     signout(auth){
//         this.isAuthenticated = false;
//         setTimeout(auth, 100)
//     }
// };

// const PrivateRoute = ({component: Component, ...rest}) => (
//     <Route {...rest} render={(props) => (
//         fakeAuth.isAuthenticated === true
//             ? <Component {...props} />
//             : <Redirect to="/login/" />
//     )} />
// );


class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loggedInStatus: true,
            users:{}
        }
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    {/*<Route exact path="/" render={ props => (<Categories {...props} loggedInStatus={this.state.loggedInStatus} />)} />*/}
                    <Route exact path="/login" component={LoginForm} />
                    <Route exact path="/signup" component={SignUpForm} />
                    <Route exact path="/categories" component={Categories} />
                    <Route exact path="/categories/topics" component={Topics} />
                    <Route exact path="/categories/topics/add" component={AddTopics} />
                    <Route exact path="/categories/topics/edit" component={EditTopics} />
                    <Route exact path="/categories/edit" component={CategoryTable} />
                    <Route exact path="/categories/topics/comment" component={CommentPage} />
                    <Route exact path="/categories/topics/comment/rate" component={Modals} />
                    {/*<Route exact path="/error/" component={PageNotFound} />*/}
                    {/*<Redirect />*/}
                    {/*<Redirect from='*' to='/error' />*/}
                    <Navbar />
                    {/*<Test />*/}
                    <SearchInput placeholder="input search text" style={{ width: 200 }} />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default App