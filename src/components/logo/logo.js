import react from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain.png';
import './logo.css'

const Logo = () => {
    return (
        <div className="ma4 mt0">
            <Tilt className="Tilt br2 shadow-2" style={{ height: '150px', width: '150px'}}>
                <div className="Tilt-inner pa2">
                    <h1><img alt="Logo" src={brain}/></h1>
                </div>
            </Tilt>
        </div>
    );
}

export default Logo; 