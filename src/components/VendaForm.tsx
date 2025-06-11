import React from 'react';

interface Venda {
    id: number;
    dataFormatada: string;
    valor: number;
}

interface VendaFormProps {
    novaVenda: { dataFormatada: string; valor: number } | null;
    setNovaVenda: React.Dispatch<React.SetStateAction<{ dataFormatada: string; valor: number } | null>>;
    errors: string[];
    editVenda: Venda | null;
    setEditVenda: React.Dispatch<React.SetStateAction<Venda | null>>;
    onSubmit: (data: string, valor: number) => Promise<void>;
    onUpdate: (id: number, data: string, valor: number) => Promise<void>;
    validateForm: () => boolean;
}

const VendaForm: React.FC<VendaFormProps> = ({
    novaVenda,
    setNovaVenda,
    errors,
    editVenda,
    setEditVenda,
    onSubmit,
    onUpdate,
    validateForm,
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (editVenda) {
            setEditVenda({ ...editVenda, [name]: name === 'valor' ? Number(value) : value });
        } else {
            setNovaVenda({
                ...(novaVenda ?? { dataFormatada: '', valor: 0 }),
                [name]: name === 'valor' ? Number(value) : value,
            });
        }
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        const data = editVenda?.dataFormatada ?? novaVenda?.dataFormatada ?? '';
        const valor = editVenda?.valor ?? novaVenda?.valor ?? 0;

        if (editVenda) {
            await onUpdate(editVenda.id, data, valor);
        } else {
            await onSubmit(data, valor);
        }
    };

    return (
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
            <input
                type="text"
                name="dataFormatada"
                placeholder="Data (dd/MM/yyyy)"
                value={editVenda?.dataFormatada ?? novaVenda?.dataFormatada ?? ''}
                onChange={handleChange}
                className="border p-2"
            />
            <input
                type="number"
                name="valor"
                placeholder="Valor"
                value={editVenda?.valor ?? novaVenda?.valor ?? ''}
                onChange={handleChange}
                className="border p-2"
            />
            {errors.length > 0 && (
                <div className="text-red-500">
                    {errors.map((error, index) => (
                        <p key={index}>{error}</p>
                    ))}
                </div>
            )}
            <button type="submit" className="bg-blue-500 text-white p-2">
                {editVenda ? 'Atualizar' : 'Criar'} Venda
            </button>
        </form>
    );
};

export default VendaForm;
