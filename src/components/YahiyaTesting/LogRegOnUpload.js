import * as Papa from "papaparse"
import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";
import _ from "lodash";

import LogRegClassifier from './LogisticRegressionClassifier'
import Button from '@material-ui/core/Button'

Papa.parsePromise = function(file, config) {
  return new Promise(function(complete, error) {
    Papa.parse(file, {...config, complete, error});
  });
};

Promise.prototype.notify = function(strMsg) {
  return this.then(x=>{console.log(strMsg); return x});
}
Promise.prototype.debugPrint = function() {
  return this.then(x=>{console.log(x); return x});
}

Array.prototype.sliceByValue = function (value1, value2) {
  const index1 = this.indexOf(value1);
  const index2 = this.indexOf(value2);

  if (value1 === -1 || value2 === -1) {
      console.error("Values not found to slice");
      return null;
  }

  return this.slice(index1, index2);
}


const basicPapaConfig = {
  worker: true,
  skipEmptyLines: true,
  dynamicTyping: true
}

Papa.parsePromise = function (file) {
  return new Promise(function (complete, error) {
    Papa.parse(file, {
      header: true,
      download: true,
      dynamicTyping: true,
      complete,
      error,
    })
  })
}

const fileReaderPromiseText =  function(fileListObject, fileIndex) {
  return new Promise((resolve, reject)=> {
      var fr = new FileReader();
      fr.onload = () => {
          resolve(fr.result)
      };
      fr.readAsText(fileListObject.target.files[fileIndex])
  })
}

const findFileIndex = (fileListObject, fileName) => {
  var index = Array.from(fileListObject.target.files).findIndex((elem) => {
      return elem.name === fileName;
  });
  return index;
}


const fileReaderPromiseImage = (fileListObject, fileIndex) => {
  return new Promise((resolve, reject)=> {
      var fr = new FileReader();
      fr.onload = () => {
          resolve(fr.result)
      };
      fr.readAsDataURL(fileListObject.target.files[fileIndex])
  })
}

const prepareData = async () => {
    const csv = await Papa.parsePromise(
      "https://raw.githubusercontent.com/curiousily/Logistic-Regression-with-TensorFlow-js/master/src/data/diabetes.csv"
    );
  
    return csv.data;
  };

  
const run = async (data, features) => {

    const classifier = new LogRegClassifier();

    const confusion_container = document.getElementById("confusion-matrix");
    const lossContainer = document.getElementById("loss-cont");
    const accContainer = document.getElementById("acc-cont");

    const test_size = 0.1;
    const batch_size = 16;

    // const data = await prepareData();
    // const features = ["Glucose", "Age", "Insulin", "BloodPressure"];


    const [preds, labels] = await classifier.fullrun(data, features, test_size, batch_size, {lossContainer, accContainer});

    // const [trainDs, validDs, xTest, yTest] = LogRegClassifier.createDataSets_utility(
    //   data,
    //   features,
    //   test_size,
    //   batch_size
    // );

    // await classifier.train(
    //   features.length,
    //   trainDs,
    //   validDs,
    //   {
    //     lossContainer: loss_container,
    //     accContainer: acc_container
    //   }
    // );
  
    // const preds = classifier.predict(xTest).argMax(-1);
    // const labels = yTest.argMax(-1);
    const tick_labels = ["Healthy", "Diabetic"];
    await LogRegClassifier.renderConfusionMatrix_utility(preds, labels, confusion_container, tick_labels);

    return data;
  };
  

  const on_folder_uploaded_callback = async function(fileListObject) {

    console.log("folder upload done!")

    
    const object_csv_index = findFileIndex(fileListObject, "per_object.csv");
    const setup_sql_index = findFileIndex(fileListObject, "example_SETUP.SQL");
    const training_data_index = findFileIndex(fileListObject, "MyTrainingSet.txt");

    
    
    const setup_lines = (await fileReaderPromiseText(fileListObject, setup_sql_index)).split('\n').map(e=>e.trim());


    const training_data = await Papa.parsePromise(fileListObject.target.files[training_data_index],
      {...basicPapaConfig, delimiter: " ", comments: "#" }
  )
  .then((result)=>result.data.slice(1)) 
  .notify("Finished Loading Training Data")
    
    

    const object_column_lines = setup_lines.sliceByValue(
        "CREATE TABLE per_object (", 
        "PRIMARY KEY  (ImageNumber,ObjectNumber)"
    );
    
    const object_column_names = object_column_lines.map((name)=>name.split(' ')[0]).slice(1);
    console.log(object_column_names)



    const object_data = await Papa.parsePromise(fileListObject.target.files[object_csv_index],
          {...basicPapaConfig, fastMode: true, columns: object_column_names} // luckily it has no quotes so we can use fastmode
      )
      .then((result)=> result.data)
      .notify("Finished Loading Object Data");


      
    const labeled_cells = training_data.map(training_row=>{
        return object_data.find((data_row)=>data_row['ImageNumber'] === training_row[1] && data_row['ObjectNumber'] === training_row[2]);
    });



    const object_features_to_use = object_column_lines.filter((elem)=>!elem.includes("Location"));

    const labeled_features = _.pick(labeled_cells, object_features_to_use)
    console.log(labeled_cells, labeled_features, labeled_cells, object_features_to_use)

 
    run(labeled_cells, labeled_features )


}






const app = function() {

    

    return (
        <div>
          <button /*onClick={()=>{run().then((data)=>console.log(data));}}*/>Tensorflow</button>
            <p>
                yahiya stuff
            </p>
            <div id="loss-cont"></div>
            <div id="acc-cont"></div>
            <div id="confusion-matrix"></div>

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
                                onChange = {(fileName) => on_folder_uploaded_callback(fileName)}
                                />
                    </Button>  
        </div>
        
    )
}

export default app;