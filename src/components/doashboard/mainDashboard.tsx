/**
 * mainDashboard.tsx
 * Project: Splitz
 * Author: Isma27K
 * Created: 9/24/2025 10:17 PM
 */
import {SectionCards} from "../section-cards.tsx";


function mainDashboard() {
    return (
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    <SectionCards />
                </div>
            </div>
        </div>
    )
}


export default mainDashboard;