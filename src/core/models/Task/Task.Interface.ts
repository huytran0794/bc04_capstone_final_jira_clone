export interface ITaskDetailList {
  statusId: number;
  statusName: string;
  alias: string;
  lstTaskDeTail: ITask[];
}
export interface ITask {
  listUserAsign: [];
  taskId: string;
  taskName: string;
  description: string;
  statusId: string;
  originalEstimate: number;
  timeTrackingSpent: number;
  timeTrackingRemaining: number;
  projectId: number;
  typeId: number;
  priorityId: number;
}
