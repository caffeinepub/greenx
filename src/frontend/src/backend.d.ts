import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface WorkerProfile {
    name: string;
    role: string;
}
export type Time = bigint;
export interface FieldPhoto {
    url: string;
    description?: string;
    timestamp: Time;
    uploadedBy: Principal;
}
export interface Task {
    id: bigint;
    status: TaskStatus;
    fieldManager: Principal;
    assignedTo: Array<Principal>;
    name: string;
    deadline: Time;
    cropType: CropType;
    location: string;
}
export interface FieldManagerProfile {
    name: string;
    role: string;
}
export interface ExpertProfile {
    name: string;
    role: string;
}
export enum AppUserRole {
    admin = "admin",
    fieldManager = "fieldManager",
    landOwner = "landOwner",
    expert = "expert",
    worker = "worker"
}
export enum CropType {
    maize = "maize",
    onion = "onion",
    sugarCane = "sugarCane",
    banana = "banana",
    turmeric = "turmeric",
    tomato = "tomato",
    chilli = "chilli",
    paddy = "paddy",
    groundnut = "groundnut",
    cotton = "cotton"
}
export enum TaskStatus {
    pending = "pending",
    completed = "completed",
    inProgress = "inProgress"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignAppUserRole(user: Principal, role: AppUserRole): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    assignTaskToMultipleWorkers(taskName: string, workerIds: Array<Principal>): Promise<void>;
    assignTaskToWorker(taskName: string, workerId: Principal): Promise<void>;
    createTask(name: string, deadline: Time, assignedTo: Array<Principal>, cropType: CropType, fieldManagerId: Principal, location: string): Promise<void>;
    deleteTask(taskName: string): Promise<void>;
    getAllFieldManagerProfiles(): Promise<Array<FieldManagerProfile>>;
    getAllFieldManagers(): Promise<Array<FieldManagerProfile>>;
    getAllTasksByLocation(location: string): Promise<Array<Task>>;
    getAllTasksForFieldManager(fieldManagerId: Principal): Promise<Array<Task>>;
    getAllTasksForWorker(workerId: Principal): Promise<Array<Task>>;
    getAllWorkers(): Promise<Array<WorkerProfile>>;
    getAppUserRole(user: Principal): Promise<AppUserRole | null>;
    getCallerExpertProfile(): Promise<ExpertProfile | null>;
    getCallerFieldManagerProfile(): Promise<FieldManagerProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCallerWorkerProfile(): Promise<WorkerProfile | null>;
    getTaskByName(name: string): Promise<Task | null>;
    isCallerAdmin(): Promise<boolean>;
    markTaskComplete(taskName: string): Promise<void>;
    saveCallerExpertProfile(profile: ExpertProfile): Promise<void>;
    saveCallerFieldManagerProfile(profile: FieldManagerProfile): Promise<void>;
    saveCallerWorkerProfile(profile: WorkerProfile): Promise<void>;
    uploadFieldPhoto(photo: FieldPhoto): Promise<void>;
}
