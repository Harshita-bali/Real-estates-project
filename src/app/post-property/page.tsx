import { PostPropertyForm } from "./post-property-form";

export default function PostPropertyPage() {
  return (
    <div className="container max-w-3xl py-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold">List Your Property</h1>
        <p className="mt-2 text-muted-foreground">
          Fill out the form below to get your property listed on ApnaAddress.
        </p>
      </div>
      <PostPropertyForm />
    </div>
  );
}
