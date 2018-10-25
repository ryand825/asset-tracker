import { getUserId } from "../utils";
import equipmentQueries from "./queries/Equipment";

const Queries = {
  ...equipmentQueries,
  getCurrentUser: async (parents, args, context, info) => {
    const userId = getUserId(context);
    if (!userId) throw new Error("Not Logged In");
    const user = await context.db.query.user({ where: { id: userId } }, info);
    if (!user.default) {
      console.log("no default");
    }

    return user;
  },

  getLatestUpdates: async (parents, args, context, info) => {
    const userId = getUserId(context);
    if (!userId) throw new Error("Not Logged In");

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
            customer: {
              group: { id: args.groupId, users_some: { id: userId } }
            }
          },
          last: args.last,
          orderBy: "updatedAt_ASC"
        },
        `{id name updatedAt customer{id name}}`
      )
    };
    return latest;
  },

  getCustomersFromGroup: async (parents, args, context, info) => {
    const userId = getUserId(context);
    if (!userId) throw new Error("Not Logged In");

    const customers = await context.db.query.customers(
      {
        where: { group: { id: args.groupId, users_some: { id: userId } } }
      },
      info
    );

    return customers;
  },

  getCustomerById: async (parents, args, context, info) => {
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
  },

  getLocationById: async (parents, args, context, info) => {
    const userId = getUserId(context);
    if (!userId) throw new Error("Not Logged In");

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
};

export default Queries;
