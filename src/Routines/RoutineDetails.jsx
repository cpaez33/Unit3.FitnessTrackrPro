import { useNavigate, useParams } from "react-router-dom";
import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";
import { useAuth } from "../auth/AuthContext";
import SetsList from "../Sets/SetsList";
import SetsForm from "../Sets/SetsForm";

export default function RoutineDetails() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { routineId } = useParams();

  const {
    data: routineData,
    loading,
    error,
  } = useQuery(`/routines/${routineId}`, `routineinfo-${routineId}`);

  const {
    mutate: deleteRoutine,
    loadingDel,
    errorDel,
  } = useMutation("DELETE", "/routines/" + routineId, [
    `routineinfo-${routineId}`,
  ]);

  if (loading) return <p>Loading activity…</p>;
  if (error) return <p>Oops: {error}</p>;
  if (!routineData) return <p>Not found.</p>;

  return (
    <>
      <h1>{routineData.name}</h1>
      <p>by: {routineData.creatorName}</p>
      <p>{routineData.goal}</p>
      {token && (
        <button
          onClick={() => {
            deleteRoutine();
            if (!errorDel) navigate("/routines");
          }}
        >
          {loadingDel ? "Deleting" : errorDel ? errorDel : "Delete"}
        </button>
      )}
      <SetsList sets={routineData.sets} />
      {token && <SetsForm routineId={routineData.id} />}
    </>
  );
}
