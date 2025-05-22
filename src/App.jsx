import { Routes, Route } from "react-router-dom";
import Register from "./auth/Register";
import Login from "./auth/Login";
import ActivitiesPage from "./activities/ActivitiesPage";
import Error404 from "./Error404.jsx";
import Layout from "./layout/Layout.jsx";
import ActivityDetails from "./activities/ActivityDetails.jsx";
import RoutinesPage from "./Routines/RoutinesPage.jsx";
import RoutineDetails from "./Routines/RoutineDetails.jsx";
/**
 * Fitness Trackr is a platform where fitness enthusiasts can share their workouts and
 * discover new routines. Anyone can browse the site and make an account, and users with an
 * account will be able to upload and manage their own activities.
 */
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="activities/:activityId" element={<ActivityDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route index element={<ActivitiesPage />} />
        <Route path="activities" element={<ActivitiesPage />} />
        <Route path="/routines" element={<RoutinesPage />} />
        <Route path="/routines/:routineId" element={<RoutineDetails />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
}
