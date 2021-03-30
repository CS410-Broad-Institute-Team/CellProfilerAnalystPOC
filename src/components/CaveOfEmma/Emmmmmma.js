import Button from '@material-ui/core/Button'
import UploadDataHandlerE from "./UploadDataHandlerE"


const onFinishUpload_Callback = async function(fileListObject) {
    const DataModel = UploadDataHandlerE.getInstance();
    await DataModel.handleFolderUpload(fileListObject);

   
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
            <div id="loss-cont"></div>
            <div id="acc-cont"></div>
            <div id="confusion-matrix"></div>
         <div>
         <Button variant="contained" component="label"
                           onClick={()=>{console.log("Fetch!");this.on_fetch_button_callback();}}>
                       Fetchplspls
                </Button>  
           </div>
           </div>
    )
}

export default app;