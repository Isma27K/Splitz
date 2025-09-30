/**
 * dayDatePicker.tsx
 * Project: Splitz
 * Author: Isma27K
 * Created: 9/28/2025 8:07 PM
 */


"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";

interface DayPickerProps {
    day: number | null;
    onDayChange: (day: number) => void;
}

export function DayPicker({ day, onDayChange }: DayPickerProps) {
    const [open, setOpen] = React.useState(false);
    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(undefined);

    const handleSelect = (date: Date) => {
        setSelectedDate(date);
        const dayOfMonth = date.getDate();
        onDayChange(dayOfMonth);
        setOpen(false);
    };

    return (
        <div className="flex flex-col gap-2 w-full">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-36 justify-between">
                        {day != null ? String(day) : "Pick a day"}
                        <ChevronDownIcon />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={handleSelect}
                        required
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}
