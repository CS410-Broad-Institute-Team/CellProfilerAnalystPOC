import _ from "lodash";
export default class DataUtils {
    //Will be static
    constructor() {}
    pairArraytoKeys(array, keys) {

        return array.map(data_row=>{ return _.zipObject(keys[1], data_row)})
    }


}