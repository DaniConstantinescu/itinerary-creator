"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { HugeiconsIcon } from "@hugeicons/react";
import { PlusSignIcon } from "@hugeicons/core-free-icons";

import { BY_VALUES, suggestionFormSchema } from "./schema";
import type { z } from "zod";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

type FormData = z.infer<typeof suggestionFormSchema>;

export default function AddSuggestionDialog() {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(suggestionFormSchema),
  });
  const addSuggestion = useMutation(api.suggestions.add);

  const onSubmit = (data: FormData) => {
    const hasLat = data.lat !== undefined;
    const hasLng = data.lng !== undefined;

    // runtime rule (lat/lng must come together)
    if ((hasLat && !hasLng) || (!hasLat && hasLng)) {
      return;
    }

    const payload = {
      name: data.name,
      description: data.description || undefined,
      latitude: hasLat ? Number(data.lat) : undefined,
      longitude: hasLng ? Number(data.lng) : undefined,
      adress: data.address,
      by: data.by,
    };

    addSuggestion(payload);

    setOpen(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <HugeiconsIcon icon={PlusSignIcon} />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add suggestion</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* NAME */}
          <div className="flex flex-col gap-1">
            <Label>Name *</Label>
            <Input {...register("name")} placeholder="Place name" />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* DESCRIPTION */}
          <div className="flex flex-col gap-1">
            <Label>Description</Label>
            <Textarea
              {...register("description")}
              placeholder="Optional description"
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label>Address (optional)</Label>
            <Input
              {...register("address")}
              placeholder="e.g. 12 Rue de Rivoli, Paris"
            />
            {errors.address && (
              <p className="text-sm text-red-500">{errors.address.message}</p>
            )}
          </div>

          {/* LAT / LNG */}
          <div className="flex flex-col gap-1">
            <Label>Location (optional)</Label>

            <div className="flex items-center gap-2">
              <div className="flex flex-col w-full">
                <Input
                  type="number"
                  step="any"
                  {...register("lat", { valueAsNumber: true })}
                />
              </div>

              <Separator orientation="vertical" className="h-8" />

              <div className="flex flex-col w-full">
                <Input
                  type="number"
                  step="any"
                  {...register("lng", { valueAsNumber: true })}
                />
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              Both latitude and longitude must be filled together
            </p>

            {errors.lat && (
              <p className="text-sm text-red-500">{errors.lat.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <Label>By</Label>

            <Select
              onValueChange={(value: FormData["by"]) =>
                setValue("by", value, { shouldValidate: true })
              }
              // eslint-disable-next-line react-hooks/incompatible-library
              defaultValue={watch("by")}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select person" />
              </SelectTrigger>

              <SelectContent className="p-1 min-w-55">
                {BY_VALUES.map((person) => (
                  <SelectItem
                    key={person}
                    value={person}
                    className="px-3 py-2 cursor-pointer data-highlighted:bg-muted"
                  >
                    {person.charAt(0).toUpperCase() + person.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {errors.by && (
              <p className="text-sm text-red-500">{errors.by.message}</p>
            )}
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
