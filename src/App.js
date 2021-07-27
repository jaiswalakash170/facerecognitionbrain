import react, {Component} from 'react';
import Particles from "react-tsparticles";
import './App.css';
import Navigation from './components/navigation/navigation';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/imagelinkform/imagelinkform';
import Rank from './components/rank/rank';
import FaceRecognition from './components/facerecognition/facerecognition';
import 'tachyons';
import particleOptions from './particles.json';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
    apiKey: '3b764f3c87c44a1cbd5b480a14631563'
});

class App extends Component {
    constructor(){
        super();
        this.state = {
            input: '',
            imageURL: ''
        }
    }

    onInputChange = (event) => {
       this.setState({input: event.target.value});
    }

    onSubmit = () => {
        this.setState({imageURL: this.state.input});
        app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
            function(response){
                // Do something with response
                console.log(response);
            },
            function(error){
                // There was some error
            }
        );
    }

    render() {
        return (
            <div className="App">
                <Particles
                    options={particleOptions}
                />
                <Navigation />
                <Logo />
                <Rank />
                <ImageLinkForm 
                    onInputChange={this.onInputChange} 
                    onButtonSubmit={this.onSubmit}/>
                <FaceRecognition imageURL={this.state.imageURL}/>
            </div>
        );
    }
}

export default App;
