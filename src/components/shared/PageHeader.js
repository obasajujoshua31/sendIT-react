import React from "react";

const PageHeader = () => {
  return (
    <div>
      <div className="container">
        <header className="service-header">
          <div className="service-brand-name">
            <h1 style={spanStyle}>
              <span>SendIT</span>SERVICES
            </h1>
          </div>
          <nav>
            <div className="service-group">
              <span className="service-span">
                <i className="fas fa-phone" />
              </span>
              <div className="service-phone-content">
                <p>078987 -87444</p>
                <p className="service-email">info@sendit.com</p>
              </div>
              <div className="service-group">
                <span className="service-span">
                  <i className="fas fa-home" />
                </span>
                <div className="service-phone-content">
                  <p>Street 43, Ikoyi Road Lagos</p>
                  <p className="service-email">23 Rail way, Ikeja.</p>
                </div>
              </div>
            </div>
          </nav>
        </header>
      </div>
    </div>
  );
};

const spanStyle = {
  color: "#846975"
};

export default PageHeader;
