import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { vendaService, produtoService, Venda, Produto } from '../services/api';
import Layout from '../components/Layout';
import { 
  Plus, 
  Search, 
  Calendar,
  DollarSign,
  Package,
  ShoppingCart,
  Filter,
  Download
} from 'lucide-react';

const Vendas: React.FC = () => {
  const [vendas, setVendas] = useState<Venda[]>([]);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [formData, setFormData] = useState({
    produtoId: '',
    quantidade: '',
    dataVenda: new Date().toISOString().split('T')[0],
    observacoes: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [vendasResponse, produtosResponse] = await Promise.all([
        vendaService.listar(1, 50),
        produtoService.listar(1, 100)
      ]);
      
      setVendas(vendasResponse.data || []);
      setProdutos(produtosResponse.data || []);
    } catch (err: any) {
      console.error('Erro ao carregar dados:', err);
      setError('Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const vendaData = {
        produtoId: parseInt(formData.produtoId),
        quantidade: parseInt(formData.quantidade),
        dataVenda: formData.dataVenda,
        observacoes: formData.observacoes || undefined
      };

      await vendaService.criar(vendaData);
      await loadData();
      resetForm();
    } catch (err: any) {
      console.error('Erro ao registrar venda:', err);
      setError('Erro ao registrar venda');
    }
  };

  const resetForm = () => {
    setFormData({
      produtoId: '',
      quantidade: '',
      dataVenda: new Date().toISOString().split('T')[0],
      observacoes: ''
    });
    setShowForm(false);
  };

  const filteredVendas = vendas.filter(venda => {
    const matchesSearch = venda.produto.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = !dateFilter || venda.dataVenda.startsWith(dateFilter);
    return matchesSearch && matchesDate;
  });

  const formatCurrency = (value: string) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(parseFloat(value));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getTotalVendas = () => {
    return filteredVendas.reduce((total, venda) => total + parseFloat(venda.valorTotal), 0);
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span>Carregando vendas...</span>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Vendas
              </h1>
              <p className="text-gray-600">
                Registre e acompanhe suas vendas
              </p>
            </div>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Nova Venda
            </Button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
            {error}
          </div>
        )}

        {/* Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de Vendas
              </CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {filteredVendas.length}
              </div>
              <p className="text-xs text-muted-foreground">
                vendas registradas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Valor Total
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(getTotalVendas().toString())}
              </div>
              <p className="text-xs text-muted-foreground">
                em vendas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Ticket Médio
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {filteredVendas.length > 0 
                  ? formatCurrency((getTotalVendas() / filteredVendas.length).toString())
                  : 'R$ 0,00'
                }
              </div>
              <p className="text-xs text-muted-foreground">
                por venda
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Formulário */}
        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Nova Venda</CardTitle>
              <CardDescription>
                Registre uma nova venda no sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="produtoId" className="block text-sm font-medium mb-2">
                      Produto *
                    </label>
                    <select
                      id="produtoId"
                      value={formData.produtoId}
                      onChange={(e) => setFormData({ ...formData, produtoId: e.target.value })}
                      className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                      required
                    >
                      <option value="">Selecione um produto</option>
                      {produtos.filter(p => p.ativo).map((produto) => (
                        <option key={produto.id} value={produto.id}>
                          {produto.nome} - {formatCurrency(produto.preco)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="quantidade" className="block text-sm font-medium mb-2">
                      Quantidade *
                    </label>
                    <Input
                      id="quantidade"
                      type="number"
                      min="1"
                      value={formData.quantidade}
                      onChange={(e) => setFormData({ ...formData, quantidade: e.target.value })}
                      placeholder="1"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="dataVenda" className="block text-sm font-medium mb-2">
                    Data da Venda *
                  </label>
                  <Input
                    id="dataVenda"
                    type="date"
                    value={formData.dataVenda}
                    onChange={(e) => setFormData({ ...formData, dataVenda: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="observacoes" className="block text-sm font-medium mb-2">
                    Observações
                  </label>
                  <textarea
                    id="observacoes"
                    value={formData.observacoes}
                    onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                    placeholder="Observações sobre a venda..."
                    rows={3}
                    className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm resize-none"
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit">
                    Registrar Venda
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Filtros */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar por produto..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="month"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Vendas */}
        <Card>
          <CardHeader>
            <CardTitle>Histórico de Vendas</CardTitle>
            <CardDescription>
              {filteredVendas.length} vendas encontradas
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredVendas.length > 0 ? (
              <div className="space-y-4">
                {filteredVendas.map((venda) => (
                  <div key={venda.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Package className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {venda.produto.nome}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>Qtd: {venda.quantidade}</span>
                          <span>•</span>
                          <span>Valor Unit: {formatCurrency(venda.valorUnit)}</span>
                          <span>•</span>
                          <span>{formatDate(venda.dataVenda)}</span>
                        </div>
                        {venda.observacoes && (
                          <p className="text-sm text-gray-600 mt-1">
                            {venda.observacoes}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-green-600">
                        {formatCurrency(venda.valorTotal)}
                      </div>
                      <div className="text-sm text-gray-500">
                        Total
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {searchTerm || dateFilter ? 'Nenhuma venda encontrada' : 'Nenhuma venda registrada'}
                </h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm || dateFilter 
                    ? 'Tente ajustar os filtros de busca'
                    : 'Comece registrando sua primeira venda'
                  }
                </p>
                {!searchTerm && !dateFilter && (
                  <Button onClick={() => setShowForm(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Registrar Venda
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Vendas;
