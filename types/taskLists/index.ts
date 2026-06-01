export interface TaskList {
  id: string;
  name: string;
  description: string;
  color: string;
}

export interface CreateTaskListPayload {
  name: string;
  description?: string;
  color?: string;
}

export interface UpdateTaskListPayload {
  name?: string;
  description?: string;
  color?: string;
}
