/**
 * page-loading.tsx
 * Project: Splitz
 * Author: Isma27K
 * Created: 9/22/2025 11:00 PM
 */

import { Loader2 } from 'lucide-react';

const LoadingPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin" />
        </div>
    );
};

export default LoadingPage;