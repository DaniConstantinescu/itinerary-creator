import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  suggestions: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    by: v.string(),
    adress: v.optional(v.string()),
    location: v.optional(
      v.object({
        lat: v.float64(),
        long: v.float64(),
      }),
    ),
  }),
});
