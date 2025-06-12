import axios from 'axios';

const API_BASE_URL = 'https://vendas-api-production.up.railway.app/api';

// Configuração do axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token de autenticação
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      if(config.headers)
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar respostas
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Tipos baseados na estrutura real da API
export interface User {
  id: number;
  nome: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Produto {
  id: number;
  nome: string;
  descricao?: string;
  preco: string; // A API retorna como string
  categoria?: string;
  ativo: boolean;
  usuarioId: number;
  createdAt: string;
  updatedAt: string;
  _count?: {
    vendas: number;
  };
}

export interface Venda {
  id: number;
  produtoId: number;
  quantidade: number;
  valorUnit: string; // A API retorna como string
  valorTotal: string; // A API retorna como string
  dataVenda: string;
  observacoes?: string;
  usuarioId: number;
  createdAt: string;
  updatedAt: string;
  produto: {
    id: number;
    nome: string;
    categoria?: string;
  };
}

export interface Dashboard {
  resumoMensal: {
    totalVendas: number;
    quantidadeVendas: number;
    ticketMedio: number;
  };
  resumoAnual: {
    totalVendas: number;
    quantidadeVendas: number;
    ticketMedio: number;
  };
  produtosMaisVendidos: Array<{
    produto: {
      nome: string;
      categoria?: string;
    };
    quantidadeVendida: number;
    valorTotal: string;
  }>;
  vendasPorCategoria: Record<string, {
    quantidade: number;
    valor: number;
  }>;
  vendasPorDia: Record<string, number>;
}

// Tipos para paginação
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Serviços de autenticação
export const authService = {
  async login(email: string, senha: string) {
    const response = await api.post('/auth/login', { email, senha });
    return response.data;
  },

  async register(nome: string, email: string, senha: string) {
    const response = await api.post('/auth/register', { nome, email, senha });
    return response.data;
  },
};

// Serviços de produtos
export const produtoService = {
  async listar(page = 1, limit = 10, categoria?: string): Promise<PaginatedResponse<Produto>> {
    const params = new URLSearchParams({ 
      page: page.toString(), 
      limit: limit.toString() 
    });
    if (categoria) params.append('categoria', categoria);
    
    const response = await api.get(`/produtos?${params}`);
    return response.data as PaginatedResponse<Produto>;
  },

  async criar(produto: {
    nome: string;
    descricao?: string;
    preco: number;
    categoria?: string;
    ativo?: boolean;
  }): Promise<Produto> {
    const response = await api.post('/produtos', produto);
    return response.data as Produto;
  },

  async atualizar(id: number, produto: Partial<{
    nome: string;
    descricao?: string;
    preco: number;
    categoria?: string;
    ativo?: boolean;
  }>): Promise<Produto> {
    const response = await api.patch(`/produtos/${id}`, produto);
    return response.data as Produto;
  },

  async deletar(id: number): Promise<void> {
    await api.delete(`/produtos/${id}`);
  },

  async obterPorId(id: number): Promise<Produto> {
    const response = await api.get(`/produtos/${id}`);
    return response.data as Produto;
  },

  async obterMaisVendidos(limit = 10): Promise<Produto[]> {
    const response = await api.get(`/produtos/mais-vendidos?limit=${limit}`);
    return response.data as Produto[];
  },

  async obterPorCategoria(categoria: string): Promise<Produto[]> {
    const response = await api.get(`/produtos/categoria/${categoria}`);
    return response.data as Produto[];
  },
};

// Serviços de vendas
export const vendaService = {
  async listar(
    page = 1, 
    limit = 10, 
    dataInicio?: string, 
    dataFim?: string
  ): Promise<PaginatedResponse<Venda>> {
    const params = new URLSearchParams({ 
      page: page.toString(), 
      limit: limit.toString() 
    });
    if (dataInicio) params.append('dataInicio', dataInicio);
    if (dataFim) params.append('dataFim', dataFim);
    
    const response = await api.get(`/vendas?${params}`);
    return response.data as PaginatedResponse<Venda>;
  },

  async criar(venda: {
    produtoId: number;
    quantidade: number;
    dataVenda: string;
    observacoes?: string;
  }): Promise<Venda> {
    const response = await api.post('/vendas', venda);
    return response.data as Venda;
  },

  async atualizar(id: number, venda: Partial<{
    produtoId: number;
    quantidade: number;
    dataVenda: string;
    observacoes?: string;
  }>): Promise<Venda> {
    const response = await api.patch(`/vendas/${id}`, venda);
    return response.data as Venda;
  },

  async deletar(id: number): Promise<void> {
    await api.delete(`/vendas/${id}`);
  },

  async obterPorId(id: number): Promise<Venda> {
    const response = await api.get(`/vendas/${id}`);
    return response.data as Venda;
  },

  async obterPorPeriodo(dataInicio: string, dataFim: string): Promise<Venda[]> {
    const response = await api.get(`/vendas/periodo?dataInicio=${dataInicio}&dataFim=${dataFim}`);
    return response.data as Venda[];
  },

  async obterResumoMensal(mes: number, ano: number): Promise<any> {
    const response = await api.get(`/vendas/resumo-mensal?mes=${mes}&ano=${ano}`);
    return response.data;
  },
};

// Serviços de relatórios
export const relatorioService = {
  async dashboard(): Promise<Dashboard> {
    const response = await api.get('/relatorios/dashboard');
    return response.data as Dashboard;
  },

  async comparativoMensal(ano: number): Promise<any> {
    const response = await api.get(`/relatorios/comparativo-mensal?ano=${ano}`);
    return response.data;
  },

  async detalhado(mes: number, ano: number): Promise<any> {
    const response = await api.get(`/relatorios/detalhado?mes=${mes}&ano=${ano}`);
    return response.data;
  },

  async exportar(formato: 'json' | 'csv', mes?: number, ano?: number): Promise<Blob> {
    const params = new URLSearchParams({ formato });
    if (mes) params.append('mes', mes.toString());
    if (ano) params.append('ano', ano.toString());
    
    const response = await api.get(`/relatorios/exportar?${params}`, {
      responseType: 'blob'
    });
    return response.data as Blob;
  },
};

export default api; 