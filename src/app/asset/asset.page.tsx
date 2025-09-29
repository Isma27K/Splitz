/**
 * asset.page.tsx
 * Project: Splitz
 * Author: Isma27K
 * Created: 9/28/2025 11:41 PM
 */

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TableRecordComponent from "@/app/asset/TableRecord.component.tsx";
import AssetSheet from "@/app/asset/Sheet.component.tsx";


function AssetPage() {
    return (
        <div className="m-4">
            <Tabs defaultValue="pocket_money" className="w-full my-3">
                {/* Flex row for tabs + button */}
                <div className="flex items-center justify-between">
                    <TabsList className="bg-[lightgray]">
                        <TabsTrigger value="pocket_money">Pocket Money</TabsTrigger>
                        <TabsTrigger value="short_term">Short Term</TabsTrigger>
                        <TabsTrigger value="long_term">Long Term</TabsTrigger>
                    </TabsList>

                    {/* Button on the right */}
                    <AssetSheet />
                </div>

                <TabsContent value="pocket_money">
                    <TableRecordComponent id={"1"} type={"Pocket Money"} />
                </TabsContent>
                <TabsContent value="short_term">
                    <TableRecordComponent id={"2"} type={"Short Term"} />
                </TabsContent>
                <TabsContent value="long_term">
                    <TableRecordComponent id={"3"} type={"Long Term"} />
                </TabsContent>
            </Tabs>
        </div>
    )
}




export default AssetPage;