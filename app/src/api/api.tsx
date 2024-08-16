import axios, { AxiosResponse } from 'axios';
import { ASCOFData } from '../data/interfaces/ASCOFData';

async function GetAscofData(): Promise<ASCOFData[]> {
    try {
        const token: string = await fetch(
            `https://dapalpha-${process.env.REACT_APP_ENV}-app.azurewebsites.net/.auth/me`
        )
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                const token = data[0].id_token;
                return token;
            });
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        };
        const response: AxiosResponse<ASCOFData[]> = await axios.get(
            `https://dapalpha-func-app-${process.env.REACT_APP_ENV}.azurewebsites.net/api/sql_test`,
            { headers }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching ASCOF data:', error);
        throw error;
    }
}

export default GetAscofData;
