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
      ? 'bg-terracotta/10 text-terracotta font-medium border-r-2 border-terracotta' 
      : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground';

  return (
    <Sidebar
      className={`border-r border-border/50 bg-sidebar-background ${
        collapsed ? 'w-16' : 'w-64'
      }`}
      collapsible="icon"
    >
      {/* Header com logo */}
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-terracotta/20 rounded-full flex items-center justify-center">
            <Heart className="w-4 h-4 text-terracotta" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="font-playfair text-lg font-semibold text-foreground">
                MomWise
              </h2>
              <p className="text-xs text-muted-foreground">
                Sua jornada maternal
              </p>
            </div>
          )}
        </div>
      </div>

      <SidebarContent className="py-4">
        {/* Menu Principal */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-2 text-muted-foreground text-xs uppercase tracking-wide">
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
                          <div className="font-medium">{item.title}</div>
                          <div className="text-xs text-muted-foreground">
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

        {/* Ações Rápidas */}
        {!collapsed && (
          <SidebarGroup>
            <SidebarGroupLabel className="px-4 py-2 text-muted-foreground text-xs uppercase tracking-wide">
              Acesso Rápido
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {quickActions.map((action) => (
                  <SidebarMenuItem key={action.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={action.url}
                        className={`flex items-center space-x-3 px-4 py-2 rounded-lg mx-2 transition-all duration-200 hover:bg-muted/50 text-muted-foreground hover:text-foreground`}
                      >
                        <action.icon className={`w-4 h-4 ${action.color}`} />
                        <span className="text-sm">{action.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Saudação no bottom quando expandido */}
        {!collapsed && (
          <div className="mt-auto p-4 border-t border-border/50">
            <div className="bg-terracotta/10 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Baby className="w-4 h-4 text-terracotta" />
                <span className="text-xs text-terracotta font-medium">
                  Seu bebê hoje
                </span>
              </div>
              <p className="text-sm text-foreground">
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