import React from "react"
import { Navbar, Nav } from "rsuite"
import { Link } from "react-router-dom"

function NavbarNews() {
  const NavLink = props => <Nav.Item componentClass={Link} {...props} />
  return (
    <div>
      <Navbar>
        <Navbar.Body>
          <Nav>
            <NavLink to="/"> Fresh News</NavLink>
          </Nav>
          <Nav pullRight>
            <NavLink to="topheadline">
              <span role="img" aria-label="Top Arrow">
                🔝
              </span>
              Top Headline
            </NavLink>
          </Nav>
        </Navbar.Body>
      </Navbar>
    </div>
  )
}

export default NavbarNews
