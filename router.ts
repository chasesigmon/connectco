import express from 'express';
import { User, UserStatus } from './User';
import { EventEmitter } from 'events';
import { AccessControl } from 'accesscontrol';
import { grants } from './ConnectCoAccessControl';
import { UsersDb, CustomersDb1, CustomersDb2 } from './database';
import { CustomerInDb1, CustomerInDb2, CustomerResponse } from './Customer';

export default class ConnectCoRouter {
  ac: AccessControl = new AccessControl(grants);
  evt: EventEmitter = new EventEmitter();
  processedEvents: string[] = [];
  users: User[] = [...UsersDb];
  configureEvents() {
    this.evt.on('CompletedStatusUpdate', (data) => {
      const evtMsg = `User Resource: ${data} has been updated to completed`;
      if (this.processedEvents.indexOf(evtMsg) === -1) {
        this.processedEvents.push(evtMsg);
        console.log(evtMsg);
      }
    });
  }

  private mapCustomerResponse = (
    customer: CustomerInDb1 & CustomerInDb2
  ): CustomerResponse => {
    const resp: CustomerResponse = {
      id: customer.id,
      customer: {
        firstName: customer.firstName || customer.customer.firstName,
        lastName: customer.lastName || customer.customer.lastName,
        age: customer.age,
      },
      location: {
        city: customer.city || customer.location.city,
        state: customer.state || customer.location.state,
      },
    };
    return resp;
  };
  configureCustomerRoutes(app: express.Application) {
    app
      .route(`/customers/:id`)
      .get(async (req: express.Request, res: express.Response) => {
        const customerId: string = req.params.id;
        const customer: any =
          Object.values(CustomersDb1).find((item) => item.id === customerId) ||
          Object.values(CustomersDb2).find((item) => item.id === customerId);
        if (!customer) {
          res.status(404).json({ error: 'Customer not found' });
        }
        const resp = this.mapCustomerResponse(customer);
        res.status(200).json({ resp });
      });
  }

  configureUserRoutes(app: express.Application) {
    app
      .route(`/users/:id`)
      .get(async (req: express.Request, res: express.Response) => {
        const userId = req.params.id;
        let user = this.users.find((u) => u.id === userId);
        if (!user) {
          res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ user });
      })
      .put(async (req: express.Request, res: express.Response) => {
        const userId = req.params.id;
        let user = this.users.find((u) => u.id === userId);
        if (!user) {
          res.status(404).json({ error: 'User not found' });
        }

        let permission;
        // this would be some sort of access token that would be deserialized and an admin would be able to make updates to a user
        if (req.headers.onbehalfof) {
          const onBehalfOf = this.users.find(
            (u) => u.id === req.headers.onbehalfof
          );
          permission = this.ac.can(onBehalfOf.role).updateOwn('user');
        } else {
          permission = this.ac.can(user.role).updateOwn('user');
        }

        if (permission.granted) {
          const userUpdate: User = { ...user };
          const attrs = permission.attributes;
          const body: User = req.body;

          if (
            body.status &&
            attrs.find((a) => a === 'status' || a === '*') &&
            !attrs.find((a) => a === `!status:${body.status}`)
          ) {
            userUpdate.status = body.status;
          }

          if (
            body.role &&
            attrs.find((a) => a === 'role' || a === '*') &&
            !attrs.find((a) => a === `!role:${body.role}`)
          ) {
            userUpdate.role = body.role;
          }

          userUpdate.firstName = body.firstName;
          userUpdate.lastName = body.lastName;

          this.users = this.users.map((userDb) => {
            if (userDb.id === user.id) {
              userDb = { ...userUpdate };
            }
            return userDb;
          });

          if (
            user.status !== UserStatus.Completed &&
            userUpdate.status === UserStatus.Completed
          ) {
            this.evt.emit('CompletedStatusUpdate', user.id);
          }

          res.status(200).json({ ...permission.filter(userUpdate) });
        } else {
          res.status(401).json({ error: 'Not Authorized.' });
        }
      });
  }
  configureRoutes(app: express.Application): void {
    this.configureCustomerRoutes(app);
    this.configureUserRoutes(app);
  }
}
