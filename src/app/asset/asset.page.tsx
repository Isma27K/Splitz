/**
 * asset.page.tsx
 * Project: Splitz
 * Author: Isma27K
 * Created: 9/28/2025 11:41 PM
 */

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Alert, AlertDescription} from "@/components/ui/alert"
import AssetSheet from "@/app/asset/Sheet.component.tsx";
import {AccountDTO} from '@/types/Entity/account.dto.ts'
import {useEffect, useState} from "react";
import {Wallet} from "lucide-react";
import TableRecordComponent from "@/app/asset/TableRecord.component.tsx";


function AssetPage() {
    const [accounts, setAccounts] = useState<AccountDTO[]>([]);
    const [activeTab, setActiveTab] = useState<string>('');
    const [activeId, setActiveId] = useState<number>(0);

    const fetchAccounts = async () => {
        try {
            const result = await window.account.getAllAccount();
            console.log(result);
            setAccounts(result);
            if (result.length > 0 && !activeTab) {
                setActiveTab(result[0].name);
                setActiveId(result[0].id);
            }
        } catch (err) {
            console.error("Failed to fetch accounts:", err);
        }
    };

    useEffect(() => {
        fetchAccounts();
    }, []);

    return (
        <div className="m-4">
            <Tabs className="w-full my-3" value={activeTab} onValueChange={setActiveTab}>

                {/* Flex row for tabs + button */}
                <div className="flex items-center justify-between">
                    {accounts.length > 0 ? (
                        <>
                            <TabsList className="bg-[lightgray]">
                                {accounts.map((acc) => (
                                    <TabsTrigger key={acc.id} value={acc.name} onClick={() => {setActiveId(acc.id)}}>
                                        {acc.name}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </>
                    ):(
                        <Alert className="flex-1 mr-4">
                            <Wallet className="h-4 w-4" />
                            <AlertDescription>
                                No accounts found. Create your first account to get started.
                            </AlertDescription>
                        </Alert>
                    )}

                    {/* Button on the right */}
                    <AssetSheet onAccountCreated={fetchAccounts} accountId={activeId}/>
                </div>

                {accounts.map((acc) => (
                    <TabsContent value={acc.name} key={acc.id}>
                        <TableRecordComponent
                            records={acc.records}
                        />
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    )
}

export default AssetPage;