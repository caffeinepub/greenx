import React, { useState } from 'react';
import { useAuth } from '../../auth/AuthProvider';
import { useNavigate } from '@tanstack/react-router';
import { DEMO_FARMERS } from '../../data/demoFarmers';
import { getSimulatedWeather } from '../../weather/simulatedWeather';
import { get7DayForecast } from '../../weather/forecast';
import { getWeatherRecommendations } from '../../lib/weatherRecommendations';
import { generateSmartAlerts } from '../../lib/aiLikeHeuristics';
import { addInputLog, getInputLogs, markTaskComplete, isTaskCompleted, addPhoto, getPhotos, assignWorker, getWorkerAssignment } from '../../state/fieldManagerSessionStore';
import TopBar from '../../components/TopBar';
import AgriTechBanner from '../../components/AgriTechBanner';
import WeatherPanel from '../../components/weather/WeatherPanel';
import Forecast7Day from '../../components/weather/Forecast7Day';
import FieldManagerWeatherActions from '../../components/weather/FieldManagerWeatherActions';
import SmartAlerts from '../../components/insights/SmartAlerts';
import { Plus, Upload, UserPlus, CheckCircle } from 'lucide-react';

export default function FieldManagerDashboard() {
  const { session } = useAuth();
  const navigate = useNavigate();
  const [selectedFarmerId, setSelectedFarmerId] = useState('1');
  const [showInputForm, setShowInputForm] = useState(false);
  const [inputType, setInputType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('kg');

  if (!session || session.role !== 'fieldManager') {
    navigate({ to: '/access-denied' });
    return null;
  }

  const farmer = DEMO_FARMERS.find(f => f.id === selectedFarmerId) || DEMO_FARMERS[0];
  const weather = getSimulatedWeather(farmer.village);
  const forecast = get7DayForecast(farmer.village);
  const recommendations = getWeatherRecommendations(weather);
  const alerts = generateSmartAlerts(weather, farmer.soilData);
  const inputLogs = getInputLogs();
  const photos = getPhotos();

  const handleAddInput = (e: React.FormEvent) => {
    e.preventDefault();
    addInputLog({
      date: new Date().toISOString().split('T')[0],
      inputType,
      quantity: parseFloat(quantity),
      unit,
      location: farmer.village,
    });
    setInputType('');
    setQuantity('');
    setShowInputForm(false);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      addPhoto({
        url,
        timestamp: new Date().toISOString(),
        description: `Photo from ${farmer.village}`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBar />

      <div className="max-w-2xl mx-auto p-4 space-y-4">
        <AgriTechBanner />

        <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
          <label className="block text-xs font-medium text-muted-foreground mb-2">Select Land Block</label>
          <select
            value={selectedFarmerId}
            onChange={(e) => setSelectedFarmerId(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm"
          >
            {DEMO_FARMERS.map((f) => (
              <option key={f.id} value={f.id}>
                {f.village} - {f.cropName} ({f.totalLand} acres)
              </option>
            ))}
          </select>
        </div>

        <WeatherPanel weather={weather} />
        <Forecast7Day forecast={forecast} />
        <FieldManagerWeatherActions recommendations={recommendations} />
        <SmartAlerts alerts={alerts} />

        <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
          <h3 className="text-sm font-semibold text-foreground mb-3">Soil Data</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-muted-foreground">pH:</span>
              <span className="font-semibold ml-2">{farmer.soilData.ph}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Moisture:</span>
              <span className="font-semibold ml-2">{farmer.soilData.moisture}%</span>
            </div>
            <div>
              <span className="text-muted-foreground">N:</span>
              <span className="font-semibold ml-2">{farmer.soilData.nitrogen}</span>
            </div>
            <div>
              <span className="text-muted-foreground">P:</span>
              <span className="font-semibold ml-2">{farmer.soilData.phosphorus}</span>
            </div>
            <div>
              <span className="text-muted-foreground">K:</span>
              <span className="font-semibold ml-2">{farmer.soilData.potassium}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Texture:</span>
              <span className="font-semibold ml-2">{farmer.soilData.texture}</span>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-foreground">Input Usage Log</h3>
            <button
              onClick={() => setShowInputForm(!showInputForm)}
              className="flex items-center gap-1 px-3 py-1 bg-primary text-primary-foreground rounded-lg text-xs font-medium"
            >
              <Plus className="h-4 w-4" />
              Add
            </button>
          </div>

          {showInputForm && (
            <form onSubmit={handleAddInput} className="mb-3 p-3 bg-muted/50 rounded-lg space-y-2">
              <input
                type="text"
                value={inputType}
                onChange={(e) => setInputType(e.target.value)}
                placeholder="Input type (e.g., NPK Fertilizer)"
                className="w-full px-3 py-2 rounded border border-input bg-background text-sm"
                required
              />
              <div className="flex gap-2">
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Quantity"
                  className="flex-1 px-3 py-2 rounded border border-input bg-background text-sm"
                  required
                />
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="px-3 py-2 rounded border border-input bg-background text-sm"
                >
                  <option value="kg">kg</option>
                  <option value="liters">liters</option>
                  <option value="bags">bags</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-primary text-primary-foreground rounded font-medium text-sm"
              >
                Save Input
              </button>
            </form>
          )}

          <div className="space-y-2">
            {inputLogs.length > 0 ? (
              inputLogs.map((log, idx) => (
                <div key={idx} className="p-2 bg-muted/50 rounded text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">{log.inputType}</span>
                    <span className="text-muted-foreground">{log.date}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {log.quantity} {log.unit} • {log.location}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No inputs logged yet.</p>
            )}
          </div>
        </div>

        <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-foreground">Field Photos</h3>
            <label className="flex items-center gap-1 px-3 py-1 bg-primary text-primary-foreground rounded-lg text-xs font-medium cursor-pointer">
              <Upload className="h-4 w-4" />
              Upload
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </label>
          </div>

          {photos.length > 0 ? (
            <div className="grid grid-cols-3 gap-2">
              {photos.map((photo, idx) => (
                <div key={idx} className="relative">
                  <img src={photo.url} alt={photo.description} className="w-full h-24 object-cover rounded" />
                  <p className="text-xs text-muted-foreground mt-1 truncate">{photo.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No photos uploaded yet.</p>
          )}
        </div>

        <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
          <h3 className="text-sm font-semibold text-foreground mb-3">Tasks</h3>
          <div className="space-y-2">
            {farmer.tasks.map((task) => {
              const completed = isTaskCompleted(task.id);
              const workerAssignment = getWorkerAssignment(task.id);
              return (
                <div key={task.id} className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className={`text-sm font-semibold ${completed ? 'line-through text-muted-foreground' : ''}`}>
                        {task.name}
                      </p>
                      <p className="text-xs text-muted-foreground">Due: {task.deadline}</p>
                      {workerAssignment && (
                        <p className="text-xs text-primary mt-1">Assigned to: {workerAssignment.workerName}</p>
                      )}
                    </div>
                    {completed && <CheckCircle className="h-5 w-5 text-green-600" />}
                  </div>
                  {!completed && (
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => markTaskComplete(task.id)}
                        className="flex-1 py-2 px-3 bg-green-600 text-white rounded text-xs font-medium flex items-center justify-center gap-1"
                      >
                        <CheckCircle className="h-4 w-4" />
                        Complete
                      </button>
                      <button
                        onClick={() => {
                          const workerName = prompt('Enter worker name:');
                          if (workerName) {
                            // Use workerName as workerId for simplicity in demo
                            const workerId = workerName.toLowerCase().replace(/\s+/g, '-');
                            assignWorker(task.id, workerId, workerName);
                          }
                        }}
                        className="flex-1 py-2 px-3 bg-blue-600 text-white rounded text-xs font-medium flex items-center justify-center gap-1"
                      >
                        <UserPlus className="h-4 w-4" />
                        Assign
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
