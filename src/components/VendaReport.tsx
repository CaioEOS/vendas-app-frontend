import React from 'react';

// Defina a interface para as props do componente
interface VendaReportProps {
    total: number;
}

const VendaReport: React.FC<VendaReportProps> = ({ total }) => {
    return (
        <div>
            <h2>Relatório de Vendas</h2>
            <p>Total: R$ {total.toFixed(2)}</p>
        </div>
    );
};

export default VendaReport;
