import { Routes, Route } from "react-router-dom";
import * as FEAAS from "@sitecore-feaas/clientside/react"
import './App.css'
import Slider from "./Slider";

function App() {
    /* example of preview route with react router */

    //FEAAS.External.setRegistrationCallback()
    return (
        <Routes>
            {/* your routes here */}
            <Route path={'/preview'} element={<FEAAS.External.Preview data={{test:'test'}}/>} />
            <Route path={'/'} element={<Slider />} />
        </Routes>
    )
}

export default App;


