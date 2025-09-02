import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";
import App from "../App";
import Classes from "../pages/classes/Classes";
import CreateClass from "../pages/classes/CreateClass";
import ErrorFallback from "../pages/error/ErrorFallback";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<App />} errorElement={<ErrorFallback />}>
        <Route index path="/classes" element={<Classes />} />
        <Route path="/classes/create" element={<CreateClass />} />
        <Route path="/teachers" element={<div>Teachers</div>} />
        <Route path="/teachers/create" element={<div>CREATION</div>} />
      </Route>
    </Route>,
  ),
);
