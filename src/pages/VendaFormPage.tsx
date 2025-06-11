import React, { useContext } from 'react';
import VendaForm from '../components/VendaForm';
import { VendaContext } from '../context/VendaContext';
import { useNavigate } from 'react-router-dom';

const VendaFormPage: React.FC = () => {
    const { novaVenda, setNovaVenda, errors, editVenda, setEditVenda, handleSubmit, handleUpdate, validateForm } =
        useContext(VendaContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const goToList = () => {
        navigate('/vendas');
    };

    const goToMenu = () => {
        navigate('/');
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Gerenciamento de Vendas</h1>
            <VendaForm
                novaVenda={novaVenda}
                setNovaVenda={setNovaVenda}
                errors={errors}
                editVenda={editVenda}
                setEditVenda={setEditVenda}
                onSubmit={handleSubmit}
                onUpdate={handleUpdate}
                validateForm={validateForm}
            />
            <div className="mt-4 flex gap-4">
                <button onClick={goToList} className="bg-blue-500 text-white p-2 rounded">
                    Ir para Lista
                </button>
                <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded">
                    Deslogar
                </button>
                <button onClick={goToMenu} className="bg-gray-500 text-white p-2 rounded">
                    Voltar ao Menu Principal
                </button>
            </div>
        </div>
    );
};

export default VendaFormPage;
