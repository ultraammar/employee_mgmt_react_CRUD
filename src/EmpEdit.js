import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EmpEdit = () => {
    
    const { id } = useParams();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [isActive, setIsActive] = useState('');
    const navigate = useNavigate();

    const [emp, setEmp] = useState('');
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(null);
     
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

  useEffect(() => {
        if(emp){
            setAddress(emp.address);
            setFirstName(emp.firstName);
            setLastName(emp.lastName);
            setEmail(emp.email);
            setPhone(emp.phone);
            setIsActive(emp.isActive);
        }
    }, [emp]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const empNew = {firstName, lastName, email, phone, address, isActive};
    setIsPending(true);
    fetch('https://employee-mgmt-react-crud-data.onrender.com/employees/'+emp.id, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(empNew)
        }).then(() => {    
        setIsPending(false);
            navigate('/');
        })

}

    return ( 
        <div className="emp-edit container my-5" style={{maxWidth:'1150px'}}>
             <div className="p-5 mb-4 bg-body-tertiary rounded-3 border border-2 border-black border-opacity-50 shadow">
                <div className="container-fluid py-3 " style={{textAlign:"left"}}>
                    <h1 className="display-6 fw-semibold ">Update employee information</h1>
                    <p className="col-md-8 fs-4">Here you can update the employee's information.</p>
                        <form className="row g-3 fs-4 col-md-8" onSubmit={handleSubmit}>
                            <div className="col-md-3 required">
                                <label for="inputFirstName" className="form-label">First name</label>
                                <input type="text" className="form-control" id="inputFirstName" placeholder="Dunn" required value={firstName} onChange={(e) => setFirstName(e.target.value)}></input>
                            </div>
                            <div className="col-md-4 required">
                                <label for="inputLastName" className="form-label">Last name</label>
                                <input type="text" className="form-control" id="inputLastName" placeholder="Smith" required value={lastName} onChange={(e) => setLastName(e.target.value)}></input>
                            </div>
                            <div className="col-md-5">
                                <label for="inputPhone" className="form-label">Phone number</label>
                                <input type="text" className="form-control" id="inputPhone" placeholder="123456789"  value={phone} onChange={(e) => setPhone(e.target.value)}></input>
                            </div>
                            <div className="col-md-4 required">
                                <label for="inputEmail" className="form-label">Email</label>
                                <input type="email" className="form-control" id="inputEmail" placeholder="abc@xyz.com" required value={email} onChange={(e) => setEmail(e.target.value)}></input>
                            </div>
                            <div className="col-md-8 required">
                                <label for="inputAddress" className="form-label">Address</label>
                                <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" required value={address} onChange={(e) => setAddress(e.target.value)}></input>
                            </div>
                            
                            <div className="col-12">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" checked={isActive} id="gridCheck" onChange={(e) => setIsActive(e.target.checked)}></input>
                                    <label className="form-check-label" for="gridCheck">
                                        Set active
                                    </label>
                                </div>
                            </div> 
                            <div className="col-12">
                                {isPending  && <button type="submit" className="btn btn-success btn-lg col-md-4">Wait..</button>}
                                {!isPending && <button type="submit" className="btn btn-success btn-lg col-md-4">Update</button>}
                            </div>
                        </form>
                </div>
            </div>
        </div>
     );
}
 
export default EmpEdit;