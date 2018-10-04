// import { getUserId } from "../../utils";
import UserInGroup from "../UserInGroup";

const deleteMutations = {
  deleteCustomer: async (parent, args, context, info) => {
    const userId = await UserInGroup(parent, args, context, info);
    // Check that the customer exists in the group provided
    const customerGroup = await context.db.query.customer(
      {
        where: { id: args.customerId }
      },
      `{id group{id}}`
    );
    if (!customerGroup) throw new Error("Customer not found");
    if (customerGroup.group.id !== args.groupId)
      throw new Error("Customer does not exist in that group");

    const customer = await context.db.mutation.deleteCustomer(
      {
        where: { id: args.customerId }
      },
      info
    );

    return customer;
  }
};

export default deleteMutations;
