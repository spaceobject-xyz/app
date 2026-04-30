import type { ComponentProps } from "react";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

function formatWithCommas(value: number): string {
  return value.toLocaleString(undefined, { maximumFractionDigits: 20 });
}

function parseDisplay(display: string): number | null {
  const stripped = display.replace(/,/g, "");
  const num = parseFloat(stripped);
  return Number.isNaN(num) ? null : num;
}

export function NumberInput({
  onChange,
  value,
  formatted,
  onBlur,
  onFocus,
  ...props
}: Omit<ComponentProps<typeof Input>, "type" | "onChange" | "value"> & {
  onChange: (value: number | null) => void;
  value: undefined | null | number;
  formatted?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const [display, setDisplay] = useState(
    value != null && formatted ? formatWithCommas(value) : ""
  );

  useEffect(() => {
    if (!focused) {
      setDisplay(
        value != null
          ? formatted
            ? formatWithCommas(value)
            : String(value)
          : ""
      );
    }
  }, [value, focused, formatted]);

  if (!formatted) {
    return (
      <Input
        {...props}
        type="number"
        onChange={(e) => {
          const number = e.target.valueAsNumber;
          onChange(Number.isNaN(number) ? null : number);
        }}
        value={value ?? ""}
        onBlur={onBlur}
        onFocus={onFocus}
      />
    );
  }

  return (
    <Input
      {...props}
      type="text"
      inputMode="decimal"
      value={display}
      onChange={(e) => {
        const raw = e.target.value;
        setDisplay(raw);
        onChange(parseDisplay(raw));
      }}
      onFocus={(e) => {
        setFocused(true);
        setDisplay(value != null ? String(value) : "");
        onFocus?.(e);
      }}
      onBlur={(e) => {
        setFocused(false);
        const num = parseDisplay(display);
        setDisplay(num != null ? formatWithCommas(num) : "");
        onBlur?.(e);
      }}
    />
  );
}

export function InputGroupNumberInput({
  className,
  ...props
}: React.ComponentProps<typeof NumberInput>) {
  return (
    <NumberInput
      data-slot="input-group-control"
      className={cn(
        "flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0 dark:bg-transparent",
        className
      )}
      {...props}
    />
  );
}
