export enum UserStatus {
  Pending = 'pending',
  InProgress = 'in-progress',
  Completed = 'completed',
  Revoked = 'revoked',
}

export enum UserRole {
  Admin = 'admin',
  Customer = 'customer',
  FrontDesk = 'frontdesk',
}

export interface User {
  id: string;
  status: UserStatus;
  firstName: string;
  lastName: string;
  role: UserRole;
}
