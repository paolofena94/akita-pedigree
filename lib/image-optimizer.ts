// lib/image-optimizer.ts
import imageCompression from "browser-image-compression";

/**
 * Compresses an image file, resizes it to a maximum of 1200px,
 * and converts it to WebP format, ensuring the file size is under ~200KB.
 */
export async function optimizeImageToWebP(file: File): Promise<File> {
    const options = {
        maxSizeMB: 0.2,            // Max 200 KB
        maxWidthOrHeight: 1200,    // No side longer than 1200px
        useWebWorker: true,        // Utilize device's multi-core processing
        fileType: "image/webp" as const, // Force WebP output
        initialQuality: 0.85       // 85% starting quality
    };

    try {
        const compressedBlob = await imageCompression(file, options);
        
        // Extract the original name without the extension to create a clean file
        const originalName = file.name.replace(/\.[^/.]+$/, ""); 
        
        return new File(
            [compressedBlob], 
            `${originalName}.webp`, 
            { type: "image/webp" }
        );
    } catch (error) {
        console.error(`Error during optimization of file ${file.name}:`, error);
        
        // 🌟 STRICT FAIL FAST: We throw an error instead of returning the heavy original file.
        // This protects the Supabase bucket from unexpectedly large uploads.
        throw new Error(`Failed to optimize image: ${file.name}`);
    }
}