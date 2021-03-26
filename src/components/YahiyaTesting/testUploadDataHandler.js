import Button from '@material-ui/core/Button'
import UploadDataHandler from "./UploadDataHandler"
import TrainingSetHandler from "./TrainingSetHandler"
import LogRegClassifier from './LogisticRegressionClassifier'

const onFinishUpload_Callback = async function(fileListObject) {
    const DataModel = UploadDataHandler.getInstance();
    await DataModel.handleFolderUpload(fileListObject);

    const TrainingModel = new TrainingSetHandler(DataModel.data);
    TrainingModel.displayData();
    const [data_labels, data, feature_names] = TrainingModel.createTrainingSet();

    const classifier = new LogRegClassifier();

    const confusion_container = document.getElementById("confusion-matrix");
    const lossContainer = document.getElementById("loss-cont");
    const accContainer = document.getElementById("acc-cont");


    const test_size = 0.1;
    const batch_size = 16;

    const [preds, pred_labels] = await classifier.convertThenFullRun(data, feature_names, test_size, batch_size, {lossContainer, accContainer}, data_labels);
    // console.log(preds, pred_labels);
    preds.print();
    pred_labels.print();

    // const tick_labels = ["Positive", "Negative"];
    // await LogRegClassifier.renderConfusionMatrix_utility(preds, pred_labels, confusion_container, tick_labels);

    
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
        </div>
        
    )
}

export default app;