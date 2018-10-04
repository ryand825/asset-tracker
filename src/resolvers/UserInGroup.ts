import { getUserId } from "../utils";

async function UserInGroup(parents, args, context, info) {
  const userId = getUserId(context);
  if (!userId) throw new Error("Not Logged In");
  const isUserInGroup = await context.db.exists.UserGroup({
    id: args.groupId,
    users_some: { id: userId }
  });

  if (!isUserInGroup)
    throw new Error("User does not have access to this group");

  return userId;
}

export default UserInGroup;
