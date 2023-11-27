import Root from "./pages/Root";
import {Route, Routes} from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import CampaignList from "./pages/CampaignList";


export default function routeDefinitions() {
    return (
        <Routes>
            <Route path="*" element={<ErrorPage/>}/>
            <Route path="/" element={<Root/>}/>
            <Route path="/campaigns" element={<CampaignList/>}/>
        </Routes>
    )
}
