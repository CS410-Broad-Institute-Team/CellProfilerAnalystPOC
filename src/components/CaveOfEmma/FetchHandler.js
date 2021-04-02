import { FilterCenterFocusOutlined } from "@material-ui/icons";
import _ from "lodash";
import * as tf from '@tensorflow/tfjs'


export default class FetchHandler {
    constructor (fileListObject, image_data) {
        this.fileListObject = fileListObject
        this.image_data = image_data
    };

    handleFetch = async function(img,cell) {
            var rgb_images = [];
            var channels = "Image_FileNames_Filename_OrigActin Image_FileNames_Filename_OrigpH3 Image_FileNames_Filename_OrigDNA".split(" ");
            var imagecur = _.find(this.image_data, {'ImageNumber': img.toString()});
            var image_paths = channels.map(path => {          
                   return _.get(imagecur, path)
             });
              console.log(image_paths)
            var file_indexes = image_paths.map(path => {
                var real_path = path.substring(1, path.length-1) //For some reason path has ""...""
                return this.findFile(real_path)
            });
            var i;
            for (i = 0; i < file_indexes.length; i++) {
                rgb_images.push(await this.createRGB(file_indexes[i]))
            }
            console.log(rgb_images)
            var channelss = []
            channelss.push((tf.unstack(rgb_images[0]))[2]);  //<< Rays idea
            channelss.push((tf.unstack(rgb_images[1]))[2]);
            channelss.push((tf.unstack(rgb_images[2]))[2]);
            var imageStack = tf.stack(channelss)
            console.log(imageStack)
            return imageStack.transpose([1, 2, 0]) //results in error
           // return tf.browser.toPixels(allimages);
            //console.log(allimages);


        
     }
     createRGB = async function (index) {
        var img = await this.fileReaderPromiseImage(index);
        console.log(img);
        return new Promise((resolve, reject)=> {
            var img_tf;
            var newImg = new Image();
            newImg.onload = (()=> {
                img_tf = tf.browser.fromPixels(newImg, 1)
                resolve(img_tf);
            })
        newImg.src = img
        })
     }
    findFile = (fileName) => {
        return Array.from(this.fileListObject.target.files).findIndex((elem) => {
            return elem.name === fileName;
        });
    };

    fileReaderPromiseImage(fileIndex) {
        return new Promise((resolve, reject)=> {
            var fr = new FileReader();
            fr.onload = () => {
                resolve(fr.result)
            };
            fr.readAsDataURL(this.fileListObject.target.files[fileIndex])
        });
    };
}