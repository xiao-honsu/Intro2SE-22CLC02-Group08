import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import '../styles/ListUser.scss';
import userAPI from '../services/user';

function ListUser() {
    const [userType, setUserType] = useState('admin');
    const [users, setUsers] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [searchQuery, setSearchQuery] = useState(''); 
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await userAPI.getAllUsers(); 
                if (response.success) {
                    setUsers(response.users);
                } else {
                    console.error("Failed to fetch users");
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const openDeleteModal = (user) => {
        setUserToDelete(user);  
        setIsDeleteModalOpen(true); 
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setUserToDelete(null); 
    };

    const handleDeleteUser = async () => {
        if (!userToDelete) return;

        try {
            await userAPI.deleteUser(userToDelete._id);  
            setUsers(users.filter(user => user._id !== userToDelete._id));  
            closeDeleteModal();  
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <div className="main-container">
            <div className="header-wrapper">
                <Header userType={userType} />
            </div>
            <div className="body">
                <div className="search-panel">
                    <div className="search-bar">
                        <FontAwesomeIcon icon={faSearch} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search by username or email"
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                    </div>
                </div>
                <div className="box">
                    <div className="box-header">
                        <div className="id">ID</div>
                        <div className="name">Name</div>
                        <div className="email">Email</div>
                        <div className="status">Status</div>
                    </div>
                    <div className="inner-box">
                        {loading ? (
                            <div>Loading...</div>
                        ) : (
                            filteredUsers.map(user => (
                                <div key={user._id} className="user-item">
                                    <div className="id">{user._id}</div>
                                    <div className="name">{user.username}</div>
                                    <div className="email">{user.email}</div>
                                    <div className="status">{user.status}</div>
                                    <div 
                                        className="delete" 
                                        role="button" 
                                        onClick={() => openDeleteModal(user)}
                                    >
                                        Delete
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Modal xác nhận xóa */}
            {isDeleteModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Are you sure you want to delete this user?</h3>
                        <div className="modal-buttons">
                            <button onClick={handleDeleteUser}>Yes</button>
                            <button onClick={closeDeleteModal}>No</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ListUser;
