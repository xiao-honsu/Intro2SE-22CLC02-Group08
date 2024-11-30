import React, { useState } from 'react';
import Header from '../components/Header';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import '../styles/ListUser.scss';

function ListUser() {
    const [userType, setUserType] = useState('admin');

    return (
        <div className="main-container">
            <div className="header-wrapper">
                <Header userType={userType} />
            </div>
            <div className="body">
                <div className="search-panel">
                    <div class="search-bar">
                        <FontAwesomeIcon icon={faSearch} className="search-icon" />
                        <input type="text" placeholder="Search ID’s user" />
                    </div>
                </div>
                <div className="box">
                    <div className="box-header">
                        <div className="id">
                            ID
                        </div>
                        <div className="name">
                            Name
                        </div>
                        <div className="email">
                            Email
                        </div>
                        <div className="phone-num">
                            Phone Number
                        </div>
                    </div>
                    <div className="inner-box">
                        <div className="user-item">
                            <div className="id">
                                22127
                            </div>
                            <div className="name">
                                bocchi
                            </div>
                            <div className="email">
                                bocchi@blabla.com
                            </div>
                            <div className="phone-num">
                                1234567890
                            </div>
                            <div className="delete" role="button">
                                Delete
                            </div>
                        </div>
                        <div className="user-item">
                            <div className="id">
                                22127
                            </div>
                            <div className="name">
                                bocchi
                            </div>
                            <div className="email">
                                bocchi@blabla.com
                            </div>
                            <div className="phone-num">
                                1234567890
                            </div>
                            <div className="delete" role="button">
                                Delete
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default ListUser;