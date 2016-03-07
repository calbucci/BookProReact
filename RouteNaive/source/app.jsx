import React, { Component } from 'react';
import { render } from 'react-dom';
import About from './about';
import Home from './home';
import Repos from './repos';
import RepoDetails from './RepoDetails';
import { Router, Route, Link, IndexRoute } from 'react-router';


class App extends Component{
    // constructor(){
    //     super(...arguments);
    //     this.state = {
    //         route: window.location.hash.substr(1)
    //     };
    // }
    
    // componentDidMount(){
    //     window.addEventListener('hashchange', () =>{
    //         this.setState({
    //             route: window.location.hash.substr(1)
    //         });
    //     });
    // }
    
    render(){
        // var Child;
        // console.log("route=" + this.state.route);
        // switch(this.state.route){
        //     case '/about': Child = About; break;
        //     case '/repos': Child = Repos; break;
        //     default: Child = Home; break;
        // }
        // 
        // console.log(Child);
        
        return (
            <div>
                <header>App</header>
                <menu>
                    <ul>
                        <li><Link to='/about'>About</Link></li>
                        <li><Link to='/repos'>Repos</Link></li>
                    </ul>
                </menu>
                {this.props.children}
            </div>
            
        );
    }
    
}

render(
    <Router>
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="about" component={About} title="About Us" />
            <Route path="repos" component={Repos} >
                <Route path="details/:repo_name" component={RepoDetails} />
            </Route>
        </Route>
    </Router>
    , document.getElementById('root'));