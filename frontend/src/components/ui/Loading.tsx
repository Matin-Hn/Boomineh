// src/components/ui/Loading.tsx

import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-[60vh] text-muted-foreground">
      <Loader2 className="h-6 w-6 animate-spin mr-2" />
      <span>در حال بارگذاری...</span>
    </div>
  );
};

export default Loading;
