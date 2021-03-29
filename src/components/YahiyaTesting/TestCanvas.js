import Button from '@material-ui/core/Button'
import UploadDataHandler from "./UploadDataHandler"
import TrainingSetHandler from "./TrainingSetHandler"
import LogRegClassifier from './LogisticRegressionClassifier'
import { ContactlessOutlined } from '@material-ui/icons'
import * as tf from "@tensorflow/tfjs";

const findFile = function(fileListObject, fileName) {
    var index = Array.from(fileListObject.target.files).findIndex((elem) => {
        return elem.name === fileName;
    });
    return fileListObject.target.files[index];
}

const loadImageFromFilePromise = (img_file) => {
    return new Promise((resolve, reject)=> {
        var fr = new FileReader();
        fr.onload = () => {
            const img = new Image();
            img.onload = () => {
                resolve(img);
            }
            img.src = fr.result;
        };
        fr.readAsDataURL(img_file)
    });
}

const onFinishUpload_Callback = async function(fileListObject) {
    
    var example_canvas = document.getElementById("example_canvasid");
    // draw a red rectangle in the canvas I guess
    var ctx = example_canvas.getContext("2d");

    const img_file = findFile(fileListObject, "AS_09125_050116000001_A01f00d0.png")

    const img = await loadImageFromFilePromise(img_file);

    const img_tensor = tf.browser.fromPixels(img)

    console.log(img_file);
    console.log(img);
    console.log(img_tensor);

    const img_array = await tf.browser.toPixels(img_tensor );
    const img_size = 512
    const img_data = new ImageData(img_array, img_size)
    ctx.scale(0.25, 0.25);

    ctx.putImageData(img_data, 0, 0);
    
    
}

const app = function() {

    

    return (
        <div>
          <Button variant="contained" component="label"
                            onClick={()=>console.log("Upload Folder!")}>
                        Upload Data
                        <input  type="file" 
                                hidden webkitdirectory="true" 
                                mozdirectory="true" 
                                msdirectory="true" 
                                odirectory="true" 
                                directory="true" 
                                multiple 
                                onChange = {(fileListObject) => onFinishUpload_Callback(fileListObject) }
                                />
                    </Button>  
            <p>
                yahiya stuff
            </p>
            <div id="loss-cont"></div>
            <div id="acc-cont"></div>
            <div id="confusion-matrix"></div>
            <canvas width={512} height={512} id="example_canvasid"></canvas>
            <img id="example_imageid"></img>
        </div>
        
    )
}

export default app;