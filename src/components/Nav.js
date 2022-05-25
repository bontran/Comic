import React, { useState } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import { useAuth } from './contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Nav = (props) => {
	const [error, setError] = useState('');
	const { currentUser, logout } = useAuth();
	const history = useNavigate();

	const handleLogout = async (e) => {
		e.preventDefault();
		setError('');
		try {
			await logout();
			localStorage.removeItem('isLoggedIn');
			props.setIsLoggedIn(false);
			history('/login');
		} catch {
			setError('Failed to logout');
		}
	};
	return (
		<nav className='navbar navbar-expand-lg navbar-light bg-light'>
			{currentUser && currentUser.email && (
				<div className='container-fluid'>
					<Link className='navbar-brand' to='/'>
						EbookReader
					</Link>
					<div className='collapse navbar-collapse' id='navbarSupportedContent'>
						<ul className='navbar-nav me-auto mb-2 mb-lg-0'>
							<li className='nav-item'>
								<Link className='nav-link active' to='/add-comic'>
									Thêm Sách
								</Link>
							</li>
							<li className='nav-item'>
								<Link className='nav-link active' to='/dashboard'>
									Quản lý tài khoản
								</Link>
							</li>
						</ul>
						<form className='d-flex'>
							<input
								className='form-control me-2'
								type='search'
								placeholder='Search'
								aria-label='Search'
							/>
							<Button className='btn btn-success'>Tìm</Button>

							<Button className='btn btn-warning mx-3'>
								{currentUser && currentUser.email}
							</Button>
							<div className='w-100 text-center mt-2'>
								<a varient='link' onClick={handleLogout}>
									Đăng xuất
								</a>
							</div>
						</form>
					</div>
				</div>
			)}
		</nav>
	);
};

export default Nav;
