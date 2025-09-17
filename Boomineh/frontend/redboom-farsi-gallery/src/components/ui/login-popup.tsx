// src/components/ui/login-popup.tsx or .jsx
import React from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Link } from "react-router-dom"

const LoginPopup = ({ open, onClose, onLogin }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="text-center">
        <DialogHeader>
          <DialogTitle className="text-center">نیاز به ورود</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground mb-4">
          برای ثبت، ابتدا وارد حساب کاربری خود شوید.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/login">
            <Button variant="default">
              ورود
            </Button>
          </Link>
          <Button variant="outline" onClick={onClose}>
            بستن
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default LoginPopup
