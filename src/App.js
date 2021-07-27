import react, {Component} from 'react';
import Particles from "react-tsparticles";
import './App.css';
import Navigation from './components/navigation/navigation';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/imagelinkform/imagelinkform';
import Rank from './components/rank/rank';
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
            input: ''
        }
    }

    onInputChange = (event) => {
        console.log(event.target.value);
    }

    onSubmit = () => {
        console.log("Click");
        app.models.predict(Clarifai.FACE_DETECT_MODEL, "https://samples.clarifai.com/face-det.jpg").then(
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
                {/*
                
                <FaceRecognition />*/}
            </div>
        );
    }
}

export default App;
