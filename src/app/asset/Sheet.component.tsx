/**
 * Sheet.component.tsx
 * Project: Splitz
 * Author: Isma27K
 * Created: 9/29/2025 11:02 PM
 */
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {Button} from "@/components/ui/button.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import { useState } from "react";
import {AccountType} from "../../../electron/database/entities/enum/account_type.ts";
import { toast } from "sonner"

type AssetSheetProps = {
    accountId: number;
    onAccountCreated?: () => void;
};

function AssetSheet({ onAccountCreated, accountId }: AssetSheetProps) {
    // For Account Creation
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [proportion, setProportion] = useState<number | ''>('')

    // For New Entry
    const [recName, setRecName] = useState("");
    const [recDesc, setRecDesc] = useState("");
    const [sum, setSum] = useState<number | ''>('');

    // For Page
    const [open, setOpen] = useState(false)

    const handleCreateAccount = async () => {
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


    const handleCreateEntry = async () => {

        console.log("Inserting Record")
        console.log({
            "name": recName,
            "description": recDesc,
            "sum": sum,
            "accountId": accountId,
        })

        const parsedSum = parseFloat(Number(sum).toFixed(2));
        const result = await window.account.createRecord(recName, recDesc, parsedSum, accountId);

        toast.info(result)

    }

    return (
        <div className="my-3 flex justify-end">
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Button className="w-[200px]">New</Button>
                </SheetTrigger>

                <SheetContent className="flex flex-col">
                    <SheetHeader>
                        <SheetTitle>Create New</SheetTitle>
                        <SheetDescription>
                            Create a new entry or account.
                        </SheetDescription>
                    </SheetHeader>

                    <Separator className="my-3" />

                    <Tabs defaultValue="entry" className="flex-1 flex flex-col overflow-hidden">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="entry">New Entry</TabsTrigger>
                            <TabsTrigger value="account">New Account</TabsTrigger>
                        </TabsList>

                        {/*Create New Entry: Place To Record The Cash*/}
                        <TabsContent value="entry" className="flex-1 mt-0 data-[state=active]:flex data-[state=active]:flex-col">
                            <div className="flex-1 overflow-y-auto">
                                <form className="space-y-4 p-1">
                                    <div className="space-y-2">
                                        <Label htmlFor="rec_name">
                                            Name <span className="text-muted-foreground font-normal">(optional)</span>
                                        </Label>
                                        <Input id="acc_name" type="text" value={recName} onChange={e => setRecName(e.target.value)} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="rec_desc">
                                            Description <span className="text-muted-foreground font-normal">(optional)</span>
                                        </Label>
                                        <Input id="rec_desc" type="text" value={recDesc} onChange={e => setRecDesc(e.target.value)} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="rec_sum">
                                            Sum (RM) <span className="text-destructive">*</span>
                                        </Label>
                                        <Input
                                            id="rec_sum"
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            value={sum}
                                            onChange={e => {
                                                const value = e.target.value;
                                                setSum(value === '' ? '' : parseFloat(value));
                                            }}
                                            placeholder="0.00"
                                            required
                                        />
                                    </div>
                                </form>
                            </div>

                            <div className="pt-4">
                                <Button type="button" className="w-full" onClick={handleCreateEntry}>
                                    Create
                                </Button>
                            </div>
                        </TabsContent>

                        {/*Create New Account*/}
                        <TabsContent value="account" className="flex-1 mt-0 data-[state=active]:flex data-[state=active]:flex-col">
                            <div className="flex-1 overflow-y-auto">
                                <form className="space-y-4 p-1">
                                    <div className="space-y-2">
                                        <Label htmlFor="acc_name">Account Name</Label>
                                        <Input id="acc_name" type="text" value={name} onChange={e => setName(e.target.value)} required />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Account Type</Label>
                                        <Select
                                            value={type}
                                            onValueChange={setType}
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
                            </div>

                            {/* Save button pinned bottom */}
                            <div className="pt-4">
                                <Button type="button" className="w-full" onClick={handleCreateAccount}>
                                    Create
                                </Button>
                            </div>
                        </TabsContent>
                    </Tabs>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default AssetSheet;