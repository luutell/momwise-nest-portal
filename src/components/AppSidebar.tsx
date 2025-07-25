import { Heart, Home, BookOpen, Users, MessageCircle, User, Baby, Calendar } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';

const menuItems = [
  { 
    title: 'Home', 
    url: '/app', 
    icon: Home,
    description: 'Página inicial'
  },
  { 
    title: 'Biblioteca', 
    url: '/app/biblioteca', 
    icon: BookOpen,
    description: 'Conteúdos organizados'
  },
  { 
    title: 'Entre Mães', 
    url: '/app/entre-maes', 
    icon: Heart,
    description: 'Comunidade'
  },
  { 
    title: 'Chat', 
    url: '/app/chat', 
    icon: MessageCircle,
    description: 'Especialistas'
  },
  { 
    title: 'Perfil', 
    url: '/app/profile', 
    icon: User,
    description: 'Suas informações'
  },
];

const categories = [
  {
    title: '🔄 Ritmo Leve',
    description: 'rotina, sono e regressões',
    url: '/app/ritmo-leve',
    icon: Calendar,
    color: 'text-terracotta'
  },
  {
    title: '🧠 Entendendo o Bebê',
    description: 'choro, marcos e mitos',
    url: '/app/entendendo-o-bebe',
    icon: Baby,
    color: 'text-sage'
  },
  {
    title: '🍽 Primeiras Mordidas',
    description: 'alimentação',
    url: '/app/primeiras-mordidas',
    icon: BookOpen,
    color: 'text-terracotta'
  },
  {
    title: '💪 No seu Tempo',
    description: 'atividades de estímulo',
    url: '/app/no-seu-tempo',
    icon: Users,
    color: 'text-sage'
  },
  {
    title: '🤱 Juntas no Começo',
    description: 'amamentação e pós-parto',
    url: '/app/juntas-no-comeco',
    icon: Heart,
    color: 'text-terracotta'
  },
  {
    title: '🛀 Mãe Inteira',
    description: 'autocuidado e saúde emocional',
    url: '/app/mae-inteira',
    icon: User,
    color: 'text-sage'
  },
  {
    title: '🤝 Entre Mães',
    description: 'comunidade e trocas reais',
    url: '/app/entre-maes-categoria',
    icon: MessageCircle,
    color: 'text-terracotta'
  },
  {
    title: '🚼 Higiene Natural',
    description: 'eliminação gentil e sinais do bebê',
    url: '/app/higiene-natural',
    icon: Home,
    color: 'text-sage'
  }
];

const quickActions = [
  {
    title: 'Amamentação',
    url: '/app/amamentacao',
    icon: Baby,
    color: 'text-terracotta'
  },
  {
    title: 'Calendário',
    url: '/app/calendario',
    icon: Calendar,
    color: 'text-sage'
  }
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === 'collapsed';

  const isActive = (path: string) => {
    if (path === '/app') {
      return currentPath === '/app' || currentPath === '/';
    }
    return currentPath.startsWith(path);
  };

  const getNavClasses = (isActive: boolean) =>
    isActive 
      ? 'bg-primary/10 text-primary font-medium border-r-2 border-primary' 
      : 'hover:bg-muted text-foreground hover:text-primary';

  return (
    <Sidebar
      className="border-r border-sidebar-border bg-sidebar"
      collapsible="offcanvas"
    >
      {/* Header com logo */}
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <Heart className="w-4 h-4 text-primary" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="font-playfair text-lg font-semibold text-sidebar-foreground">
                MomWise
              </h2>
              <p className="text-xs text-sidebar-foreground/70">
                Sua jornada maternal
              </p>
            </div>
          )}
        </div>
      </div>

      <SidebarContent className="py-4">
        {/* Menu Principal */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-2 text-sidebar-foreground/70 text-xs uppercase tracking-wide font-medium">
            {!collapsed ? 'Menu Principal' : ''}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg mx-2 transition-all duration-200 ${getNavClasses(
                        isActive(item.url)
                      )}`}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!collapsed && (
                        <div className="flex-1">
                          <div className="font-medium text-current">{item.title}</div>
                          <div className="text-xs text-sidebar-foreground/60">
                            {item.description}
                          </div>
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Categorias - sempre visível */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-2 text-sidebar-foreground text-xs uppercase tracking-wide font-medium">
            {!collapsed ? 'Categorias' : ''}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categories.map((category) => (
                <SidebarMenuItem key={category.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={category.url}
                      className={`flex items-center space-x-3 px-4 py-2 rounded-lg mx-2 transition-all duration-200 ${getNavClasses(
                        isActive(category.url)
                      )}`}
                    >
                      <category.icon className={`w-4 h-4 ${category.color} flex-shrink-0`} />
                      {!collapsed && (
                        <div className="flex-1">
                          <div className="text-sm font-medium text-current">{category.title}</div>
                          <div className="text-xs text-sidebar-foreground/60 mt-0.5">
                            {category.description}
                          </div>
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Saudação no bottom quando expandido */}
        {!collapsed && (
          <div className="mt-auto p-4 border-t border-border/50">
            <div className="bg-primary/10 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Baby className="w-4 h-4 text-primary" />
                <span className="text-xs text-primary font-medium">
                  Seu bebê hoje
                </span>
              </div>
              <p className="text-sm text-sidebar-foreground">
                20 dias de vida
              </p>
            </div>
          </div>
        )}
      </SidebarContent>

      {/* Trigger button no topo quando collapsed */}
      {collapsed && (
        <div className="absolute top-4 right-2">
          <SidebarTrigger className="w-8 h-8" />
        </div>
      )}
    </Sidebar>
  );
}