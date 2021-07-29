import react, {Component} from 'react';
import Particles from "react-tsparticles";
import './App.css';
import Navigation from './components/navigation/navigation';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/imagelinkform/imagelinkform';
import Rank from './components/rank/rank';
import FaceRecognition from './components/facerecognition/facerecognition';
import SignIn from './components/signin/signin';
import Register from './components/register/register';
import 'tachyons';
import particleOptions from './particles.json';

const initialState = {
    input: '',
    imageURL: '',
    box: {},
    route: 'signin',
    isSignedIn: false,
    user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
    }
}

class App extends Component {
    constructor(){
        super();
        this.state = initialState
    }

    loadUser = (user) => {
        this.setState({user: {
            id: user.id,
            name: user.name,
            email: user.email,
            entries: user.entries,
            joined: user.joined
        }});
        console.log(this.state);
    }

    componentDidMount() {
        fetch('http://localhost:3001')
        .then(response => response.json())
        .then(console.log);
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
        fetch('http://localhost:3001/imageurl', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                input: this.state.input
            })
        })
        .then(response => response.json())
        .then(response => {
            if(response){
                fetch('http://localhost:3001/image', {
                    method: 'put',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        id: this.state.user.id
                    })
                })
                .then(response => {
                    if(response.ok){
                        return response.json();
                    } else{
                        throw new Error("Error updating the rank");
                    }
                })
                .then(count => {
                    this.setState(Object.assign(this.state.user, {entries: count}));
                })
                .catch(error => console.log(error));
                return this.displayFaceBox(this.calculateFaceLocation(response))
            } else {
                throw new Error("Error from Clarifai API");
            }
        })
        .catch(error => console.log(error));
    }

    onRouteChange = (route) => {
        if(route === 'signout'){
            this.setState(initialState);
        } else if(route === 'home'){
            this.setState({isSignedIn: true});
            this.setState({route: route});
        } else {
            this.setState({route: route});
        }
    }

    render() {
        const {isSignedIn, imageURL, route, box, user} = this.state;
        return (
            <div className="App">
                <Particles
                    options={particleOptions}
                />
                <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
                { route == 'home' ?
                    <div>
                        <Logo />
                        <Rank name={user.name} entries={user.entries} />
                        <ImageLinkForm 
                        onInputChange={this.onInputChange} 
                        onButtonSubmit={this.onSubmit}/>
                        <FaceRecognition box={box} imageURL={imageURL}/>
                    </div>
                    :(route == 'signin'?
                    <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
                    :<Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
                    )
                }
            </div>
        );
    }
}

export default App;
