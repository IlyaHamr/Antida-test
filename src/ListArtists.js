import React, { Component } from 'react'
import PropTypes from 'prop-types';

class ListArtists extends Component {
    static propTypes = {
        data: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string
            })
        )
    };

    render() {
        return (
            <ul className="listItems">
                {this.props.data.map(e => (
                    <li key={e.name}>
                        <a className='link' onClick={this.props.handlerClick.bind(this, e.name)}>
                            {e.name}
                        </a>
                    </li>
                ))}
            </ul>
        )
    }
}

export default ListArtists