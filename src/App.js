import { Routes, Route } from "react-router-dom";
import * as FEAAS from "@sitecore-feaas/clientside/react"
import './App.css'
import Slider from "./Slider";

function App() {
    /* example of preview route with react router */

    FEAAS.External.setRegistrationCallback()
    return (
        <Routes>
            {/* your routes here */}
            <Route path={'/preview'} element={<FEAAS.External.Preview data={{test:'test'}}/>} />
            <Route path={'/slider'} element={<Slider items={[1,2,3,4]} active={1}/>} />
        </Routes>
    )
}

export default App;


