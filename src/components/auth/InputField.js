"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function InputField({ id, label, type = "text", register, error }) {
  return (
    <div className="mb-4">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        {...register(id)}
        className={error ? "border-red-500" : ""}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}
