import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  BarChart3, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  User
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
      description: 'Visão geral das vendas'
    },
    {
      name: 'Produtos',
      href: '/produtos',
      icon: Package,
      description: 'Gerenciar produtos'
    },
    {
      name: 'Vendas',
      href: '/vendas',
      icon: ShoppingCart,
      description: 'Registrar e visualizar vendas'
    },
    {
      name: 'Relatórios',
      href: '/relatorios',
      icon: BarChart3,
      description: 'Análises e relatórios'
    },
    {
      name: 'Configurações',
      href: '/configuracoes',
      icon: Settings,
      description: 'Configurações do sistema'
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const getUserName = () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.nome || 'Usuário';
      }
    } catch (error) {
      console.error('Erro ao decodificar token:', error);
    }
    return 'Usuário';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar para desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4 shadow-sm">
          <div className="flex h-16 shrink-0 items-center">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <LayoutDashboard className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  Gestão MEI
                </h1>
                <p className="text-xs text-gray-500">Sistema de Vendas</p>
              </div>
            </div>
          </div>
          
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {menuItems.map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          className={`
                            group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-medium transition-colors
                            ${isActive
                              ? 'bg-primary text-primary-foreground shadow-sm'
                              : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                            }
                          `}
                        >
                          <item.icon
                            className={`h-5 w-5 shrink-0 ${
                              isActive ? 'text-primary-foreground' : 'text-gray-400 group-hover:text-primary'
                            }`}
                          />
                          <div className="flex flex-col">
                            <span>{item.name}</span>
                            <span className={`text-xs ${
                              isActive ? 'text-primary-foreground/80' : 'text-gray-500'
                            }`}>
                              {item.description}
                            </span>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
              
              <li className="mt-auto">
                <div className="flex items-center gap-x-4 px-3 py-3 text-sm font-medium leading-6 text-gray-900 border-t border-gray-200">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                    <User className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{getUserName()}</p>
                    <p className="text-xs text-gray-500">Microempreendedor</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="text-gray-500 hover:text-red-600"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Sidebar mobile */}
      {sidebarOpen && (
        <div className="relative z-50 lg:hidden">
          <div className="fixed inset-0 bg-gray-900/80" onClick={() => setSidebarOpen(false)} />
          <div className="fixed inset-0 flex">
            <div className="relative mr-16 flex w-full max-w-xs flex-1">
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                <button
                  type="button"
                  className="-m-2.5 p-2.5"
                  onClick={() => setSidebarOpen(false)}
                >
                  <X className="h-6 w-6 text-white" />
                </button>
              </div>
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                <div className="flex h-16 shrink-0 items-center">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <LayoutDashboard className="h-6 w-6" />
                    </div>
                    <div>
                      <h1 className="text-lg font-semibold text-gray-900">
                        Gestão MEI
                      </h1>
                      <p className="text-xs text-gray-500">Sistema de Vendas</p>
                    </div>
                  </div>
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {menuItems.map((item) => {
                          const isActive = location.pathname === item.href;
                          return (
                            <li key={item.name}>
                              <Link
                                to={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className={`
                                  group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-medium transition-colors
                                  ${isActive
                                    ? 'bg-primary text-primary-foreground shadow-sm'
                                    : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                                  }
                                `}
                              >
                                <item.icon
                                  className={`h-5 w-5 shrink-0 ${
                                    isActive ? 'text-primary-foreground' : 'text-gray-400 group-hover:text-primary'
                                  }`}
                                />
                                <div className="flex flex-col">
                                  <span>{item.name}</span>
                                  <span className={`text-xs ${
                                    isActive ? 'text-primary-foreground/80' : 'text-gray-500'
                                  }`}>
                                    {item.description}
                                  </span>
                                </div>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header mobile */}
      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>
        <div className="flex-1 text-sm font-semibold leading-6 text-gray-900">
          Gestão de Vendas MEI
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="text-gray-500 hover:text-red-600"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>

      {/* Conteúdo principal */}
      <main className="lg:pl-72">
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout; 