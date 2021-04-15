import { render } from "@testing-library/react"
import React from "react";

//xport default class DownloadData {

    // eslint-disable-next-line no-undef
     const downloadTxtFile = (data, FileType) => {
        var file = {}
        var file_name = "data."

        const element = document.createElement("a");
        if(FileType.localeCompare("csv") === 0){
           file = new Blob([JSON.stringify(data)], {type: 'data:text/csv;charset=utf-8,'});
        }
        if(FileType.localeCompare("txt") === 0){
             file = new Blob([JSON.stringify(data)], {type: 'plain/text'});
        }
        if(FileType.localeCompare("json")){
            file = new Blob([JSON.stringify(data)], {tyoe: 'application/JSON'})
        }
        element.href = URL.createObjectURL(file);
        element.download = file_name.concat(FileType);
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
      
    }

    export default {downloadTxtFile};
//}