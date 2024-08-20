import React from 'react';
import {
    parseInputData,
    createCSVHeaders,
    generateCSVRows,
} from '../utils/downloads/downloadToCsvHelpers';

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
        const dataRows = parseInputData(objArray);
        let csvContent = createCSVHeaders(dataRows);
        csvContent += generateCSVRows(dataRows);
        return csvContent;
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
