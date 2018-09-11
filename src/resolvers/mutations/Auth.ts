import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

async function register(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);

  return await context.db.mutation.createUser(
    {
      data: {
        ...args,
        password,
        groups: {
          create: {
            name: `${args.name}'s Group`,
            description: "testing",
            personalGroup: true,
            owner: { connect: { email: args.email } }
          }
        }
      }
    },
    info
  );
}

async function login(parent, args, context, info) {
  let user = await context.db.query.user(
    { where: { email: args.email } },
    `{ id password name groups{id} defaultGroup{id}}`
  );
  if (!user) {
    throw new Error("Email not found");
  }
  if (!user.defaultGroup) {
    user = await context.db.mutation.updateUser(
      {
        where: { id: user.id },
        data: {
          defaultGroup: { connect: { id: user.groups[0].id } }
        }
      },
      `{ id password name groups{id} defaultGroup{id}}`
    );
    console.log(
      "#####################################updatedGroup#########################"
    );
  }

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error("Incorrect Password");
  }

  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

  return {
    token,
    user
  };
}

export { register, login };
