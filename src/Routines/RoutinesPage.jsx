import { useAuth } from "../auth/AuthContext";
import RoutineForm from "./RoutineForm";
import RoutineList from "./RoutineList";

export default function RoutinesPage() {
  const { token } = useAuth();
  return (
    <>
      <h1>Routines</h1>
      <RoutineList />
      {/* remember to add token conditional rendering here */}
      <RoutineForm />
    </>
  );
}
