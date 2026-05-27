import z from "zod";

export const EntityMediaSchema = z.object({
    src: z.string().min(1, "Image source is required"),
    
    description: z.string()
        .max(500, "Description cannot exceed 500 characters")
        .optional(),
        
    copyright: z.string()
        .max(100, "Copyright cannot exceed 100 characters")
        .optional(),
        
    file: z.any().optional(),
});