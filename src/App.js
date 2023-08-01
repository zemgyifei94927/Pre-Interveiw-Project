import React, {useState} from 'react';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";


function App() {

  const [tableData, setTableData] = useState([]);
  const [addFormData, setAddFormData] = useState({
    SampleSize: "-",
    SampleMean: "-",
    StandardDeviation: "-",
    HypothesizedMean: "-",
    enabled: false
  })

  const handleAddFormChange = (event) => {
    event.preventDefault();

    
    const { name, value } = event.target;
    setAddFormData((prevData) => ({
      ...prevData,
      [name]: parseFloat(value), // Handle leading zeros
    }));

  };

  const handleCheckboxChange = (event) => {
    const { checked } = event.target;
    setAddFormData((prevData) => ({
      ...prevData,
      enabled: checked, 
    }));
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    // Check if Hypothesis test will be performed or not. Based on condition, display different data in table.
    const data = addFormData.enabled? { ...addFormData } : {  SampleSize: addFormData.SampleSize,
                                                              SampleMean: addFormData.SampleMean,
                                                              StandardDeviation: addFormData.StandardDeviation};

    setTableData([...tableData, data]);
    
  }



  return (
    <div className="App">
        {tableData.length > 0 && (      //Whenever there is no data, do not show the table.
        <table className="table">
          <thead>
            <tr>
              <th>Sample Size</th>
              <th>Sample Mean</th>
              <th>Standard Deviation</th>
              <th>Hypothesized Mean</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((data, index) => {
              return (
                <tr key={index}>
                  <td>{data.SampleSize}</td>
                  <td>{data.SampleMean}</td>
                  <td>{data.StandardDeviation}</td>
                  <td>{data.HypothesizedMean}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      
      
        <form onSubmit={handleAddFormSubmit} >
          <div className="form-group row">
            <label className="col-sm-2 col-form-label col-form-label-lg">Sample Size:</label>
            <div className="col-sm-10">
              <input
                min="2" // Sample size requires to be >= 2
                type="number"
                required="required"
                name="SampleSize"
                className="form-control form-control-lg"
                onChange={handleAddFormChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label col-form-label-lg">Sample Mean:</label>
            <div className="col-sm-10">
              <input
                step="0.00001" //Choose to keep 5 digits for decimal values, can be changed by requirement.
                type="number"
                required="required"
                name="SampleMean"
                className="form-control form-control-lg"
                onChange={handleAddFormChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label col-form-label-lg">Standard Deviation:</label>
            <div className="col-sm-10">
              <input
                min="0.00001" // Standard Deviation needs to be larger than 0, so the minimum can be achieved is 0.00001. Although in real data,it is ok to have 0 right?
                step="0.00001" //Choose to keep 5 digits for decimal values, can be changed by requirement.
                type="number"
                required="required"
                name="StandardDeviation"
                className="form-control form-control-lg"
                onChange={handleAddFormChange}
              />
            </div>
          </div>
          
          <div className="form-group row">
            <label className="col-sm-2 col-form-label col-form-label-lg">
              Perform Hypothesis test
              <input
                type="checkbox"
                checked={addFormData.enabled}
                onChange={handleCheckboxChange}
              />
            </label>
          </div>

          <div className={addFormData.enabled ? 'enabled' : 'disabled'}>
            <label className="col-sm-2 col-form-label col-form-label-lg" >HypothesizedMean:</label>
            <div className="col-sm-10">
              <input
                step="0.00001" //Choose to keep 5 digits for decimal values, can be changed by requirement.
                type="number"
                required="required"
                name="HypothesizedMean"
                className="form-control form-control-lg"
                disabled={!addFormData.enabled}
                onChange={handleAddFormChange}
              />
            </div>
          </div>
          <div >
            <button class="btn btn-primary btn-lg" type="submit">OK</button>
            <button class="btn btn-secondary btn-lg" type="reset">Reset</button>
          </div>

        </form>    
      
      
    </div>
  );
}

export default App;
