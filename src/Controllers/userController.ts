import { NextFunction, Request, Response } from 'express';
import { generateToken } from '../security/auth';
import UserService from '../Services/userService'

class UserController {
  public req: Request;
  public res: Response;
  public next: NextFunction;
  public service: UserService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new UserService();
  }

  async createUser() {
    try {
      const infos = {
        name: this.req.body.name,
        email: this.req.body.email,
        password: this.req.body.password,
        address: this.req.body.address,
        paymentMethod: this.req.body.paymentMethod,
      };
      const data = await this.service.createUser(infos);
      const token = generateToken({ id: data.id });
      return this.res.status(201).json({ token });
    } catch (error) {
      this.next(error);
    }
  }
}

export default UserController;
