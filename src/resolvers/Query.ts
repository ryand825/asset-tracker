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

  console.log("#######################################");
  console.log(args.groupId);
  console.log("#######################################");

  // let latest = { locations: [{}], customers: [{}], assets: [{}] };
  const latest = {
    assets: await context.db.query.assets(
      {
        where: {
          equipment: {
            category: {
              group: { id: args.groupId, users_some: { id: userId } }
            }
          }
        },
        last: args.last,
        orderBy: "updatedAt_ASC"
      },
      `{id serial description updatedAt equipment{id name}}`
    ),

    customers: await context.db.query.customers(
      {
        where: { group: { id: args.groupId, users_some: { id: userId } } },
        last: args.last,
        orderBy: "updatedAt_ASC"
      },
      `{id name updatedAt}`
    ),

    locations: await context.db.query.locations(
      {
        where: {
          customer: { group: { id: args.groupId, users_some: { id: userId } } }
        },
        last: args.last,
        orderBy: "updatedAt_ASC"
      },
      `{id name updatedAt customer{id name}}`
    )
  };
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

async function getCustomerById(parents, args, context, info) {
  const userId = getUserId(context);
  if (!userId) throw new Error("Not Logged In");

  const userInGroup = await context.db.exists.Customer({
    id: args.customerId,
    group: {
      users_some: { id: userId }
    }
  });

  if (userInGroup) {
    return await context.db.query.customer(
      {
        where: { id: args.customerId }
      },
      info
    );
  }
  throw new Error("Not Authorized to access customers from this group");
}

async function getLocationById(parents, args, context, info) {
  const userId = getUserId(context);
  if (!userId) throw new Error("Not Logged In");
  console.log("###################################### log");
  console.log("###################################### log");
  console.log("###################################### log");
  console.log("###################################### log");
  console.log("###################################### log");

  const userInGroup = await context.db.exists.Location({
    id: args.locationId,
    customer: {
      group: {
        users_some: { id: userId }
      }
    }
  });

  if (userInGroup) {
    return await context.db.query.location(
      {
        where: { id: args.locationId }
      },
      info
    );
  }
  throw new Error("Not Authorized to access locations from this group");
}

export {
  getCustomersFromGroup,
  getCurrentUser,
  getLatestUpdates,
  getCustomerById,
  getLocationById
};
