import { Link } from "react-router-dom";

export default function Header(){
    return(
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
                  <Link to="/">
                  <a className="nav-link" href="#">Home<span className="sr-only">(current)</span></a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/view_city">
                    <a className="nav-link" href="#">City</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/view_parking/0">
                    <a className="nav-link" href="#">Parking</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/login">
                  <a className="nav-link" href="#">Login</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register">
                  <a className="nav-link" href="#">Register</a>
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