import { object, string } from "joi";

export const schemaPost = object({
  name: string().alphanum().min(3).max(30).required(),
  email: string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  phone: string().alphanum().required(),
});

export const schemaPut = object({
  name: string().alphanum().min(3).max(30).optional(),
  email: string()
    .email({
      minDomainSegments: 2,
    })
    .optional(),
  phone: string().alphanum().optional(),
});
