/* eslint-disable @typescript-eslint/no-explicit-any */
import { createPortal } from "react-dom";
import { CheckCircle2Icon, InfoIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function AlertDemo({ status, title, desc }: any) {
  return createPortal(
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[9999] w-full max-w-sm">
      <Alert
        className={`text-white shadow-lg border ${
          status === "success"
            ? "border-green-500/40 bg-green-500/10"
            : "border-red-500/40 bg-red-500/10"
        }`}
      >
        {status === "success" ? (
          <CheckCircle2Icon className="h-5 w-5 text-green-500" />
        ) : (
          <InfoIcon className="h-5 w-5 text-red-500" />
        )}

        <AlertTitle>
          {status === "success" ? `${title} successful` : `${title} failed`}
        </AlertTitle>

        <AlertDescription>{desc}</AlertDescription>
      </Alert>
    </div>,
    document.body
  );
}