import React, { Component } from 'react'
import PropTypes from 'prop-types';

class ListAlbums extends Component {
    static propTypes = {
        data: PropTypes.array.isRequired
    };

    renderAlbums () {
        if (this.props.data.length) {
            return this.props.data.map((e, key) => <img className='imgAlbum' key={key} alt='artist img' src={e} />)
        }  else {
            return <h2>No albums</h2>
        }
    };

    render() {
        return (
            <div>
                <div><p className='Caption'>Альбомы {this.props.value.query}</p></div>
                <div id='clear'>
                    <button className='btn' onClick={this.props.backBtn}>Назад</button>
                </div>
                <div className='block'>
                    { this.renderAlbums ()  }
                </div>
            </div>
        )
    }
}

export default ListAlbums