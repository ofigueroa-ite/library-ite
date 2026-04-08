import { CaslAction } from "../../../casl/interfaces/casl-action.enum";
import { CaslSubject } from "../../../casl/interfaces/casl-subject.enum";

export interface Permissions {
  action: CaslAction;
  conditions: string;
  createdAt: string;
  deletedAt: string;
  fields: string[];
  inverted: boolean;
  roleId: string;
  subject: CaslSubject;
  updatedAt: string;
}
