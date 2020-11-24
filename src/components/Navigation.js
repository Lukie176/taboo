import { Navbar, Nav } from "react-bootstrap";

export default function Navigation () {
  return (
    <div>
      <Navbar className="topnav" bg="dark" variant="dark" expand="lg" fixed="top">
        <Navbar.Brand href="/">Taboo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/new">New Game</Nav.Link>
            <Nav.Link href="/join">Join Game</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      </div>
  )
}