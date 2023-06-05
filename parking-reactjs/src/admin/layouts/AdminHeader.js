import { Link, useNavigate } from "react-router-dom";

export default function AdminHeader() {
  const user_type = sessionStorage.getItem('user_type')
  const authenticate = sessionStorage.getItem('authenticate')
  const navigate = useNavigate()
  const logout = () => {
    window.alert("Do you really Want To Logout?");
    sessionStorage.clear()
    setTimeout(() => {
      sessionStorage.setItem("message", "Logout Successfully")
      navigate("/login")
    }, 500)
  }
  return (
    <>
      <div className="hero_area">
        {/* header section strats */}
        <header className="header_section">
          <div className="container-fluid">
            <nav className="navbar navbar-expand-lg custom_nav-container">
              <a className="navbar-brand" href="index.html">
                <span>
                  Autospar
                </span>
              </a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse ml-auto" id="navbarSupportedContent">
                <div className="d-flex ml-auto flex-column flex-lg-row align-items-center">
                  <ul className="navbar-nav  ">
                    <li className="nav-item ">
                      <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                    </li>
                    {/* <li className="nav-item active">
                  <a className="nav-link" href="#"> City</a>
                </li> */}
                    <div class="dropdown nav-item">
                      <a class="nav-link text-white dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                        City
                      </a>
                      <div class="dropdown-menu">
                        <Link to="/admin/add_city"><a class="dropdown-item" href="#">Add</a></Link>
                        <Link to="/admin/manage_city">
                          <a class="dropdown-item" href="#">Manage</a>
                        </Link>
                      </div>
                    </div>
                    <div class="dropdown nav-item">
                      <a class="nav-link text-white dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                        Parking
                      </a>
                      <div class="dropdown-menu">
                        <Link to="/admin/add_parking"><a class="dropdown-item" href="#">Add</a></Link>
                        <Link to="/admin/manage_parking">
                          <a class="dropdown-item" href="#">Manage</a>
                        </Link>
                      </div>
                    </div>
                    <div class="dropdown nav-item">
                      <a class="nav-link text-white dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                        Slots
                      </a>
                      <div class="dropdown-menu">
                        <Link to="/admin/add_slot"><a class="dropdown-item" href="#">Add</a></Link>
                        <Link to="/admin/manage_slot">
                          <a class="dropdown-item" href="#">Manage</a>
                        </Link>
                      </div>
                    </div>
                    <li className="nav-item">
                      <Link to="/admin/manage_booking">
                        <a className="nav-link" href="#">Booking</a>
                      </Link>
                    </li>

                    <li className="nav-item">
                      <a className="nav-link text-white" href="#" onClick={logout}>Logout</a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </header>
        {/* end header section */}
      </div>
    </>
  )
}