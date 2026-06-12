import { z } from "zod";

export const BY_VALUES = ["ale", "dani", "elena", "marius"] as const;

export const suggestionFormSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    address: z.string().optional(),

    lat: z.number().optional(),
    lng: z.number().optional(),

    by: z.enum(BY_VALUES),
  })
  .refine(
    (data) => {
      const hasLat = data.lat !== undefined;
      const hasLng = data.lng !== undefined;

      return !(hasLat && !hasLng) && !(hasLng && !hasLat);
    },
    {
      message: "Latitude and Longitude must be filled together",
      path: ["lat"], // or "lng"
    },
  );
