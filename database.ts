import { UserStatus, UserRole, User } from './User';

// NO-SQL databases
export const CustomersDb1 = {
  '1': {
    id: '1',
    firstName: 'Joe',
    lastName: 'Smith',
    age: 35,
    city: 'Denver',
    state: 'CO',
  },

  '3': {
    id: '3',
    firstName: 'Bob',
    lastName: 'Miller',
    age: 21,
    city: 'Dallas',
    state: 'TX',
  },
};

export const CustomersDb2 = {
  '2': {
    id: '2',
    customer: {
      firstName: 'Tim',
      lastName: 'Green',
    },
    age: 42,
    location: {
      city: 'San Francisco',
      state: 'CA',
    },
  },
};

// SQL database
export const UsersDb: User[] = [
  {
    id: '1',
    status: UserStatus.Completed,
    firstName: 'John',
    lastName: 'Smith',
    role: UserRole.Admin,
  },
  {
    id: '2',
    status: UserStatus.Pending,
    firstName: 'Jake',
    lastName: 'Blue',
    role: UserRole.FrontDesk,
  },
  {
    id: '3',
    status: UserStatus.Pending,
    firstName: 'Mike',
    lastName: 'Ham',
    role: UserRole.Customer,
  },
];
