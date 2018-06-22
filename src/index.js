import React , { Component }from 'react'
import ReactDOM from 'react-dom'
import SearchBar from './components/search_bar'
import VideoList from './components/video_list'
import VideoDetail from './components/video_detail'
import YTSearch from 'youtube-api-search'
import * as _ from 'lodash'
const API_KEY = "AIzaSyAJnIzI0FJHoV43fRP3rtf3EXSqn1QaejI"


class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            videos: [],
            selectedVideo: null,
            term:'start'
        }

        this.videoSearch('')
    }

    videoSearch = (term) => {
        YTSearch({key: API_KEY, term}, (data, err) =>{
            if(data) this.setState({ 
                videos: data,
                selectedVideo: data[0]
            })

            if(err) console.log("Err in YTSearch: ", err)
        })
    }
    
    onVideoSelect = (selectedVideo) => {
        this.setState({
            ...this.state,
            selectedVideo
        })
    }

    render(){
        const videoSearch = _.debounce(((term) => {this.videoSearch(term)}), 300)
        return(
            <div> 
                <SearchBar
                    videoSearch={videoSearch} />
                <VideoDetail 
                    video={this.state.selectedVideo}/>
                <VideoList 
                    onVideoSelect={(selectedVideo) => this.setState({...this.state, selectedVideo})}
                    videos={this.state.videos}/>
            </div>
        )
    } 
}

ReactDOM.render(<App />, document.querySelector('.container'))