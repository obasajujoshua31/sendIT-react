import React from "react";

const About = () => {
  return (
    <React.Fragment>
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
            <img src="/src/assets/rawpixel-799527-unsplash.jpg" />
            <h3>History of SendIT</h3>
            <p>Send It began some 15 years ago at Banana Island, Lagos.</p>
          </div>
          <div className="image-container image-2">
            <img src="/src/assets/images.jpeg" />
            <h3>Motivation</h3>
            <p>
              Due to several complains regarding existing Courier Services,
              SendIT inc was formed to solve the problem
            </p>
          </div>
          <div className="image-container image-3">
            <img src="/src/assets/quickorder-301139-unsplash.jpg" />
            <h3>Vision</h3>
            <p>To be among the top leading Courier Services in Africa</p>
          </div>
                  <div className="image-container image-3">
                      <img src="/src/assets/rawpixel-783423-unsplash.jpg" />
                      <h3>Mission</h3>
                      <p>By Prompt Delivery of parcels to various destination with the satisfaction of customers in mind.</p>
                  </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default About;
