import React from 'react';

interface VendaFilterProps {
    onFilter: (dia?: number, mes?: number, ano?: number) => void;
}

const VendaFilter: React.FC<VendaFilterProps> = ({ onFilter }) => {
    const [dia, setDia] = React.useState<number | undefined>(undefined);
    const [mes, setMes] = React.useState<number | undefined>(undefined);
    const [ano, setAno] = React.useState<number | undefined>(undefined);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onFilter(dia, mes, ano);
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-4 mb-4">
            <input
                type="number"
                placeholder="Dia"
                value={dia ?? ''}
                onChange={(e) => setDia(e.target.value ? Number(e.target.value) : undefined)}
                className="border p-2"
            />
            <input
                type="number"
                placeholder="Mês"
                value={mes ?? ''}
                onChange={(e) => setMes(e.target.value ? Number(e.target.value) : undefined)}
                className="border p-2"
            />
            <input
                type="number"
                placeholder="Ano"
                value={ano ?? ''}
                onChange={(e) => setAno(e.target.value ? Number(e.target.value) : undefined)}
                className="border p-2"
            />
            <button type="submit" className="bg-blue-500 text-white p-2">
                Filtrar
            </button>
        </form>
    );
};

export default VendaFilter;
