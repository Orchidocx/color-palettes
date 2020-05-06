import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import MiniPalette from './MiniPalette';

class PaletteList extends Component {
    render() {
        const {palettes} = this.props;
        return (
            <div>
                <h1>React Palettes</h1>
                {palettes.map(palette => (
                    
                    <p>
                        <MiniPalette {...palette}/>
                        {/* <Link to={`/palette/${palette.id}`}>{palette.paletteName}</Link> */}
                    </p>
                ))}
            </div>
        )
    }
}


export default PaletteList;