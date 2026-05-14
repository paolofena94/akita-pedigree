"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Trash2, 
  TriangleAlert, 
  Loader2, 
  AlertTriangle 
} from "lucide-react"
import { toast } from "sonner"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter,
} from "@/components/ui/dialog"
import { deleteAccountAction } from "@/actions/security"

export default function DeleteAccountSection() {
  const [loading, setLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    const result = await deleteAccountAction()
    
    if (result?.error) {
      toast.error(result.error)
      setLoading(false)
      setIsDialogOpen(false)
    }
  }

  return (
    <>
      <Card className="border-red-500/40 bg-red-50/30 rounded-3xl overflow-hidden shadow-sm">
        <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 justify-between md:items-center">
          <div className="flex items-start gap-4 md:gap-5">
            <div className="p-3 bg-red-100 rounded-full shrink-0">
              <TriangleAlert className="w-6 h-6 text-red-600" strokeWidth={1.5} />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-lg font-semibold text-foreground">
                Delete Account
              </h3>
              <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
            </div>
          </div>

          <div className="shrink-0">
            <Button 
              variant="destructive" 
              onClick={() => setIsDialogOpen(true)}
              className="rounded-full px-6 h-10 gap-2 w-full md:w-auto shadow-sm font-medium"
            >
              <Trash2 className="w-4 h-4" />
              Delete Account
            </Button>
          </div>
        </div>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {/* max-w-[440px] è la dimensione ideale per un alert di conferma */}
        <DialogContent className="sm:max-w-110 rounded-3xl p-6 bg-background border-none shadow-lg">
          <DialogHeader className="flex flex-col items-center justify-center text-center space-y-4">
            <div className="bg-red-100 p-3 rounded-full">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <div className="space-y-2">
              <DialogTitle className="text-xl font-bold">Are you absolutely sure?</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
                This action is permanent and will delete all your data. This cannot be undone.
              </DialogDescription>
            </div>
          </DialogHeader>

          {/* Sm:grid-cols-2 divide lo spazio equamente in orizzontale su schermi medi */}
          <DialogFooter className="bg-background grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              className="rounded-full h-10 order-2 sm:order-1 border-slate-200"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              className="rounded-full h-10 order-1 sm:order-2 font-semibold gap-2"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Delete Account"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}