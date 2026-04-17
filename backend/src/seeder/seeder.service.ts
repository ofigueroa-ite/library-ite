import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CaslAction } from "src/casl/enums/casl-action.enum";
import { CaslSubject } from "src/casl/enums/casl-subject.enum";
import { EnvironmentVariables } from "src/common/interfaces/environment-variables.interface";
import { PermissionsService } from "src/permissions/permissions.service";
import { Role } from "src/roles/roles.entity";
import { RolesService } from "src/roles/roles.service";
import { UsersService } from "src/users/users.service";
import { UsersRolesService } from "src/users-roles/users-roles.service";

@Injectable()
export class SeederService implements OnApplicationBootstrap {
  private readonly superAdminEmail: string;
  private readonly superAdminRoleName: string;
  private readonly superAdminName: string;
  private readonly superAdminSurname: string;

  constructor(
    private readonly usersService: UsersService,
    private readonly rolesService: RolesService,
    private readonly permissionsService: PermissionsService,
    private readonly usersRolesService: UsersRolesService,
    private readonly configService: ConfigService<EnvironmentVariables, true>
  ) {
    this.superAdminEmail = this.configService.get("SEEDER_SUPER_ADMIN_EMAIL", {
      infer: true,
    });
    this.superAdminRoleName = this.configService.get(
      "SEEDER_SUPER_ADMIN_ROLE_NAME",
      { infer: true }
    );
    this.superAdminName = this.configService.get("SEEDER_SUPER_ADMIN_NAME", {
      infer: true,
    });
    this.superAdminSurname = this.configService.get(
      "SEEDER_SUPER_ADMIN_SURNAME",
      { infer: true }
    );
  }

  async onApplicationBootstrap() {
    const superAdminRole = await this.getOrCreateSuperAdminRole();
    const superAdminUser = await this.getOrCreateSuperAdminUser();

    const managerPermission = superAdminRole.permissions?.find(
      (perm) =>
        perm.action === CaslAction.MANAGE && perm.subject === CaslSubject.ALL
    );

    if (!managerPermission) {
      await this.permissionsService.create({
        roleId: superAdminRole.id,
        action: CaslAction.MANAGE,
        subject: CaslSubject.ALL,
      });
    }

    if (!superAdminUser.roles?.some((role) => role.id === superAdminRole.id)) {
      await this.usersRolesService.create({
        userId: superAdminUser.id,
        roleIds: [superAdminRole.id],
      });
    }
  }

  async getOrCreateSuperAdminRole(): Promise<Role> {
    const role = await this.rolesService.findByName(this.superAdminRoleName);
    if (!role) {
      return await this.rolesService.create({
        name: this.superAdminRoleName,
        priority: 1000,
      });
    }
    return role;
  }

  async getOrCreateSuperAdminUser() {
    const user = await this.usersService.findByEmail(this.superAdminEmail);
    if (!user) {
      return await this.usersService.create({
        email: this.superAdminEmail,
        name: this.superAdminName,
        surname: this.superAdminSurname,
      });
    }
    return user;
  }
}
