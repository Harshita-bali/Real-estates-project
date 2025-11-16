import { RecommendationForm } from "./recommendation-form";
import { Lightbulb } from "lucide-react";

export default function RecommendationsPage() {
  return (
    <div className="container max-w-4xl py-12">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
          <Lightbulb className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold">AI-Powered Recommendations</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Let our AI analyze your activity to find hidden gems. The more details you provide, the better the recommendations will be.
        </p>
      </div>
      <RecommendationForm />
    </div>
  );
}
