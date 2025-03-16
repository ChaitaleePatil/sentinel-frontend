"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { X, Upload, Shield } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { printRequestApi } from "@/lib/api"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function UploadDialog({ open, onOpenChange, selectedFiles, setSelectedFiles }) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [printSettings, setPrintSettings] = useState({
    copies: 1,
    paperSize: "a4",
    orientation: "portrait",
    color: "color",
    doubleSided: false,
    pages: "all",
    shopkeeperId: "", // Optional, will be set when selecting a shop
  })

  const fileInputRef = useRef(null)
  const { user } = useAuth()

  const handleFileSelect = (e) => {
    if (e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files).map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
        preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : null,
        file: file, // Store the actual file object
      }))
      setSelectedFiles(filesArray)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    if (e.dataTransfer.files.length > 0) {
      const filesArray = Array.from(e.dataTransfer.files).map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
        preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : null,
        file: file, // Store the actual file object
      }))
      setSelectedFiles(filesArray)
    }
  }

  const handleUpload = async () => {
    if (selectedFiles.length === 0 || !user) return

    setIsUploading(true)
    setError(null)

    try {
      // Simulate file encryption (in a real app, you'd actually encrypt the files)
      const encryptedFiles = selectedFiles.map((file) => `encrypted_${file.name}`)
      const fileNames = selectedFiles.map((file) => file.name)

      // Create print request
      const response = await printRequestApi.createPrintRequest(
        {
          customerId: user.id,
          shopkeeperId: printSettings.shopkeeperId || undefined,
          encryptedFiles,
          fileNames,
          pages: printSettings.pages,
          copies: printSettings.copies,
        },
        user.token,
      )

      // Simulate upload progress
      let progress = 0
      const interval = setInterval(() => {
        progress += 5
        setUploadProgress(progress)

        if (progress >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsUploading(false)
            onOpenChange(false)
            setUploadProgress(0)
            setSelectedFiles([])
          }, 500)
        }
      }, 200)
    } catch (err) {
      setError("Failed to upload files. Please try again.")
      setIsUploading(false)
    }
  }

  const removeFile = (index) => {
    const newFiles = [...selectedFiles]
    newFiles.splice(index, 1)
    setSelectedFiles(newFiles)
  }

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Upload Documents</DialogTitle>
          <DialogDescription>Upload your documents securely. All files are encrypted end-to-end.</DialogDescription>
        </DialogHeader>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!isUploading ? (
          <>
            <div
              className="flex flex-col items-center justify-center rounded-md border border-dashed p-8 cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileSelect} multiple />
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-medium">Drag files here or click to browse</h3>
                <p className="text-sm text-muted-foreground">Support for PDF, DOCX, XLSX, PPTX, JPG, PNG and more</p>
              </div>
            </div>

            {selectedFiles.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Selected Files ({selectedFiles.length})</h4>
                <div className="max-h-[200px] overflow-y-auto space-y-2">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                      <div className="flex items-center gap-2">
                        {file.preview ? (
                          <div className="relative h-10 w-10 overflow-hidden rounded">
                            <Image
                              src={file.preview || "/placeholder.svg"}
                              alt="File preview"
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-10 w-10 text-muted-foreground"
                          >
                            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                            <polyline points="14 2 14 8 20 8" />
                          </svg>
                        )}
                        <div>
                          <p className="text-sm font-medium truncate max-w-[300px]">{file.name}</p>
                          <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => removeFile(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="paperSize">Paper Size</Label>
                  <Select
                    value={printSettings.paperSize}
                    onValueChange={(value) => setPrintSettings({ ...printSettings, paperSize: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select paper size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="a4">A4</SelectItem>
                      <SelectItem value="letter">Letter</SelectItem>
                      <SelectItem value="legal">Legal</SelectItem>
                      <SelectItem value="a3">A3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="orientation">Orientation</Label>
                  <RadioGroup
                    value={printSettings.orientation}
                    onValueChange={(value) => setPrintSettings({ ...printSettings, orientation: value })}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="portrait" id="portrait" />
                      <Label htmlFor="portrait">Portrait</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="landscape" id="landscape" />
                      <Label htmlFor="landscape">Landscape</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="color">Print Type</Label>
                  <RadioGroup
                    value={printSettings.color}
                    onValueChange={(value) => setPrintSettings({ ...printSettings, color: value })}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="color" id="color" />
                      <Label htmlFor="color">Color</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="bw" id="bw" />
                      <Label htmlFor="bw">Black & White</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="copies">Copies</Label>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setPrintSettings({ ...printSettings, copies: Math.max(1, printSettings.copies - 1) })
                      }
                    >
                      -
                    </Button>
                    <span className="text-center w-8">{printSettings.copies}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPrintSettings({ ...printSettings, copies: printSettings.copies + 1 })}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="doubleSided">Double-sided printing</Label>
                  <Switch
                    id="doubleSided"
                    checked={printSettings.doubleSided}
                    onCheckedChange={(checked) => setPrintSettings({ ...printSettings, doubleSided: checked })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pages">Pages to print</Label>
                <Input
                  id="pages"
                  placeholder="e.g. 1-5, 8, 11-13"
                  value={printSettings.pages === "all" ? "" : printSettings.pages}
                  onChange={(e) => setPrintSettings({ ...printSettings, pages: e.target.value || "all" })}
                />
                <p className="text-xs text-muted-foreground">Leave empty to print all pages</p>
              </div>
            </div>

            <DialogFooter className="flex justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-primary" />
                <span>End-to-end encrypted</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUpload} disabled={selectedFiles.length === 0} className="group">
                  <Shield className="mr-2 h-4 w-4 transition-transform group-hover:-translate-y-1" />
                  Send to Print Shop
                </Button>
              </div>
            </DialogFooter>
          </>
        ) : (
          <div className="py-8 space-y-6">
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-medium">Encrypting and uploading your documents</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                Your files are being encrypted and securely uploaded. This ensures your sensitive information remains
                private.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

