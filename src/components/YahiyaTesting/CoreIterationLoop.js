
export default class CoreIterationLoop {
    constructor() {
        this.stateEnum =    {
                                "EnterAppState": 0, 
                                "UploadingData": 1,
                                "DataUploadedStandby": 2, 
                                "FetchingImages": 3,
                                "UponRandomFetchUserDnD": 4,
                                "UponPositiveFetchUserDnD": 5,
                                "UponNegativeFetchUserDnD": 6,
                                "TrainingClassifier": 7
                            }
        Object.freeze(this.stateEnum)

        this.currentState = this.stateEnum.EnterAppState
    }

    onUploadButton(fileListObject) {
        this.currentState = this.stateEnum.UploadingData;

    }

    onFetchButton(fetchType, gridData) {
        this.currentState = this.stateEnum.FetchingImages;
    }

    onTrainButton() {
        this.currentState = this.stateEnum.TrainingClassifier
    }


    
}