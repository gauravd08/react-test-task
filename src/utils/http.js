import axios from "axios";

export const getCommonHeaders = () => {
  const headers = {
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  return headers;
};

export const httpGet = async (url) => {
  return axios
    .get(url, {
      headers: getCommonHeaders()
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.res;
    });
};
