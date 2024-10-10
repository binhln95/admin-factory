import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../contexts/admin-context';
import { getHistory } from '../../api-helper/api';
import { formatData } from '../../utility/utility';

DataTable.use(DT);
export const HistoryReading = () => {
    const context = useContext(AdminContext);
    context.setCurrentPage!('History');
    const currentDate = new Date();
    const [tableData, setTableData] = useState<string[][]>([]);
    const [machineName, setMachineName] = useState('');
    const [tray, setTray] = useState('');
    const [status, setStatus] = useState<boolean>();
    const [endDate, setEndDate] = useState<Date>(currentDate);
    const [startDate, setStartDate] = useState<Date>(() => {
        const current = new Date();
        console.log('start date', current);
        current.setDate(current.getDate() - 30);
        console.log('enddate', current);
        return current;
    });
    const call = async () => {
        const response = await getHistory(machineName, tray, status, startDate, endDate);
        console.log(response);
        let history: string[][] = [];
        response.forEach(element => {
            history.push([element.machineName, element.tray, element.result.toString(), element.createdDate.toString()])
        });
        setTableData(history);
    }
    useEffect(() => {
        call();
    }, []);
    const Search = () => {
        call();
    }
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
                        <div className='item form-group'>
                            <div className="col-md-6 col-sm-6">
                                <label className='col-form-label col-md-3 col-sm-3 '>Machine name</label>
                                <div className="col-md-9 col-sm-9">
                                    <input type="text" className="form-control has-feedback-left" placeholder="Machine" onChange={(e) => setMachineName(e.target.value)} />
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-6">
                                <label className='col-form-label col-md-3 col-sm-3 '>Tray name</label>
                                <div className="col-md-9 col-sm-9">
                                    <input type="text" className="form-control has-feedback-left" placeholder="Tray" onChange={(e) => setTray(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className='item form-group'>
                            <div className="col-md-6 col-sm-6">
                                <label className='col-form-label col-md-3 col-sm-3 '>Status</label>
                                <div className="col-md-9 col-sm-9">
                                    <select className='form-control' onChange={(e) => setStatus(e.target.value == '1' ? true : e.target.value == '0' ? false : undefined)}>
                                        <option value='-1'>All</option>
                                        <option value='1'>True</option>
                                        <option value='0'>False</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-6">
                                <label className='col-form-label col-md-3 col-sm-3 '>Start date</label>
                                <div className="col-md-9 col-sm-9">
                                    <input type="date" className='date-picker form-control' value={formatData(startDate)} placeholder='dd-mm-yyyy' onChange={(e) => setStartDate(new Date(e.target.value))} />
                                </div>
                            </div>
                        </div>
                        <div className='item form-group'>
                            <div className="col-md-6 col-sm-6">
                                <label className='col-form-label col-md-3 col-sm-3 '>End date</label>
                                <div className="col-md-9 col-sm-9">
                                    <input type="date" className='date-picker form-control' value={formatData(endDate)} placeholder='dd-mm-yyyy' onChange={(e) => setEndDate(new Date(e.target.value))} />
                                </div>
                            </div>
                        </div>
                        <div className="form-group item">
                            <div className="col-md-3 col-sm-3">
                                <button type="button" className="btn btn-success" onClick={Search}>Search</button>
                            </div>
                        </div>
                    </form>
                    <form className="form-label-left input_mask">
                        <DataTable data={tableData} className="display" options={{search: false}}>
                            <thead>
                                <tr>
                                    <th>Machine Name</th>
                                    <th>Tray Name</th>
                                    <th>Status</th>
                                    <th>Created date</th>
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
