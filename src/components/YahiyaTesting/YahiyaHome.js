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
                    </Switch>
                </div>
            </Router>
        </div>
    )
  }

  export default TestingHome