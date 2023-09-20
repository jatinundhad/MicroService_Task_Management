import { useState } from "react";
import axios from "axios";

const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [serverError, setServerError] = useState(null);

  const fetchData = async (method, url, body, headers) => {
    setIsLoading(true);
    try {
      const resp = await axios({
        method: method,
        url: url,
        data: body,
        headers: headers,
      });
      const data = await resp?.data;

      setApiData(data);
    } catch (error) {
      setServerError(error);
    }
    setIsLoading(false);
  };

  return { isLoading, apiData, serverError, fetchData };
};

export default useFetch;
