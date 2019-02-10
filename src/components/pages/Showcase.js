import React from "react";
import PageFooter from '../shared/PageFooter';
import AccountContent from "../shared/AccountContent";
const Showcase = () => {
  return (
    <div>
      <div className="showcase">
        <div className="container user-information">
          <AccountContent />
          
        </div>
      </div>
      <PageFooter />
    </div>
  );
};

export default Showcase;
