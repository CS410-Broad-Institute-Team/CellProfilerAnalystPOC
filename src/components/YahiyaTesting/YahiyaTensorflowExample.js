import * as Papa from "papaparse"
import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";
import _ from "lodash";

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
const oneHot = outcome => Array.from(tf.oneHot(outcome, 2).dataSync());
const prepareData = async () => {
    const csv = await Papa.parsePromise(
      "https://raw.githubusercontent.com/curiousily/Logistic-Regression-with-TensorFlow-js/master/src/data/diabetes.csv"
    );
  
    return csv.data;
  };
const createDataSets = (data, features, testSize, batchSize) => {
    const X = data.map(r =>
      features.map(f => {
        const val = r[f];
        return val === undefined ? 0 : val;
      })
    );
    const y = data.map(r => {
      const outcome = r.Outcome === undefined ? 0 : r.Outcome;
      return oneHot(outcome);
    });

    console.log(data, features, testSize, batchSize, X, y)
  
    const splitIdx = parseInt((1 - testSize) * data.length, 10);
  
    const ds = tf.data
      .zip({ xs: tf.data.array(X), ys: tf.data.array(y) })
      .shuffle(data.length, 42);
  
    return [
      ds.take(splitIdx).batch(batchSize),
      ds.skip(splitIdx + 1).batch(batchSize),
      tf.tensor(X.slice(splitIdx)),
      tf.tensor(y.slice(splitIdx))
    ];
  };

  
const trainComplexModel = async (featureCount, trainDs, validDs) => {
  const model = tf.sequential()
  model.add(
    tf.layers.dense({
      units: 128,
      activation: "relu",
      inputShape: [featureCount],
    })
  )
  model.add(
    tf.layers.dropout({
      rate: 0.3
    })
  )
  model.add(
    tf.layers.dense({
      units: 2,
      activation: "softmax",
    })
  )
  const optimizer = tf.train.adam(0.001);
    model.compile({
      optimizer: optimizer,
      loss: "binaryCrossentropy",
      metrics: ["accuracy"]
    });
    const trainLogs = [];
    const lossContainer = document.getElementById("loss-cont");
    const accContainer = document.getElementById("acc-cont");
    console.log("Training...");
    await model.fitDataset(trainDs, {
      epochs: 1,
      validationData: validDs,
      callbacks: {
        onEpochEnd: async (epoch, logs) => {
          trainLogs.push(logs);
          console.log("epoch end:", epoch)
          tfvis.show.history(lossContainer, trainLogs, ["loss", "val_loss"]);
          tfvis.show.history(accContainer, trainLogs, ["acc", "val_acc"]);
        }
      }
    });

    return model;
}

const trainLogisticRegression = async (featureCount, trainDs, validDs) => {
    const model = tf.sequential();
    model.add(
      tf.layers.dense({
        units: 2,
        activation: "softmax",
        inputShape: [featureCount]
      })
    );
    const optimizer = tf.train.adam(0.001);
    model.compile({
      optimizer: optimizer,
      loss: "binaryCrossentropy",
      metrics: ["accuracy"]
    });
    const trainLogs = [];
    const lossContainer = document.getElementById("loss-cont");
    const accContainer = document.getElementById("acc-cont");
    console.log("Training...");
    await model.fitDataset(trainDs, {
      epochs: 1,
      validationData: validDs,
      callbacks: {
        onEpochEnd: async (epoch, logs) => {
          trainLogs.push(logs);
          console.log("epoch end:", epoch)
          tfvis.show.history(lossContainer, trainLogs, ["loss", "val_loss"]);
          tfvis.show.history(accContainer, trainLogs, ["acc", "val_acc"]);
        }
      }
    });
  
    return model;
  };

  
const run = async () => {
    const data = await prepareData();
    console.log("data prepared!")
    // const features = ["Glucose"];

     const features = ["Glucose", "Age", "Insulin", "BloodPressure"];
    const [trainDs, validDs, xTest, yTest] = createDataSets(
      data,
      features,
      0.1,
      16
    );
    console.log("data set created!")
  
    // const model = await trainLogisticRegression(
    //   features.length,
    //   trainDs,
    //   validDs
    // );
    
      
   
  
    // const [trainDs, validDs, xTest, yTest] = createDataSets(
    //   data,
    //   features,
    //   0.1,
    //   16
    // );
  
    const model = await trainLogisticRegression(features.length, trainDs, validDs);
    console.log("model trained!")
  
    const preds = model.predict(xTest).argMax(-1);
    const labels = yTest.argMax(-1);
    // console.log(preds,labels)
    preds.print();
    labels.print();
    const confusionMatrix = await tfvis.metrics.confusionMatrix(labels, preds);
  
    const container = document.getElementById("confusion-matrix");
  
    tfvis.render.confusionMatrix(container, {
      values: confusionMatrix,
      tickLabels: ["Healthy", "Diabetic"]
    });

    return data;
  };
  
  // if (document.readyState !== "loading") {
  //   run();
  // } else {
  //   document.addEventListener("DOMContentLoaded", run);
  // }
  
  




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