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

import { setFontSize } from "@/redux/settingsSlice";

const FONT_SIZES = [12, 14, 16, 18, 20];

export default function FontSizeMenu() {
  const dispatch = useDispatch();
  const fontSize = useSelector((state) => state.settings.fontSize);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Schriftgröße: {fontSize}px</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {FONT_SIZES.map((size) => (
          <DropdownMenuItem key={size} onClick={() => dispatch(setFontSize(size))}>
            {size}px
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
