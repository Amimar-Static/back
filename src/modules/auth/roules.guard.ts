import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Roles} from './roles.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    ){}

  async canActivate(
    context: ExecutionContext,
  ) {
    const roles = this.reflector.get(Roles, context.getHandler())
    if(!roles){
      return true;
    }
    const request = context.switchToHttp().getRequest()

    if(request?.user){
      const token = request.user

      if(token.account_state === "admin" ){
        return true
      }
    }
    return false

  }
}



