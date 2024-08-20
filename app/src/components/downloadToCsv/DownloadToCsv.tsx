import React from 'react';
import { downloadCSV } from '../utils/downloads/downloadToCsvHelpers';

type DownloadToCsvProps = {
    data: any[];
    filename?: string;
    xLabel: string;
    children?: React.ReactNode;
};

const DownloadToCsv: React.FC<DownloadToCsvProps> = ({
    data,
    filename = 'data.csv',
    xLabel,
    children,
}) => {
    const handleDownloadClick = (
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => {
        event.preventDefault();
        downloadCSV(data, filename, xLabel);
    };
    return (
        <a href="#" onClick={handleDownloadClick}>
            {children}
        </a>
    );
};

export default DownloadToCsv;
