import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";
import App from "../App";
import Classes from "../pages/classes/Classes";
import CreateClass from "../pages/classes/CreateClass";
import ErrorFallback from "../pages/error/ErrorFallback";
import Teachers from "../pages/teachers/Teachers";
import CreateTeachers from "../pages/teachers/CreateTeachers";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<App />} errorElement={<ErrorFallback />}>
        <Route index path="/classes" element={<Classes />} />
        <Route path="/classes/create" element={<CreateClass />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/teachers/create" element={<CreateTeachers />} />
      </Route>
    </Route>,
  ),
);
