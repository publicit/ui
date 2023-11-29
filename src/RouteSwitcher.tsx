import Root from "./pages/Root";
import {Route, Routes} from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import CampaignList from "./pages/CampaignList";
import {UserProfile} from "./models/user";

type params = {
    profile: UserProfile | undefined
}

export default function RouteSwitcher({profile}: params) {
    return (
        <Routes>
            <Route path="*" element={<ErrorPage/>}/>
            <Route path="/" element={<Root/>}/>
            {profile?.email &&
                <>
                    <Route path="/campaigns" element={<CampaignList/>}/>
                </>}
        </Routes>
    )
}
