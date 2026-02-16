interface WorkerTaskCompletion {
  taskId: string;
  completed: boolean;
  completedAt?: string;
}

interface WorkerPhotoProof {
  taskId: string;
  photoUrl: string;
  timestamp: string;
}

interface AttendanceRecord {
  date: string;
  checkedIn: boolean;
  timestamp: string;
}

const STORAGE_KEY = 'greenx_worker_session';

interface WorkerSessionData {
  taskCompletions: WorkerTaskCompletion[];
  photoProofs: WorkerPhotoProof[];
  attendance: AttendanceRecord[];
}

function loadWorkerSession(): WorkerSessionData {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return { taskCompletions: [], photoProofs: [], attendance: [] };
  }
  try {
    return JSON.parse(stored);
  } catch {
    return { taskCompletions: [], photoProofs: [], attendance: [] };
  }
}

function saveWorkerSession(data: WorkerSessionData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function markWorkerTaskComplete(taskId: string): void {
  const data = loadWorkerSession();
  const existing = data.taskCompletions.find(t => t.taskId === taskId);
  if (existing) {
    existing.completed = true;
    existing.completedAt = new Date().toISOString();
  } else {
    data.taskCompletions.push({
      taskId,
      completed: true,
      completedAt: new Date().toISOString(),
    });
  }
  saveWorkerSession(data);
}

export function isWorkerTaskCompleted(taskId: string): boolean {
  const data = loadWorkerSession();
  return data.taskCompletions.find(t => t.taskId === taskId)?.completed || false;
}

export function addPhotoProof(taskId: string, photoUrl: string): void {
  const data = loadWorkerSession();
  data.photoProofs.push({
    taskId,
    photoUrl,
    timestamp: new Date().toISOString(),
  });
  saveWorkerSession(data);
}

export function getPhotoProofs(taskId: string): WorkerPhotoProof[] {
  const data = loadWorkerSession();
  return data.photoProofs.filter(p => p.taskId === taskId);
}

export function checkInAttendance(): void {
  const data = loadWorkerSession();
  const today = new Date().toISOString().split('T')[0];
  const existing = data.attendance.find(a => a.date === today);
  if (!existing) {
    data.attendance.push({
      date: today,
      checkedIn: true,
      timestamp: new Date().toISOString(),
    });
    saveWorkerSession(data);
  }
}

export function getTodayAttendance(): AttendanceRecord | undefined {
  const data = loadWorkerSession();
  const today = new Date().toISOString().split('T')[0];
  return data.attendance.find(a => a.date === today);
}
