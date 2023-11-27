import Root from "./pages/Root";
import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import CampaignList from "./pages/CampaignList";


function routeDefinitions() {
    return (
        <Route
            path="/" element={<Root/>}
            errorElement={<ErrorPage/>}
        >
            <Route errorElement={<ErrorPage/>}>
                <Route path="/campaigns" element={<CampaignList/>} />
            </Route>
        </Route>
    )
}

export default function RouteDefinitions() {
    return createBrowserRouter(
        createRoutesFromElements(
            routeDefinitions(),
        ),
    )
}
