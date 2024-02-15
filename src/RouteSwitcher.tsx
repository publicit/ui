import * as React from "react";
import { Route, Routes } from "react-router-dom";

// Pages :
import Root from "./pages/Root";
import QuizNew from "./pages/QuizNew";
import QuizEdit from "./pages/QuizEdit";
import Error404 from "./pages/Error404";
import AnswerNew from "./pages/AnswerNew";
import AnswerEdit from "./pages/AnswerEdit";
import { RoleEdit } from "./pages/RoleEdit";
import { UserEdit } from "./pages/UserEdit";
import { UsersList } from "./pages/UserList";
import { RolesList } from "./pages/RolesList";
import QuestionNew from "./pages/QuestionNew";
import CampaignNew from "./pages/CampaignNew";
import UserQuizList from "./pages/UserQuizList";
import CampaignList from "./pages/CampaignList";
import CampaignEdit from "./pages/CampaignEdit";
import QuestionEdit from "./pages/QuestionEdit";
import ProfileEdit from "./pages/UserProfileEdit"
import ShareStart from "./pages/UserQuizSharedStart";
import UserQuizFillForm from "./pages/UserQuizFillForm";
import UserQuizSummaryView from "./pages/UserQuizSummaryView";

import Error401 from "./pages/Error401";
import Error403 from "./pages/Error403";

// Models :
import { RoleNames } from "./models/role";
import { UserProfileResponse } from "./models/user";

// Helpers :
import { roleNameToEnum } from "./helpers/roles";


type params = {
    profile: UserProfileResponse | undefined
}

type RouteRole = {
    route: React.ReactElement
    roles: RoleNames[]
}

// checks if the provided rule has role access defined in the provided profile
function routeHasAccess(route: RouteRole, profile: UserProfileResponse | undefined): boolean {
    // no role declared in the route, means anyone can access it
    if (route.roles.length === 0) return true

    // profile may come undefined
    if (!profile) return false

    // loop over role accesses
    for (let i = 0; i < route.roles.length; i++) {
        for (let j = 0; j < profile.roles.length; j++) {
            const role: string = profile.roles[j]
            const roleName: RoleNames = roleNameToEnum(role)
            if (route.roles[i] === roleName) {
                return true
            }
        }
    }
    return false
}

// returns an array of routes, which have specific role access
function routesWithRoles(): RouteRole[] {
    return [
        {
            route: <Route path="/invitation/:token" element={<ShareStart />} />,
            roles: [],
        },
        {
            route: <Route path="/answers/new/:question_id" element={<AnswerNew />} />,
            roles: [RoleNames.CampaignOwners],
        },
        {
            route: <Route path="/answers/:id" element={<AnswerEdit />} />,
            roles: [RoleNames.CampaignOwners],
        },
        {
            route: <Route path="/campaigns" element={<CampaignList />} />,
            roles: [RoleNames.CampaignOwners],
        },
        {
            route: <Route path="/campaigns/new" element={<CampaignNew />} />,
            roles: [RoleNames.CampaignOwners],
        },
        {
            route: <Route path="/campaigns/:id" element={<CampaignEdit />} />,
            roles: [RoleNames.CampaignOwners],
        },
        {
            route: <Route path="/questions/new/:quiz_id" element={<QuestionNew />} />,
            roles: [RoleNames.CampaignOwners],
        },
        {
            route: <Route path="/questions/:id" element={<QuestionEdit />} />,
            roles: [RoleNames.CampaignOwners],
        },
        {
            route: <Route path="/quizs/new/:campaign_id" element={<QuizNew />} />,
            roles: [RoleNames.CampaignOwners],
        },
        {
            route: <Route path="/quizs/:id" element={<QuizEdit />} />,
            roles: [RoleNames.CampaignOwners],
        },

        {
            route: <Route path="/user/quizs/:id" element={<UserQuizFillForm />} />,
            roles: [RoleNames.Users],
        },
        {
            route: <Route path="/user/quizs" element={<UserQuizList />} />,
            roles: [RoleNames.Users],
        },
        {
            route: <Route path="/user/quizs/:user_quiz_id/summary" element={<UserQuizSummaryView />} />,
            roles: [RoleNames.Users],
        },


        {
            route: <Route path="/user/profile" element={<ProfileEdit />} />,
            roles: [RoleNames.Users],
        },

        {
            route: <Route path="/roles/:id" element={<RoleEdit />} />,
            roles: [RoleNames.Administrators],
        },
        {
            route: <Route path="/roles" element={<RolesList />} />,
            roles: [RoleNames.Administrators],
        },
        {
            route: <Route path="/users" element={<UsersList />} />,
            roles: [RoleNames.Administrators],
        },
        {
            route: <Route path="/users/:id" element={<UserEdit />} />,
            roles: [RoleNames.Administrators],
        },
    ]
}

export default function RouteSwitcher({ profile }: params) {
    //  allow to access routes based on role membership
    const routes = routesWithRoles()
    return (
        <Routes>
            <Route path="/" element={<Root />} />

            {routes.filter(route => routeHasAccess(route, profile)).map((route, index) => (
                <Route key={route.route.props.path.toString()} {...route.route.props} />
            ))}

            <Route path="/errors/unauthenticaed" element={<Error401 />} />
            <Route path="/errors/unauthorized" element={<Error403 />} />
            <Route path="*" element={<Error404 />} />
        </Routes>
    )
}
