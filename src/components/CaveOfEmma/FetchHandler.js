import { EmojiObjectsOutlined, FilterCenterFocusOutlined } from "@material-ui/icons";
import _ from "lodash";
import * as tf from '@tensorflow/tfjs'
import { deepPurple } from "@material-ui/core/colors";

//Fetch handler before I knew what it was actually gonna be. A collection of methods that will be redistributed in the future
//Brings cells to canvas objects to display though now we are using images
export default class FetchHandler {
    constructor (file_handler, data_provider) {
        this.fh = file_handler
        this.dp = data_provider
    };

    handleFetch = async function(n) {
            var objects = this.dp.getNRandomObjs(n);
            var images = [];
            var rgb_images = [];
            var j;
            var i = 1;
            for (j = 0; j < n; j++) {
                var cords = this.dp.getCordsforCellDisplay(objects[j].img, objects[j].obj)
                var image_paths = this.dp.returnAllImgFileNames(objects[j].img)
                var file_indexes = image_paths.map(path => {
                    var real_path = path.substring(1, path.length-1) //For some reason path has ""...""
                    return this.fh.findFile(real_path)
                });
                //console.log(file)
                var i;
                for (i = 0; i < file_indexes.length; i++) {
                    rgb_images.push(await this.createRGB(file_indexes[i]))
                }
               // var cords = this.getCords(objects[j].ImageNumber, objects[j].ObjectNumber)
                var stack = tf.stack(rgb_images,2).squeeze()
                images.push({'x' : cords.x, 'y': cords.y, 'img_tf': stack});
            }

            //console.log(data_url)    
            return images;
        
     }
     createDataURL = async function(image_info) {
        return Promise.all(Array.from({length: 9}, (_,idx)=> {
    
            var canvas_at_index = document.createElement(`canvas`);
            canvas_at_index.width = 500;
            canvas_at_index.height = 600;
            var ctx_at_index = canvas_at_index.getContext("2d");
            var temp_canvas = document.createElement('canvas');                   
            // alright this promise will resolve when canvas is loaded with the tensorflow image
            return tf.browser.toPixels(image_info[idx].img_tf, temp_canvas).then(()=>{
                ctx_at_index.drawImage(temp_canvas, image_info[idx].lo_x, image_info[idx].lo_y, 40, 40, 0, 0, canvas_at_index.width, canvas_at_index.height)
                temp_canvas.remove();  
                return canvas_at_index.toDataURL();             
            })
            }));
     }
     getCords(image_key, object_key) {
        var cords = [];        
        var cellinObj = _.find(this.object_data, {'ImageNumber': image_key.toString(), 'ObjectNumber': object_key.toString()})
        var cellx = parseInt(_.get(cellinObj, 'Nuclei_Location_CenterX'))
        var celly = parseInt( _.get(cellinObj, 'Nuclei_Location_CenterY'))
        cords.push(Math.max(0, cellx - 20)) 
       // var hi_x = lo_x + 40
        cords.push(Math.max(0, celly - 20))
               // var hi_y = lo_y + 40
        return cords;
     }
     getNrandomObjs(n) {
        var num_of_objs = this.object_data.length
        var rand_objs = []
        var i;
        for (i=0; i < n; i++) {
            var index = Math.floor(Math.random() * num_of_objs);
            var obj = this.object_data[index];
            rand_objs.push({'ImageNumber': parseInt(obj.ImageNumber), 'ObjectNumber': parseInt(obj.ObjectNumber)})
        }
        return rand_objs
     }

     createRGB = async function (file) {
        var img = await this.fh.fileReaderPromiseImage(file);
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