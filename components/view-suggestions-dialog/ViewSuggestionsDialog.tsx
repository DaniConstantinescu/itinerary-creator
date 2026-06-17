"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { Doc } from "@/convex/_generated/dataModel";
import { ScrollBar, ScrollArea } from "../ui/scroll-area";

type Suggestion = Doc<"suggestions">;

type ViewSuggestionsDialogProps = {
  suggestions?: Suggestion[];
};

export default function ViewSuggestionsDialog({
  suggestions,
}: ViewSuggestionsDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>View Suggestions</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Suggestions</DialogTitle>
        </DialogHeader>
        {suggestions?.length === 0 ? (
          <div className="text-center text-muted-foreground">
            No suggestions yet. Be the first to add one!
          </div>
        ) : (
          <>
            <div className="rounded-md overflow-hidden max-h-[70vh] overflow-y-auto ">
              <ScrollArea>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead
                        className="text-center border-r"
                        style={{ fontSize: "1rem" }}
                      >
                        Name
                      </TableHead>

                      <TableHead className="text-center border-r">
                        Description
                      </TableHead>

                      <TableHead className="text-center border-r">By</TableHead>

                      <TableHead className="text-center border-r">
                        Adress
                      </TableHead>

                      <TableHead className="text-center">Coords</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {suggestions?.map((s) => (
                      <TableRow key={s._id}>
                        <TableCell
                          style={{
                            textAlign: "center",
                          }}
                        >
                          {s.name}
                        </TableCell>

                        <TableCell
                          className="text-muted-foreground text-ellipsis max-w-80 text-wrap"
                          style={{
                            textAlign: "center",
                            textWrap: "auto",
                          }}
                        >
                          {s.description || "—"}
                        </TableCell>

                        <TableCell
                          style={{
                            textAlign: "center",
                          }}
                        >
                          {s.by.charAt(0).toUpperCase() + s.by.slice(1)}
                        </TableCell>

                        <TableCell
                          className="text-muted-foreground text-ellipsis max-w-80 text-wrap"
                          style={{
                            textAlign: "center",
                            textWrap: "auto",
                          }}
                        >
                          {s.adress || "—"}
                        </TableCell>

                        <TableCell
                          style={{
                            textAlign: "center",
                          }}
                        >
                          {s.location
                            ? `Lat: ${s.location.lat}, Lng: ${s.location.long}`
                            : "—"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
