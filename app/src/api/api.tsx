import axios, { AxiosResponse } from 'axios';
import { ASCOFData } from '../components/ascofbarchart/Ascofbarchart';

// TODO Make more generic and reusable
// const constants = {
//     api: {
//         baseURL: 'https://dap-sql-connection.azurewebsites.net'
//     },
// };


async function GetAscofData(): Promise<ASCOFData[]> {   
    const headers = {
        "Content-Type": "application/json",         
    };

    try {
        const response: AxiosResponse<ASCOFData[]> = await axios.get('https://dap-sql-connection.azurewebsites.net/api/sql_test', { headers });
        return response.data;
    } catch (error) {
        console.error('Error fetching ASCOF data:', error);
        throw error;
    }
}

export default GetAscofData;
