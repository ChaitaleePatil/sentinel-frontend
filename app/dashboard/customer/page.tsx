"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CustomerDashboardHeader } from "@/components/dashboard/customer/dashboard-header"
import { CustomerSidebar } from "@/components/dashboard/customer/sidebar"
import { QuickStats } from "@/components/dashboard/customer/quick-stats"
import { QuickUpload } from "@/components/dashboard/customer/quick-upload"
import { RecentDocuments } from "@/components/dashboard/customer/recent-documents"
import { NearbyShops } from "@/components/dashboard/customer/nearby-shops"
import { UploadDialog } from "@/components/dashboard/customer/upload-dialog"
import { CameraDialog } from "@/components/dashboard/customer/camera-dialog"

export default function CustomerDashboard() {
  const [viewMode, setViewMode] = useState("grid")
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [showCameraDialog, setShowCameraDialog] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState([])

  return (
    <div className="flex min-h-screen flex-col">
      <CustomerDashboardHeader />

      <div className="flex flex-1">
        <CustomerSidebar onUploadClick={() => setShowUploadDialog(true)} />

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="container py-6">
            <motion.div
              className="mb-8 space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">Manage your documents and find print shops</p>
            </motion.div>

            <QuickStats />
            <QuickUpload
              onUploadClick={() => setShowUploadDialog(true)}
              onCameraClick={() => {
                setShowCameraDialog(true)
                // Start camera after dialog is shown
                setTimeout(() => {
                  const startCamera = async () => {
                    try {
                      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
                      const videoElement = document.querySelector("video")
                      if (videoElement) {
                        videoElement.srcObject = stream
                      }
                    } catch (err) {
                      console.error("Error accessing camera:", err)
                    }
                  }
                  startCamera()
                }, 500)
              }}
            />
            <RecentDocuments viewMode={viewMode} setViewMode={setViewMode} />
            <NearbyShops />
          </div>
        </main>
      </div>

      <UploadDialog
        open={showUploadDialog}
        onOpenChange={setShowUploadDialog}
        selectedFiles={selectedFiles}
        setSelectedFiles={setSelectedFiles}
      />

      <CameraDialog
        open={showCameraDialog}
        onOpenChange={setShowCameraDialog}
        onCapture={(file) => {
          setSelectedFiles([...selectedFiles, file])
          setShowCameraDialog(false)
        }}
      />
    </div>
  )
}

