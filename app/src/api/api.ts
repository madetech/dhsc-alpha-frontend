import axios, { AxiosResponse } from "axios";
import { AscofData } from "../data/interfaces/AscofData";
import RawAscofData from "../ascof_region_data.json";

async function getAuthHeaders(): Promise<Record<string, string>> {
  const token: string = await fetch(
    `https://dapalpha-${
      import.meta.env.VITE_APP_ENV
    }-app.azurewebsites.net/.auth/me`
  )
    .then((response) => response.json())
    .then((data) => data[0].id_token);

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function GetAscofData(): Promise<AscofData[]> {
  if (import.meta.env.VITE_APP_ENV === "local") {
    return RawAscofData;
  } else {
    try {
      const response: AxiosResponse<AscofData[]> = await axios.get(
        `https://dapalpha-func-app-${
          import.meta.env.VITE_APP_ENV
        }.azurewebsites.net/api/get_ascof_data`,
        { headers: await getAuthHeaders() }
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching ASCOF data:", error);
      throw error;
    }
  }
}

export async function getCapacityTrackerData() {
  if (import.meta.env.VITE_APP_ENV === "local") {
    console.log("Local Capacity tracker data");
    return "Local Capacity tracker data";
  } else {
    try {
      const response = await axios.get(
        `https://dapalpha-func-app-${
          import.meta.env.VITE_APP_ENV
        }.azurewebsites.net/api/get_capacity_tracker_data`,
        { headers: await getAuthHeaders() }
      );

      console.log(response);
      console.log(response.data);

      return response.data;
    } catch (error) {
      console.error("Error fetching capacity tracker data:", error);
      throw error;
    }
  }
}
