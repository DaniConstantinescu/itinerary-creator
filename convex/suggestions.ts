import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("suggestions").collect();
  },
});

export const add = mutation({
  args: {
    name: v.string(),
    description: v.optional(v.string()),
    latitude: v.optional(v.number()),
    longitude: v.optional(v.number()),
    adress: v.optional(v.string()),
    by: v.string(),
  },
  handler: async (ctx, args) => {
    let latAndLong = undefined;
    if (args.latitude && args.longitude) {
      if (args.latitude < -90 || args.latitude > 90) {
        throw new Error("Invalid latitude");
      }

      if (args.longitude < -180 || args.longitude > 180) {
        throw new Error("Invalid longitude");
      }

      latAndLong = {
        lat: args.latitude,
        long: args.longitude,
      };
    }

    await ctx.db.insert("suggestions", {
      name: args.name,
      description: args.description,
      location: latAndLong,
      adress: args.adress,
      by: args.by,
    });
  },
});
