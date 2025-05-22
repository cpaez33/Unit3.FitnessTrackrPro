import { useAuth } from "../auth/AuthContext";
import useMutation from "../api/useMutation";

export default function SetsList({ sets }) {
  return (
    <>
      <h3>Sets</h3>
      {sets.length > 0 ? (
        <ul>
          {sets.map((set) => (
            <Set key={set.id} set={set} />
          ))}
        </ul>
      ) : (
        <p>This routine doesnt have any sets. Add one?</p>
      )}
    </>
  );
}

function Set({ set }) {
  const { token } = useAuth();
  return (
    <li>
      <p>
        {set.name} × {set.count}
      </p>
      {token && <DeleteButton id={set.id} />}
    </li>
  );
}

function DeleteButton({ id }) {
  const {
    mutate: deleteSet,
    loading,
    error,
  } = useMutation("DELETE", "/sets/" + id, ["routines", "routine"]);

  return (
    <button onClick={() => deleteSet()}>
      {loading ? "Deleting" : error ?? "Delete set"}
    </button>
  );
}
