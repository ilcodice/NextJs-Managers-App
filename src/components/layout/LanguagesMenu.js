"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { setLanguage } from "@/redux/settingsSlice";

export default function LanguageMenu() {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.settings.language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          Sprache: {language === "js" ? "JavaScript" : "Python"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => dispatch(setLanguage("js"))}>
          JavaScript
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => dispatch(setLanguage("py"))}>
          Python
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
