import {API_KEY} from './config.js'
import ListArtists from './ListArtists'
import ListAlbums from './ListAlbums'
import React, { Component } from 'react'

class App extends Component {

    constructor (props) {
        super(props)
        this.state = {
            list: [],
            query: '',
            albums: [],
            isAlbumOpen: false,
            isArtistOpen: false
        }
        this.handlerClick = this.handlerClick.bind(this)
        this.handleBack = this.handleBack.bind(this)
        this.search = this.search.bind(this)
    };

    search(e) {
        e.preventDefault()
        const FETCH_URL = `http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${this.state.query}&api_key=${API_KEY}&format=json`

        fetch(FETCH_URL)
            .then(response => response.json())
            .then(json => {
            this.setState({list: json.results.artistmatches.artist, isArtistOpen: true, isAlbumOpen: false})
            })
    };

    handlerClick(value, event) {
        const FETCH_URL = `http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${encodeURIComponent(value)}&api_key=${API_KEY}&format=json`;

        fetch(FETCH_URL)
            .then(response => response.json())
            .then(json => {
            this.setState({albums: json.topalbums.album.map(e => e.image[2]['#text']), isAlbumOpen: true, isArtistOpen: false})
            }
        )
    };

    handleBack(e) {
        e.preventDefault()
        this.setState({ isArtistOpen: true, isAlbumOpen: false })
    };

    render() {

        // return JSX

        return (
            <div className='container'>
                <hr />
                <div className='col-lg-6'>
                    <div id='inputGroup' className='input-group'>
                        <form className="input-group" onSubmit={this.search}>
                            <input type='text' onChange={e => { this.setState({query: e.target.value}) }}
                                   className='form-control inpName' placeholder='Введите исполнителя' required/>
                            <span className='input-group-btn'>
                                <button className='btn btn-default' type='submit'>Искать</button>
                            </span>
                        </form>
                    </div>
                </div>
                <hr />
                <div>
                    {this.state.isArtistOpen && <ListArtists data={this.state.list} handlerClick={this.handlerClick} />}
                    {this.state.isAlbumOpen && <ListAlbums data={this.state.albums} value={this.state.query} backBtn={this.handleBack} />}
                </div>
            </div>
        )
    }
}

export default App