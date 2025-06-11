import React, { useContext, useEffect, useState } from 'react';
import { VendaContext } from '../context/VendaContext';
import VendaReport from '../components/VendaReport';

const VendaReportPage: React.FC = () => {
    const context = useContext(VendaContext);
    if (!context) {
        throw new Error('VendaReportPage deve estar dentro de um VendaProvider');
    }
    const { getTotalVendas } = context;
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        const fetchTotal = async () => {
            try {
                const totalVendas = await getTotalVendas();
                setTotal(totalVendas);
            } catch (error) {
                console.error('Erro ao carregar total:', error);
            }
        };
        fetchTotal();
    }, [getTotalVendas]); // Adicionamos getTotalVendas como dependência para resolver o warning do ESLint

    return <VendaReport total={total} />;
};

export default VendaReportPage;
