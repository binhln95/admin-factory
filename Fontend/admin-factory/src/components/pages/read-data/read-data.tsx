import { useContext } from "react";
import { AdminContext } from "../../../contexts/admin-context";
import { getConfiguration } from "../../../api-helper/api";

export const ReadData = () => {
    const context = useContext(AdminContext);
    context.setCurrentPage!('ReadData');

    const CompareData = async () => {
        const data = await getConfiguration();
        console.log('data', data)
    }
    return (
        <div className="row">
            <div className="col-md-6 ">
            <div className="x_panel">
                <div className="x_title">
                    <h2>Form compare data</h2>
                    <div className="clearfix"></div>
                </div>
                <div className="x_content">
                    <form className="form-label-left input_mask">
                        <div className="form-group row">
                            <label className="col-form-label col-md-3 col-sm-3 ">Machine</label>
                            <div className="col-md-9 col-sm-9">
                                <input type="text" className="form-control has-feedback-left" placeholder="Machine" />
                                <span className="fa fa-cogs form-control-feedback left" aria-hidden="true"></span>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-form-label col-md-3 col-sm-3 ">Tray</label>
                            <div className="col-md-9 col-sm-9">
                                <input type="text" className="form-control has-feedback-left" placeholder="Tray" />
                                <span className="fa fa-table form-control-feedback left" aria-hidden="true"></span>
                            </div>
                        </div>
                        <div className="ln_solid"></div>
                        <div className="form-group row">
                            <div className="col-md-3 col-sm-3 offset-md-9">
                                <button type="button" className="btn btn-success" onClick={CompareData}>Compare</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            </div>
        </div>
    )
}