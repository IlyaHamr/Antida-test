import React, { Component } from 'react'

class ListArtists extends Component {

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

export default ListArtists