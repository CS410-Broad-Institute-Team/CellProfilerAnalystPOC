import * as Papa from "papaparse"
import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";
import _ from "lodash";

import Button from '@material-ui/core/Button'
import UploadDataHandler from "./UploadDataHandler"
import TrainingSetHandler from "./TrainingSetHandler"
import GeneralClassifier from "./GeneralClassifier"


const onFinishUpload_Callback = async function(fileListObject) {
    const DataModel = UploadDataHandler.getInstance();
    await DataModel.handleFolderUpload(fileListObject);
    const TrainingSetModel = new TrainingSetHandler(DataModel.data);
    TrainingSetModel.displayData();
    const [data_labels, data, feature_names] = TrainingSetModel.createTrainingSet();

    const confusion_container = document.getElementById("confusion-matrix");
    const tick_labels = ['Negative', 'Positive']

    // const test_size = 0.1;
    const batch_size = 10;
    const number_epochs = 20;

    const render_containers = {
        lossContainer: document.getElementById("loss-cont"),
        accContainer: document.getElementById("acc-cont")
    }

    const [tf_batched_dataset, tf_dataset, tf_labels] = GeneralClassifier.createBasicDataset(data, data_labels, feature_names, batch_size);
    
    const trained_model = await GeneralClassifier.basicTrain(tf_batched_dataset, tf_dataset.shape[1], number_epochs, render_containers)
    window.model = trained_model;
    // predict on whole dataset

    // predict returns the probabilities in pairs for the different (2 in this case) categories
        // thus we need argmax to get the correct number, 0 or 1
    const preds = trained_model.predict(tf_dataset).argMax(-1);
    const labels = tf_labels.argMax(-1);


    
    preds.print(); labels.print();

    window.preds = preds;
    window.labels = labels;

    const confusionMatrix = await tfvis.metrics.confusionMatrix(labels, preds);


        tfvis.render.confusionMatrix(confusion_container, {
            values: confusionMatrix,
            tickLabels: tick_labels
        });





    

}


const app = function() {

    

    return (
        <div>
            <Button 
                variant="contained" component="label"
                onClick={()=>console.log("Upload Folder!")}
            >
                Upload and Train
                <input  
                    type="file" 
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
        </div>
        
    )
}

export default app;