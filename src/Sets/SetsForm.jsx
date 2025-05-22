import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";

export default function SetsForm({ routineId }) {
  const {
    data: activities,
    loading: loadingAct,
    error: activitiesErr,
  } = useQuery("/activities", "activities");

  const {
    mutate: addSet,
    loading,
    error,
  } = useMutation("POST", "/sets", ["routines", "routine"]);

  const onAddSet = async (formData) => {
    const activityId = formData.get("activity");
    const count = formData.get("count");
    await addSet({ activityId, routineId, count });
  };

  if (loadingAct) return <p>Loading activities...</p>;
  if (activitiesErr || !activities) return <p>Sorry! {activitiesErr}</p>;

  return (
    <>
      <h2>Add a set</h2>
      <form action={onAddSet}>
        <label>
          Activity
          <select name="activity">
            {activities.map((activity) => (
              <option key={activity.id} value={activity.id}>
                {activity.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Count
          <input type="number" name="count" />
        </label>
        <button>{loading ? "Adding..." : "Add set"}</button>
        {error && <output>{error}</output>}
      </form>
    </>
  );
}
