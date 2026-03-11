import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import DoctorPatients from './pages/DoctorPatients';
import HospitalDashboard from './pages/HospitalDashboard';
import Reports from './pages/Reports';
import Login from './pages/Login';
import RoleSelection from './pages/RoleSelection';
import HealthSetup from './pages/HealthSetup';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Appointments from './pages/Appointments';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';

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
                                    <DashboardSelector />
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
                        <Route
                            path="/profile"
                            element={
                                <PrivateRoute>
                                    <Profile />
                                </PrivateRoute>
                            }
                        />
                        {/* Doctor Specific Routes */}
                        <Route
                            path="/patients"
                            element={
                                <PrivateRoute>
                                    <DoctorPatients />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/schedule"
                            element={
                                <PrivateRoute>
                                    <DoctorDashboard /> {/* Dummy for now */}
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/prescriptions"
                            element={
                                <PrivateRoute>
                                    <DoctorDashboard /> {/* Dummy for now */}
                                </PrivateRoute>
                            }
                        />
                        {/* Hospital Specific Routes */}
                        <Route
                            path="/wards"
                            element={
                                <PrivateRoute>
                                    <HospitalDashboard /> {/* Dummy for now */}
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/staff"
                            element={
                                <PrivateRoute>
                                    <HospitalDashboard /> {/* Dummy for now */}
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/facilities"
                            element={
                                <PrivateRoute>
                                    <HospitalDashboard /> {/* Dummy for now */}
                                </PrivateRoute>
                            }
                        />
                        <Route path="/" element={<RoleSelection />} />
                    </Routes>
                </Router>
            </AuthProvider>
        </ThemeProvider>
    );
}

const DashboardSelector = () => {
    const { user } = useAuth();
    const role = user?.role || localStorage.getItem('selectedRole') || 'patient';

    if (role === 'doctor') return <DoctorDashboard />;
    if (role === 'hospital') return <HospitalDashboard />;
    return <Dashboard />;
};

export default App;
