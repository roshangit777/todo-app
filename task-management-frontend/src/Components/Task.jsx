import React, { useContext } from "react";
import AddTask from "./AddTask";
import TaskList from "./TaskList";
import ListStore from "../store/ListStore";
import Update from "./Update";

const Task = () => {
  const { initialEvent } = useContext(ListStore);
  return (
    <section className="" style={{ backgroundColor: "#eee" }}>
      <div className="">
        <div className="" style={{ width: "100%" }}>
          <div className="">
            <div className="card rounded-5">
              <div className="card-body p-4">
                <h3 className="text-center my-3 pb-3">Task-Management-app</h3>
                {initialEvent === "add" ? <AddTask /> : <Update />}
                <TaskList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Task;
