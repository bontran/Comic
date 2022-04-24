import React, { useState} from 'react'
import { Card, Button, Alert } from 'react-bootstrap';
import { useAuth } from './contexts/AuthContext';
import { Link, useHistory} from 'react-router-dom'

const Dashboard = () => {
    const [error, setError] = useState('')
    const { currentUser, logout } = useAuth();
    const history = useHistory();
    const handleLogout = async () => {
        setError('');
        try {
            await logout()
            history.push('/login')
        }catch{
            setError('Failed to logout')
        }
    }
  return (
    <React.Fragment>
        <Card>
            <Card.Body>
            <h2 className='text-center mb-4'>Profile</h2>
            {error && <Alert variant='danger'>{error}</Alert>}
            <strong>Email: </strong>{currentUser.email}
            </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
            <Button varient="link" onClick={handleLogout}>Log Out</Button>
		</div>
    </React.Fragment>
  )
}

export default Dashboard;
