"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ConnectKitButton } from "connectkit";

export function LoginModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Login</Button>
      </DialogTrigger>
      <DialogContent
        onClick={(e) => e.stopPropagation()}
        className="border-white/10 bg-zinc-900 text-white sm:max-w-md"
      >
        <DialogHeader>
          <DialogTitle>Login to your account</DialogTitle>
        </DialogHeader>

        <div className="mt-6 flex flex-col items-start gap-8 rounded-xl border border-white/10 bg-black/40 px-6 pt-6 pb-4">
          <ConnectKitButton />

          <p className="text-sm">
            No account yet?{" "}
            <span className="text-primary hover:text-primary/80 text-[15px] hover:cursor-pointer">
              Sign up
            </span>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
