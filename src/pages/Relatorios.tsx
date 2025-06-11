import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import Layout from '../components/Layout';
import { 
  BarChart3, 
  Download, 
  Calendar,
  TrendingUp,
  PieChart,
  FileText
} from 'lucide-react';

const Relatorios: React.FC = () => {
  const handleExport = (tipo: string) => {
    // Implementar exportação
    console.log(`Exportando relatório: ${tipo}`);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Relatórios
          </h1>
          <p className="text-gray-600">
            Análises detalhadas e exportação de dados
          </p>
        </div>

        {/* Grid de Relatórios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-lg">Vendas por Período</CardTitle>
                  <CardDescription>
                    Análise temporal das vendas
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Visualize o desempenho das vendas por dia, semana, mês ou ano.
              </p>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => handleExport('vendas-periodo')}
              >
                <Download className="h-4 w-4 mr-2" />
                Gerar Relatório
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
                  <PieChart className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-lg">Produtos Mais Vendidos</CardTitle>
                  <CardDescription>
                    Ranking de produtos
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Identifique quais produtos têm melhor performance de vendas.
              </p>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => handleExport('produtos-ranking')}
              >
                <Download className="h-4 w-4 mr-2" />
                Gerar Relatório
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-lg">Análise de Crescimento</CardTitle>
                  <CardDescription>
                    Tendências e projeções
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Acompanhe o crescimento do seu negócio ao longo do tempo.
              </p>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => handleExport('analise-crescimento')}
              >
                <Download className="h-4 w-4 mr-2" />
                Gerar Relatório
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-lg">Relatório Mensal</CardTitle>
                  <CardDescription>
                    Resumo completo do mês
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Relatório completo com todas as métricas do mês selecionado.
              </p>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => handleExport('relatorio-mensal')}
              >
                <Download className="h-4 w-4 mr-2" />
                Gerar Relatório
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-lg">Relatório Fiscal</CardTitle>
                  <CardDescription>
                    Para declaração MEI
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Dados organizados para facilitar sua declaração anual MEI.
              </p>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => handleExport('relatorio-fiscal')}
              >
                <Download className="h-4 w-4 mr-2" />
                Gerar Relatório
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                  <Download className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-lg">Exportação Personalizada</CardTitle>
                  <CardDescription>
                    Configure seus relatórios
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Crie relatórios personalizados com os dados que você precisa.
              </p>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => handleExport('personalizado')}
              >
                <Download className="h-4 w-4 mr-2" />
                Configurar
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Informações Adicionais */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Informações sobre Relatórios</CardTitle>
            <CardDescription>
              Dicas para aproveitar melhor os relatórios
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Formatos Disponíveis</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• PDF - Para impressão e apresentações</li>
                  <li>• Excel - Para análises detalhadas</li>
                  <li>• CSV - Para importação em outros sistemas</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Dicas de Uso</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Gere relatórios mensalmente para acompanhar o crescimento</li>
                  <li>• Use o relatório fiscal para facilitar sua declaração MEI</li>
                  <li>• Analise os produtos mais vendidos para otimizar seu estoque</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Relatorios; 