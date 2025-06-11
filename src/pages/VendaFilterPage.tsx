import React, { useContext } from 'react';
import VendaFilter from '../components/VendaFilter';
import { VendaContext } from '../context/VendaContext';

const VendaFilterPage: React.FC = () => {
    const {
        filtroDia,
        setFiltroDia,
        filtroMes,
        setFiltroMes,
        filtroAno,
        setFiltroAno,
        vendas,
        loading,
        handleEdit,
        handleDelete,
        exportToCSV,
        fetchVendas,
    } = useContext(VendaContext);

    const handleFilter = (dia?: number, mes?: number, ano?: number) => {
        setFiltroDia(dia);
        setFiltroMes(mes);
        setFiltroAno(ano);
        fetchVendas({ dia, mes, ano });
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <VendaFilter onFilter={handleFilter} />
        </div>
    );
};

export default VendaFilterPage;
