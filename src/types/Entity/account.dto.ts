/**
 * account.dto.ts
 * Project: Splitz
 * Author: Isma27K
 * Created: 9/30/2025 10:10 PM
 */
import {RecordDto} from "@/types/Entity/record.dto.ts";

export interface AccountDTO {
    id: number;
    name: string;
    type: string;
    sum: number;
    proportion: number;
    createAt: string;   // Dates come over IPC as strings
    updatedAt: string;
    records: RecordDto;
}
