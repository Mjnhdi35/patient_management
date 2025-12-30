export interface ApiError {
  message: string;
  code?: string;
  meta?: unknown;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  statusCode: number;
  data?: T;
  error?: ApiError;
  timestamp: string;
}
