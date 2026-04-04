import { MongoAbility } from "@casl/ability";
import { CaslAction } from "src/casl/enums/casl-action.enum";
import { CaslSubject } from "src/casl/enums/casl-subject.enum";

export type CaslUserAbility = MongoAbility<[CaslAction, CaslSubject]>;
