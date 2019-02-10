import React from "react";
import { Link, Route, BrowserRouter as Router } from "react-router-dom";
import About from "../shared/About";


const PageFooter = () => {
  return (
  
      <React.Fragment>
        <div className="page-footer">
          <h1>  
            <Link to="/about">WHY CHOOSE US?</Link>
          </h1>
        </div>
      </React.Fragment>
  );
};

export default PageFooter;
