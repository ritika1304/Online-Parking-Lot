export default function Footer(){
    return(
        <>
    <section className="info_section ">
    <div className="container">
      <div className="row">
        <div className="col-lg-4">
          <h6>
            Subscribe Now
          </h6>
          <p>
            There are many variations of passages of Lorem Ipsum available,
          </p>
          <form action="">
            <input type="text" placeholder="Enter your email"/>
            <div className="d-flex justify-content-end">
              <button>
                subscribe
              </button>
            </div>
          </form>
        </div>
        <div className="col-lg-2">
          <h6>
            Information
          </h6>
          <ul>
            <li>
              <a href="">
                There are many
              </a>
            </li>
            <li>
              <a href="">
                variations of
              </a>
            </li>
            <li>
              <a href="">
                passages of Lorem
              </a>
            </li>
            <li>
              <a href="">
                Ipsum available,
              </a>
            </li>
            <li>
              <a href="">
                but the majority
              </a>
            </li>
          </ul>
        </div>
        <div className="col-lg-2">
          <h6>
            Helpful Links
          </h6>
          <ul>
            <li>
              <a href="">
                There are many
              </a>
            </li>
            <li>
              <a href="">
                variations of
              </a>
            </li>
            <li>
              <a href="">
                passages of Lorem
              </a>
            </li>
            <li>
              <a href="">
                Ipsum available,
              </a>
            </li>
            <li>
              <a href="">
                but the majority
              </a>
            </li>
          </ul>
        </div>
        <div className="col-lg-2">
          <h6>
            Invesments
          </h6>
          <ul>
            <li>
              <a href="">
                There are many
              </a>
            </li>
            <li>
              <a href="">
                variations of
              </a>
            </li>
            <li>
              <a href="">
                passages of Lorem
              </a>
            </li>
            <li>
              <a href="">
                Ipsum available,
              </a>
            </li>
            <li>
              <a href="">
                but the majority
              </a>
            </li>
          </ul>
        </div>
        <div className="col-lg-2">
          <h6>
            Contact Us
          </h6>
          <div className="info_link-box">
            <a href="">
              <img src="images/location.png" alt=""/>
              <span> Location</span>
            </a>
            <a href="">
              <img src="images/call.png" alt=""/>
              <span>+91 6280338944</span>
            </a>
            <a href="">
              <img src="images/envelope.png" alt=""/>
              <span>ritikayadav@gmail.com</span>
            </a>
          </div>
          <div className="info_social">
            <div>
              <a href="">
                <img src="images/fb.png" alt=""/>
              </a>
            </div>
            <div>
              <a href="">
                <img src="images/twitter.png" alt=""/>
              </a>
            </div>
            <div>
              <a href="">
                <img src="images/linkedin.png" alt=""/>
              </a>
            </div>
            <div>
              <a href="">
                <img src="images/insta.png" alt=""/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
        {/* <!-- footer section --> */}
        <section className="container-fluid footer_section">
            <p>
            &copy; <span id="displayYear"></span> All Rights Reserved By
            <a href="#">Reserve Loop</a>
            </p>
        </section>
        {/* <!-- footer section --> */}
        </>
    )
}