import { API_URL } from "./Utils/utils";

export const createTaskApi = async (obj) => {
  const url = `${API_URL}/tasks`;
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(obj),
  };
  try {
    const result = await fetch(url, options);
    const response = await result.json();
    return response;
  } catch (error) {
    return error;
  }
};

export const fetchTaskApi = async () => {
  const url = `${API_URL}/tasks`;
  const options = {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  };
  try {
    const result = await fetch(url, options);
    const response = await result.json();
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteTaskByIdApi = async (id) => {
  const url = `${API_URL}/tasks/${id}`;
  const options = {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  };
  try {
    const result = await fetch(url, options);
    const response = await result.json();
    return response;
  } catch (error) {
    return error;
  }
};

export const updateTaskByIdApi = async (id, reqBody) => {
  const url = `${API_URL}/tasks/${id}`;
  const options = {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(reqBody),
  };
  try {
    const result = await fetch(url, options);
    const response = await result.json();
    return response;
  } catch (error) {
    return error;
  }
};
