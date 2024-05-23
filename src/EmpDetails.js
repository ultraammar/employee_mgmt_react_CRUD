import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EmpDetails = () => {
    const { id } = useParams();
    const [emp, setEmp] = useState(null);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(null);
    const navigate = new useNavigate();
     
  useEffect(() => {
    setIsPending(true);
    const abortContr = new AbortController();
    fetch(`https://employee-mgmt-react-crud-data.onrender.com/employees/${id}`, {signal: abortContr.signal})
    .then(res => {
        if(!res.ok){
            throw Error('couldn not retrieve the employee.');
        }
        return res.json();})
    .then(data => {
        setEmp(data);
        setIsPending(false);
    }) 
    .catch(err => {
            setIsPending(false);
            if(err.name !== 'AbortError'){
            setError(err.message)
        }
    });

    return () => abortContr.abort();
  }, [id]);


    const handleDelete = () =>{
        fetch(`https://employee-mgmt-react-crud-data.onrender.com/employees/${id}`, {
            method: "DELETE"
        }).then(() => {
            navigate('/');
        })
    }

    return ( 
        
        <div className="container my-5 " style={{maxWidth:'1150px'}}>
            {error && <div className="">{error}</div>}
            {isPending && <div className="fs-3">
                Loading...
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>}
            {!error && 
                <div className="emp-details">   
                    {emp &&
                    <div className="emp-create my-5 " style={{maxWidth:'1150px'}}>
                        <div className="p-sm-4 p-lg-5 mb-4 bg-body-tertiary rounded-3 border border-2 border-black border-opacity-50 shadow">
                            <div className="container-fluid p-4 pb-3 emp-card-info" style={{textAlign:"left"}}>
                                <h1 className="display-4 fw-semibold ">{emp.firstName + ' ' + emp.lastName}</h1>
                                <dl class="row fs-sm-5 fs-lg-4  col-md-8 mt-5">
                                    <dt class="col-sm-3">Email</dt>
                                    <dd class="col-sm-9">{emp.email}</dd>
                                    <dt class="col-sm-3">Phone</dt>
                                    <dd class="col-sm-9">{emp.phone}</dd>
                                    <dt class="col-sm-3">Address</dt>
                                    <dd class="col-sm-9">{emp.address}</dd>
                                    <dt class="col-sm-3">Active</dt>
                                    <dd class="col-sm-9">{JSON.stringify(emp.isActive)}</dd>
                                </dl>
                                
                                <div className="col-md-12 col-sm-12 col-lg-10 mt-5" >
                                    <div className=" gap-1 d-flex pt-md-5 pt-lg-4" >
                                        <Link to={`/employees/${emp.id}/edit`} className="btn  btn-success col-3">Edit</Link>
                                        <button onClick={handleDelete} className="btn btn-danger col-4">Delete</button>
                                
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    }       
                </div>
            }   
        </div>    
     );
}
 
export default EmpDetails;