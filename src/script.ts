// test query the database
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const newLink = await prisma.link.create({
    data: {
      description:
        "A repo that contains an ongoing collection of useful, cleever, solidity/EVM patterns that actually get used in the wild",
      url: "https://github.com/dragonfly-xyz/useful-solidity-patterns",
    },
  });
  const allLinks = await prisma.link.findMany();
  console.log(allLinks);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
