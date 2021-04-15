import {Classifier} from "../Classifier"
import {ClassifierManager} from "../ClassifierManager"
import {DataProvider} from "../DataProvider"
var assert = require('chai').assert;
import _ from "lodash";



describe('Classifier Manager tests', function() {

    describe('constructor tests', function() {

        it('basic construct', function() {
            
            

            const object_data = [
                {"ImageNumber": 1, "ObjectNumber": 1, "f1": 1, "f2": 2, "f3": 5, "Nuclei_Location_CenterX": 1, "Nuclei_Location_CenterY": 3},
                {"ImageNumber": 2, "ObjectNumber": 2, "f1": 3, "f2": 4, "f3": 6, "Nuclei_Location_CenterX": 2, "Nuclei_Location_CenterY": 5},
                {"ImageNumber": 3, "ObjectNumber": 3, "f1": 2, "f2": 7, "f3": 3, "Nuclei_Location_CenterX": 5, "Nuclei_Location_CenterY": 4}
            ]
            const object_columns = ["ImageNumber", "ObjectNumber", "f1", "f2", "f3"]

            const image_data = [
                {"ImageNumber": 1, "ObjectNumber": 1, "Image_FileNames_Filename_OrigActin": "img1A.png","Image_FileNames_Filename_OrigpH3": "img1P.png","Image_FileNames_Filename_OrigDNA": "img1D.png"},
                {"ImageNumber": 2, "ObjectNumber": 2, "Image_FileNames_Filename_OrigActin": "img2A.png", "Image_FileNames_Filename_OrigpH3": "img2P.png","Image_FileNames_Filename_OrigDNA": "img2.png"},
                {"ImageNumber": 3, "ObjectNumber": 3, "Image_FileNames_Filename_OrigActin": "img3A.png", "Image_FileNames_Filename_OrigpH3": "img3P.png","Image_FileNames_Filename_OrigDNA": "img3.png"}
            ]
            const image_columns = ["ImageNumber", "ObjectNumber", "Image_FileNames_Filename_OrigActin", "Image_FileNames_Filename_OrigpH3", "Image_FileNames_Filename_OrigDNA"]

            const uniformData = {
                object_data,
                object_columns,
                image_data,
                image_columns
            }

            const featuresToUse = ["f1", "f2"]
            const initialTrainingObject = {
                TrainingData: [{"f1": 1, "f2": 2, "f3": 5}, {"f1": 3, "f2": 4, "f3": 6}],
                TrainingLabels: [0, 1]
            }
            const dataProvider = new DataProvider(uniformData)
            const classifierManager = new ClassifierManager(dataProvider, initialTrainingObject, featuresToUse)

        });

    });

    describe('', function() {

    });
});