/**
 * asset.page.tsx
 * Project: Splitz
 * Author: Isma27K
 * Created: 9/28/2025 11:41 PM
 */

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {Button} from "@/components/ui/button"


function AssetPage() {
    return (
        <div className="m-4">




            <div className="overflow-x-auto rounded-lg border">
                <Table className="min-w-[600px]">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px] text-center">Id</TableHead>
                            <TableHead>Account Name</TableHead>
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
                            <TableCell>Pocket Money</TableCell>
                            <TableCell className="text-center">12/9/2025</TableCell>
                            <TableCell className="text-center">29/9/2025</TableCell>
                            <TableCell className="text-center">RM 409.63</TableCell>
                            <TableCell className="text-center">
                                <Button size="sm">Action</Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                    <TableCaption className="pb-3">A list of your account.</TableCaption>
                </Table>
            </div>
        </div>
    )
}



export default AssetPage;