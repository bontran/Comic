import SignUp from './components/SignUp/SignUp';
import { Container } from 'react-bootstrap';
import { AuthProvider } from './components/contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login/Login'
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './components/ForgotPassword';

const App = () => {
	return (
		<Container
			className='d-flex align-items-center justify-content-center'
			style={{ minHeight: '100vh' }}>
			<div className='w-100' style={{ maxWidth: '400px' }}>
				<Router>
					<AuthProvider>
						<Switch>
							<PrivateRoute exact path="/" component={Dashboard} />
							<Route path='/signup' component={SignUp}/>
							<Route path='/login' component={Login}/>
							<Route path='/forgot-password' component={ForgotPassword}/>
						</Switch>
					</AuthProvider>
				</Router>
				
			</div>
		</Container>
	);
};

export default App;
