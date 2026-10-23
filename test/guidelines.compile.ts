import type { CreateParams } from "../src/index.js";

type Assert<T extends true> = T;
type IsOptional<T, K extends keyof T> = {} extends Pick<T, K> ? true : false;
type Guideline = NonNullable<CreateParams["guidelines"]>[number];

export type GuidelinesAreOptional = Assert<IsOptional<CreateParams, "guidelines">>;
export type GuidelineCategories = Assert<
  [Guideline["category"]] extends ["nsfw" | "violence" | "profanity"] ? true : false
>;
export type GuidelineBehaviors = Assert<
  [Guideline["behavior"]] extends ["decline"] ? true : false
>;

export const guidelinesExample = {
  model: "grok-released-after-this-sdk",
  input: "Hello",
  guidelines: [
    { type: "policy", category: "violence", behavior: "decline" },
    { type: "policy", category: "nsfw", behavior: "decline" },
  ],
} satisfies CreateParams;

export const unknownCategoryIsRejected = {
  model: "grok-released-after-this-sdk",
  input: "Hello",
  // @ts-expect-error: not a GuidelineCategory
  guidelines: [{ type: "policy", category: "gambling", behavior: "decline" }],
} satisfies CreateParams;
