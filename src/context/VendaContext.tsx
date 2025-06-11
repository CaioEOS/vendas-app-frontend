import React, { createContext, useState, useCallback, ReactNode } from 'react';
import axios from 'axios';

interface Venda {
    id: number;
    dataFormatada: string;
    valor: number;
}

interface VendaContextType {
    vendas: Venda[];
    fetchVendas: (filters?: { dia?: number; mes?: number; ano?: number }) => Promise<void>;
    createVenda: (data: string, valor: number) => Promise<void>;
    updateVenda: (id: number, data: string, valor: number) => Promise<void>;
    deleteVenda: (id: number) => Promise<void>;
    getTotalVendas: () => Promise<number>;
    filtroDia: number | undefined;
    setFiltroDia: React.Dispatch<React.SetStateAction<number | undefined>>;
    filtroMes: number | undefined;
    setFiltroMes: React.Dispatch<React.SetStateAction<number | undefined>>;
    filtroAno: number | undefined;
    setFiltroAno: React.Dispatch<React.SetStateAction<number | undefined>>;
    loading: boolean;
    handleEdit: (id: number) => void;
    handleDelete: (id: number) => void;
    exportToCSV: () => void;
    novaVenda: { dataFormatada: string; valor: number } | null;
    setNovaVenda: React.Dispatch<React.SetStateAction<{ dataFormatada: string; valor: number } | null>>;
    errors: string[];
    editVenda: { id: number; dataFormatada: string; valor: number } | null;
    setEditVenda: React.Dispatch<React.SetStateAction<{ id: number; dataFormatada: string; valor: number } | null>>;
    handleSubmit: (data: string, valor: number) => Promise<void>;
    handleUpdate: (id: number, data: string, valor: number) => Promise<void>;
    validateForm: () => boolean;
}

export const VendaContext = createContext<VendaContextType>(undefined as any);

export const VendaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [vendas, setVendas] = useState<Venda[]>([]);
    const [filtroDia, setFiltroDia] = useState<number | undefined>(undefined);
    const [filtroMes, setFiltroMes] = useState<number | undefined>(undefined);
    const [filtroAno, setFiltroAno] = useState<number | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const [novaVenda, setNovaVenda] = useState<{ dataFormatada: string; valor: number } | null>(null);
    const [errors, setErrors] = useState<string[]>([]);
    const [editVenda, setEditVenda] = useState<{ id: number; dataFormatada: string; valor: number } | null>(null);

    const fetchVendas = useCallback(async (filters?: { dia?: number; mes?: number; ano?: number }) => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Token não encontrado');

            const params = new URLSearchParams();
            if (filters?.dia ?? filtroDia) {
                const diaValue = filters?.dia ?? filtroDia;
                if (diaValue !== undefined && diaValue !== null) params.append('dia', diaValue.toString());
            }
            if (filters?.mes ?? filtroMes) {
                const mesValue = filters?.mes ?? filtroMes;
                if (mesValue !== undefined && mesValue !== null) params.append('mes', mesValue.toString());
            }
            if (filters?.ano ?? filtroAno) {
                const anoValue = filters?.ano ?? filtroAno;
                if (anoValue !== undefined && anoValue !== null) params.append('ano', anoValue.toString());
            }

            const response = await axios.get<Venda[]>('http://localhost:8080/vendas', {
                headers: { Authorization: `Bearer ${token}` },
                params,
            });
            setVendas(response.data);
        } catch (error) {
            console.error('Erro ao buscar vendas:', error);
        } finally {
            setLoading(false);
        }
    }, [filtroDia, filtroMes, filtroAno]);

    const createVenda = async (data: string, valor: number) => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Token não encontrado');

            await axios.post(
                'http://localhost:8080/vendas',
                { dataFormatada: data, valor },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            await fetchVendas();
            setNovaVenda(null);
            setErrors([]);
        } catch (error) {
            console.error('Erro ao criar venda:', error);
            setErrors(['Erro ao criar venda']);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const updateVenda = async (id: number, data: string, valor: number) => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Token não encontrado');

            await axios.put(
                `http://localhost:8080/vendas/${id}`,
                { dataFormatada: data, valor },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            await fetchVendas();
            setEditVenda(null);
            setErrors([]);
        } catch (error) {
            console.error('Erro ao atualizar venda:', error);
            setErrors(['Erro ao atualizar venda']);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const deleteVenda = async (id: number) => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Token não encontrado');

            await axios.delete(`http://localhost:8080/vendas/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            await fetchVendas();
        } catch (error) {
            console.error('Erro ao deletar venda:', error);
            setErrors(['Erro ao deletar venda']);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const getTotalVendas = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Token não encontrado');

            const response = await axios.get<number>('http://localhost:8080/vendas/total', {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao calcular total de vendas:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (id: number) => {
        const venda = vendas.find((v) => v.id === id);
        if (venda) {
            setEditVenda({ id: venda.id, dataFormatada: venda.dataFormatada, valor: venda.valor });
        }
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Tem certeza que deseja excluir esta venda?')) {
            deleteVenda(id);
        }
    };

    const exportToCSV = () => {
        const csv = [
            ['ID,Data,Valor'],
            ...vendas.map((v) => [v.id, v.dataFormatada, v.valor].join(',')),
        ].join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'vendas.csv';
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const handleSubmit = async (data: string, valor: number) => {
        if (editVenda) {
            await handleUpdate(editVenda.id, data, valor);
        } else {
            await createVenda(data, valor);
        }
    };

    const handleUpdate = async (id: number, data: string, valor: number) => {
        await updateVenda(id, data, valor);
    };

    const validateForm = (): boolean => {
        const newErrors: string[] = [];
        if (!novaVenda?.dataFormatada) newErrors.push('Data é obrigatória');
        if (novaVenda && novaVenda.valor !== undefined && novaVenda.valor <= 0) {
            newErrors.push('Valor deve ser maior que zero');
        }
        setErrors(newErrors);
        return newErrors.length === 0;
    };

    return (
        <VendaContext.Provider
            value={{
                vendas,
                fetchVendas,
                createVenda,
                updateVenda,
                deleteVenda,
                getTotalVendas,
                filtroDia,
                setFiltroDia,
                filtroMes,
                setFiltroMes,
                filtroAno,
                setFiltroAno,
                loading,
                handleEdit,
                handleDelete,
                exportToCSV,
                novaVenda,
                setNovaVenda,
                errors,
                editVenda,
                setEditVenda,
                handleSubmit,
                handleUpdate,
                validateForm,
            }}
        >
            {children}
        </VendaContext.Provider>
    );
};
