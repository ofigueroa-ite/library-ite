import { CaslAction } from "../../casl/interfaces/casl-action.enum";
import { CaslSubject } from "../../casl/interfaces/casl-subject.enum";
import type { Resource } from "../../common/interfaces/resource";

export interface Permissions extends Resource {
  action: CaslAction;
  conditions: string;
  fields: string[];
  inverted: boolean;
  roleId: string;
  subject: CaslSubject;
}
