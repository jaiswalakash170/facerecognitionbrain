import react, {Component} from 'react';
import './App.css';
import Navigation from './components/navigation/navigation';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/imagelinkform/imagelinkform';
import 'tachyons';

class App extends Component {
  
    render() {
        return (
            <div className="App">
                <Navigation />
                <Logo />
                <ImageLinkForm />
                {/*
                
                <FaceRecognition />*/}
            </div>
        );
    }
}

export default App;
