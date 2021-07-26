import react from 'react';
import Tilt from 'react-parallax-tilt';

const Logo = () => {
    return (
        <div className="ma4 mt0">
            <Tilt className="Tilt" style={{ height: '150px', width: '150px', backgroundColor: 'darkgreen' }}>
                <div className="Tilt-inner">
                    <h1>React Parallax Tilt 👀</h1>
                </div>
            </Tilt>
        </div>
    );
}

export default Logo; 