import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import { useContext, useState } from 'react';
import { AdminContext } from '../../contexts/admin-context';

DataTable.use(DT);
export const HistoryReading = () => {
    const context = useContext(AdminContext);
    context.setCurrentPage!('History');
    const [tableData, setTableData] = useState([
        [ 'Tiger Nixon', 'System Architect', true ],
        [ 'Garrett Winters', 'Accountant', true ],
      ]);
    return (
        <div className="row">
            <div className="col-md-12 ">
            <div className="x_panel">
                <div className="x_title">
                    <h2>Form history</h2>
                    <div className="clearfix"></div>
                </div>
                <div className="x_content">
                    <form className="form-label-left input_mask">
                        <DataTable data={tableData} className="display" options={{search: false}}>
                            <thead>
                                <tr>
                                    <th>Machine Name</th>
                                    <th>Tray Name</th>
                                    <th>Status</th>
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
