export interface CustomerInDb1 {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  city: string;
  state: string;
}

export interface CustomerInDb2 {
  id: string;
  customer: {
    firstName: string;
    lastName: string;
  };
  age: number;
  location: {
    city: string;
    state: string;
  };
}

export interface CustomerResponse {
  id: string;
  customer: {
    firstName: string;
    lastName: string;
    age: number;
  };
  location: {
    city: string;
    state: string;
  };
}
