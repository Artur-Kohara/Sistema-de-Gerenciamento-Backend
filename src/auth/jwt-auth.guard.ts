import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
// O guard é simples, pois toda a lógica está no passport e JwtStrategy
export class JwtAuthGuard extends AuthGuard('jwt') {}