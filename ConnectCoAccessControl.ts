import { UserRole, UserStatus } from './User';

export const grants = [
  {
    role: UserRole.Admin,
    resource: 'user',
    action: 'update:any',
    attributes: '*, !id',
  },
  {
    role: UserRole.FrontDesk,
    resource: 'user',
    action: 'update:any',
    attributes: `status, !status:${UserStatus.Revoked}, firstName, lastName, role, !role:${UserRole.Admin}`,
  },
  {
    role: UserRole.Customer,
    resource: 'user',
    action: 'update:own',
    attributes: 'firstName, lastName',
  },
];
