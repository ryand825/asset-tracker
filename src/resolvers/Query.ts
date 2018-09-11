import { getUserId } from "../utils";

async function getCurrentUser(parents, args, context, info) {
  const userId = getUserId(context);
  if (!userId) throw new Error("Not Logged In");
  const user = await context.db.query.user({ where: { id: userId } }, info);
  console.log("#######################", user);
  if (!user.default) {
    console.log("no default");
  }

  return user;
}

async function getLatestUpdates(parents, args, context, info) {
  const userId = getUserId(context);
  if (!userId) throw new Error("Not Logged In");

  let latest = { locations: [{}], customers: [{}], assets: [{}] };
  latest.assets = await context.db.query.assets(
    {
      where: {
        equipment: {
          category: { group: { id: args.groupId, users_some: { id: userId } } }
        }
      },
      last: args.last,
      orderBy: "updatedAt_ASC"
    },
    `{id serial description}`
  );

  latest.customers = await context.db.query.customers(
    {
      where: { group: { id: args.groupId, users_some: { id: userId } } },
      last: args.last,
      orderBy: "updatedAt_ASC"
    },
    `{id name}`
  );

  latest.locations = await context.db.query.locations(
    {
      where: {
        customer: { group: { id: args.groupId, users_some: { id: userId } } }
      },
      last: args.last,
      orderBy: "updatedAt_ASC"
    },
    `{id name}`
  );
  return latest;
}

async function getCustomersFromGroup(parents, args, context, info) {
  const userId = getUserId(context);
  if (!userId) throw new Error("Not Logged In");

  const customers = await context.db.query.customers(
    {
      where: { group: { id: args.groupId, users_some: { id: userId } } }
    },
    `{id name locations{id}}`
  );

  return customers;
}

export { getCustomersFromGroup, getCurrentUser, getLatestUpdates };
