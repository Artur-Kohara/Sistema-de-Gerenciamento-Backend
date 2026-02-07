import { SetMetadata } from "@nestjs/common";
import { Role } from "@prisma/client";

export const ROLES_KEY = 'roles';   // Cria uma chave de identificação (nome) para o metadado criado

// Cria um decorator que aceita um ou mais valores de roles e os organiza um array
export const Roles = (...roles: Role[]) =>
    SetMetadata(ROLES_KEY, roles);  // Guarda o array de roles com a chave 'roles' nessa rota

// Obs: Decorator é uma função que anexa metadados à uma rota ou classe