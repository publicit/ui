import { Route, Routes } from "react-router-dom";
import CompanyEdit from "../hooks/CompanyEdit";
import CompanyList from "../hooks/CompanyList";
import CompanyNewForm from "../hooks/CompanyNewForm";
import GroupList from "../hooks/GroupList";
import IssueEdit from "../hooks/IssueEdit";
import IssueList from "../hooks/IssueList";
import UserEdit from "../hooks/UserEdit";
import UserList from "../hooks/UserList";
import WorkerEdit from "../hooks/WorkerEdit";
import Workers from "../hooks/WorkerList";
import WorkerNewForm from "../hooks/WorkerNewForm";
import Root from "./Root";

export default () => (
  <>
    <Routes>
      <Route exact path="/workers" element={<Workers />} />
      <Route exact path="/workers-new" element={<WorkerNewForm />} />
      <Route exact path="/workers/:id" element={<WorkerEdit />} />
      <Route exact path="/company-new" element={<CompanyNewForm />} />
      <Route exact path="/companies/:id" element={<CompanyEdit />} />
      <Route exact path="/companies" element={<CompanyList />} />
      <Route exact path="/worker-new" element={<WorkerNewForm />} />
      <Route exact path="/issues-list" element={<IssueList view={0} />} />
      <Route exact path="/issues-kanban" element={<IssueList view={1} />} />
      <Route exact path="/issues/:id" element={<IssueEdit />} />
      <Route exact path="/users" element={<UserList />} />
      <Route exact path="/users/:id" element={<UserEdit />} />
      <Route exact path="/groups" element={<GroupList />} />
      <Route path="*" element={<Root />} />
    </Routes>
  </>
);
