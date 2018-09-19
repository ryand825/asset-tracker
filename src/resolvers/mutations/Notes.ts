import { getUserId } from "../../utils";

const noteMutations = {
  createLocationNote: async (parent, args, context, info) => {
    const userId = getUserId(context);
    if (!userId) throw new Error("Not Logged In");

    const userInGroup = await context.db.query.userGroup(
      {
        where: {
          id: args.groupId
        }
      },
      `{id name customers(where:{locations_some:{id: "${
        args.locationId
      }"}}){locations(where:{id: "${args.locationId}"}){id name}}}`
    );

    if (
      // Using this to test that the location exists in the correct group
      // because the 'exists' function gives false postives
      userInGroup.customers[0] &&
      userInGroup.customers[0].locations[0].id === args.locationId
    ) {
      return await context.db.mutation.updateLocation(
        {
          where: { id: args.locationId },
          data: {
            notes: {
              create: {
                content: args.content,
                archived: false,
                createdIn: {
                  connect: { id: args.groupId }
                },
                createdBy: { connect: { id: userId } }
              }
            }
          }
        },
        info
      );
    } else {
      throw new Error("Location was not found in the given group");
    }
  }
};

export default noteMutations;
