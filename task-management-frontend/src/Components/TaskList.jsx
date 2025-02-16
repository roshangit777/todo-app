import React, { useContext, useEffect, useState } from "react";
import GetTaskList from "./GetTaskList";
import ListStore from "../store/ListStore";
import Empty from "./Empty";

const TaskList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { taskList, setTaskList, refetch, addFilter } = useContext(ListStore);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://taskmanagement-2-z7zb.onrender.com/api/tasks"
        );
        const data = await response.json();
        setTaskList(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, [refetch]);

  if (isLoading) {
    return (
      <center>
        <h3>Loading...</h3>
      </center>
    );
  }

  let newTaskLists = taskList;
  if (addFilter === "" || addFilter === "all") {
    newTaskLists = taskList;
  }
  if (addFilter === "high") {
    newTaskLists = taskList.filter((list) => list.priority === "high");
  }
  if (addFilter === "medium") {
    newTaskLists = taskList.filter((list) => list.priority === "medium");
  }
  if (addFilter === "low") {
    newTaskLists = taskList.filter((list) => list.priority === "low");
  }
  if (addFilter === "completed") {
    newTaskLists = taskList.filter((list) => list.completed === true);
  }
  if (addFilter === "pending") {
    newTaskLists = taskList.filter((list) => list.completed === false);
  }

  return (
    <>
      <table className="myTable" style={{ width: "100%", marginLeft: "150px" }}>
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col" className="">
              Task Title
            </th>
            <th scope="col" className="">
              Priority
            </th>
            <th scope="col">Due-Date</th>
            <th scope="col" style={{ paddingLeft: "20px" }}>
              Status
            </th>
            <th scope="col" style={{ paddingLeft: "60px" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {newTaskLists.length > 0 ? (
            newTaskLists.map((list, index) => (
              <GetTaskList key={list.id || index} list={list} index={index} />
            ))
          ) : (
            <></>
          )}
        </tbody>
      </table>
      {newTaskLists.length === 0 ? <Empty addFilter={addFilter} /> : <></>}
    </>
  );
};

export default TaskList;
