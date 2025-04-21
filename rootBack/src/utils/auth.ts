import { Request, Response } from "express";

export   function getClientIp(req: Request): string {
    const xForwardedFor = req.headers['x-forwarded-for'];
    if (typeof xForwardedFor === 'string') {
      return xForwardedFor.split(',')[0];
    }
    return req.socket.remoteAddress || 'IP не найден';
  }
  export function setRefreshToken(res: Response, token: string) {
    res.cookie('refreshToken', token, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
  }