"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger, } from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import * as React from "react"

export default function DropdownPosicoes({id, value, onChange, variant}) {

    const handleValueChange = (newValue) => {
      const fakeEvent = {
        target: {id, value: newValue}
    }
    onChange(fakeEvent)
  }
    
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={variant} size="wmax">{value}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Posição</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={value} onValueChange={handleValueChange}>
            <DropdownMenuRadioItem value="Goleira">Goleira</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="Zagueira">Zagueira</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="Lateral">Lateral</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="Meio-campo">Meio-campo</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="Atacante">Atacante</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
  )}  