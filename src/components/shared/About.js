import React, { Fragment } from "react";
import image1 from "../../assets/rawpixel-799527-unsplash.jpg";
import image2 from "../../assets/images.jpeg";
import image3 from "../../assets/quickorder-301139-unsplash.jpg";
import image4 from "../../assets/rawpixel-783423-unsplash.jpg";

const About = () => {
  return (
    <Fragment>
      <div className="about-us">
        <div className="about-us-header">
          <div className="about-us-header-content">
            <h1>About SendIT Courier Services</h1>
            <p>
              Our mission is ensure that parcels are sent smoothly to various
              destinations across Nigeria.
            </p>
          </div>
        </div>
        <div className="about-us-body-heading">
          <h1>WHO WE ARE</h1>
        </div>
        <div className="about-us-body">
          <div className="image-container image-1">
            <img src={image1} />
            <h3>History of SendIT</h3>
            <p>Send It began some 15 years ago at Banana Island, Lagos.</p>
          </div>
          <div className="image-container image-2">
            <img src={image2} />
            <h3>Motivation</h3>
            <p>
              Due to several complains regarding existing Courier Services,
              SendIT inc was formed to solve the problem
            </p>
          </div>
          <div className="image-container image-3">
            <img src={image3} />
            <h3>Vision</h3>
            <p>To be among the top leading Courier Services in Africa</p>
          </div>
          <div className="image-container image-3">
            <img src={image4} />
            <h3>Mission</h3>
            <p>
              By Prompt Delivery of parcels to various destination with the
              satisfaction of customers in mind.
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default About;
