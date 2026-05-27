import { z } from "zod";
import { REPORT_REASONS } from "@/config/report";

const reasonValues = REPORT_REASONS.map(r => r.value) as [string, ...string[]];

export const reportSchema = z.object({
    // 🌟 FIX: Zod accetta direttamente 'message' (o 'error') per l'enum
    reason: z.enum(reasonValues, {
        message: "Please select a reason for reporting.",
    }),
    description: z
        .string()
        .min(10, { message: "Description must be at least 10 characters." })
        .max(2000, { message: "Description cannot exceed 2000 characters." }),
    referenceUrl: z.url({ message: "Please enter a valid URL." }).optional().or(z.literal("")),
    selectedFields: z.array(z.string()).optional(),
    selectedMedia: z.array(z.string()).optional(),
}).superRefine((data, ctx) => {
    const config = REPORT_REASONS.find(r => r.value === data.reason);
    if (!config) return;

    if (config.isUrlMandatory && (!data.referenceUrl || data.referenceUrl.trim() === "")) {
        ctx.addIssue({
            code: "custom", // 🌟 FIX: Usiamo la stringa raw
            message: "Reference URL is mandatory for this reason.",
            path: ["referenceUrl"],
        });
    }

    if (config.requiresFieldSelection && (!data.selectedFields || data.selectedFields.length === 0)) {
        ctx.addIssue({
            code: "custom", // 🌟 FIX: Usiamo la stringa raw
            message: "Please select at least one inaccurate field.",
            path: ["selectedFields"],
        });
    }

    if (config.requiresMediaSelection && (!data.selectedMedia || data.selectedMedia.length === 0)) {
         ctx.addIssue({
            code: "custom", // 🌟 FIX: Usiamo la stringa raw
            message: "Please select at least one media item.",
            path: ["selectedMedia"],
        });
    }
});

export type ReportFormValues = z.infer<typeof reportSchema>;