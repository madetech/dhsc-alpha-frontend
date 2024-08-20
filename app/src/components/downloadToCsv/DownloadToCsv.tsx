import React from 'react';

type DownloadToCsvProps = {
    data: any[];
    filename?: string;
    children?: React.ReactNode;
};

const DownloadToCsv: React.FC<DownloadToCsvProps> = ({
    data,
    filename = 'data.csv',
    children,
}) => {
    const convertToCSV = (objArray: any[]): string => {
        const array =
            typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
        let str = '';

        const headers = Object.keys(array[0]);
        str += headers.join(',') + '\r\n';

        for (let i = 0; i < array.length; i++) {
            let line = '';
            for (const index in array[i]) {
                if (line !== '') line += ',';

                line += array[i][index];
            }
            str += line + '\r\n';
        }

        return str;
    };

    const downloadCSV = () => {
        const csv = convertToCSV(data);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <a href="#" onClick={downloadCSV}>
            {children || 'Download CSV'}
        </a>
    );
};

export default DownloadToCsv;
