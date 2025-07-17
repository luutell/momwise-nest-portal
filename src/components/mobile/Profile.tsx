import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Settings, Bell, Heart, Calendar, BookOpen } from 'lucide-react';

const Profile = () => {
  return (
    <div className="p-4">
      {/* Profile Header */}
      <Card className="border-none shadow-gentle mb-6">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary/20 text-primary font-playfair text-lg">
                M
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="font-playfair text-xl font-semibold">Mama</h2>
              <p className="text-muted-foreground text-sm">12 weeks into your journey</p>
              <Badge className="mt-1 bg-sage/20 text-sage">New Mom</Badge>
            </div>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="font-semibold text-lg">12</p>
              <p className="text-xs text-muted-foreground">Weeks</p>
            </div>
            <div>
              <p className="font-semibold text-lg">85</p>
              <p className="text-xs text-muted-foreground">Days logged</p>
            </div>
            <div>
              <p className="font-semibold text-lg">24</p>
              <p className="text-xs text-muted-foreground">Articles read</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card className="border-none shadow-gentle bg-primary/5">
          <CardContent className="p-4 text-center">
            <Calendar className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="font-medium text-sm">Weekly Check-in</p>
            <p className="text-xs text-muted-foreground">Due tomorrow</p>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-gentle bg-sage/5">
          <CardContent className="p-4 text-center">
            <Heart className="w-6 h-6 text-sage mx-auto mb-2" />
            <p className="font-medium text-sm">Mood Tracker</p>
            <p className="text-xs text-muted-foreground">Log today</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border-none shadow-gentle mb-6">
        <CardHeader>
          <CardTitle className="font-playfair text-lg">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium">Completed sleep log</p>
              <p className="text-xs text-muted-foreground">2 hours ago</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-sage rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium">Read "Understanding Growth Spurts"</p>
              <p className="text-xs text-muted-foreground">Yesterday</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-terracotta rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium">Listened to breathing exercise</p>
              <p className="text-xs text-muted-foreground">2 days ago</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings & Support */}
      <div className="space-y-3">
        <Button variant="outline" className="w-full justify-start" size="lg">
          <Bell className="w-4 h-4 mr-3" />
          Notification Settings
        </Button>
        
        <Button variant="outline" className="w-full justify-start" size="lg">
          <BookOpen className="w-4 h-4 mr-3" />
          Saved Articles
        </Button>
        
        <Button variant="outline" className="w-full justify-start" size="lg">
          <Heart className="w-4 h-4 mr-3" />
          Support & Help
        </Button>
      </div>
    </div>
  );
};

export default Profile;