import React, { useState, useEffect, useRef } from 'react'
import { Card, Button, Form, Alert } from 'react-bootstrap';
import { useAuth } from './contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';

const ForgotPassword = () => {
    const emailRef = useRef();
	const passwordRef = useRef();
	const history = useHistory();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(false);
	const { resetPassword } = useAuth();

    const handlesubmit = async(e) => {
        e.preventDefault();

		try {
            setMessage('')
			setError('');
			setLoading(true);
			await resetPassword(
				emailRef.current.value,
			);
			setMessage("Check your inbox for futhur instructions")
		} catch (err) {
			setError('Failed to reset password');
		}
		setLoading(false);
    }
    return (<div>
		<Card>
			<Card.Body>
				<h2 className='text-center mb-4'>Password Reset</h2>
				{error && <Alert variant='danger'>{error}</Alert>}
                {message && <Alert variant='success'>{message}</Alert>}
				<Form onSubmit={handlesubmit}>
					<Form.Group id='email'>
						<Form.Label>Email</Form.Label>
						<Form.Control type='email' ref={emailRef} required />
					</Form.Group>
					<Button disabled={loading} className='w-100 mt-4' type='submit'>
						Reset Password
					</Button>
				</Form>
				<div className='w-100 text-center mt-3'>
					<Link to="/login">Login</Link>
				</div>
			</Card.Body>
		</Card>
		<div className='w-100 text-center mt-2'>
			Need an account? <Link to="/signup">Sign Up </Link>
		</div>
	</div>)
}

export default ForgotPassword;
