import React from 'react';

interface Venda {
  id: string | number;
  dataFormatada: string;
  valor: number;
}

interface VendaTableProps {
  vendas: Venda[];
  loading: boolean;
  handleEdit: (venda: Venda) => void;
  handleDelete: (id: string | number) => Promise<void>;
}

const VendaTable: React.FC<VendaTableProps> = ({ vendas, loading, handleEdit, handleDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className={`min-w-full bg-white rounded-lg shadow-md ${!loading ? 'opacity-100 fade-in' : 'opacity-0'}`}>
        <thead>
          <tr className="bg-gray-100">
            <th className="py-3 px-4 text-left text-gray-600 font-medium">Data</th>
            <th className="py-3 px-4 text-left text-gray-600 font-medium">Valor</th>
            <th className="py-3 px-4 text-left text-gray-600 font-medium">Ações</th>
          </tr>
        </thead>
        <tbody>
          {vendas.map((venda) => (
            <tr key={venda.id || venda.dataFormatada} className="border-t">
              <td className="py-3 px-4">{venda.dataFormatada}</td>
              <td className="py-3 px-4">R$ {venda.valor.toFixed(2)}</td>
              <td className="py-3 px-4 flex space-x-2">
                <button
                  onClick={() => handleEdit(venda)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(venda.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                  disabled={!venda.id}
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VendaTable;
