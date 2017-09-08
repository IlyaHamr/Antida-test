import {API_KEY} from './config.js'
import ListArtists from './ListArtists'
import ListAlbums from './ListAlbums'
import React, { Component } from 'react'

/*class ListArtists extends Component {
    render() {
        return (
            <ul>
                {this.props.data.map(e => (
                    <p key={e.name}>
                        <a className='link' onClick={this.props.handlerClick.bind(this, e.name)}>
                            {e.name}
                        </a>
                    </p>
                ))}
            </ul>
        )
    }
}

class ListAlbums extends Component {
    render() {
        return (
            <div>
                <div><p className='Caption'>Альбомы {this.props.value.query}</p></div>
                <div id='clear'>
                    <button className='btn' onClick={this.props.backBtn}>Назад</button>
                </div>
                <div className='block'>
                    { this.props.renderAlbums }
                </div>
            </div>
        )
    }
}*/

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
        //this.renderAlbums = this.renderAlbums.bind(this)
    };

    search() {
        const FETCH_URL = `http://ws.audioscrobbler.com/2.0/?method=artist.search&artist= ${this.state.query} &api_key= ${API_KEY} &format=json`

        fetch(FETCH_URL)
            .then(response => response.json())
            .then(json => {
            this.setState({list: json.results.artistmatches.artist, isArtistOpen: true})
            })
    };

    handlerClick(value, event) {
        const RegExp = /\s/g;
        const FETCH_URL = 'http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=' + value.replace(RegExp, "+") + `&api_key=${API_KEY}&format=json`;

        fetch(FETCH_URL)
            .then(response => response.json())
            .then(json => {
            this.setState({albums: json.topalbums.album.map(e => e.image[2]['#text']), isAlbumOpen: true, isArtistOpen: false, query: value})
            }
        )
    };

    handleBack(e) {
        e.preventDefault()
        this.setState({ isArtistOpen: true, isAlbumOpen: false })
    };

    /*renderAlbums () {
        if (this.state.albums.length) {
            return this.state.albums.map((e, key) => <img className='imgAlbum' key={key} alt='artist img' src={e} />)
        }  else {
            return <h2>No albums</h2>
        }
    };*/

    elementsRender() {
        if (this.state.isArtistOpen === true) {
            return (<ListArtists data={this.state.list} handlerClick={this.handlerClick} />)
        }
        if (this.state.isAlbumOpen === true) {
            return (<ListAlbums  data={this.state.albums} value={this.state.query} backBtn={this.handleBack}/>)
        }
    };


    render() {

        // return JSX

        return (
            <div className='container'>
                <hr />
                <div className='col-lg-6'>
                    <div id='inputGroup' className='input-group'>
                        <input type='text' onChange={e => { this.setState({query: e.target.value}) }}
                            className='form-control inpName' placeholder='Введите исполнителя' />
                        <span className='input-group-btn'>
                            <button
                                onClick={() => this.search()}
                                className='btn btn-default' type='button'>Искать</button>
                        </span>
                    </div>
                </div>
                <hr />
                <div>{this.elementsRender()}</div>
            </div>
        )
    }
}

export default App