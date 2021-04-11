import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

  import YahiyaTensorflowExampleComponent from "./YahiyaTensorflowExample"
  import YahiyaTensorflowAbstractedComponent from "./YahiyaTensorflowAbstracted"
  import TestUploadDataHandlerComponent from "./testUploadDataHandler"

  import TestTheLogisticClassifierComponent from "./TestTheLogisticClassifier"

  import TestCanvasComponent from "./TestCanvas"

  import CopiedDragNDropComponent from "./CopiedDragNDrop"

  import CopiedWebWorkersDemoComponent from "./CopiedWebWorkersDemo"

  import DumbWWEx from "./DumbWebWorkerExample"

  import MainProofOfConcept from "./MainProofOfConcept"

  function TestingHome () {
    return (
        <div>
            <Router>
                <div>
                    <ul>
                        <li>
                            <Link to="/YahiyaTensorflowExample">Yahiya Tensorflow Example</Link>
                        </li>
                        <li>
                            <Link to="/YahiyaTensorflowAbstracted">Yahiya Tensorflow Abstracted</Link>
                        </li>
                        <li>
                            <Link to="/UploadDataHandler">Test Upload Data Handler</Link>
                        </li>
                        <li>
                            <Link to="/TestTheLogisticClassifier">Test The Logistic Classifier</Link>
                        </li>
                        <li>
                            <Link to="/canvas">Test the Canvas</Link>
                        </li>
                        <li>
                            <Link to="/CopiedDragNDrop">Copied Tutorial for Drag and Drop</Link>
                        </li>
                        <li>
                            <Link to="/CopiedWebWorkersDemo">Copied Tutorial for WebWorkers!</Link>
                        </li>
                        <li>
                            <Link to="/dumbww">Example of Simple Webworker usage!</Link>
                        </li>
                        <li>
                            <Link to="/MainPOC">Main Test of proof of concept</Link>
                        </li>
                    </ul>

                    <hr />

                    <Switch>
                        <Route exact path="/YahiyaTensorflowExample">
                            <YahiyaTensorflowExampleComponent />
                        </Route>
                        <Route exact path="/YahiyaTensorflowAbstracted">
                            <YahiyaTensorflowAbstractedComponent />
                        </Route>
                        <Route exact path="/UploadDataHandler">
                            <TestUploadDataHandlerComponent />
                        </Route>
                        <Route exact path="/TestTheLogisticClassifier">
                            <TestTheLogisticClassifierComponent />
                        </Route>
                        <Route exact path="/canvas">
                            <TestCanvasComponent />
                        </Route>
                        <Route exact path="/CopiedDragNDrop">
                            <CopiedDragNDropComponent />
                        </Route>
                        <Route exact path="/CopiedWebWorkersDemo">
                            <CopiedWebWorkersDemoComponent/>
                        </Route>
                        <Route exact path="/dumbww">
                            <DumbWWEx/>
                        </Route>
                        <Route exact path="/MainPOC">
                            <MainProofOfConcept/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    )
  }

  export default TestingHome