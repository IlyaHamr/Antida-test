import React, { Component } from 'react';
class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list: [],
            query: '',
            albums: []
        };
        this.handlerClick = this.handlerClick.bind(this);
    };


    search() {
        const API_KEY = '7ff79219b52c177d131ee7e19f553323';
        const text = document.getElementsByTagName('input')[0];
        const value = text.value;
        const FETCH_URL = 'http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=' + value + '&api_key=' + API_KEY + '&format=json';

        fetch(FETCH_URL)
            .then(response => response.json())
            .then(json => {
                this.setState({ list: json.results.artistmatches.artist });
                //var items = json.results.artistmatches.artist;
                //console.log(items);
            });




    };

    handlerClick(event) {
        event.stopPropagation();
        //console.log(event.currentTarget.innerHTML);
        var value = event.currentTarget.innerHTML;
        //console.log(value)
        this.setState({query : value})
        const RegExp = /\s/g;
        value = value.replace(RegExp, '+');
        //console.log(value)
        var imageAlbums = [];
        const API_KEY = '7ff79219b52c177d131ee7e19f553323'
        const FETCH_URL = "http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=" + value + "&api_key=" + API_KEY + "&format=json";


        fetch(FETCH_URL)
            .then(response => response.json())
            .then( json => {
                var all = json.topalbums.album;
                for (var i = 0; i< all.length; i++) {
                    //console.log(all[i].image[2]['#text'])
                    imageAlbums.push(all[i].image[2]['#text'])
                }
                this.setState({ albums: imageAlbums});
            });

        var blockAlbums = document.getElementById('blockAlbums');
        blockAlbums.style.display="block";
        var blockList = document.getElementById('blockList');
        blockList.style.display='none';
        var inputGroup = document.getElementById('inputGroup');
        inputGroup.style.display='none';

        const btn = document.getElementById('btnBack');
        btn.addEventListener('click', function () {
            if (blockList.style.display='none') {
                blockAlbums.style.display='block';
                inputGroup.style.display='none'
            }
            if (blockAlbums.style.display='none') {
                blockList.style.display='block';
                inputGroup.style.display='block'
            }
        })

    };



    render() {
    // return JSX

    return (
        <div className="container">
            <hr />
            <div className="col-lg-6">
                <div id="inputGroup" className="input-group">
                    <input className="inpName" type="text"
                        onChange={event => { this.setState({ query: event.target.value }) }}
                    className="form-control" placeholder="Введите исполнителя" />
                    <span className="input-group-btn">
                    <button
                        onClick={()=> this.search()}
                        className="btn btn-default" type="button">Искать</button>
                    </span>
                </div>
            </div>
            <hr />
            <div id="blockList">
                <ul>
                    {this.state.list.map(e => (
                        <p key={e.name}>
                            <a className='link' onClick={this.handlerClick} href="#">{e.name}</a>
                        </p>
                    ))}
                </ul>
            </div>
            <div id="blockAlbums">
                <div><p className="Caption">Альбомы {this.state.query}</p></div>
                <div id='clear'><button className="btn" id='btnBack'>Назад</button></div>
                <div className="block">
                    {this.state.albums.map((e, key) => (
                        <img className="imgAlbum" key={key} src={e}></img>
                    ))}
                </div>
            </div>
        </div>
    );
  }
}

export default App;
