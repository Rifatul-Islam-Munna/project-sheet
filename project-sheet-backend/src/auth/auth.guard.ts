import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';


type jwts= {
    email:string,
    id:string,
    role:string
}
export interface ExpressRequest extends Request {
    user:jwts
}
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private readonly jwtService: JwtService) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
     
        
  
      
        const request: ExpressRequest = context.switchToHttp().getRequest();
       
        const token = request.headers["refresh_token"] as string
        if(!token){
            throw new UnauthorizedException('No token found');
        }
       

        return this.validateToken(request,token);
    }

   
    
      private async validateToken(request:ExpressRequest,token: string): Promise<boolean> {
        try {
       
          const decoded = await this.jwtService.verifyAsync<jwts>(token,{secret:process.env.REFRESH_TOKEN}) ;
    
           
           if (!decoded) {
            throw new Error('Token verification returned no payload');
        }

        if (!decoded.email || !decoded.id || !decoded.role) {
            throw new Error('Incomplete JWT payload');
        }
          request.user = decoded;
         
          return true; 
        } catch {
          throw new UnauthorizedException('Invalid or expired token');
        }
      }

}


