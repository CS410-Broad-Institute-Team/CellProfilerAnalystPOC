import * as Papa from "papaparse"
import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";
import _ from "lodash";
import { yellow } from "@material-ui/core/colors";

// expects data to be an array of objects where each object includes the fields of the elements of columns
export default class LogisticRegressionClassifier {

    static oneHot = outcome => Array.from(tf.oneHot(outcome, 2).dataSync());
    static createDataSets_utility = (data, columns, testSize, batchSize) => {

      console.log(data, columns, testSize, batchSize)
      console.assert(Object.values(data[0]).reduce((accum, currVal)=>accum&&(typeof currVal === "number")), "First row object is numbers")
      console.assert(_.every(columns, _.partial(_.has, data[0])));
      console.assert(_.has(data[0], 'Outcome'))

      const X = data.map(r =>
        columns.map(f => {
          const val = r[f];
          return val === undefined ? 0 : val;
        })
      );
      const y = data.map(r => {
        const outcome = r.Outcome === undefined ? 0 : r.Outcome;
        return this.oneHot(outcome);
      });
  
      console.log(data, columns, testSize, batchSize, X, y)
    
      const splitIdx = parseInt((1 - testSize) * data.length, 10);
    
      const ds = tf.data
        .zip({ xs: tf.data.array(X), ys: tf.data.array(y) })
        .shuffle(data.length, Date.now()%100000);
    
      return [
        ds.take(splitIdx).batch(batchSize),
        ds.skip(splitIdx + 1).batch(batchSize),
        tf.tensor(X.slice(splitIdx)),
        tf.tensor(y.slice(splitIdx))
      ];
    };

    async convertThenFullRun(data, features, test_size, batch_size, render, data_labels) {

      const data_plusOutcome = data.map((data_row, idx)=>{
        return {...data_row, Outcome: data_labels[idx]}
      })

      const shuffled_data = _.shuffle(data_plusOutcome)

      return await this.fullrun_overfit(shuffled_data, features, test_size, batch_size, render)
    }

    static renderConfusionMatrix_utility = async (predictions, labels, confusion_container, tick_labels) => {
        const confusionMatrix = await tfvis.metrics.confusionMatrix(labels, predictions);
        tfvis.render.confusionMatrix(confusion_container, {
          values: confusionMatrix,
          tickLabels: tick_labels
        });
    }
    trainComplexModel = async (featureCount, trainDs, validDs) => {
      const model = tf.sequential()
      model.add(
        tf.layers.dense({
          units: 16,
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
          epochs: 100,
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
    
        this.model = model;
    }

    
    train = async (featureCount, trainDs, validDs, render=null) => {
        const model = tf.sequential();

        model.add(
        tf.layers.dense({
            units: 2,
            activation: "softmax",
            inputShape: [featureCount]
        }));

        model.add(
        tf.layers.dropout({
          rate: 0.3
        }));

        const optimizer = tf.train.adam(0.001);
        model.compile({
        optimizer: optimizer,
        loss: "binaryCrossentropy",
        metrics: ["accuracy"]
        });
        const trainLogs = [];
        if (render) {
            var lossContainer = render.lossContainer;
            var accContainer = render.accContainer;
        }
        
        console.log("Training...");
        await model.fitDataset(trainDs, {
        epochs: 100,
        validationData: validDs,
        callbacks: {
            onEpochEnd: async (epoch, logs) => {
            trainLogs.push(logs);
            console.log("epoch end:", epoch)
            if (render){
                tfvis.show.history(lossContainer, trainLogs, ["loss", "val_loss"]);
                tfvis.show.history(accContainer, trainLogs, ["acc", "val_acc"]);
            }
            
            }
        }
        });
    
        this.model = model;
    };

    predict = (xTest) => {
        return this.model.predict(xTest);
    }
  

    fullrun_overfit = async (data, features, test_size, batch_size, render=null) => {

      const [trainDs, validDs, xTest, yTest] = this.constructor.createDataSets_utility(
          data,
          features,
          0,
          batch_size
      );

      await this.train(
          features.length,
          trainDs,
          trainDs,
          render
      );

        

      const preds = this.predict(xTest).argMax(-1);
      const labels = yTest.argMax(-1);
      

      
      
      labels.print();

      if (render?.tick_labels){
        const confusionMatrix = await tfvis.metrics.confusionMatrix(labels, preds);


      tfvis.render.confusionMatrix(render.confusion_container, {
        values: confusionMatrix,
        tickLabels: render.tick_labels
      });
      }


      return [preds, labels];

  }


    fullrun = async (data, features, test_size, batch_size, render=null) => {

        const [trainDs, validDs, xTest, yTest] = this.constructor.createDataSets_utility(
            data,
            features,
            test_size,
            batch_size
        );

        await this.train(
            features.length,
            trainDs,
            validDs,
            render
        );

          
        xTest.print();
        yTest.print();
        const preds = this.predict(xTest).argMax(-1);
        const labels = yTest.argMax(-1);
        

        
        
        labels.print();

        if (render?.tick_labels){
          const confusionMatrix = await tfvis.metrics.confusionMatrix(labels, preds);
  

        tfvis.render.confusionMatrix(render.confusion_container, {
          values: confusionMatrix,
          tickLabels: render.tick_labels
        });
        }


        return [preds, labels];

    }

}

