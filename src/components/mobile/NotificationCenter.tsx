import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Heart, Calendar, BookOpen, X } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'gentle' | 'reminder' | 'content' | 'milestone';
  time: string;
  read: boolean;
}

const sampleNotifications: Notification[] = [
  {
    id: '1',
    title: 'Gentle Reminder',
    message: 'Time for your evening reflection. How did you and baby feel today?',
    type: 'gentle',
    time: '2 hours ago',
    read: false
  },
  {
    id: '2',
    title: 'New Content Available',
    message: 'A new article about baby sleep patterns is ready for you.',
    type: 'content',
    time: '1 day ago',
    read: false
  },
  {
    id: '3',
    title: 'Weekly Check-in',
    message: 'Your week 12 check-in is ready. Reflect on your growth.',
    type: 'reminder',
    time: '2 days ago',
    read: true
  },
  {
    id: '4',
    title: 'Milestone Celebration',
    message: 'Congratulations! You\'ve been nurturing for 3 months. 🌸',
    type: 'milestone',
    time: '3 days ago',
    read: true
  }
];

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState(sampleNotifications);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'gentle': return <Heart className="w-4 h-4" />;
      case 'reminder': return <Bell className="w-4 h-4" />;
      case 'content': return <BookOpen className="w-4 h-4" />;
      case 'milestone': return <Calendar className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'gentle': return 'bg-primary/20 text-primary border-primary/20';
      case 'reminder': return 'bg-sage/20 text-sage border-sage/20';
      case 'content': return 'bg-terracotta/20 text-terracotta border-terracotta/20';
      case 'milestone': return 'bg-secondary/20 text-secondary border-secondary/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-playfair text-2xl font-semibold">Gentle Nudges</h2>
          <p className="text-muted-foreground text-sm">
            Nurturing reminders just for you
          </p>
        </div>
        {unreadCount > 0 && (
          <Badge className="bg-primary/20 text-primary">
            {unreadCount} new
          </Badge>
        )}
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <Card 
            key={notification.id} 
            className={`border-none shadow-gentle transition-all duration-300 ${
              !notification.read ? 'bg-card' : 'bg-muted/30'
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className={`p-2 rounded-full ${getTypeColor(notification.type)}`}>
                    {getTypeIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className={`font-medium text-sm ${
                        !notification.read ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      )}
                    </div>
                    
                    <p className={`text-sm leading-relaxed ${
                      !notification.read ? 'text-foreground/80' : 'text-muted-foreground'
                    }`}>
                      {notification.message}
                    </p>
                    
                    <p className="text-xs text-muted-foreground mt-2">
                      {notification.time}
                    </p>
                    
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => markAsRead(notification.id)}
                        className="mt-2 h-6 text-xs"
                      >
                        Mark as read
                      </Button>
                    )}
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteNotification(notification.id)}
                  className="ml-2 h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {notifications.length === 0 && (
        <Card className="border-none shadow-gentle">
          <CardContent className="p-8 text-center">
            <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-playfair text-lg font-medium mb-2">All caught up</h3>
            <p className="text-muted-foreground text-sm">
              No new gentle nudges right now. You're doing wonderfully.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NotificationCenter;