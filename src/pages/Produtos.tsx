import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { produtoService, Produto } from "../services/api";
import Layout from "../components/Layout";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Package,
  DollarSign,
  Tag,
} from "lucide-react";

const Produtos: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Produto | null>(null);
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    preco: "",
    categoria: "",
    ativo: true,
  });

  useEffect(() => {
    loadProdutos();
  }, []);

  const loadProdutos = async () => {
    try {
      setLoading(true);
      const response = await produtoService.listar(1, 50);
      setProdutos(response.data || []);
    } catch (err: any) {
      console.error("Erro ao carregar produtos:", err);
      setError("Erro ao carregar produtos");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const produtoData = {
        ...formData,
      };

      if (editingProduct) {
        await produtoService.atualizar(editingProduct.id, {
          ...produtoData,
          preco: Number(produtoData.preco),
        });
      } else {
        await produtoService.criar({
          ...produtoData,
          preco: Number(produtoData.preco),
        });
      }

      await loadProdutos();
      resetForm();
    } catch (err: any) {
      console.error("Erro ao salvar produto:", err);
      setError("Erro ao salvar produto");
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        await produtoService.deletar(id);
        await loadProdutos();
      } catch (err: any) {
        console.error(err.response.data.message, err);
        setError(err.response.data.message);
      }
    }
  };

  const handleEdit = (produto: Produto) => {
    setEditingProduct(produto);
    setFormData({
      nome: produto.nome,
      descricao: produto.descricao || "",
      preco: produto.preco,
      categoria: produto.categoria || "",
      ativo: produto.ativo,
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      nome: "",
      descricao: "",
      preco: "",
      categoria: "",
      ativo: true,
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  const filteredProdutos = produtos.filter(
    (produto) =>
      produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (produto.categoria &&
        produto.categoria.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatCurrency = (value: string) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(parseFloat(value));
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span>Carregando produtos...</span>
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
                Produtos
              </h1>
              <p className="text-gray-600">Gerencie seu catálogo de produtos</p>
            </div>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Produto
            </Button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
            {error}
          </div>
        )}

        {/* Formulário */}
        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>
                {editingProduct ? "Editar Produto" : "Novo Produto"}
              </CardTitle>
              <CardDescription>
                {editingProduct
                  ? "Atualize as informações do produto"
                  : "Adicione um novo produto ao seu catálogo"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="nome"
                      className="block text-sm font-medium mb-2"
                    >
                      Nome do Produto *
                    </label>
                    <Input
                      id="nome"
                      value={formData.nome}
                      onChange={(e) =>
                        setFormData({ ...formData, nome: e.target.value })
                      }
                      placeholder="Ex: Smartphone Samsung"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="preco"
                      className="block text-sm font-medium mb-2"
                    >
                      Preço *
                    </label>
                    <Input
                      id="preco"
                      type="number"
                      step="0.01"
                      value={formData.preco}
                      onChange={(e) =>
                        setFormData({ ...formData, preco: e.target.value })
                      }
                      placeholder="0,00"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="categoria"
                      className="block text-sm font-medium mb-2"
                    >
                      Categoria
                    </label>
                    <Input
                      id="categoria"
                      value={formData.categoria}
                      onChange={(e) =>
                        setFormData({ ...formData, categoria: e.target.value })
                      }
                      placeholder="Ex: Eletrônicos"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="ativo"
                      className="block text-sm font-medium mb-2"
                    >
                      Status
                    </label>
                    <select
                      id="ativo"
                      value={formData.ativo ? "true" : "false"}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          ativo: e.target.value === "true",
                        })
                      }
                      className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                    >
                      <option value="true">Ativo</option>
                      <option value="false">Inativo</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="descricao"
                    className="block text-sm font-medium mb-2"
                  >
                    Descrição
                  </label>
                  <textarea
                    id="descricao"
                    value={formData.descricao}
                    onChange={(e) =>
                      setFormData({ ...formData, descricao: e.target.value })
                    }
                    placeholder="Descrição detalhada do produto..."
                    rows={3}
                    className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm resize-none"
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit">
                    {editingProduct ? "Atualizar" : "Criar"} Produto
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Busca */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar produtos por nome ou categoria..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Lista de Produtos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProdutos.length > 0 ? (
            filteredProdutos.map((produto) => (
              <Card
                key={produto.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Package className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {produto.nome}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          {produto.categoria && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                              <Tag className="h-3 w-3" />
                              {produto.categoria}
                            </span>
                          )}
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                              produto.ativo
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {produto.ativo ? "Ativo" : "Inativo"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {produto.descricao && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {produto.descricao}
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-lg font-semibold text-green-600">
                      <DollarSign className="h-4 w-4" />
                      {formatCurrency(produto.preco)}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(produto)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(produto.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {produto._count && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-xs text-gray-500">
                        {produto._count.vendas} vendas realizadas
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {searchTerm
                        ? "Nenhum produto encontrado"
                        : "Nenhum produto cadastrado"}
                    </h3>
                    <p className="text-gray-500 mb-4">
                      {searchTerm
                        ? "Tente ajustar os termos da busca"
                        : "Comece adicionando seu primeiro produto"}
                    </p>
                    {!searchTerm && (
                      <Button onClick={() => setShowForm(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar Produto
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Produtos;
