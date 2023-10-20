


import fs from 'fs'
import { stringify } from 'csv-stringify'

import path from 'path'
export const generateCsvFile = async ({
    file_name = '',
    data
} = {}) => {

    const file_path = path.resolve('CSVs')
    if (!fs.existsSync(file_path)) {
        fs.mkdirSync(file_path, { recursive: true })
    }

    const writableStream = fs.createWriteStream(path.resolve(`CSVs/${file_name}.csv`))
    const columns = [
        "Book_id",
        "Book_title",
        "Borrowed_at",
        "Returned_at",
        "Due_Date",
        "Borrower_Id",
        "Book_status"
    ];

    const stringifier = stringify({ header: true, columns: columns });

    for (const object of data) {
        const objectValues = Object.values(object)
        console.log({ objectValues });
        stringifier.write(objectValues);
    }
    stringifier.pipe(writableStream);
    console.log("Finished writing data");
}