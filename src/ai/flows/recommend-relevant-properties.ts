'use server';

/**
 * @fileOverview A property recommendation AI agent.
 *
 * - recommendRelevantProperties - A function that handles the property recommendation process.
 * - RecommendRelevantPropertiesInput - The input type for the recommendRelevantProperties function.
 * - RecommendRelevantPropertiesOutput - The return type for the recommendRelevantProperties function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendRelevantPropertiesInputSchema = z.object({
  searchHistory: z
    .string()
    .describe('The user search history, as a string.'),
  savedProperties: z
    .string()
    .describe('The user saved properties, as a string.'),
  preferences: z
    .string()
    .describe('The user stated preferences, as a string.'),
});
export type RecommendRelevantPropertiesInput = z.infer<
  typeof RecommendRelevantPropertiesInputSchema
>;

const RecommendRelevantPropertiesOutputSchema = z.object({
  propertyRecommendations: z
    .string()
    .describe('The recommended properties for the user.'),
});
export type RecommendRelevantPropertiesOutput = z.infer<
  typeof RecommendRelevantPropertiesOutputSchema
>;

export async function recommendRelevantProperties(
  input: RecommendRelevantPropertiesInput
): Promise<RecommendRelevantPropertiesOutput> {
  return recommendRelevantPropertiesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendRelevantPropertiesPrompt',
  input: {schema: RecommendRelevantPropertiesInputSchema},
  output: {schema: RecommendRelevantPropertiesOutputSchema},
  prompt: `You are an expert real estate agent specializing in property recommendations.

You will use the user's search history, saved properties, and stated preferences to recommend properties that are relevant to them.

User Search History: {{{searchHistory}}}

User Saved Properties: {{{savedProperties}}}

User Stated Preferences: {{{preferences}}}

Recommend properties that match the user's preferences and search history. Focus on the specific details provided in each category to provide personalized and accurate property recommendations.`, // Improved prompt for more specific recommendations
});

const recommendRelevantPropertiesFlow = ai.defineFlow(
  {
    name: 'recommendRelevantPropertiesFlow',
    inputSchema: RecommendRelevantPropertiesInputSchema,
    outputSchema: RecommendRelevantPropertiesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
