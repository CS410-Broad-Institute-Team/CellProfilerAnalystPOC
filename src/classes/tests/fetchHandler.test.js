import {Classifier} from "../Classifier"
import {FetchHandler} from "../FetchHandler"
var assert = require('chai').assert;
import _ from "lodash";


describe('Fetch Handler tests', function() {

    describe('constructor tests', function() {

        it('basic construct', function() {
            
            const classifierType = "LogisticRegression"
            const featureNames = ["f1", "f2"]
            const trainingData = [{"f1": 1, "f2": 2, "f3": 5}, {"f1": 3, "f2": 4, "f3": 6}]
            const trainingLabels = [0, 1]
            const classifierOptions = {
                classifierType, featureNames, trainingData, trainingLabels
            }
            const classifier = new Classifier(classifierOptions);
            const dataProvider = "put data provider here which doesn't exist yet"
            const fetchHandler = new FetchHandler(classifier, dataProvider)

        });

    });
});