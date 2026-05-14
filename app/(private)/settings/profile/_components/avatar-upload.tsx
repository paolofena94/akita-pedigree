"use client"

import { useState, useRef, ChangeEvent } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button, buttonVariants } from "@/components/ui/button"
import { User, Loader2, UploadCloud, RefreshCw, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { avatarFileSchema } from "@/lib/validations/user"
import { uploadAvatarAction, removeAvatarAction } from "@/actions/user"
import { cn } from "@/lib/utils"

interface AvatarUploadProps {
  currentAvatarUrl: string | null
  username: string
}

export default function AvatarUpload({ currentAvatarUrl, username }: AvatarUploadProps) {
  const [loading, setLoading] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(currentAvatarUrl)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setLoading(true)
    
    try {
      const validation = avatarFileSchema.safeParse({ file })
      if (!validation.success) {
        toast.error(validation.error.issues[0].message)
        if (fileInputRef.current) fileInputRef.current.value = "" 
        return
      }

      const formData = new FormData()
      formData.append("file", file)

      toast.info("Uploading your new avatar...")

      const result = await uploadAvatarAction(formData)

      if (result.success && result.url) {
        setAvatarUrl(result.url)
        toast.success("Avatar updated!")
      } else {
        toast.error(result.error || "An error occurred during upload.")
      }
    } catch (error) {
      toast.error("Critical error. Please try again.")
    } finally {
      setLoading(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  const handleRemoveAvatar = async () => {
    setLoading(true)
    toast.info("Removing your avatar...")
    try {
      const result = await removeAvatarAction()
      if (result.success) {
        setAvatarUrl(null)
        toast.success("Avatar removed.")
      } else {
        toast.error(result.error || "An error occurred during removal.")
      }
    } catch (error) {
      toast.error("Critical error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-5 w-full md:w-auto md:pr-8">
      {/* Etichetta superiore */}
      <div className="w-full text-center">
        <span className="text-sm font-medium">Avatar</span>
      </div>

      <div className="flex flex-col items-center gap-5">
        
        {/* Cerchio dell'Avatar */}
        <div className="relative group">
          {avatarUrl ? (
            // STATO 1: AVATAR PRESENTE (Stessa dimensione del fallback)
            <Avatar className="w-28 h-28 md:w-32 md:h-32 border shadow-sm transition-all">
              <AvatarImage src={avatarUrl} alt={username} className="object-cover" />
              <AvatarFallback className="bg-transparent text-muted-foreground">
                {loading ? <Loader2 className="w-8 h-8 animate-spin text-primary/50" /> : <User className="w-10 h-10 opacity-50" strokeWidth={1.5} />}
              </AvatarFallback>
            </Avatar>
          ) : (
            // STATO 2: AVATAR MANCANTE
            <Label 
              htmlFor="avatar-input" 
              className={cn(
                "cursor-pointer block rounded-full transition-colors group-hover:border-primary/50",
                loading && "opacity-50 pointer-events-none"
              )}
            >
              <Avatar className="w-28 h-28 md:w-32 md:h-32 border-2 border-dashed border-muted-foreground/30 bg-transparent">
                <AvatarFallback className="bg-transparent text-muted-foreground">
                  {loading ? <Loader2 className="w-8 h-8 animate-spin text-primary/50" /> : <User className="w-10 h-10 md:w-12 md:h-12 opacity-40" strokeWidth={1.5} />}
                </AvatarFallback>
              </Avatar>
            </Label>
          )}
        </div>

        {/* Pulsanti d'azione */}
        <div className="flex flex-col items-center gap-2 mt-1">
          {avatarUrl ? (
            <div className="flex items-center gap-2">
               {/* Bottone Change (usiamo Label con l'aspetto di un Button per attivare l'input file) */}
               <Label 
                htmlFor="avatar-input" 
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "cursor-pointer gap-2",
                  loading && "opacity-50 pointer-events-none"
                )}
              >
                <RefreshCw className="w-4 h-4" />
                Change
              </Label>
              
              {/* Bottone Remove */}
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={handleRemoveAvatar}
                disabled={loading}
                className="gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Remove
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              {/* Bottone Upload (sempre una Label travestita da Button) */}
              <Label 
                htmlFor="avatar-input" 
                className={cn(
                  buttonVariants({ variant: "default", size: "sm" }),
                  "cursor-pointer gap-2",
                  loading && "opacity-50 pointer-events-none"
                )}
              >
                <UploadCloud className="w-4 h-4" />
                Upload avatar
              </Label>
              <p className="text-xs text-muted-foreground">
                PNG, JPG up to 2MB
              </p>
            </div>
          )}
        </div>
      </div>

      <Input
        id="avatar-input"
        type="file"
        ref={fileInputRef}
        accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
        multiple={false}
        onChange={handleFileChange}
        disabled={loading}
        className="sr-only" 
      />
    </div>
  )
}