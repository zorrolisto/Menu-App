import { useState } from "react";
import {
  todoistApiBaseUrl,
  todoistBearerToken,
  todoistComidasTaskId,
} from "../contants/global";

export default function useComidas() {
  const [comidas, setComidas] = useState([]);

  const getComidas = async () => {
    try {
      const url = `${todoistApiBaseUrl}/tasks/${todoistComidasTaskId}`;
      const response = await fetch(url, {
        method: "get",
        headers: new Headers({
          Authorization: `Bearer ${todoistBearerToken}`,
        }),
      });
      const newComidas = await response.json();
      setComidas(JSON.parse(newComidas.description));
    } catch (error) {
      console.log(error);
    }
  };
  const updateComidas = async (newComidas) => {
    try {
      const url = `${todoistApiBaseUrl}/tasks/${todoistComidasTaskId}`;
      await fetch(url, {
        method: "post",
        headers: new Headers({
          Authorization: `Bearer ${todoistBearerToken}`,
          "X-Request-Id": "556d3b82-304d-432a-866f-9a15a63a2f5b",
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({
          content: "dishes",
          description: JSON.stringify(newComidas),
        }),
      });
    } catch (error) {
      console.error(error);
    }
  };
  return {
    comidas,
    getComidas,
    updateComidas,
  };
}
