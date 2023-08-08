import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideoSlash } from '@fortawesome/free-solid-svg-icons';
import   Button   from 'react-bootstrap/Button';
import  Container  from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router-dom';

function Header() {

   const navigate = useNavigate();
   function handleClick(){
      navigate("/NotFound");
   }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
       <Container fluid>
           <Navbar.Brand href="/" style={{color:"gold"}}>
              <FontAwesomeIcon icon={faVideoSlash} />Gold
           </Navbar.Brand>
           <Navbar.Toggle aria-controls='navbarScrolls'/>
           <Navbar.Collapse>
               <Nav
                  className="me-auto my-2 my-lg-0"
                  style={{maxHeight: "100px"}}
                  navbarScroll
               >
                <NavLink className="nav-link" to="/">Home</NavLink>
                <NavLink className="nav-link" to="/watchList">Watch List</NavLink>
               </Nav>
               <Button variant="outline-info" className="me-2" onClick={() => handleClick()}>Login</Button>
               <Button variant="outline-info" onClick={() => handleClick()}>Register</Button>
           </Navbar.Collapse>
       </Container>

    </Navbar>
  )
}

export default Header;