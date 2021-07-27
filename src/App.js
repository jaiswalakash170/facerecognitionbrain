import react, {Component} from 'react';
import Particles from "react-tsparticles";
import './App.css';
import Navigation from './components/navigation/navigation';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/imagelinkform/imagelinkform';
import Rank from './components/rank/rank';
import FaceRecognition from './components/facerecognition/facerecognition';
import SignIn from './components/signin/signin'
import 'tachyons';
import particleOptions from './particles.json';
import Clarifai from 'clarifai';
import {clarifai_api_key} from './api_key';

const app = new Clarifai.App(clarifai_api_key);

class App extends Component {
    constructor(){
        super();
        this.state = {
            input: '',
            imageURL: '',
            box: {},
            route: 'signin'
        }
    }

    calculateFaceLocation = (data) => {
        const clarifyFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById("inputimage");
        const width = Number(image.width);
        const height = Number(image.height);
        console.log(width, height);
        return {
            leftColumn: clarifyFace.left_col * width,
            topRow: clarifyFace.top_row * height,
            rightColumn: width - (clarifyFace.right_col * width),
            bottomRow: height - (clarifyFace.bottom_row * height)
        };
    }

    displayFaceBox = (box) => {
        console.log(box);
        this.setState({box: box});
    }

    onInputChange = (event) => {
       this.setState({input: event.target.value});
    }

    onSubmit = () => {
        this.setState({imageURL: this.state.input});
        app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
            .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
            .catch(error => console.log(error));
    }

    onRouteChange = (route) => {
        this.setState({route: route});
    }

    render() {
        return (
            <div className="App">
                <Particles
                    options={particleOptions}
                />
                <Navigation onRouteChange={this.onRouteChange} />
                { this.state.route == 'signin' ?
                    <SignIn onRouteChange={this.onRouteChange} />
                    :<div>
                        <Logo />
                        <Rank />
                        <ImageLinkForm 
                            onInputChange={this.onInputChange} 
                            onButtonSubmit={this.onSubmit}/>
                        <FaceRecognition box={this.state.box} imageURL={this.state.imageURL}/>
                    </div>
                }
            </div>
        );
    }
}

export default App;
