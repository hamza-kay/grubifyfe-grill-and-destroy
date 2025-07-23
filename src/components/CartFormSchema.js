// components/CartFormSchema.js
import { z } from "zod";

export const FormSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50)
    .regex(/^[a-zA-Z-' ]+$/, "Only letters, hyphens, apostrophes allowed"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50)
    .regex(/^[a-zA-Z-' ]+$/, "Only letters, hyphens, apostrophes allowed"),
  email: z.string().email("Enter a valid email"),
  phoneNumber: z
    .string()
    .min(8, "Phone number is too short")
    .max(20)
    .regex(/^[\d+\-\s().]+$/, "Invalid phone number"),
  fulfillmentType: z.enum(["DELIVERY", "PICKUP"]),
  deliveryAddress: z.string().optional(),
  apartment: z.string().optional(),
  postcode: z.string().optional(),
  city: z.string().optional(),
  notes: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.fulfillmentType === "DELIVERY") {
    if (!data.deliveryAddress?.trim()) {
      ctx.addIssue({
        path: ["deliveryAddress"],
        code: z.ZodIssueCode.custom,
        message: "Delivery address is required",
      });
    }
    if (!data.postcode?.trim()) {
      ctx.addIssue({
        path: ["postcode"],
        code: z.ZodIssueCode.custom,
        message: "Postcode is required",
      });
    }
    if (!data.city?.trim()) {
      ctx.addIssue({
        path: ["city"],
        code: z.ZodIssueCode.custom,
        message: "City is required",
      });
    }
  }
});
