import Text "mo:core/Text";
import Order "mo:core/Order";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Int "mo:core/Int";
import Char "mo:core/Char";
import Time "mo:core/Time";
import Float "mo:core/Float";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";
import MixinAuthorization "authorization/MixinAuthorization";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";
import AccessControl "authorization/access-control";

actor {
  type TaskStatus = { #pending; #inProgress; #completed };

  // Application-specific role mapping stored separately
  type AppUserRole = {
    #admin;
    #landOwner;
    #fieldManager;
    #expert;
    #worker;
  };

  type CropType = {
    #paddy;
    #cotton;
    #chilli;
    #maize;
    #groundnut;
    #turmeric;
    #tomato;
    #onion;
    #sugarCane;
    #banana;
  };

  type SoilData = {
    ph : Float;
    moisture : Float;
    nitrogen : Float;
    phosphorus : Float;
    potassium : Float;
    organicMatter : Float;
    cationExchangeCapacity : Float;
    texture : Text;
  };

  type WeatherData = {
    temperature : Float;
    rainProbability : Float;
    humidity : Float;
    windSpeed : Float;
    weatherAlert : Text;
    overallHealth : { #good; #moderateRisk; #highRisk };
    solarRadiation : Float;
    pressure : Float;
    visibility : Float;
    uvIndex : Float;
  };

  type FieldManagerProfile = {
    name : Text;
    role : Text;
  };

  type WorkerProfile = {
    name : Text;
    role : Text;
  };

  type ExpertProfile = {
    name : Text;
    role : Text;
  };

  type Task = {
    id : Nat;
    name : Text;
    deadline : Time.Time;
    assignedTo : [Principal];
    status : TaskStatus;
    location : Text;
    cropType : CropType;
    fieldManager : Principal;
  };

  type FieldPhoto = {
    url : Text;
    uploadedBy : Principal;
    timestamp : Time.Time;
    description : ?Text;
  };

  type FieldManagerData = {
    id : Principal;
    landBlocks : [Text];
    cropTypes : [CropType];
    soilInfo : [SoilData];
    tasks : [Task];
    photos : [FieldPhoto];
    name : Text;
    role : Text;
  };

  module FieldManagerProfile {
    public func compareByName(a : FieldManagerProfile, b : FieldManagerProfile) : Order.Order {
      Text.compare(a.name, b.name);
    };
  };

  module WorkerProfile {
    public func compareByName(a : WorkerProfile, b : WorkerProfile) : Order.Order {
      Text.compare(a.name, b.name);
    };
  };

  let workers = Map.empty<Principal, WorkerProfile>();
  let workersByLowercaseKey = Map.empty<Text, WorkerProfile>();
  let tasksByLowercaseKey = Map.empty<Text, Task>();
  let fieldManagers = Map.empty<Principal, FieldManagerProfile>();
  let experts = Map.empty<Principal, ExpertProfile>();
  let appUserRoles = Map.empty<Principal, AppUserRole>();

  include MixinStorage();

  // Authorization system for all access-restricted functions
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Helper function to check application-specific roles
  private func hasAppRole(caller : Principal, requiredRole : AppUserRole) : Bool {
    // Admins have access to everything
    if (AccessControl.isAdmin(accessControlState, caller)) {
      return true;
    };

    switch (appUserRoles.get(caller)) {
      case (null) { false };
      case (?role) {
        switch (requiredRole) {
          case (#admin) { AccessControl.isAdmin(accessControlState, caller) };
          case (#landOwner) { role == #landOwner };
          case (#fieldManager) { role == #fieldManager };
          case (#expert) { role == #expert };
          case (#worker) { role == #worker };
        };
      };
    };
  };

  // Admin function to assign application-specific roles
  public shared ({ caller }) func assignAppUserRole(user : Principal, role : AppUserRole) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can assign roles");
    };
    appUserRoles.add(user, role);
  };

  public query ({ caller }) func getAppUserRole(user : Principal) : async ?AppUserRole {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own role");
    };
    appUserRoles.get(user);
  };

  // Field Manager Profile Management
  public query ({ caller }) func getCallerFieldManagerProfile() : async ?FieldManagerProfile {
    if (not hasAppRole(caller, #fieldManager)) {
      Runtime.trap("Unauthorized: Only field managers can access this");
    };
    fieldManagers.get(caller);
  };

  public query ({ caller }) func getAllFieldManagers() : async [FieldManagerProfile] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view field managers");
    };
    fieldManagers.values().toArray().sort(FieldManagerProfile.compareByName);
  };

  public shared ({ caller }) func saveCallerFieldManagerProfile(profile : FieldManagerProfile) : async () {
    if (not hasAppRole(caller, #fieldManager)) {
      Runtime.trap("Unauthorized: Only field managers can save profiles");
    };
    fieldManagers.add(caller, profile);
  };

  public query ({ caller }) func getAllFieldManagerProfiles() : async [FieldManagerProfile] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view profiles");
    };
    fieldManagers.values().toArray().sort(FieldManagerProfile.compareByName);
  };

  // Worker Profile Management
  public query ({ caller }) func getCallerWorkerProfile() : async ?WorkerProfile {
    if (not hasAppRole(caller, #worker)) {
      Runtime.trap("Unauthorized: Only workers can access this");
    };
    workers.get(caller);
  };

  public shared ({ caller }) func saveCallerWorkerProfile(profile : WorkerProfile) : async () {
    if (not hasAppRole(caller, #worker)) {
      Runtime.trap("Unauthorized: Only workers can save profiles");
    };
    workers.add(caller, profile);
  };

  public query ({ caller }) func getAllWorkers() : async [WorkerProfile] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view workers");
    };
    workers.values().toArray().sort(WorkerProfile.compareByName);
  };

  // Expert Profile Management
  public query ({ caller }) func getCallerExpertProfile() : async ?ExpertProfile {
    if (not hasAppRole(caller, #expert)) {
      Runtime.trap("Unauthorized: Only experts can access this");
    };
    experts.get(caller);
  };

  public shared ({ caller }) func saveCallerExpertProfile(profile : ExpertProfile) : async () {
    if (not hasAppRole(caller, #expert)) {
      Runtime.trap("Unauthorized: Only experts can save profiles");
    };
    experts.add(caller, profile);
  };

  // Field Manager Operations - Task Management
  public shared ({ caller }) func createTask(
    name : Text,
    deadline : Time.Time,
    assignedTo : [Principal],
    cropType : CropType,
    fieldManagerId : Principal,
    location : Text,
  ) : async () {
    if (not hasAppRole(caller, #fieldManager)) {
      Runtime.trap("Unauthorized: Only field managers can create tasks");
    };

    // Verify the caller is creating task for themselves or is admin
    if (caller != fieldManagerId and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only create tasks for yourself");
    };

    let newTask = {
      id = 0;
      name;
      deadline;
      assignedTo;
      status = #pending;
      location;
      cropType;
      fieldManager = fieldManagerId;
    };
    let lowercaseName = name.map(
      func(char) {
        switch (char.toNat32()) {
          case (ch) {
            if (ch >= 65 and ch <= 90) {
              Char.fromNat32(ch + 32);
            } else { char };
          };
        }
      }
    );
    tasksByLowercaseKey.add(lowercaseName, newTask);
  };

  public query ({ caller }) func getTaskByName(name : Text) : async ?Task {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view tasks");
    };

    let lowercaseName = name.map(
      func(char) {
        switch (char.toNat32()) {
          case (ch) {
            if (ch >= 65 and ch <= 90) {
              Char.fromNat32(ch + 32);
            } else { char };
          };
        }
      }
    );

    let task = tasksByLowercaseKey.get(lowercaseName);

    // Verify authorization: task owner, assigned worker, or admin
    switch (task) {
      case (null) { null };
      case (?t) {
        if (
          t.fieldManager == caller or
          t.assignedTo.values().any(func(p) { p == caller }) or
          AccessControl.isAdmin(accessControlState, caller)
        ) {
          task;
        } else {
          Runtime.trap("Unauthorized: Can only view your own tasks");
        };
      };
    };
  };

  public query ({ caller }) func getAllTasksForFieldManager(fieldManagerId : Principal) : async [Task] {
    // Field managers can view their own tasks, admins can view all
    if (caller != fieldManagerId and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own tasks");
    };

    if (not hasAppRole(caller, #fieldManager) and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only field managers can access this");
    };

    tasksByLowercaseKey.values().toArray().filter(
      func(task) {
        task.fieldManager == fieldManagerId;
      }
    );
  };

  public query ({ caller }) func getAllTasksByLocation(location : Text) : async [Task] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view tasks");
    };

    tasksByLowercaseKey.values().toArray().filter(
      func(task) {
        task.location == location;
      }
    );
  };

  public shared ({ caller }) func uploadFieldPhoto(photo : FieldPhoto) : async () {
    if (not hasAppRole(caller, #fieldManager) and not hasAppRole(caller, #worker)) {
      Runtime.trap("Unauthorized: Only field managers and workers can upload photos");
    };

    let manager : ?FieldManagerProfile = fieldManagers.get(caller);
    let worker : ?WorkerProfile = workers.get(caller);

    if (manager == null and worker == null) {
      Runtime.trap("Profile not found");
    };
  };

  public shared ({ caller }) func assignTaskToWorker(taskName : Text, workerId : Principal) : async () {
    if (not hasAppRole(caller, #fieldManager)) {
      Runtime.trap("Unauthorized: Only field managers can assign tasks");
    };

    let lowercaseTaskName = taskName.map(
      func(char) {
        switch (char.toNat32()) {
          case (ch) {
            if (ch >= 65 and ch <= 90) {
              Char.fromNat32(ch + 32);
            } else { char };
          };
        }
      }
    );

    let task = tasksByLowercaseKey.get(lowercaseTaskName);

    // Verify the caller owns this task
    switch (task) {
      case (null) { Runtime.trap("Task not found") };
      case (?t) {
        if (t.fieldManager != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only assign your own tasks");
        };
      };
    };
  };

  public shared ({ caller }) func assignTaskToMultipleWorkers(taskName : Text, workerIds : [Principal]) : async () {
    if (not hasAppRole(caller, #fieldManager)) {
      Runtime.trap("Unauthorized: Only field managers can assign tasks");
    };

    let lowercaseTaskName = taskName.map(
      func(char) {
        switch (char.toNat32()) {
          case (upperCase) {
            if (upperCase >= 65 and upperCase <= 90) {
              Char.fromNat32(upperCase + 32);
            } else { char };
          };
        }
      }
    );

    let task = tasksByLowercaseKey.get(lowercaseTaskName);

    // Verify the caller owns this task
    switch (task) {
      case (null) { Runtime.trap("Task not found") };
      case (?t) {
        if (t.fieldManager != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only assign your own tasks");
        };
      };
    };
  };

  public shared ({ caller }) func deleteTask(taskName : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    let lowercaseTaskName = taskName.map(
      func(char) {
        switch (char.toNat32()) {
          case (ch) {
            if (ch >= 65 and ch <= 90) {
              Char.fromNat32(ch + 32);
            } else { char };
          };
        }
      }
    );

    tasksByLowercaseKey.remove(lowercaseTaskName);
  };

  // Worker Operations
  public query ({ caller }) func getAllTasksForWorker(workerId : Principal) : async [Task] {
    // Workers can view their own tasks, admins can view all
    if (caller != workerId and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own tasks");
    };

    if (not hasAppRole(caller, #worker) and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only workers can access this");
    };

    let tasks = tasksByLowercaseKey.values().toArray();
    tasks.filter(
      func(task) {
        task.assignedTo.values().any(func(p) { p == workerId });
      }
    );
  };

  public shared ({ caller }) func markTaskComplete(taskName : Text) : async () {
    if (not hasAppRole(caller, #worker)) {
      Runtime.trap("Unauthorized: Only workers can mark tasks complete");
    };

    let lowercaseTaskName = taskName.map(
      func(char) {
        switch (char.toNat32()) {
          case (ch) {
            if (ch >= 65 and ch <= 90) {
              Char.fromNat32(ch + 32);
            } else { char };
          };
        }
      }
    );

    let task = tasksByLowercaseKey.get(lowercaseTaskName);

    // Verify the caller is assigned to this task
    switch (task) {
      case (null) { Runtime.trap("Task not found") };
      case (?t) {
        if (not t.assignedTo.values().any(func(p) { p == caller })) {
          Runtime.trap("Unauthorized: Can only complete tasks assigned to you");
        };
      };
    };
  };
};
