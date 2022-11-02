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
      resolve(parent, args, { prisma }, info) {
        return prisma.link.findMany();
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

      resolve(parent, { description, url }, { prisma }, info) {
        const newLink = prisma.link.create({
          data: {
            description,
            url,
          },
        });

        return newLink;
      },
    });
  },
});
