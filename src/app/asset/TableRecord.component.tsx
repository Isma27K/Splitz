/**
 * TableRecord.component.tsx
 * Project: Splitz
 * Author: Isma27K
 * Created: 9/29/2025 10:24 PM
 */

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {FileX} from "lucide-react";
import {RecordDto} from "@/types/Entity/record.dto.ts";


interface TableRecordProps {
    records: RecordDto[];
}

function TableRecordComponent({ records }: TableRecordProps) {
    return (
        <div>
            <div className="overflow-x-auto rounded-lg border">
                <Table className="min-w-[600px]">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px] text-center">Id</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="text-center">Created At</TableHead>
                            <TableHead className="text-center w-[120px]">Amount</TableHead>
                            <TableHead className="text-center w-[100px]">Action</TableHead>
                        </TableRow>
                    </TableHeader>


                    <TableBody>

                        {(records.length > 0) ? (
                            <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center">
                                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                                        <FileX className="h-8 w-8 mb-2" />
                                        <p className="text-sm">No records found</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ):(
                            <TableRow>
                                <TableCell className="text-center text-muted-foreground text-sm">1</TableCell>
                                <TableCell className="font-medium">Duit Kereta</TableCell>
                                <TableCell>Bayar Duit Kereta untuk bulan 10</TableCell>
                                <TableCell className="text-center">4/10/2025</TableCell>
                                <TableCell className="text-center">Rm -1000.00</TableCell>
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
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}


export default TableRecordComponent;