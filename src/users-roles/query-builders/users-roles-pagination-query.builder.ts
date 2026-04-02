import { PaginationQueryBuilder } from "src/common/query-builders/pagination-query.builder";
import { Repository } from "typeorm";
import { UsersRoles } from "../users-roles.entity";

export class UsersRolesPaginationQueryBuilder extends PaginationQueryBuilder<UsersRoles> {
  constructor(repository: Repository<UsersRoles>) {
    super(repository.createQueryBuilder("users_roles"));
  }
}
