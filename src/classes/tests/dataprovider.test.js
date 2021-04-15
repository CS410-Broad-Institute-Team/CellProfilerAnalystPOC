
import {DataProvider} from "../DataProvider"
var assert = require('chai').assert;
import _ from "lodash";



describe('Data Provider tests', function() {

    describe('constructor tests', function() {

        it('fail on pass nothing', function() {
            assert.throws(()=>{
                const p = new DataProvider();
                
            }, 
            
            Error, "Constructor Error on no uniformdata")
            
        });

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

            const dataProvider = new DataProvider(uniformData)
        
            
        });
    });

    describe('API calls', function() {
        

        it('basic get image filenames', function() {
            
            

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

            const dataProvider = new DataProvider(uniformData)

            const imgFileNames_1 = dataProvider.returnAllImgFileNames(1)
            const expected_1 = ["img1A.png","img1P.png","img1D.png"]
            const imgFileNames_2 = dataProvider.returnAllImgFileNames(2)
            const expected_2 = ["img2A.png","img2P.png","img2D.png"]
            const imgFileNames_3 = dataProvider.returnAllImgFileNames(3)
            const expected_3 = ["img3A.png","img3P.png","img3D.png"]

            assert.equal(JSON.stringify(imgFileNames_1), expected_1)
            assert.equal(JSON.stringify(imgFileNames_2), expected_2)
            assert.equal(JSON.stringify(imgFileNames_3), expected_3)
        
        });

        
        it('basic get image filenames', function() {
            
            

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

            const dataProvider = new DataProvider(uniformData)

            const imgFileNames_1 = dataProvider.returnAllImgFileNames(1)
            const expected_1 = ["img1A.png","img1P.png","img1D.png"]
            const imgFileNames_2 = dataProvider.returnAllImgFileNames(2)
            const expected_2 = ["img2A.png","img2P.png","img2D.png"]
            const imgFileNames_3 = dataProvider.returnAllImgFileNames(3)
            const expected_3 = ["img3A.png","img3P.png","img3D.png"]

            assert.equal(JSON.stringify(imgFileNames_1), expected_1)
            assert.equal(JSON.stringify(imgFileNames_2), expected_2)
            assert.equal(JSON.stringify(imgFileNames_3), expected_3)
        
        });

        

        it('basic get random cell pairs', function() {
            
            

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

            const dataProvider = new DataProvider(uniformData)

            const N = 2
            const nRandomCellPairs = dataProvider.getNRandomObjs(N)
            
            

            const totalPossibleCellPairs = [{"ImageNumber": 1, "ObjectNumber": 1},
                                            {"ImageNumber": 2, "ObjectNumber": 2},
                                            {"ImageNumber": 3, "ObjectNumber": 3}]

            
            // chech that each returned pair object is one of the possible pairs
            for (var i = 0; i < N; i++) {
                assert.deepInclude(totalPossibleCellPairs, nRandomCellPairs[i])
                
            }
        
        });

    })
    
});