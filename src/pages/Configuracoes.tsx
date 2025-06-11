import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import Layout from '../components/Layout';
import { 
  User, 
  Bell, 
  Shield,
  Database,
  Palette,
  Save,
  Download,
  Upload
} from 'lucide-react';

const Configuracoes: React.FC = () => {
  const [userData, setUserData] = useState({
    nome: 'Maria Silva',
    email: 'maria@mei.com',
    telefone: '',
    endereco: ''
  });

  const [notifications, setNotifications] = useState({
    emailVendas: true,
    emailRelatorios: false,
    pushVendas: true
  });

  const handleSaveProfile = () => {
    console.log('Salvando perfil:', userData);
    // Implementar salvamento
  };

  const handleSaveNotifications = () => {
    console.log('Salvando notificações:', notifications);
    // Implementar salvamento
  };

  const handleExportData = () => {
    console.log('Exportando dados...');
    // Implementar exportação
  };

  const handleImportData = () => {
    console.log('Importando dados...');
    // Implementar importação
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Configurações
          </h1>
          <p className="text-gray-600">
            Gerencie suas preferências e configurações do sistema
          </p>
        </div>

        <div className="space-y-6">
          {/* Perfil do Usuário */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle>Perfil do Usuário</CardTitle>
                  <CardDescription>
                    Atualize suas informações pessoais
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="nome" className="block text-sm font-medium mb-2">
                    Nome Completo
                  </label>
                  <Input
                    id="nome"
                    value={userData.nome}
                    onChange={(e) => setUserData({ ...userData, nome: e.target.value })}
                    placeholder="Seu nome completo"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    placeholder="seu@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="telefone" className="block text-sm font-medium mb-2">
                    Telefone
                  </label>
                  <Input
                    id="telefone"
                    value={userData.telefone}
                    onChange={(e) => setUserData({ ...userData, telefone: e.target.value })}
                    placeholder="(11) 99999-9999"
                  />
                </div>
                <div>
                  <label htmlFor="endereco" className="block text-sm font-medium mb-2">
                    Endereço
                  </label>
                  <Input
                    id="endereco"
                    value={userData.endereco}
                    onChange={(e) => setUserData({ ...userData, endereco: e.target.value })}
                    placeholder="Seu endereço"
                  />
                </div>
              </div>
              <div className="mt-6">
                <Button onClick={handleSaveProfile}>
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Perfil
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Notificações */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
                  <Bell className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle>Notificações</CardTitle>
                  <CardDescription>
                    Configure como você quer receber notificações
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email sobre vendas</h4>
                    <p className="text-sm text-gray-500">Receba um email a cada nova venda registrada</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.emailVendas}
                    onChange={(e) => setNotifications({ ...notifications, emailVendas: e.target.checked })}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email de relatórios</h4>
                    <p className="text-sm text-gray-500">Receba relatórios mensais por email</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.emailRelatorios}
                    onChange={(e) => setNotifications({ ...notifications, emailRelatorios: e.target.checked })}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Notificações push</h4>
                    <p className="text-sm text-gray-500">Receba notificações no navegador</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.pushVendas}
                    onChange={(e) => setNotifications({ ...notifications, pushVendas: e.target.checked })}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                </div>
              </div>
              <div className="mt-6">
                <Button onClick={handleSaveNotifications}>
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Notificações
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Segurança */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle>Segurança</CardTitle>
                  <CardDescription>
                    Gerencie a segurança da sua conta
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Alterar Senha</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      type="password"
                      placeholder="Senha atual"
                    />
                    <Input
                      type="password"
                      placeholder="Nova senha"
                    />
                  </div>
                  <Button className="mt-4" variant="outline">
                    Alterar Senha
                  </Button>
                </div>
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Sessões Ativas</h4>
                  <p className="text-sm text-gray-500 mb-4">
                    Você está logado em 1 dispositivo
                  </p>
                  <Button variant="outline" className="text-red-600 hover:text-red-700">
                    Encerrar Todas as Sessões
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dados e Backup */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                  <Database className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle>Dados e Backup</CardTitle>
                  <CardDescription>
                    Gerencie seus dados e faça backups
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium mb-2">Exportar Dados</h4>
                  <p className="text-sm text-gray-500 mb-4">
                    Baixe todos os seus dados em formato JSON
                  </p>
                  <Button variant="outline" onClick={handleExportData}>
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                  </Button>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium mb-2">Importar Dados</h4>
                  <p className="text-sm text-gray-500 mb-4">
                    Restaure dados de um backup anterior
                  </p>
                  <Button variant="outline" onClick={handleImportData}>
                    <Upload className="h-4 w-4 mr-2" />
                    Importar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Aparência */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                  <Palette className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle>Aparência</CardTitle>
                  <CardDescription>
                    Personalize a aparência do sistema
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Tema</h4>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="theme" value="light" defaultChecked />
                      <span className="text-sm">Claro</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="theme" value="dark" />
                      <span className="text-sm">Escuro</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="theme" value="auto" />
                      <span className="text-sm">Automático</span>
                    </label>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Densidade</h4>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="density" value="comfortable" defaultChecked />
                      <span className="text-sm">Confortável</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="density" value="compact" />
                      <span className="text-sm">Compacto</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Preferências
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Configuracoes; 