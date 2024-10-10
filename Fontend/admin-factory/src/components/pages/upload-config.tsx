import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import { useContext, useEffect, useState } from 'react';
import Papa from 'papaparse';
import { AdminContext } from '../../contexts/admin-context';
DataTable.use(DT);

export const UploadConfig = () => {
    const context = useContext(AdminContext);
    context.setCurrentPage!('UploadConfig');
    const [csvData, setCsvData] = useState<string[][]>([]);
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = async () => {
                Papa.parse<string[]>(file, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (result) => {
                        const parsedData = result?.data;
                        let rows: string[][] = [];
                        parsedData.forEach((e, i) => {
                            rows.push(Object.values(e));
                        });
                        setCsvData(rows);
                  },
                });
            };
            reader.readAsText(file);
        }
    }

    return (
        <div className="row">
            <div className="col-md-12 ">
                <div className="x_panel">
                    <div className="x_title">
                        <h2>Upload data</h2>
                        <div className="clearfix"></div>
                    </div>
                    <div className="x_content">
                        <form className="form-label-left input_mask">
                            <div className="form-group row">
                                <label className="col-form-label col-md-3 col-sm-3 ">Select file</label>
                                <div className="col-md-9 col-sm-9">
                                    <input type="file" className="form-control has-feedback-left" placeholder="Machine" onChange={handleFileUpload} />
                                    <span className="fa fa-cogs form-control-feedback left" aria-hidden="true"></span>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-md-3 col-sm-3">
                                    <button type="button" className="btn btn-success">Save</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="col-md-12 ">
                <div className="x_panel">
                    <div className="x_title">
                        <h2>Data preview</h2>
                        <div className="clearfix"></div>
                    </div>
                    <div className="x_content">
                        <form className="form-label-left input_mask">
                            <DataTable data={csvData} className="display" options={{search: false}}>
                                <thead>
                                    <tr>
                                        <th>Machine</th>
                                        <th>Tray</th>
                                    </tr>
                                </thead>
                            </DataTable>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    ) 
}
