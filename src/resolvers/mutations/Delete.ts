// import { getUserId } from "../../utils";
import UserInGroup from "../UserInGroup";

const deleteMutations = {
  deleteCustomer: async (parent, args, context, info) => {
    const customerGroup = await context.db.query.customer(
      {
        where: { id: args.customerId }
      },
      `{id group{id}}`
    );
    if (customerGroup) {
      const groupId = customerGroup.group.id;
      await UserInGroup(parent, groupId, context);
    } else {
      throw new Error("Customer not found");
    }

    const customer = await context.db.mutation.deleteCustomer(
      {
        where: { id: args.customerId }
      },
      info
    );

    return customer;
  },

  deleteEquipmentCategory: async (parent, args, context, info) => {
    const { categoryId } = args;

    const group = await context.db.query.category(
      {
        where: { id: categoryId }
      },
      `{id group{id}}`
    );
    if (group) {
      const groupId = group.group.id;
      await UserInGroup(parent, groupId, context);
    } else {
      throw new Error("Category not found");
    }

    const category = await context.db.mutation.deleteCategory(
      {
        where: { id: categoryId }
      },
      info
    );

    return category;
  },

  deleteLocation: async (parent, args, context, info) => {
    const locationGroup = await context.db.query.location(
      {
        where: { id: args.locationId }
      },
      `{id name customer{name group{id name}}}`
    );
    if (locationGroup) {
      const groupId = locationGroup.customer.group.id;
      await UserInGroup(parent, groupId, context);
    } else {
      throw new Error("Location not found");
    }

    const location = await context.db.mutation.deleteLocation(
      {
        where: { id: args.locationId }
      },
      info
    );

    return location;
  }
};

export default deleteMutations;
