import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCartShopping, faUser, faBell, faCommentDots } from "@fortawesome/free-solid-svg-icons";
import "../styles/Header.scss";

function Header({ userType, showSearch = true, showNav = true }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <header className="header d-flex align-items-center justify-content-between">
        <div className="header-logo">
            <Link to="/" className="logo-link">
                <h1 className="logo">t2hands</h1>
            </Link>
        </div>

        {showSearch && (
            <div className="header-search flex-grow-1 mx-3">
                <Form className="searchBar">
                    <FormControl type="search" placeholder="Search for anything" className="search-input" aria-label="Search" />
                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
                </Form>
            </div>
        )}

        
        {showNav && (
        <nav className="header-nav d-flex align-items-center">
            {userType === "guest" && (
                <>
                    <Link to="/login" className="nav-link mx-2" onClick={() => console.log('Navigating to login')}>
  Login
</Link>
                    <Link to="/register" className="nav-link mx-2">Sign up</Link>
                    <Link to="/sell" className="btn btn-warning mx-2">Sell now</Link>
                    <Link to="/cart" className="nav-icon mx-2">
                        <FontAwesomeIcon icon={faCartShopping} />
                    </Link>

                    <div className="profile-dropdown">
                        <div className="nav-icon mx-2 profile-icon" onClick={toggleDropdown} style={{ cursor: "pointer" }} >
                            <FontAwesomeIcon icon={faUser} />
                        </div>
                        {isDropdownOpen && (
                            <div className="dropdown-menu">
                                <Link to="/" className="dropdown-item">Log in</Link>
                            </div>
                        )}
                    </div>
                </>
            )}

            {userType === "seller" && (
                <>
                    <Link to="/sell" className="btn btn-warning mx-2">Sell now</Link>
                    <Link to="/" className="nav-icon mx-2">
                        <FontAwesomeIcon icon={faBell} />
                    </Link>
                    <Link to="/" className="nav-icon mx-2">
                        <FontAwesomeIcon icon={faCommentDots} />
                    </Link>

                    <div className="profile-dropdown">
                        <div className="nav-icon mx-2 profile-icon" onClick={toggleDropdown} style={{ cursor: "pointer" }} >
                            <img src="/avt1.jpg" alt="Avatar" style={{width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover", }} />
                        </div>
                        {isDropdownOpen && (
                            <div className="dropdown-menu">
                                <Link to="/" className="dropdown-item">Profile</Link>
                                <Link to="/" className="dropdown-item">Role</Link>
                                <Link to="/" className="dropdown-item">Log out</Link>
                            </div>
                        )}
                    </div>
                </>
            )}

            {userType === "buyer" && (
                <>
                    <Link to="/cart" className="nav-icon mx-2">
                        <FontAwesomeIcon icon={faCartShopping} />
                    </Link>
                    <Link to="/" className="nav-icon mx-2">
                        <FontAwesomeIcon icon={faBell} />
                    </Link>
                    <Link to="/" className="nav-icon mx-2">
                        <FontAwesomeIcon icon={faCommentDots} />
                    </Link>

                    <div className="profile-dropdown">
                        <div className="nav-icon mx-2 profile-icon" onClick={toggleDropdown} style={{ cursor: "pointer" }} >
                            <img src="/avt2.jpg" alt="Avatar" style={{width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover", }} />
                        </div>
                        {isDropdownOpen && (
                            <div className="dropdown-menu">
                                <Link to="/" className="dropdown-item">Profile</Link>
                                <Link to="/" className="dropdown-item">Role</Link>
                                <Link to="/" className="dropdown-item">Log out</Link>
                            </div>
                        )}
                    </div>
                </>
            )}

            {userType === "admin" && (
                <>
                    <Link to="/" className="nav-icon mx-2">
                        <FontAwesomeIcon icon={faBell} />
                    </Link>
                    <Link to="/" className="nav-icon mx-2">
                        <FontAwesomeIcon icon={faCommentDots} />
                    </Link>

                    <div className="profile-dropdown">
                        <div className="nav-icon mx-2 profile-icon" onClick={toggleDropdown} style={{ cursor: "pointer" }} >
                            <img src="/avt3.jpg" alt="Avatar" style={{width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover", }} />
                        </div>
                        {isDropdownOpen && (
                            <div className="dropdown-menu">
                                <Link to="/" className="dropdown-item">Log out</Link>
                            </div>
                        )}
                    </div>
                </>
            )}


            
        </nav>
        )}
    </header>
  );
}

export default Header;
