import { useState } from "react";
import "./App.css";
import Task from "./Components/Task";
import "bootstrap/dist/css/bootstrap.min.css";
import ListStore from "./store/ListStore";

function App() {
  const [taskList, setTaskList] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const [initialEvent, setInitialEvent] = useState("add");
  const [updateId, setUpdateId] = useState("");
  const [addFilter, setAddFilter] = useState("");

  const updateList = (e, id) => {
    e.preventDefault();
    setInitialEvent("update");
    setUpdateId(id);
  };
  return (
    <ListStore.Provider
      value={{
        taskList,
        setTaskList,
        refetch,
        updateId,
        setRefetch,
        initialEvent,
        setInitialEvent,
        updateList,
        addFilter,
        setAddFilter,
      }}
    >
      <Task />
    </ListStore.Provider>
  );
}

export default App;
