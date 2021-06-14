import React from 'react';
import Link from './Link';
import Status from './Status';
import * as Icon from 'react-feather';

const Sidebar = () => {

  return (
    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div className="position-sticky pt-3">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link" href="/">
              <Icon.FileText className="feather" />
              Articles
            </Link>
          </li>
          <Status />
        </ul>

        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>Article Workers</span>
          <a className="link-secondary" href="#" aria-label="Add a new article">
            <Icon.PlusCircle className="feather" />
          </a>
        </h6>
        <ul className="nav flex-column mb-2">
          <li className="nav-item">
            <Link className="nav-link" href="/tasks">
              <Icon.List className="feather" />
              Current Tasks
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Sidebar;