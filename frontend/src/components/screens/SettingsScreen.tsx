import { useState } from 'react';
import { Save, Bell, Globe, Shield, User, Palette, Database, Zap } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Separator } from '../ui/separator';
import { toast } from 'sonner';

export function SettingsScreen() {
  const [settings, setSettings] = useState({
    // General
    dashboardName: 'Real-Time Analytics Dashboard',
    timezone: 'UTC',
    dateFormat: 'MM/DD/YYYY',
    language: 'en',
    
    // Notifications
    emailNotifications: true,
    pushNotifications: false,
    alertThreshold: 'medium',
    digestFrequency: 'daily',
    
    // Display
    theme: 'light',
    chartAnimation: true,
    compactMode: false,
    refreshRate: 2000,
    
    // Data
    dataRetention: 30,
    autoBackup: true,
    exportFormat: 'json',
  });

  const handleSave = () => {
    toast.success('Settings saved successfully!');
  };

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your dashboard preferences and configurations</p>
        </div>
        <Button onClick={handleSave} className="gap-2">
          <Save className="w-4 h-4" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general" className="gap-2">
            <Globe className="w-4 h-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="w-4 h-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="display" className="gap-2">
            <Palette className="w-4 h-4" />
            Display
          </TabsTrigger>
          <TabsTrigger value="data" className="gap-2">
            <Database className="w-4 h-4" />
            Data
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="w-4 h-4" />
            Security
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-gray-900 mb-4">General Settings</h3>
                <p className="text-gray-600 text-sm mb-6">Configure basic dashboard settings and preferences</p>
              </div>

              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="dashboardName">Dashboard Name</Label>
                  <Input
                    id="dashboardName"
                    value={settings.dashboardName}
                    onChange={(e) => updateSetting('dashboardName', e.target.value)}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={settings.timezone} onValueChange={(value: string) => updateSetting('timezone', value)}>
                    <SelectTrigger id="timezone">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="America/New_York">Eastern Time</SelectItem>
                      <SelectItem value="America/Chicago">Central Time</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                      <SelectItem value="Europe/London">London</SelectItem>
                      <SelectItem value="Europe/Paris">Paris</SelectItem>
                      <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="dateFormat">Date Format</Label>
                  <Select value={settings.dateFormat} onValueChange={(value: string) => updateSetting('dateFormat', value)}>
                    <SelectTrigger id="dateFormat">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="language">Language</Label>
                  <Select value={settings.language} onValueChange={(value: string) => updateSetting('language', value)}>
                    <SelectTrigger id="language">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="ja">Japanese</SelectItem>
                      <SelectItem value="zh">Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-gray-900 mb-4">Notification Preferences</h3>
                <p className="text-gray-600 text-sm mb-6">Manage how and when you receive notifications</p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-gray-600">Receive alerts and updates via email</p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked: boolean) => updateSetting('emailNotifications', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-gray-600">Receive browser push notifications</p>
                  </div>
                  <Switch
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked: boolean) => updateSetting('pushNotifications', checked)}
                  />
                </div>

                <Separator />

                <div className="grid gap-2">
                  <Label htmlFor="alertThreshold">Alert Threshold</Label>
                  <Select value={settings.alertThreshold} onValueChange={(value: string) => updateSetting('alertThreshold', value)}>
                    <SelectTrigger id="alertThreshold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low - All alerts</SelectItem>
                      <SelectItem value="medium">Medium - Important alerts only</SelectItem>
                      <SelectItem value="high">High - Critical alerts only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="digestFrequency">Digest Email Frequency</Label>
                  <Select value={settings.digestFrequency} onValueChange={(value: string) => updateSetting('digestFrequency', value)}>
                    <SelectTrigger id="digestFrequency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">Real-time</SelectItem>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Display Settings */}
        <TabsContent value="display">
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-gray-900 mb-4">Display Preferences</h3>
                <p className="text-gray-600 text-sm mb-6">Customize the look and feel of your dashboard</p>
              </div>

              <div className="space-y-6">
                <div className="grid gap-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select value={settings.theme} onValueChange={(value: string) => updateSetting('theme', value)}>
                    <SelectTrigger id="theme">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="auto">Auto (System)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Chart Animations</Label>
                    <p className="text-sm text-gray-600">Enable smooth animations for charts</p>
                  </div>
                  <Switch
                    checked={settings.chartAnimation}
                    onCheckedChange={(checked: boolean) => updateSetting('chartAnimation', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Compact Mode</Label>
                    <p className="text-sm text-gray-600">Reduce spacing and use compact layout</p>
                  </div>
                  <Switch
                    checked={settings.compactMode}
                    onCheckedChange={(checked: boolean) => updateSetting('compactMode', checked)}
                  />
                </div>

                <Separator />

                <div className="grid gap-2">
                  <Label htmlFor="refreshRate">Data Refresh Rate (ms)</Label>
                  <Select 
                    value={settings.refreshRate.toString()} 
                    onValueChange={(value: string) => updateSetting('refreshRate', parseInt(value))}
                  >
                    <SelectTrigger id="refreshRate">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1000">1 second</SelectItem>
                      <SelectItem value="2000">2 seconds</SelectItem>
                      <SelectItem value="5000">5 seconds</SelectItem>
                      <SelectItem value="10000">10 seconds</SelectItem>
                      <SelectItem value="30000">30 seconds</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Data Settings */}
        <TabsContent value="data">
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-gray-900 mb-4">Data Management</h3>
                <p className="text-gray-600 text-sm mb-6">Configure data storage and export options</p>
              </div>

              <div className="space-y-6">
                <div className="grid gap-2">
                  <Label htmlFor="dataRetention">Data Retention (days)</Label>
                  <Select 
                    value={settings.dataRetention.toString()} 
                    onValueChange={(value: string) => updateSetting('dataRetention', parseInt(value))}
                  >
                    <SelectTrigger id="dataRetention">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 days</SelectItem>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                      <SelectItem value="180">180 days</SelectItem>
                      <SelectItem value="365">1 year</SelectItem>
                      <SelectItem value="-1">Forever</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Automatic Backups</Label>
                    <p className="text-sm text-gray-600">Enable daily automated data backups</p>
                  </div>
                  <Switch
                    checked={settings.autoBackup}
                    onCheckedChange={(checked: boolean) => updateSetting('autoBackup', checked)}
                  />
                </div>

                <Separator />

                <div className="grid gap-2">
                  <Label htmlFor="exportFormat">Default Export Format</Label>
                  <Select value={settings.exportFormat} onValueChange={(value: string) => updateSetting('exportFormat', value)}>
                    <SelectTrigger id="exportFormat">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="json">JSON</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="excel">Excel (XLSX)</SelectItem>
                      <SelectItem value="pdf">PDF</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="flex gap-3">
                  <Button variant="outline" className="gap-2">
                    <Database className="w-4 h-4" />
                    Export All Data
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Zap className="w-4 h-4" />
                    Clear Cache
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-gray-900 mb-4">Security Settings</h3>
                <p className="text-gray-600 text-sm mb-6">Manage security and privacy preferences</p>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="text-gray-900 mb-1">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Add an extra layer of security to your account
                      </p>
                      <Button size="sm">Enable 2FA</Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="text-gray-900">API Keys</h4>
                  <p className="text-sm text-gray-600">Manage API keys for external integrations</p>
                  <Button variant="outline" className="gap-2">
                    <Zap className="w-4 h-4" />
                    Generate New API Key
                  </Button>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="text-gray-900">Active Sessions</h4>
                  <p className="text-sm text-gray-600">Manage your active login sessions</p>
                  <div className="space-y-2">
                    <div className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                      <div>
                        <p className="text-gray-900 text-sm">Current Session</p>
                        <p className="text-xs text-gray-600">Chrome on Windows • Last active: Now</p>
                      </div>
                      <Badge variant="secondary">Active</Badge>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="text-gray-900">Change Password</h4>
                  <div className="space-y-3">
                    <Input type="password" placeholder="Current password" />
                    <Input type="password" placeholder="New password" />
                    <Input type="password" placeholder="Confirm new password" />
                    <Button variant="outline">Update Password</Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Badge({ children, variant = 'default' }: { children: React.ReactNode; variant?: 'default' | 'secondary' }) {
  const variants = {
    default: 'bg-blue-100 text-blue-700',
    secondary: 'bg-gray-100 text-gray-700',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs ${variants[variant]}`}>
      {children}
    </span>
  );
}
