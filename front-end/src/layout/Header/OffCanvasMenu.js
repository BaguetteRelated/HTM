import React from 'react';
import Link from 'next/link';

const OffCanvasMenu = () => {
  return (
    <div className="offcanvas-body">
      <ul className="nav col-12 col-md-auto justify-content-center main-menu">
      <li>
                <Link href="/">
                  <a className="nav-link">Home</a>
                </Link>
              </li>
              <li>
                <Link href="about-us">
                  <a className="nav-link">About</a>
                </Link>
              </li>
              <li>
                <Link href="process">
                  <a className="nav-link">Process</a>
                </Link>
              </li>
              <li>
                <Link href="projectsall">
                  <a className="nav-link">All projects</a>
                </Link>
              </li>
              <li>
                <Link href="projects">
                  <a className="nav-link">My projects</a>
                </Link>
              </li>
              <li>
                <Link href="profile">
                  <a className="nav-link">My profile</a>
                </Link>
              </li>
      </ul>
      <div className="action-btns mt-4 ps-3">
        <Link href="/request-demo">
          <a className="btn btn-primary">Connect</a>
        </Link>
      </div>
    </div>
  );
};

export default OffCanvasMenu;
