import { getUserId } from "../utils";

async function getCurrentUser(parents, args, context, info) {
  const userId = getUserId(context);
  const user = await context.db.query.user({ where: { id: userId } }, info);

  return user;
}

export { getCurrentUser };
