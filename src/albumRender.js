import React, { Component } from 'react'

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
}

export default ListAlbums