import React, { useState } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import { useAuth } from './contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = (props) => {
	const [error, setError] = useState('');
	const { currentUser, logout } = useAuth();
	const history = useNavigate();
	const handleLogout = async () => {
		setError('');
		try {
			await logout();
			history('/login');
		} catch {
			setError('Failed to logout');
		}
	};
	return (
		<React.Fragment>
			<Card>
				<Card.Body>
					<h2 className='text-center mb-4'>Profile</h2>
					{error && <Alert variant='danger'>{error}</Alert>}
					<strong>Email: </strong>
					{currentUser.email}
					<Link to='/update-profile' className='btn btn-primary w-100 mt-3'>
						Update profile
					</Link>
				</Card.Body>
			</Card>
			<div className='w-100 text-center mt-2'>
				<a varient='link' onClick={handleLogout}>
					Log Out
				</a>
			</div>
		</React.Fragment>
	);
};

export default Dashboard;
