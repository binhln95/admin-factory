import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../../contexts/admin-context";
import { Compare, getConfiguration, getMasterFile } from "../../../api-helper/api";
import { ICompareResponse } from "../../../api-helper/type";
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
DataTable.use(DT);

export const ReadData = () => {
    const context = useContext(AdminContext);
    context.setCurrentPage!('ReadData');
    const [machine, setMachine] = useState('');
    const [tray, setTray] = useState('');
    const [modeAutoScan, setModeAutoScan] = useState(false);
    const [masterFile, setMasterFile] = useState<string[]>([]);
    const [masterFileSelected, setMasterFileSelected] = useState<string>('');
    const [userNumber, setUserNumber] = useState('');
    const [resultCompare, setResultCompare] = useState<ICompareResponse>();
    const [config, setConfig] = useState<string[][]>([]);

    const CompareData = async () => {
        if (userNumber === '') {
            alert("Bạn phải nhập mã nhân viên");
                return;
        }
        if (masterFileSelected === '') {
            alert("Bạn phải chọn master file");
                return;
        }
        if (tray === '') {
            alert("Bạn phải nhập mã feeder");
                return;
        }
        if (machine === '') {
            alert("Bạn phải nhập mã linh kiện");
                return;
        }
        if (modeAutoScan) {
            if (tray !== config[0][1]){
                alert("Bạn phải chọn mã feeder: " + config[0][1]);
                return;
            }
        }
        if (machine && tray) {
            const filterOut = (array: string[][], filter: string): string[][] => {
                return array.filter(innerArray => !innerArray.includes(filter));
            };
            const data = await Compare(userNumber, masterFileSelected, machine, tray);
            setResultCompare(data);
            data.status && setConfig(config => filterOut(config, tray));
        }
    }
    useEffect(() => {
        const getConfig = async () => {
            const masterFileList = await getMasterFile();
            setMasterFile(masterFileList);
        }
        getConfig();
    }, []);
    const handleSelectMasterFile = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        setMasterFileSelected(e.target.value);
        const data = await getConfiguration(e.target.value);
        const csv: string[][] = [];
        data.forEach(element => {
            csv.push([element.orderId.toString(), element.tray, element.machineName1, element.machineName2, element.machineName3, element.note]);
        });
        setConfig(csv);
    }
    return (
        <div className="row">
            <div className="col-md-9 ">
                <div className="x_panel">
                    <div className="x_title">
                        <h2>Form kiểm tra</h2>
                        <div className="clearfix"></div>
                    </div>
                    <div className="x_content">
                        <form className="form-label-left input_mask">
                            <div className="form-group row">
                                <label className="col-form-label col-md-3 col-sm-3 ">Mã nhân viên</label>
                                <div className="col-md-9 col-sm-9">
                                    <input type="text" className="form-control has-feedback-left" value={userNumber} 
                                    onChange={(e) => setUserNumber(e.target.value)} placeholder="Mã nhân viên" />
                                    <span className="fa fa-table form-control-feedback left" aria-hidden="true"></span>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="control-label col-md-3 col-sm-3 ">Master file</label>
                                <div className="col-md-9 col-sm-9 ">
                                    <select className="form-control" onChange={handleSelectMasterFile}>
                                        <option></option>
                                        {masterFile.map(e => <option>{e}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-form-label col-md-3 col-sm-3 ">Mã Feeder</label>
                                <div className="col-md-9 col-sm-9">
                                    <input type="text" className="form-control has-feedback-left" value={tray} 
                                    onChange={(e) => setTray(e.target.value)} placeholder="Mã Feeder" 
                                    onKeyDown={(e) => e.key == 'Enter' && CompareData()} />
                                    <span className="fa fa-table form-control-feedback left" aria-hidden="true"></span>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-form-label col-md-3 col-sm-3 ">Mã linh kiện</label>
                                <div className="col-md-9 col-sm-9">
                                    <input type="text" className="form-control has-feedback-left" value={machine} 
                                    onChange={(e) => setMachine(e.target.value)} placeholder="Mã linh kiện"
                                    onKeyDown={(e) => e.key == 'Enter' && CompareData()} />
                                    <span className="fa fa-cogs form-control-feedback left" aria-hidden="true"></span>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-form-label col-md-3 col-sm-3 ">Chế độ quét toàn bộ</label>
                                <div className="col-md-9 col-sm-9">
                                    <input type="checkbox" className="flat" checked={modeAutoScan} onChange={e => setModeAutoScan(e.target.checked)} />
                                </div>
                            </div>
                            <div className="ln_solid"></div>
                            <div className="form-group row">
                                <div className="col-md-3 col-sm-3 offset-md-9">
                                    <button type="button" className="btn btn-success" onClick={CompareData}>Kiểm tra</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="col-md-3 ">
                <div className="x_panel">
                    <div className="x_title">
                        <h2>Kết quả</h2>
                        <div className="clearfix"></div>
                    </div>
                    <form className="form-label-left input_mask">
                        <div className="form-group row">
                            <label className="col-form-label col-md-3 col-sm-3 ">Mã linh kiện</label>
                            <h2 className="green">
                                {resultCompare && resultCompare.machineName}
                            </h2>
                        </div>
                        <div className="form-group row">
                            <label className="col-form-label col-md-3 col-sm-3 ">Mã feeder</label>
                            <h2 className="green">
                                {resultCompare && resultCompare.trayName}
                            </h2>
                        </div>
                        <div className="form-group row">
                            <label className="col-form-label col-md-3 col-sm-3 ">Status</label>
                            <h2 className="red">
                                {resultCompare ? resultCompare.status ? 'OK' : 'NG' : ''}
                            </h2>
                        </div>
                    </form>
                </div>
            </div>
            <div className="col-md-12 ">
                <div className="x_panel">
                    <div className="x_title">
                        <h2>Data config</h2>
                        <div className="clearfix"></div>
                    </div>
                    <div className="x_content">
                        <form className="form-label-left input_mask">
                            <DataTable className="display" data={config} options={{search: false}}>
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Mã Feeder</th>
                                        <th>Mã linh kiện chính</th>
                                        <th>Mã thay thế 1</th>
                                        <th>Mã thay thế 2</th>
                                        <th>Ghi chú</th>
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