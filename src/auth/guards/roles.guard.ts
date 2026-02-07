import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";   // Permite ler metadados
import { ROLES_KEY } from "../decorators/roles.decorator";
import { Role } from "@prisma/client";
import { Observable } from "rxjs";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor (private reflector: Reflector) {}

    // É uma função que deixa a requisição acontecer caso retorne true e barra a requisição caso retorne false
    canActivate(context: ExecutionContext): boolean {
        // Pega os roles exigidos pela rota da requisição
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()],
        );

        // Caso não seja exigido nenhum role, libera a rota
        if (!requiredRoles) {
            return true;
        }

        // Pega a requisição do usuário
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        // Compara com a role do usuário
        const hasPermission = requiredRoles.includes(user.role);

        // Se não bater, barra o acesso
        if (!hasPermission) {
            throw new ForbiddenException('Acesso negado');
        }

        return true;
    }
}