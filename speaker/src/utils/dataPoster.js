import axios from "axios";

export async function signIn(params) {
  const { data } = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/broadcaster/login`,
    params
  );
  console.log(data);
  return data;
}

export async function Translate(params) {
  const { data } = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/broadcaster/translate`,
    params,
    {
      headers: {
        authToken: localStorage.getItem("broadcaster_token"),
      },
    }
  );
  console.log(data);
  return data;
}
export async function deletePreset(id) {
  const { status } = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/broadcaster/delPreset`, {
    headers: {
      authToken: localStorage.getItem("broadcaster_token"),
    }, data: {
      id
    }
  })
  return status === 200;
}

export async function editPreset({ id, newTitle }) {
  const { status } = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/broadcaster/editPreset`, {
    id,
    newtitle: newTitle
  }, {
    headers: {
      "authToken": localStorage.getItem("broadcaster_token"),
    }
  })
  return status === 200;
}