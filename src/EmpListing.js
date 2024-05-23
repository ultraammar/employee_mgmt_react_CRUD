import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const EmpListing = ({useCards}) => {
  const [empData, setEmpData] = React.useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(null);
  const navigate = new useNavigate();
  
  const handleDelete = (id) =>{
      
    fetch(`https://employee-mgmt-react-crud-data.onrender.com/employees/${id}`, {
        method: "DELETE"
    }).then(() => {
        window.location.reload();
    })
  }

  useEffect(() => {
      setIsPending(true);
      const abortContr = new AbortController();
      fetch('https://employee-mgmt-react-crud-data.onrender.com/employees', {signal: abortContr.signal})
      .then(res => {
        if(!res.ok){
          throw Error('couldn not retrieve the employee.');
        }
        
        return res.json()
      })
      .then(data => {
        setEmpData(data)
        setIsPending(false);
      })
      .catch(err => {
        setIsPending(false);
        if(err.name !== 'AbortError'){
        setError(err.message)
    }

    
});

    

    return () => abortContr.abort();
    }, []);
  

    


  return (
    <div className="container my-5 " style={{maxWidth:'1150px'}}>
      {error && <div className="">{error}</div>}
            {isPending && <div className="fs-3">
                Loading...
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>}
      {useCards && !error && empData && empData.map((emp) => (
        
        <div className="emp-create my-5 " style={{maxWidth:'1150px'}} key={emp.id}>
          <div className="p-5 mb-4 bg-body-tertiary rounded-3 border border-2 border-black border-opacity-50 shadow">
              <div className="container-fluid py-5 " style={{textAlign:"left"}}>
                  <h1 className="display-4 fw-semibold ">{emp.firstName + ' ' + emp.lastName}</h1>
                  <p className="col-md-8 fs-sm-5 fs-lg-4">{emp.email} | {emp.phone} | {emp.address}</p>
                  <div className="col-md-12 col-sm-12 col-lg-10 my-4">
                    <div className=" gap-1 mx-1 d-flex">
                      <Link to={`/employees/${emp.id}/edit`} className="btn  btn-success col-lg-3">Edit</Link>
                      <button onClick={() => handleDelete(emp.id)} className="btn btn-danger col-lg-4">Delete</button>
                      <Link to={`/employees/${emp.id}`} className="btn  btn-primary col-lg-5">Details</Link>
                    </div>
                  </div>
              </div>
          </div>
        </div>
      ))}

    {!useCards && 
      <div className="card border border-2 border-black border-opacity-50 shadow ">
        <div className="card-title my-3">
            <h2>Employee Listing</h2>
        </div>

      
        <div className="card table-responsive  ">
          <table className="table table-hover align-middle fs-5 " >
            <thead className="table-dark align-middle" >
              <tr>
                <td className="p-3">ID</td>
                <td className="p-3">Name</td>
                <td className="p-3">Email</td>
                <td className="p-3">Address</td>
                <td className="p-3">Phone number</td>
                <td className="p-3">Action</td>
              </tr>
            </thead>
            <tbody >
              {empData && empData.map((emp) => (
                <tr key={emp.id}>
                  <td className="p-3">{emp.id}</td>
                  <td className="p-3">{emp.firstName + ' ' + emp.lastName}</td>
                  <td className="p-3">{emp.email}</td>
                  <td className="p-3">{emp.address}</td>
                  <td className="p-3">{emp.phone}</td>
                  <td className="p-3">
                    <div className=" gap-1 mx-1 d-flex " style={{width: "250px"}}>
                      <Link to={`/employees/${emp.id}`} className="btn btn-primary col-12">Details</Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      
      </div>
    }
    </div>
  );
};


export default EmpListing;
