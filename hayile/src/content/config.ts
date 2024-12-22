import { defineCollection, z } from "astro:content";

const shortcutsCollection = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    program: z.array(
      z.object({
        operativeSystem: z.string(),
        environment: z.string(),
        shortcuts: z.array(
          z.object({
            title: z.string(),
            values: z.array(
              z.object({
                description: z.string(),
                command: z.string(),
                additionalCommand: z.string().optional(),
              })
            ),
          })
        ),
      })
    ),
  }),
});

export const collections = {
  shortcuts: shortcutsCollection,
};
