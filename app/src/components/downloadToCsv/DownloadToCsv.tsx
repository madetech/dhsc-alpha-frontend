import React from 'react';
import {
    parseInputData,
    createCSVHeaders,
    generateCSVRows,
    createCSVBlob,
    createDownloadLink,
    initiateDownload,
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

    const downloadCSV = (data: any[], filename: string) => {
        const csvData = convertToCSV(data);
        const csvBlob = createCSVBlob(csvData);
        const downloadLink = createDownloadLink(csvBlob, filename);
        initiateDownload(downloadLink);
    };

    const handleDownloadClick = (
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => {
        event.preventDefault();
        downloadCSV(data, filename);
    };

    return (
        <a href="#" onClick={handleDownloadClick}>
            {children || 'Download CSV'}
        </a>
    );
};

export default DownloadToCsv;
