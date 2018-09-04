import { register, login } from "./mutations/Auth";
import { getUserId } from "../utils";

const Mutations = {
  register,
  login,
  createUserGroup: (parent, args, context, info) => {
    const userId = getUserId(context);
    if (!userId) throw new Error("Not Logged In");

    return context.db.mutation.createUserGroup(
      {
        data: {
          name: args.name,
          description: args.description,
          owner: { connect: { id: userId } },
          personalGroup: false,
          users: { connect: { id: userId } }
        }
      },
      info
    );
  },

  createCustomer: (parent, args, context, info) => {
    const userId = getUserId(context);
    if (!userId) throw new Error("Not Logged In");

    return context.db.mutation.createCustomer(
      {
        data: {
          name: args.name,
          group: { connect: { id: args.groupId } }
        }
      },
      info
    );
  },

  createLocation: (parent, args, context, info) => {
    const userId = getUserId(context);
    if (!userId) throw new Error("Not Logged In");

    return context.db.mutation.createLocation(
      {
        data: {
          name: args.name,
          address: args.address,
          customer: { connect: { id: args.customerId } }
        }
      },
      info
    );
  },

  createCategory: (parent, args, context, info) => {
    const userId = getUserId(context);
    if (!userId) throw new Error("Not Logged In");

    return context.db.mutation.createCategory(
      {
        data: {
          name: args.name,
          description: args.description,
          group: { connect: { id: args.groupId } }
        }
      },
      info
    );
  },

  createEquipment: (parent, args, context, info) => {
    const userId = getUserId(context);
    if (!userId) throw new Error("Not Logged In");

    return context.db.mutation.createEquipment(
      {
        data: {
          name: args.name,
          description: args.description,
          model: args.model,
          category: { connect: { id: args.categoryId } }
        }
      },
      info
    );
  },

  createAsset: (parent, args, context, info) => {
    const userId = getUserId(context);
    if (!userId) throw new Error("Not Logged In");

    return context.db.mutation.createAsset(
      {
        data: {
          serial: args.serial,
          description: args.description,
          equipment: { connect: { id: args.equipmentId } },
          location: { connect: { id: args.locationId } }
        }
      },
      info
    );
  }
};

export default Mutations;
