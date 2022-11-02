import { makeSchema } from "nexus";
import { join } from "path";
import * as types from "./graphql";

export const schema = makeSchema({
  types,
  outputs: {
    schema: join(process.cwd(), "schema.graphql"),
    typegen: join(process.cwd(), "nexus-typepgen.ts"),
  },
  contextType: {
    module: join(process.cwd(), "./src/context.ts"), //where the context interface or type os exported
    export: "Context", //name of the exported interface in the Module
  },
});
