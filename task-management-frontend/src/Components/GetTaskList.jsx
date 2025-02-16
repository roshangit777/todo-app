import React, { useContext } from "react";
import ListStore from "../store/ListStore";

const GetTaskList = ({ list, index }) => {
  const { refetch, setRefetch, updateList } = useContext(ListStore);
  const deleteTask = (e, id) => {
    e.preventDefault();
    fetch(`https://taskmanagement-2-z7zb.onrender.com/api/tasks/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    setRefetch(refetch == false ? true : false);
  };

  const handleCompletedTask = async (id) => {
    const completedTask = {
      completed: true,
    };
    try {
      const response = await fetch(
        `https://taskmanagement-2-z7zb.onrender.com/api/tasks/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(completedTask),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to complete task");
      }
      /*  const result = response.json(); */

      setRefetch(refetch == false ? true : false);
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  return (
    <tr>
      <th scope="row">{index + 1}</th>
      <td className="">{list.title}</td>
      <td className="">{list.priority}</td>
      <td>{new Date(list.deadline).toLocaleDateString()}</td>
      <td>
        {list.completed === false ? (
          <h6 style={{ color: "red" }}>Pending</h6>
        ) : (
          <h6 style={{ color: "green" }}>Completed</h6>
        )}
      </td>
      <td>
        <div style={{ display: "flex", gap: "5px", justifyContent: "start" }}>
          {list.completed === false && (
            <button
              type="submit"
              data-mdb-button-init
              data-mdb-ripple-init
              className="btn btn-warning p-1"
              onClick={() => updateList(event, list._id)}
            >
              Update
            </button>
          )}
          <button
            type="submit"
            data-mdb-button-init
            data-mdb-ripple-init
            className="btn btn-success pl-1 pr-1"
            onClick={() => handleCompletedTask(list._id)}
          >
            Finished
          </button>
          <button
            type="submit"
            data-mdb-button-init
            data-mdb-ripple-init
            className="btn btn-danger"
            onClick={() => deleteTask(event, list._id)}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default GetTaskList;
