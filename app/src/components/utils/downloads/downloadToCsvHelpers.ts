export function parseInputData(input: any): any[] {
    return typeof input !== 'object' ? JSON.parse(input) : input;
}

export function createCSVHeaders(dataRows: any[]): string {
    const headers = Object.keys(dataRows[0]);
    return headers.join(',') + '\r\n';
}

export function convertObjRowToCSVRow(dataRowObj: any): string {
    let csvRow = '';
    for (const key in dataRowObj) {
        if (csvRow !== '') csvRow += ',';
        csvRow += dataRowObj[key];
    }
    return csvRow;
}

export function generateCSVRows(dataRowsObj: any[]): string {
    let csvRows = '';
    for (const row of dataRowsObj) {
        csvRows += convertObjRowToCSVRow(row) + '\r\n';
    }
    return csvRows;
}

export function createCSVBlob(csvData: string): Blob {
    return new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
}

export function createDownloadLink(
    blob: Blob,
    filename: string
): HTMLAnchorElement {
    const blobUrl = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = blobUrl;
    downloadLink.download = filename;
    downloadLink.style.visibility = 'hidden';
    return downloadLink;
}

export function initiateDownload(downloadLink: HTMLAnchorElement) {
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(downloadLink.href);
}
