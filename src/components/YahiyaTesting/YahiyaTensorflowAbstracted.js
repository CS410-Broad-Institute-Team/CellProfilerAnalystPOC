import * as Papa from "papaparse"
import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";
import _ from "lodash";

import LogRegClassifier from './LogisticRegressionClassifier'

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
const prepareData = async () => {
    const csv = await Papa.parsePromise(
      "https://raw.githubusercontent.com/curiousily/Logistic-Regression-with-TensorFlow-js/master/src/data/diabetes.csv"
    );
  
    return csv.data;
  };

  
const run = async () => {

    const classifier = new LogRegClassifier();

    const confusion_container = document.getElementById("confusion-matrix");
    const lossContainer = document.getElementById("loss-cont");
    const accContainer = document.getElementById("acc-cont");

    const test_size = 0.1;
    const batch_size = 16;

    const data = await prepareData();
    const feature_names = ["Glucose", "Age", "Insulin", "BloodPressure"];
    const tick_labels = ["Healthy", "Diabetic"];

    const [preds, labels] = await classifier.fullrun(data, feature_names, test_size, batch_size, {lossContainer, accContainer, confusion_container, tick_labels});
    preds.print();
    labels.print();
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
    // const tick_labels = ["Healthy", "Diabetic"];
    // await LogRegClassifier.renderConfusionMatrix_utility(preds, labels, confusion_container, tick_labels);

    return data;
  };
  
  




const app = function() {

    

    return (
        <div>
          <button onClick={()=>{run().then((data)=>console.log(data));}}>Tensorflow</button>
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