import { Request, Response } from "express";
import * as authService from "../service/auth.service";

export class AuthController {
  public async register(req: Request, res: Response) {
    try {
      const { email, password, name } = req.body;
      const { user, token } = await authService.registerUser(
        email,
        password,
        name
      );

      res.status(201).json({
        success: true,
        data: {
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
          },
          token,
        },
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const { user, token } = await authService.loginUser(email, password);

      res.json({
        success: true,
        data: {
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
          },
          token,
        },
      });
    } catch (error: any) {
      res.status(401).json({
        success: false,
        error: error.message,
      });
    }
  }

  public async logout(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.split(" ")[1] || "";
      const result = await authService.logoutUser(token);

      res.json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }
}
