import { Link, useNavigate } from "react-router-dom";

export default function UserHeader() {
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
                      <a className="nav-link" href="#">Home<span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                      <Link to="/user/view_city">
                        <a className="nav-link" href="#">City</a>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/user/view_parking/0" className="nav-link">
                        Parking
                      </Link>
                    </li>
                    <div class="dropdown nav-item">
                      <a class="nav-link text-white dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                        Vehicle
                      </a>
                      <div class="dropdown-menu">
                        <Link to="/user/add_vehicle" class="dropdown-item">Add</Link>
                        <Link to="/user/view_vehicle">
                          <a class="dropdown-item" href="#">Manage</a>
                        </Link>
                      </div>
                    </div>
                    <li className="nav-item">
                      <Link to="/user/view_booking" className="nav-link">
                        Booking
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/login">
                        <a className="nav-link" href="#" onClick={logout}>Logout</a>
                      </Link>
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