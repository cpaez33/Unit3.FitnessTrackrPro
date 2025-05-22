import { useParams } from "react-router-dom";
import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ActivityDetails() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { activityId } = useParams();
  const {
    data: activityData,
    loading,
    error,
  } = useQuery(`/activities/${activityId}`, `activityinfo-${activityId}`);

  const {
    mutate: deleteActivity,
    loadingDel,
    errorDel,
  } = useMutation("DELETE", "/activities/" + activityId, [
    `activityinfo-${activityId}`,
  ]);

  if (loading) return <p>Loading activity…</p>;
  if (error) return <p>Oops: {error}</p>;
  if (!activityData) return <p>Not found.</p>;

  return (
    <>
      <h1>{activityData.name}</h1>
      <p>by: {activityData.creatorName}</p>
      <p>{activityData.description}</p>
      {token && (
        <button
          onClick={() => {
            deleteActivity();
            if (!errorDel) navigate("/");
          }}
        >
          {loadingDel ? "Deleting" : errorDel ? errorDel : "Delete"}
        </button>
      )}
    </>
  );
}
