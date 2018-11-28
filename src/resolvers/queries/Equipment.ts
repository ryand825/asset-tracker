import UserInGroup from "../UserInGroup";

const equipmentQueries = {
  getCategories: async (parent, args, context, info) => {
    const { groupId } = args;

    await UserInGroup(parent, groupId, context);

    const categories = await context.db.query.categories(
      {
        where: { group: { id: groupId } }
      },
      info
    );

    return categories;
  },

  getCategoryName: async (parent, args, context, info) => {
    const { categoryId } = args;
    const category = await context.db.query.category(
      {
        where: { id: categoryId }
      },
      `{name}`
    );

    return category;
  },

  getEquipmentList: async (parent, args, context, info) => {
    const { categoryId } = args;

    const categoryGroup = await context.db.query.category(
      {
        where: { id: categoryId }
      },
      `{id group{id}}`
    );

    if (categoryGroup) {
      const groupId = categoryGroup.group.id;
      await UserInGroup(parent, groupId, context);
    } else {
      throw new Error("Equipment not found");
    }

    const equipmentList = await context.db.query.equipments(
      {
        where: { category: { id: categoryId } }
      },
      info
    );

    return equipmentList;
  },

  getAssetsByEquipmentId: async (parent, args, context, info) => {
    const { equipmentId } = args;

    const equipmentGroup = await context.db.query.equipment(
      {
        where: { id: equipmentId }
      },
      `{id category{id group{id}}}`
    );

    if (equipmentGroup) {
      const groupId = equipmentGroup.category.group.id;
      await UserInGroup(parent, groupId, context);
    } else {
      throw new Error("Equipment not found");
    }

    const assetList = await context.db.query.assets(
      {
        where: { equipment: { id: equipmentId } }
      },
      info
    );

    return assetList;
  }
};

export default equipmentQueries;
