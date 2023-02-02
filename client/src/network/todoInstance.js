import axios from "axios";

export const BASE_URL = "http://localhost:8080/api/todo/";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const network = {
  getAll: async (url) => {
    let responseData = [];
    await axiosInstance
      .get(url)
      .then((res) => (responseData = res.data))
      .catch((err) => {
        console.log("Error: " + err);
        throw err;
      });
    return responseData;
  },
  addItem: async (url, data) => {
    await axios.post(url, data);
  },
  delete: async (url, id) => {
    await axios.delete(url + "/" + id);
  },
  update: async (url, id, data) => {
    await axios.patch(`${url}/${id}`, data);
  },
};
