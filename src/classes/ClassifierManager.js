import {Classifier} from "./Classifier"
import _ from "lodash";

class ClassifierManager {
    constructor(DataProvider, InitialTrainingSetObject) {
        
        this.testConstructorInputPreconditions(DataProvider, InitialTrainingSetObject)

        this.DataProvider = DataProvider
        this.InitialTrainingObject = InitialTrainingSetObject

        this.SAMPLE_CONFIRMATION_INTERVAL = 1000

        const classifierType = InitialTrainingSetObject.classifierType
        const featuresToUse = InitialTrainingSetObject.featuresToUse
        const trainingData = InitialTrainingSetObject.trainingData
        const trainingLabels = InitialTrainingSetObject.trainingLabels
        this.TrainingSetObject = {
            classifierType,
            featuresToUse,
            trainingData,
            trainingLabels
        }
        this.Classifier = new Classifier(this.TrainingSetObject);
    }

    testConstructorInputPreconditions(DataProvider, InitialTrainingSetObject) {
        if (DataProvider == undefined || InitialTrainingSetObject == undefined) {
            throw new Error("Constructor Error on no dataprovider or no initialtrainingobject")
        }
        if (InitialTrainingSetObject.trainingData === undefined ||
            InitialTrainingSetObject.trainingLabels === undefined ||
            InitialTrainingSetObject.featuresToUse === undefined ||
            InitialTrainingSetObject.classifierType === undefined) {
            throw new Error("Constructor Error on InitialTrainingData missing fields")
        }
        if (InitialTrainingSetObject.classifierType !== "LogisticRegression") {
            throw new Error("Constructor Error classifierType passed in is not implemented")
        }
    }

    initTrainPromise() {
        return this.Classifier.trainPromise()
    }

    fetchNRandomCellPairs(N) {

        const cellPairObjects = this.DataProvider.getNRandomObjs(N)
        return cellPairObjects

    }

    fetchUpToNCellPairsByClassPromise(classType, N) {


        if (classType !== "positive" && classType !== "negative") {
            throw new Error(`Error on invalid class: got ${classType} but expected negative or positive}`)
        }

        const sampledCellPairObjects = this.DataProvider.getNRandomObjs(N)

        const testingData = sampledCellPairObjects.map(
            cellPair => this.DataProvider.getRow('object_data', cellPair)
        )

        var desiredLabel = 0
        if (classType == "positive") {
            desiredLabel = 1
        }

        return this.Classifier.predictPromise(testingData)
        .then(predicted_labels => {
            const classCellPairObjects = sampledCellPairObjects.filter(
                (pair, index) => predicted_labels[index] === desiredLabel 
            )

            if (classCellPairObjects.length < N) {
                return classCellPairObjects
            }

            return classCellPairObjects.slice(0, N)
        })
    }

    // confirmContinuePromise(numberOfCellsSampled, numberOfDesiredCellsFound) {
        
    //     return swal({
    //         title: "Continue?",
    //         text: `${numberOfCellsSampled} cells were sampled, but only ${numberOfDesiredCellsFound} were found, would you like to continue?`,
    //         buttons: true
    //       })
    //       .then((willDelete) => {
    //         if (willDelete) {
    //         //   swal("Poof! Your imaginary file has been deleted!", {
    //         //     icon: "success",
    //         //   });
    //           console.log("clicked ok")
    //           return true
    //         } else {
    //         //   swal("Your imaginary file is safe!");
    //           console.log("clicked cancel")
    //           return false
    //         }
    //       });
    // }

    appendToTrainingSetAndRetrainPromise(additionTrainingSetObject) {
        this.TrainingSetObject.trainingData = [...this.TrainingSetObject.trainingData, ...additionTrainingSetObject.trainingData]
        this.TrainingSetObject.trainingLabels = [...this.TrainingSetObject.trainingLabels, ...additionTrainingSetObject.trainingLabels]
        if (this.TrainingSetObject.classifierType !== additionTrainingSetObject.classifierType ||
            !_.isEqual(this.TrainingSetObject.featuresToUse, additionTrainingSetObject.featuresToUse)) {
                throw new Error("Error incompatible addition TrainingSetObject, needs same classifierType and featuresToUse:\n" + 
                                `Comparison: expected: ${this.TrainingSetObject.classifierType} and ${this.TrainingSetObject.featuresToUse}\n` +
                                `got: ${additionTrainingSetObject.classifierType} and ${additionTrainingSetObject.featuresToUse}`)
            }


        this.Classifier = new Classifier(this.TrainingSetObject);
        return this.Classifier.trainPromise()
    }

    getTrainingSetObject() {
        return this.TrainingSetObject.trainingData
    }

    userDownloadClassifierSpecPromise() {
        return this.Classifier.DownloadModelPromise()
    }
}

export {ClassifierManager}