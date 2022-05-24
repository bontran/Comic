import React, { useState, useEffect, useRef } from 'react';
import './Login.css';
import { Card, Button, Form, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Login = (props) => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const history = useNavigate();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const { login } = useAuth();

	useEffect(() => {
		const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
		if (storedUserLoggedInInformation === '1') {
			history('/');
			props.setIsLoggedIn(true);
		}
	}, []);

	const handlesubmit = async (e) => {
		e.preventDefault();

		try {
			setError('');
			setLoading(true);
			await login(emailRef.current.value, passwordRef.current.value);
			localStorage.setItem('isLoggedIn', '1');
			props.setIsLoggedIn(true);
			history('/');
		} catch (err) {
			setError('Failed to login');
		}
		setLoading(false);
	};
	return (
		<div>
			<Card>
				<Card.Body>
					<h2 className='text-center mb-4'>Đăng nhập</h2>
					{error && <Alert variant='danger'>{error}</Alert>}
					<Form onSubmit={handlesubmit}>
						<Form.Group id='email'>
							<Form.Label>Email</Form.Label>
							<Form.Control type='email' ref={emailRef} required />
						</Form.Group>
						<Form.Group id='password'>
							<Form.Label>Mật khẩu</Form.Label>
							<Form.Control type='password' ref={passwordRef} required />
						</Form.Group>

						<Button disabled={loading} className='w-100 mt-4' type='submit'>
							Đăng nhập
						</Button>
					</Form>
					<div className='w-100 text-center mt-3'>
						<Link to='/forgot-password'>Quên mật khẩu?</Link>
					</div>
				</Card.Body>
			</Card>
			<div className='w-100 text-center mt-2'>
				Bạn cần account? <Link to='/signup'>Đăng ký </Link>
			</div>
		</div>
	);
};

export default Login;
