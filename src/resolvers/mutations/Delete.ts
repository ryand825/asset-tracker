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
  }
};

export default deleteMutations;
