import { useState } from "react";
import {
  defaultAlmuerzo,
  todoistApiBaseUrl,
  todoistBearerToken,
  todoistSectionId,
} from "../contants/global";

export default function useAlmuerzos() {
  const [almuerzos, setAlmuerzos] = useState([]);
  const [task, setTask] = useState(null);

  const getAlmuerzosByDate = async (date) => {
    try {
      const url = `${todoistApiBaseUrl}/tasks?filter=search:${date}`;
      const response = await fetch(url, {
        method: "get",
        headers: new Headers({
          Authorization: `Bearer ${todoistBearerToken}`,
        }),
      });
      const tasksWithAlmuerzos = await response.json();
      if (tasksWithAlmuerzos.length > 0) {
        setAlmuerzos(JSON.parse(tasksWithAlmuerzos[0].description)[`${date}`]);
        setTask(tasksWithAlmuerzos[0]);
      } else {
        setAlmuerzos(defaultAlmuerzo);
        createNewAlmuerzoWeek(date);
      }
    } catch (error) {
      console.log("error");
    }
  };

  const createNewAlmuerzoWeek = async (date) => {
    if (task === null || task.content.split(",").length === 10) {
      const taskCreatedObject = {
        section_id: todoistSectionId,
        content: date,
        description: JSON.stringify({ [`${date}`]: defaultAlmuerzo }),
      };
      await createTask(taskCreatedObject);
    } else {
      const taskUpdatedObject = {
        content: `${task.content},${date}`,
        description: JSON.stringify({
          ...JSON.parse(task.description),
          [`${date}`]: defaultAlmuerzo,
        }),
      };
      setTask({ ...task, ...taskUpdatedObject });
      await updateTask(taskUpdatedObject);
    }
  };
  const updateDishFromAlmuerzoByDate = async (
    taskPassed,
    date,
    almuerzoObject
  ) => {
    const almuerzos = JSON.parse(taskPassed.description);
    const taskUpdateObject = {
      content: taskPassed.content,
      description: JSON.stringify({
        ...almuerzos,
        [`${date}`]: almuerzos[`${date}`].map((alm) =>
          alm.wd === almuerzoObject.wd ? almuerzoObject : alm
        ),
      }),
    };
    await updateTask(taskUpdateObject, taskPassed);
  };
  const updateTask = async (taskUpdatedObject, taskPassed) => {
    const taskUsed = taskPassed ? taskPassed : task;
    try {
      const url = `${todoistApiBaseUrl}/tasks/${taskUsed.id}`;
      await fetch(url, {
        method: "post",
        headers: new Headers({
          Authorization: `Bearer ${todoistBearerToken}`,
          "X-Request-Id": "556d3b82-304d-432a-866f-9a15a63a2f5b",
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(taskUpdatedObject),
      });
    } catch (error) {
      console.error(error);
    }
  };
  const createTask = async (taskCreatedObject) => {
    try {
      const url = `${todoistApiBaseUrl}/tasks`;
      const response = await fetch(url, {
        method: "post",
        headers: new Headers({
          Authorization: `Bearer ${todoistBearerToken}`,
          "X-Request-Id": "556d3b82-304d-432a-866f-9a15a63a2f5b",
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(taskCreatedObject),
      });
      const taskCreated = await response.json();
      setTask(taskCreated);
    } catch (error) {
      console.error(error);
    }
  };
  return {
    almuerzos,
    task,
    setAlmuerzos,
    updateTask,
    getAlmuerzosByDate,
    updateDishFromAlmuerzoByDate,
  };
}
