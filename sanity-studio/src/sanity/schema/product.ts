export default {
  name: "product",
  title: "Products",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (Rule: any) => Rule.required().min(2).max(100),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "gender",
      title: "Gender",
      type: "string",
      options: {
        list: [
          { title: "Men", value: "men" },
          { title: "Women", value: "women" },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "price",
      title: "Price (USD)",
      type: "number",
      validation: (Rule: any) => Rule.required().positive().min(0),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (Rule: any) => Rule.required().min(10).max(500),
    },
    {
      name: "image",
      title: "Product Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
        },
      ],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "bestseller",
      title: "Best Seller",
      type: "boolean",
      defaultValue: false,
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Eau de Parfum", value: "eau_de_parfum" },
          { title: "Eau de Toilette", value: "eau_de_toilette" },
          { title: "Parfum", value: "parfum" },
          { title: "Cologne", value: "cologne" },
        ],
      },
    },
    {
      name: "inStock",
      title: "In Stock",
      type: "boolean",
      defaultValue: true,
    },
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
      subtitle: "price",
    },
    prepare(selection: any) {
      const { title, media, subtitle } = selection;
      return {
        title,
        media,
        subtitle: `$${subtitle}`,
      };
    },
  },
};
