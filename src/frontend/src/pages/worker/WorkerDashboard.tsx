import React, { useState } from 'react';
import { useAuth } from '../../auth/AuthProvider';
import { useNavigate } from '@tanstack/react-router';
import { DEMO_FARMERS } from '../../data/demoFarmers';
import { getSimulatedWeather } from '../../weather/simulatedWeather';
import { markWorkerTaskComplete, isWorkerTaskCompleted, addPhotoProof, getPhotoProofs, checkInAttendance, getTodayAttendance } from '../../state/workerSessionStore';
import TopBar from '../../components/TopBar';
import AgriTechBanner from '../../components/AgriTechBanner';
import WeatherPanel from '../../components/weather/WeatherPanel';
import { CheckCircle, Upload, UserCheck } from 'lucide-react';

export default function WorkerDashboard() {
  const { session } = useAuth();
  const navigate = useNavigate();
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  if (!session || session.role !== 'worker') {
    navigate({ to: '/access-denied' });
    return null;
  }

  const farmer = DEMO_FARMERS[0];
  const weather = getSimulatedWeather(farmer.village);
  const todayAttendance = getTodayAttendance();

  const handleMarkComplete = (taskId: string) => {
    markWorkerTaskComplete(taskId);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, taskId: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      addPhotoProof(taskId, url);
    }
  };

  const handleCheckIn = () => {
    checkInAttendance();
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBar />

      <div className="max-w-2xl mx-auto p-4 space-y-4">
        <AgriTechBanner />

        <WeatherPanel weather={weather} />

        <div className="bg-card rounded-xl p-5 shadow-sm border border-border">
          <h2 className="text-lg font-bold text-foreground mb-4">Today's Tasks</h2>
          <div className="space-y-3">
            {farmer.tasks.map((task) => {
              const completed = isWorkerTaskCompleted(task.id);
              const proofs = getPhotoProofs(task.id);
              return (
                <div key={task.id} className="p-4 bg-muted/50 rounded-xl">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className={`text-base font-semibold ${completed ? 'line-through text-muted-foreground' : ''}`}>
                        {task.name}
                      </p>
                      <p className="text-sm text-muted-foreground">Due: {task.deadline}</p>
                    </div>
                    {completed && <CheckCircle className="h-6 w-6 text-green-600" />}
                  </div>

                  {!completed && (
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => handleMarkComplete(task.id)}
                        className="flex-1 py-3 px-4 bg-green-600 text-white rounded-lg font-semibold text-base flex items-center justify-center gap-2"
                      >
                        <CheckCircle className="h-5 w-5" />
                        Mark Complete
                      </button>
                      <label className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg font-semibold text-base flex items-center justify-center gap-2 cursor-pointer">
                        <Upload className="h-5 w-5" />
                        Photo Proof
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handlePhotoUpload(e, task.id)}
                          className="hidden"
                        />
                      </label>
                    </div>
                  )}

                  {proofs.length > 0 && (
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      {proofs.map((proof, idx) => (
                        <img key={idx} src={proof.photoUrl} alt="Proof" className="w-full h-16 object-cover rounded" />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleCheckIn}
          disabled={!!todayAttendance}
          className={`w-full py-5 px-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 ${
            todayAttendance
              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 cursor-not-allowed'
              : 'bg-primary text-primary-foreground hover:opacity-90 transition-opacity'
          }`}
        >
          <UserCheck className="h-7 w-7" />
          {todayAttendance ? `Checked In at ${new Date(todayAttendance.timestamp).toLocaleTimeString()}` : 'Check In Attendance'}
        </button>
      </div>
    </div>
  );
}
