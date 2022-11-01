import { extendType, intArg, nonNull, objectType, stringArg } from "nexus";
import links from "./LinksDummyData";

export const Link = objectType({
  name: "Link",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("description");
    t.nonNull.string("url");
  },
});

export const LinkQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("feed", {
      type: "Link",
      resolve(parent, args, context, info) {
        return links;
      },
    });
  },
});

export const LinkMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("post", {
      type: "Link",
      args: {
        description: nonNull(stringArg()),
        url: nonNull(stringArg()),
      },

      resolve(parent, args, context) {
        const { description, url } = args;
        let idCount = links.length + 1;

        const link = {
          id: idCount,
          description: description,
          url: url,
        };
        links.push(link);
        return link;
      },
    });
    t.nonNull.field("updateLink", {
      type: "Link",
      args: {
        id: nonNull(intArg()),
        url: nonNull(stringArg()),
        description: nonNull(stringArg()),
      },

      resolve(parent, { id, url, description }, context) {
        let index = id - 1;
        let link = links[index];
        link.description = description;
        link.url = url;
        return link;
      },
    });
  },
});
