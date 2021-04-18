import _ from "lodash";
export default class DataUtils {
    //Will be static
    constructor() {}
    pairArraytoKeys(array, keys) {

        return array.map(data_row=>{ return _.zipObject(keys[1], data_row)})
    }
    getDataURLObjPromise = async function(promise_images, cords) {
        promise_images.then(images => {
            return images.map(image => {
                return createRGB(image)
            })
        })
        .then (rgb_images => {
            return tf.stack(rgb_images,2).squeeze()
        })
        .then (color_image => {
            this.createDataURL(color_image, cords)
        })   
         
    }
    createDataURL = async function(color_image, cords) {
        var canvas_at_index = document.createElement(`canvas`);
        canvas_at_index.width = 500;
        canvas_at_index.height = 600;
        var ctx_at_index = canvas_at_index.getContext("2d");
        var temp_canvas = document.createElement('canvas');  
        return new Promise((resolve, reject)=> {
            tf.browser.toPixels(image_info[idx].img_tf, temp_canvas).then(()=>{
                ctx_at_index.drawImage(temp_canvas, cords.x, cords.y, 40, 40, 0, 0, canvas_at_index.width, canvas_at_index.height)
                temp_canvas.remove();  
                return canvas_at_index.toDataURL();             
            })

        })
     }

    createRGB = async function (img) {
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


}