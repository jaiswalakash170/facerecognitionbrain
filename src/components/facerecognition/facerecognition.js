import react from 'react';
import './facerecognition.css';

const FaceRecognition = ({box, imageURL}) => {
    return (
        <div className="center ma">
            <div className="absolute mt2">
                <img id="inputimage" alt={""} src={imageURL} width="500px" height="auto" />
                <div className="bounding-box" 
                    style={{top: box.topRow, 
                            right: box.rightColumn, 
                            bottom: box.bottomRow, 
                            left: box.leftColumn
                            }}>
                </div>
            </div>
        </div>
    );
}

export default FaceRecognition;