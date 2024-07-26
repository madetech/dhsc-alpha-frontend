import axios from 'axios';
import { ASCOFData } from '../components/ascofbarchart/Ascofbarchart';

// TODO Make more generic and reusable
// const constants = {
//     api: {
//         baseURL: 'https://dap-sql-connection.azurewebsites.net'
//     },
// };


async function GetAscofJsonTest<ASCOFData>(){   
    const headers = {
            "Content-Type": "application/json",         
          }; 
    const ascofData:ASCOFData[] = 
                await axios.get('https://dap-sql-connection.azurewebsites.net/api/sql_test', {headers})

    // console.log("ascof", ascofData)
    // const newAscof = [ascofData.data]
    // return newAscof
    return ascofData

}


export default GetAscofJsonTest

// export default axios.create({
//     baseURL: constants.api.baseURL,
//     headers:{}
// })