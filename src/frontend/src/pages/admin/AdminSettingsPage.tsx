import React from 'react';
import { Bell, Database, Palette } from 'lucide-react';

export default function AdminSettingsPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Configure application settings</p>
      </div>

      <div className="space-y-4">
        <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="h-6 w-6 text-primary" />
            <h3 className="font-semibold text-lg">Notifications</h3>
          </div>
          <div className="space-y-3">
            <label className="flex items-center justify-between">
              <span className="text-sm">Email Notifications</span>
              <input type="checkbox" className="h-4 w-4" defaultChecked />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-sm">Weather Alerts</span>
              <input type="checkbox" className="h-4 w-4" defaultChecked />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-sm">Task Reminders</span>
              <input type="checkbox" className="h-4 w-4" defaultChecked />
            </label>
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
          <div className="flex items-center gap-3 mb-4">
            <Database className="h-6 w-6 text-primary" />
            <h3 className="font-semibold text-lg">Data Management</h3>
          </div>
          <div className="space-y-3">
            <button className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
              Refresh Data
            </button>
            <button className="w-full py-2 px-4 bg-muted text-foreground rounded-lg text-sm font-medium hover:bg-muted/80 transition-colors">
              Export Reports
            </button>
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
          <div className="flex items-center gap-3 mb-4">
            <Palette className="h-6 w-6 text-primary" />
            <h3 className="font-semibold text-lg">Appearance</h3>
          </div>
          <p className="text-sm text-muted-foreground">Theme settings (Light/Dark mode) are managed by your system preferences.</p>
        </div>
      </div>
    </div>
  );
}
