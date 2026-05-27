"use client";

import { Maximize, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogTrigger, DialogContent, DialogTitle, DialogDescription, Dialog } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface EntityProfileImageProps {
    src?: string | null;
    fallback: string;
    fallbackClassName?: string;
    alt: string;
    description?: string | null;
    copyright?: string | null;
    className?: string;
}

export function EntityProfileImage({
    src,
    fallback,
    fallbackClassName,
    alt,
    description,
    copyright,
    className
}: EntityProfileImageProps) {
    return (
        <div className={cn("inline-block relative group", className)}>
            {src ? (
                <>
                    <img
                        src={src}
                        className="w-40 h-40 rounded-3xl object-cover border-4 border-white bg-slate-100 shadow-sm relative z-10"
                        alt={alt}
                    />

                    {/* Ingrandimento */}
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                variant="secondary"
                                size="icon"
                                className="absolute top-2 left-2 h-7 w-7 rounded-full bg-white/80 backdrop-blur-md text-slate-800 hover:bg-white/90 shadow-inner transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer z-20"
                            >
                                <Maximize className="h-3 w-3" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-[95vw] w-fit p-0 bg-transparent border-none shadow-none flex justify-center items-center">
                            <DialogTitle className="sr-only">Profile Image</DialogTitle>
                            <DialogDescription className="sr-only">Vista ingrandita di {alt}</DialogDescription>
                            <img
                                src={src}
                                className="max-h-[80vh] max-w-[80vw] object-contain"
                                alt={`${alt} (Ingrandita)`}
                            />
                        </DialogContent>
                    </Dialog>

                    {/* Info Copyright */}
                    {(description || copyright) && (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="secondary"
                                    size="icon"
                                    className="absolute top-2 right-2 h-7 w-7 rounded-full bg-white/80 backdrop-blur-md text-slate-800 hover:bg-white/90 shadow-inner transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer z-20"
                                >
                                    <Info className="h-3.5 w-3.5" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="p-4 w-64 text-sm bg-card" align="start" side="right" sideOffset={10}>
                                <div className="space-y-6">
                                    {description && (
                                        <div>
                                            <h4 className="font-semibold text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Description</h4>
                                            <p>{description}</p>
                                        </div>
                                    )}
                                    {copyright && (
                                        <div>
                                            <h4 className="font-semibold text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Copyright</h4>
                                            <p className="font-medium">© {copyright}</p>
                                        </div>
                                    )}
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </>
            ) : (
                <div className={cn(
                    "w-40 h-40 rounded-3xl bg-slate-300 text-primary-foreground flex items-center justify-center text-5xl font-bold border-4 border-background shadow-lg relative z-10",
                    fallbackClassName
                )}>
                    {fallback}
                </div>
            )}
        </div>
    );
}