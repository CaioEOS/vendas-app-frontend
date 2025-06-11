import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Produtos from './pages/Produtos';
import Vendas from './pages/Vendas';
import Relatorios from './pages/Relatorios';
import Configuracoes from './pages/Configuracoes';
import VendaFormPage from './pages/VendaFormPage';
import { VendaProvider } from './context/VendaContext';
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => {
    return (
        <VendaProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/produtos"
                        element={
                            <ProtectedRoute>
                                <Produtos />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/vendas"
                        element={
                            <ProtectedRoute>
                                <Vendas />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/relatorios"
                        element={
                            <ProtectedRoute>
                                <Relatorios />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/configuracoes"
                        element={
                            <ProtectedRoute>
                                <Configuracoes />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/venda-form"
                        element={
                            <ProtectedRoute>
                                <VendaFormPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                    <Route path="/menu" element={<Navigate to="/dashboard" />} />
                </Routes>
            </Router>
        </VendaProvider>
    );
};

export default App;
