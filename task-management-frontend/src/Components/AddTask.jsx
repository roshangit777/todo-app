import React, { useContext, useRef } from "react";
import ListStore from "../store/ListStore";
import { IoIosAddCircleOutline } from "react-icons/io";

const AddTask = () => {
  const { taskList, refetch, setRefetch, setAddFilter } = useContext(ListStore);

  const titleElement = useRef();
  const priorityElement = useRef();
  const dueDateElement = useRef();

  const handleAddTask = async (e) => {
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
      titleElement.current.value = "";
      priorityElement.current.value = "";
      dueDateElement.current.value = "";
    } else {
      try {
        const response = await fetch(
          "https://taskmanagement-2-z7zb.onrender.com/api/tasks",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newTask), // Convert task object to JSON
          }
        );

        if (!response.ok) {
          throw new Error("Failed to add task");
        }

        /* const result = response.json(); */
        setRefetch(refetch == false ? true : false);

        titleElement.current.value = "";
        priorityElement.current.value = "";
        dueDateElement.current.value = "";

        // Reset form fields after successful submission
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  const getFilterElement = (e) => {
    let getVal = e.target.value;
    setAddFilter(getVal);
  };

  return (
    <>
      <form
        className="row row-cols-lg-auto g-3 justify-content-center align-items-center mb-5 pb-2"
        onSubmit={() => handleAddTask(event)}
      >
        <div className="col-12">
          <div data-mdb-input-init className="form-outline">
            <input
              type="text"
              id="form1"
              className="form-control fs-5 p-3 border-1 rounded-4 border-primary"
              placeholder="Enter title"
              ref={titleElement}
            />
            <select
              type="text"
              id="form1"
              className="form-control fs-6 border-1 rounded-4 border-primary"
              placeholder="Enter preority"
              ref={priorityElement}
            >
              <option value="">Select the Preority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <input
              type="date"
              name=""
              id=""
              ref={dueDateElement}
              className="form-control fs-9 border-1 rounded-4 border-primary"
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
            Add
            <IoIosAddCircleOutline />
          </button>
        </div>
      </form>
      <div
        className="col-12 oneFilter"
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

export default AddTask;
