import React, { useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttp from "./Hooks/use-Http";

function App() {
  const [tasks, setTasks] = useState([]);

  const { isLoading, error, sendRequest } = useHttp();

  useEffect(() => {
    const transformTask = (items) => {
      const loadedTasks = [];

      for (const taskKey in items) {
        loadedTasks.unshift({
          id: taskKey,
          text: items[taskKey].text,
        });
      }

      setTasks(loadedTasks);
    };
    sendRequest(
      {
        url: "https://react-http-e3ab7-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json",
      },
      transformTask
    );
  }, [sendRequest]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => {
      const prev = prevTasks.concat(prevTasks.unshift(task));
      return prev;
    });
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={sendRequest}
      />
    </React.Fragment>
  );
}

export default App;
