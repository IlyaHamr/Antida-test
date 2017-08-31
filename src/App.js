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

    }


    search() {
        //console.log('this.state', this.state);
        var API_KEY = '7ff79219b52c177d131ee7e19f553323'
        var text = document.getElementsByTagName('input')[0];
        var value = text.value;
        var FETCH_URL = 'http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=' + value + '&api_key=' + API_KEY + '&format=json';

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
        var RegExp = /\s/g;
        value = value.replace(RegExp, '');
        //console.log(value)
        var API_KEY = '7ff79219b52c177d131ee7e19f553323'
        const FETCH_URL = "http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=" + value + "&api_key=" + API_KEY + "&format=json";


        fetch(FETCH_URL)
            .then(response => response.json())
            .then( json => {
                if( typeof json.topalbums['album'] == 'undefined') {
                    console.log(undefined)
                } else {
                    this.setState({albums: json.topalbums['album']})
                    console.log(json.topalbums['album'])
                }
                //this.setState({albums: json.topalbums.album})

                //var alb = json.album;
                //console.log(json.topalbums)
                //this.state({ albums : json.topalbums.album });
            });

    };




    render() {
    // return JSX

    return (
        <div className="container">
            <hr />
            <div className="col-lg-6">
                <div className="input-group">
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
            <div>
                <ul>
                    {this.state.list.map(e => (
                        <li key={e.name}>
                            <a className='link' onClick={this.handlerClick} href="#">{e.name}</a>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <ul>

                </ul>
            </div>
        </div>
    );
  }
}

export default App;
