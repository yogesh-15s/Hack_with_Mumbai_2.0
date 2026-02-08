import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import Login from './pages/Login';
import HealthSetup from './pages/HealthSetup';
import Settings from './pages/Settings';
import Appointments from './pages/Appointments';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <Router>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route
                            path="/dashboard"
                            element={
                                <PrivateRoute>
                                    <Dashboard />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/health-setup"
                            element={
                                <PrivateRoute>
                                    <HealthSetup />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/reports"
                            element={
                                <PrivateRoute>
                                    <Reports />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/appointments"
                            element={
                                <PrivateRoute>
                                    <Appointments />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/settings"
                            element={
                                <PrivateRoute>
                                    <Settings />
                                </PrivateRoute>
                            }
                        />
                        <Route path="/" element={<Navigate to="/dashboard" />} />
                    </Routes>
                </Router>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
