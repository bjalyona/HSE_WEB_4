import axios from "axios";

const instance = axios.create({
  baseURL: "/api",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ1c2VyIiwiaWF0IjoxNzQ2MTE3NDQ3LCJleHAiOjE3NDY3MjIyNDd9.4gPQGeNRSiyZzUAILnpJoLds896vGVpvm6cOgDzAUko",
  },
});

export const fetchFanficById = async (id: string) => {
  const res = await instance.get(`/article/${id}`);
  return res.data;
};

export const fetchUsernameByUserId = async (userId: number) => {
  const res = await instance.get(`/auth/${userId}`);
  return res.data.username;
};

export const likeArticle = async (articleId: number) => {
  const token = localStorage.getItem("token");

  await instance.post(
    "/like/like",
    { articleId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const createArticle = async (title: string, content: string, tag: string) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Нет токена");

  const response = await instance.post(
    "/article",
    { title, content, tag },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const fetchAllUsers = async () => {
  const res = await instance.get("/auth");
  return res.data;
};

export const updateUser = async (id: number, username: string) => {
  const token = localStorage.getItem("token");
  await instance.put(`/auth/${id}`, { username }, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteUser = async (id: number) => {
  const token = localStorage.getItem("token");
  await instance.delete(`/auth/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const fetchAllFanfics = async () => {
  const res = await instance.get("/article");
  return res.data;
};

export const updateFanfic = async (id: number, title: string, content: string, tag: string) => {
  const token = localStorage.getItem("token");
  await instance.put(
    `/article/${id}`,
    { title, content, tag },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const deleteFanfic = async (id: number) => {
  const token = localStorage.getItem("token");
  await instance.delete(`/article/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export default instance;
