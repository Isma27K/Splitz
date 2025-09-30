/**
 * Sheet.component.tsx
 * Project: Splitz
 * Author: Isma27K
 * Created: 9/29/2025 11:02 PM
 */
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import {Button} from "@/components/ui/button.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import { useState } from "react";
import {AccountType} from "../../../electron/database/entities/enum/account_type.ts";
import { toast } from "sonner"

type AssetSheetProps = {
    onAccountCreated?: () => void;
};

function AssetSheet({ onAccountCreated }: AssetSheetProps) {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [proportion, setProportion] = useState<number | ''>('')
    const [open, setOpen] = useState(false)

    const handleCreate = async () => {
        // validate and save logic here...
        console.log("Saving proportion:", proportion)

        const result = await window.account.createAccount(name, type, Number(proportion));

        if(result){
            toast.success("Account created successfully.")
            onAccountCreated?.();
            // ✅ close sheet
            setOpen(false)
        }
        else {
            toast.error("Account created failed")
        }

        console.log(result);
    }
    return (
        <div className="my-3 flex justify-end">
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Button className="w-[200px]">New</Button>
                </SheetTrigger>

                <SheetContent className="flex flex-col">
                    <SheetHeader>
                        <SheetTitle>Create Account</SheetTitle>
                        <SheetDescription>
                            Fill in the details for your new account here.
                        </SheetDescription>
                    </SheetHeader>

                    <Separator className="my-3" />

                    {/* Form area grows */}
                    <form className="flex-1 space-y-4 overflow-y-auto p-1">
                        <div className="space-y-2">
                            <Label htmlFor="acc_name">Account Name</Label>
                            <Input id="acc_name" type="text" value={name} onChange={e => setName(e.target.value)} required />
                        </div>

                        <div className="space-y-2">
                            <Label>Account Type</Label>
                            <Select
                                value={type}                // bind state
                                onValueChange={setType}     // update state when user selects
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={AccountType.POCKET_MONEY}>Pocket Money</SelectItem>
                                    <SelectItem value={AccountType.SHORT_TERM}>Short Term</SelectItem>
                                    <SelectItem value={AccountType.LONG_TERM}>Long Term</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="acc_proportion">Proportion</Label>
                            <div className="relative">
                                <Input
                                    id="acc_proportion"
                                    type="number"
                                    min={0}
                                    max={100}
                                    value={proportion}
                                    onChange={(e) => {
                                        let value = Number(e.target.value)
                                        if (isNaN(value)) {
                                            setProportion('')
                                        } else {
                                            // clamp between 0 and 100
                                            if (value < 0) value = 0
                                            if (value > 100) value = 100
                                            setProportion(value)
                                        }
                                    }}
                                    className="pr-10"
                                    required
                                />
                                <span className="absolute inset-y-0 right-3 flex items-center text-muted-foreground">
                                    %
                                  </span>
                            </div>
                        </div>


                    </form>

                    {/* Save button pinned bottom */}
                    <div className="mt-auto pt-4">
                        <Button type="button" className="w-full" onClick={handleCreate}>
                            Create
                        </Button>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default AssetSheet;