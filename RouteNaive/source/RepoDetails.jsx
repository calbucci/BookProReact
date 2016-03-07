import React, { Component } from 'react';
import 'whatwg-fetch';

class RepoDetails extends Component{
    constructor(){
        super(...arguments);

        this.state = { repository: [] };
    }
    
    renderRepository(){
        let repository = this.props.repositories.find((repo) =>
        repo.name === this.props.params.repo_name);
        
        let stars = [];
        for(var i = 0; i < repository.stargazers_count; i++){
            stars.push('*');
        }
        
        return (
            <div>
                <h2>{repository.name}</h2>
                <p>{repository.description}</p>
                <span>{stars}</span>
            </div>  
        );
    }
    
    // fetchData(repo_name){
    //     fetch('https://api.github.com/repos/calbucci/' + repo_name)
    //     .then((response) => response.json())
    //     .then((responseData) => {
    //         this.setState({repository: responseData});
    //     });
    // }
    // 
    // componentDidMount(){
    //     let repo_name = this.props.params.repo_name;
    //     console.log(this.props);
    //     this.fetchData(repo_name);
    // }
    // 
    // componentWillReceiveProps(nextProps){
    //     let repo_name = nextProps.params.repo_name;
    //     console.log(this.props);
    //     this.fetchData(repo_name);
    // }
    
    render(){
         if(this.props.repositories.length > 0){
             return this.renderRepository();
         }
         else{
             return <h4>Loading...</h4>;
         }
    }
}

export default RepoDetails;