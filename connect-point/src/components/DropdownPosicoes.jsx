"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger, } from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import * as React from "react"

export default function DropdownPosicoes() {
    const [position, setPosition] = React.useState("Posição")
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{position}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Posição</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value="Goleira">Goleira</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Zagueira">Zagueira</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Lateral">Lateral</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Meio-campo">Meio-campo</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Atacante">Atacante</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
)}