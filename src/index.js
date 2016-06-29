import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';

//Import Components
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetails from './components/video_details';

//Youtube API
const API = 'AIzaSyB2XWjK1XfAqpJIeoLNpe9ug-NteCfFYNY';

//Create Components
class App extends Component {

  constructor(props) {
    super(props);

    this.state= {
      videos: [],
      selectedVideo: null
    };

    this.VideoSearch('MKBHD');
  }

  VideoSearch(term) {
    YTSearch({key: API, term: term}, (videos) => {
      this.setState({
        videos : videos,
        selectedVideo : videos[0]
      });  //Not used in this example now, ES6 feature: videos = videos : videos
    });
  }

  render(){

      const videoSearch = _.debounce((term)=> {this.VideoSearch(term)}, 300);

      return (
        <div>
          <SearchBar onSearchTermChange = {videoSearch}/>
          <VideoDetails video = {this.state.selectedVideo} />
          <VideoList
            onVideoSelect={selectedVideo => this.setState({selectedVideo})}
            videos ={this.state.videos}
           />
        </div>
    );
  }
}
//Put component's HTML on DOM

ReactDOM.render(<App />, document.querySelector('.container'));
