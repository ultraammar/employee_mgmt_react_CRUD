import { Link } from "react-router-dom";

const Navbar = ({handleChange}) => {
    const useCards= localStorage.getItem('useCards') === 'true' ? true : false;


    return (
      <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom border-3 border-black border-opacity-50 shadow" >
            <div className="container-fluid " style={{maxWidth: '1150px'}} >
                <Link className="navbar-brand " to="/"><h2 className="fw-bold">EmpMgmt</h2></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item lead">
                      <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item lead">
                      <Link className="nav-link" to="/employees/create">Create New</Link>
                    </li>
                    <li className="nav-item lead d-flex align-items-center justify-content-center">
                      <div className="form-check form-switch form-check-reverse mb-0">
                        <input className="form-check-input" type="checkbox" role="switch" checked={localStorage.getItem('useCards') === 'true'} id="flexSwitchCheckDefault" onChange={handleChange}></input>
                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Use card style?</label>
                      </div>
                    </li>
                </ul>
                
                </div>
            </div>
        </nav>
      </>
    );
}
 
export default Navbar;
