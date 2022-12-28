import axios from "axios";

export const baseUrl = "https://bayut.p.rapidapi.com";

export const fetchApi = async (url) => {
  const { data } = await axios.get(url, {
    headers: {
      "X-RapidAPI-Key": "b5f3a12cd0mshf04141b6e4670edp186cc4jsnc80db980c122",
      "X-RapidAPI-Host": "bayut.p.rapidapi.com",
    },
  });
  return data;
};

