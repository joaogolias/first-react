import React, { Component } from  'react'

class SearchBar extends Component{
    constructor(props){
        super(props)

        this.state = { term: 'Starting Value'}
    }

    onInputChange = (event) => {
        this.setState({
            ...this.state,
            term: event.target.value
        })
        this.props.videoSearch(event.target.value)
    }

    

    render(){
        return (
            <div>
                <input className="search-bar"
                onChange = {this.onInputChange} />
            </div>
        )
    }
}


export default SearchBar