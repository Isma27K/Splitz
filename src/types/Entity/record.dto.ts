/**
 * record.dto.ts
 * Project: Splitz
 * Author: Isma27K
 * Created: 9/30/2025 11:19 PM
 */

export interface RecordDto {
    id: number;
    name?: string;
    description?: string;
    sum: number;
    createAt: Date;
    updatedAt: Date;
    account?: number | null;
    commitment?: number | null;
}