import * as mobilenet from "@tensorflow-models/mobilenet"
import {useState, useEffect,useRef} from "react";
import './App.css'
import * as tfjs from '@tensorflow/tfjs';
function App() {
  const [isModelLoading, setIsModelLoading] = useState(false)
  const [model, setModel] = useState(null)
  const [imageURL, setImageURL] = useState(null);
  const[results,setResults] = useState([])
  
  const imageRef = useRef()
  const loadModel = async () => {
    setIsModelLoading(true)
    try {
const model = await mobilenet.load()
setModel(model)

setIsModelLoading(false)
console.log(model)
    } catch (error){
      console.log(error)
      setIsModelLoading(false)
    }
  }
const uploadImage = (e) => {
  const {files} = e.target
  if (files.length >0){
const url = URL.createObjectURL(files[0])
setImageURL(url)
  }else{
    setImageURL(null)
  }
}

const identify = async () => {
  const results = await model.classify(imageRef.current)
  console.log(results)
  setResults(results)
}

  useEffect(() => {
    loadModel()
  }, [])
  if (isModelLoading){
    return <h2> Model Loading...</h2>
  }

  console.log(results)
  return (
    <div className="App">
      <h1 className = 'header'> Smithsonian ID </h1>
      <div className = 'inputHolder'>
        <input type = "file" accept = 'image/*' capture = 'camera' className = 'uploadInput' onChange = {uploadImage} />
        {imageURL && <button className='button' onClick={identify}>Identify Artifact</button>}
      </div>

      <div className="mainWrapper">
                <div className="mainContent">
                    <div className="imageHolder">
                    {imageURL && <img src={imageURL} alt="Upload Preview" crossOrigin="anonymous" ref={imageRef} />}
                    </div>
                    </div> 
                    </div>

    </div>
  );
}

export default App;
