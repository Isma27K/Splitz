/**
 * TableRecord.component.tsx
 * Project: Splitz
 * Author: Isma27K
 * Created: 9/29/2025 10:24 PM
 */
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";


type Props = {
    id: string;
    type: string;
}


function TableRecordComponent({id, type}: Props) {
    return (
        <div>
            <div className="overflow-x-auto rounded-lg border">
                <Table className="min-w-[600px]">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px] text-center">Id</TableHead>
                            <TableHead>Account Name {id}</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead className="text-center">Created At</TableHead>
                            <TableHead className="text-center">Updated At</TableHead>
                            <TableHead className="text-center w-[120px]">Amount</TableHead>
                            <TableHead className="text-center w-[100px]">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="text-center text-muted-foreground text-sm">1.</TableCell>
                            <TableCell className="font-medium">Bank Rakyat</TableCell>
                            <TableCell>{type}</TableCell>
                            <TableCell className="text-center">12/9/2025</TableCell>
                            <TableCell className="text-center">29/9/2025</TableCell>
                            <TableCell className="text-center">RM 409.63</TableCell>
                            <TableCell className="text-center">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline">
                                            ...
                                        </Button>
                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent>
                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>Profile</DropdownMenuItem>
                                        <DropdownMenuItem>Billing</DropdownMenuItem>
                                        <DropdownMenuItem>Team</DropdownMenuItem>
                                        <DropdownMenuItem>Subscription</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                            </TableCell>
                        </TableRow>
                    </TableBody>
                    <TableCaption className="pb-3">A list of your account.</TableCaption>
                </Table>
            </div>
        </div>
    )
}


export default TableRecordComponent;