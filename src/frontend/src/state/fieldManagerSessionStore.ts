interface InputLogEntry {
  id: string;
  date: string;
  inputType: string;
  quantity: number;
  unit: string;
  location: string;
}

interface TaskCompletion {
  taskId: string;
  completed: boolean;
  completedAt?: string;
}

interface PhotoEntry {
  id: string;
  url: string;
  timestamp: string;
  description: string;
}

interface WorkerAssignment {
  taskId: string;
  workerId: string;
  workerName: string;
}

const STORAGE_KEY = 'greenx_field_manager_session';

interface SessionData {
  inputLogs: InputLogEntry[];
  taskCompletions: TaskCompletion[];
  photos: PhotoEntry[];
  workerAssignments: WorkerAssignment[];
}

function loadSession(): SessionData {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return { inputLogs: [], taskCompletions: [], photos: [], workerAssignments: [] };
  }
  try {
    return JSON.parse(stored);
  } catch {
    return { inputLogs: [], taskCompletions: [], photos: [], workerAssignments: [] };
  }
}

function saveSession(data: SessionData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function addInputLog(entry: Omit<InputLogEntry, 'id'>): void {
  const data = loadSession();
  data.inputLogs.push({ ...entry, id: Date.now().toString() });
  saveSession(data);
}

export function getInputLogs(): InputLogEntry[] {
  return loadSession().inputLogs;
}

export function markTaskComplete(taskId: string): void {
  const data = loadSession();
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
  saveSession(data);
}

export function isTaskCompleted(taskId: string): boolean {
  const data = loadSession();
  return data.taskCompletions.find(t => t.taskId === taskId)?.completed || false;
}

export function addPhoto(entry: Omit<PhotoEntry, 'id'>): void {
  const data = loadSession();
  data.photos.push({ ...entry, id: Date.now().toString() });
  saveSession(data);
}

export function getPhotos(): PhotoEntry[] {
  return loadSession().photos;
}

export function assignWorker(taskId: string, workerId: string, workerName: string): void {
  const data = loadSession();
  const existing = data.workerAssignments.find(a => a.taskId === taskId);
  if (existing) {
    existing.workerId = workerId;
    existing.workerName = workerName;
  } else {
    data.workerAssignments.push({ taskId, workerId, workerName });
  }
  saveSession(data);
}

export function getWorkerAssignment(taskId: string): WorkerAssignment | undefined {
  const data = loadSession();
  return data.workerAssignments.find(a => a.taskId === taskId);
}
