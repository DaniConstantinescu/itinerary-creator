"use client";
import AddSuggestionDialog from "@/components/add-suggestion-dialog/AddSuggestionDialog";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ViewSuggestionsDialog from "@/components/view-suggestions-dialog/ViewSuggestionsDialog";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Home() {
  const suggestions = useQuery(api.suggestions.get);
  const pins = suggestions?.map((s) => {
    return { ...s.location, name: s.name };
  });

  const Map = dynamic(() => import("@/components/map/Map"), {
    ssr: false,
  });

  return (
    <div
      className=" md:mt-20 md:mb-10 md:mx-40 h-[calc(100vh-5rem)] flex"
      style={{
        marginTop: "2rem",
        marginLeft: "0.5rem",
        marginRight: "0.5rem",
      }}
    >
      <Card className="h-full w-full">
        <CardHeader>
          <div className="flex gap-2 items-center">
            <ViewSuggestionsDialog suggestions={suggestions} />
            <AddSuggestionDialog />
          </div>
        </CardHeader>
        <CardContent className="w-full flex-1">
          <div className="h-full min-h-125">
            <Map pins={pins} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
