import { CollectionConfig } from "payload/types";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
        name: "role",
        defaultValue: "user",
        required: true,
        admin: {
          condition: () => true,
        },
        type: "select",
        options: [
            {
                label: "Admin",
                value: "admin",
            },
            {
                label: "User",
                value: "user",
            },
        ],
    },
  ],
};
