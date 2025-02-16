import React, { useContext, useRef } from "react";
import ListStore from "../store/ListStore";

const Update = () => {
  const {
    taskList,
    refetch,
    setRefetch,
    updateId,
    setInitialEvent,
    setAddFilter,
  } = useContext(ListStore);
  let getId = taskList.filter((list) => list._id == updateId);
  const titleElement = useRef();
  const priorityElement = useRef();
  const dueDateElement = useRef();

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    const newTask = {
      title: titleElement.current.value,
      priority: priorityElement.current.value.toLowerCase(),
      deadline: dueDateElement.current.value,
    };
    let checkExist = taskList.filter(
      (list) =>
        list.title === newTask.title &&
        new Date(list.deadline).toLocaleDateString() ===
          new Date(newTask.deadline).toLocaleDateString()
    );
    if (
      newTask.title === "" ||
      newTask.priority === "" ||
      newTask.deadline === ""
    ) {
      alert("Fill all the fields");
    } else if (checkExist.length > 0) {
      alert(
        `task "${newTask.title}" already exist with the same deadline "${newTask.deadline}"`
      );
    } else {
      try {
        const response = await fetch(
          `https://taskmanagement-2-z7zb.onrender.com/api/tasks/${updateId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newTask),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to add task");
        }

        /* const result = response.json(); */
        setRefetch(refetch == false ? true : false);
        setInitialEvent("add");
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };
  const getFilterElement = (e) => {
    console.log(e.target.value);
    let getVal = e.target.value;
    setAddFilter(getVal);
  };

  return (
    <>
      <form
        className="row row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2"
        onSubmit={() => handleUpdateTask(event)}
      >
        <div className="col-12">
          <div data-mdb-input-init className="form-outline">
            <input
              type="text"
              id="form1"
              className="form-control fs-5 p-3 border-1 rounded-4 border-primary"
              placeholder={`current title: ${getId[0].title}`}
              ref={titleElement}
            />
            <select
              type="text"
              id="form1"
              className="form-control fs-6 border-1 rounded-4 border-primary"
              placeholder={`current preority: ${getId[0].preority}`}
              ref={priorityElement}
            >
              <option value="">{`Current Priority: ${getId[0].priority}`}</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <input
              type="date"
              name=""
              id=""
              className="form-control fs-9 border-1 rounded-4 border-primary"
              ref={dueDateElement}
            />
          </div>
        </div>

        <div className="col-12">
          <button
            type="submit"
            data-mdb-button-init
            data-mdb-ripple-init
            className="addbtn"
          >
            Update
          </button>
        </div>
      </form>
      <div
        className="col-12"
        style={{ width: "300px", margin: "0 auto", marginBottom: "50px" }}
      >
        <label htmlFor="" className="myfilter">
          Filter
        </label>
        <select
          className="filterOpt"
          name=""
          id=""
          onChange={(event) => getFilterElement(event)}
        >
          <option value="">Select</option>
          <option value="all">All</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>
    </>
  );
};

export default Update;
