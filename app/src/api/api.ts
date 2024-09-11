import axios, { AxiosResponse } from "axios";
import { AscofData } from "../data/interfaces/AscofData";
import RawAscofData from "../data/mockResponses/ascof_region_data.json";
import RawCapacityTrackerAgencyByRegionData from "../data/mockResponses/capacity_tracker_agency_by_region.json";
import { CapacityTrackerTotalHoursAgencyWorkedByRegion } from "../data/interfaces/CapacityTrackerTotalHoursAgencyWorkedByRegionData";

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

export async function getCapacityTrackerData(
  locationLevel: string
): Promise<CapacityTrackerTotalHoursAgencyWorkedByRegion[]> {
  if (import.meta.env.VITE_APP_ENV === "local") {
    return RawCapacityTrackerAgencyByRegionData;
  } else {
    try {
      const response = await axios.get(
        `https://dapalpha-func-app-${
          import.meta.env.VITE_APP_ENV
        }.azurewebsites.net/api/get_capacity_tracker_data`,
        {
          params: { location_level: locationLevel },
          headers: await getAuthHeaders(),
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching capacity tracker data:", error);
      throw error;
    }
  }
}
