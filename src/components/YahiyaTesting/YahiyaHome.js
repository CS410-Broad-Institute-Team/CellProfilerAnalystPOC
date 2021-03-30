import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

  import YahiyaTensorflowExampleComponent from "./YahiyaTensorflowExample"
  import YahiyaTensorflowAbstractedComponent from "./YahiyaTensorflowAbstracted"
  import LogRegOnUploadComponent from "./LogRegOnUpload"
  import TestUploadDataHandlerComponent from "./testUploadDataHandler"

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
                            <Link to="/LogRegOnUpload">Logistic Regression on Upload</Link>
                        </li>
                        <li>
                            <Link to="/UploadDataHandler">Test Upload Data Handler</Link>
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
                    <Route exact path="/LogRegOnUpload">
                        <LogRegOnUploadComponent />
                    </Route>
                    <Route exact path="/UploadDataHandler">
                        <TestUploadDataHandlerComponent />
                    </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    )
  }

  export default TestingHome