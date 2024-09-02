import axios, { AxiosResponse } from "axios";
import { AscofData } from "../data/interfaces/AscofData";
import RawAscofData from "../ascof_region_data.json";

async function GetAscofData(): Promise<AscofData[]> {
  console.log(import.meta.env.VITE_APP_ENV);

  if (import.meta.env.VITE_APP_ENV == "local") {
    return RawAscofData;
  } else {
    try {
      const token: string = await fetch(
        `https://dapalpha-${
          import.meta.env.VITE_APP_ENV
        }-app.azurewebsites.net/.auth/me`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const token = data[0].id_token;
          return token;
        });

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response: AxiosResponse<AscofData[]> = await axios.get(
        `https://dapalpha-func-app-${
          import.meta.env.VITE_APP_ENV
        }.azurewebsites.net/api/sql_test`,
        { headers }
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching ASCOF data:", error);
      throw error;
    }
  }
}

export default GetAscofData;
