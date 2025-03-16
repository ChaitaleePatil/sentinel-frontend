"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Filter, Grid, List, MoreHorizontal, Download, Share2, Printer, Trash, Shield, Clock } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { printRequestApi } from "@/lib/api"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function RecentDocuments({ viewMode, setViewMode }) {
  const [documents, setDocuments] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetchDocuments()
    }
  }, [user])

  const fetchDocuments = async () => {
    if (!user) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await printRequestApi.getUserPrintRequests(user.id, user.token)

      if (response.error) {
        setError(response.error)
        return
      }

      setDocuments(response.printRequests || [])
    } catch (err) {
      setError("Failed to fetch documents. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const getShareLink = async (requestId) => {
    if (!user) return

    try {
      const response = await printRequestApi.getShareLink(requestId, user.token)

      if (response.error) {
        setError(response.error)
        return
      }

      // Here you would typically handle the share link, e.g., copy to clipboard
      alert(`Share link: ${response.shareLink}`)
    } catch (err) {
      setError("Failed to get share link. Please try again.")
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Recent Documents</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode("list")}
            className={viewMode === "list" ? "bg-muted" : ""}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode("grid")}
            className={viewMode === "grid" ? "bg-muted" : ""}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="printed">Printed</TabsTrigger>
          <TabsTrigger value="shared">Shared</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {documents.length === 0 ? (
            <div className="rounded-md border p-8 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <Printer className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-medium">No documents yet</h3>
              <p className="mt-2 text-sm text-muted-foreground">Upload a document to get started</p>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {documents.map((doc) => (
                <motion.div key={doc._id} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                  <Card className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-base">{doc.fileNames[0]}</CardTitle>
                          <CardDescription>Uploaded {new Date(doc.createdAt).toLocaleDateString()}</CardDescription>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => getShareLink(doc._id)}>
                              <Share2 className="mr-2 h-4 w-4" />
                              Share
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Printer className="mr-2 h-4 w-4" />
                              Print Again
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Trash className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="relative h-32 w-full overflow-hidden rounded-md bg-muted">
                        <Image
                          src="/placeholder.svg?height=128&width=256"
                          alt="Document preview"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute bottom-2 right-2">
                          <div className="flex items-center gap-1 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1 text-xs">
                            <Shield className="h-3 w-3 text-primary" />
                            <span>Encrypted</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex items-center justify-between">
                      <Badge
                        variant="outline"
                        className={
                          doc.status === "completed"
                            ? "bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700"
                            : "bg-amber-50 text-amber-700 hover:bg-amber-50 hover:text-amber-700"
                        }
                      >
                        {doc.status === "completed" ? "Printed" : "Pending"}
                      </Badge>
                      <div className="text-xs text-muted-foreground">
                        {doc.copies} {doc.copies > 1 ? "copies" : "copy"}
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {documents.map((doc) => (
                <motion.div
                  key={doc._id}
                  className="flex items-center justify-between rounded-md border p-4 hover:shadow-md transition-shadow"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative h-12 w-12 overflow-hidden rounded bg-muted">
                      <Image
                        src="/placeholder.svg?height=48&width=48"
                        alt="Document preview"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute bottom-0 right-0 h-4 w-4 bg-primary/10 flex items-center justify-center rounded-tl">
                        <Shield className="h-2 w-2 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium">{doc.fileNames[0]}</h3>
                      <p className="text-sm text-muted-foreground">
                        Uploaded {new Date(doc.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={
                        doc.status === "completed"
                          ? "bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700"
                          : "bg-amber-50 text-amber-700 hover:bg-amber-50 hover:text-amber-700"
                      }
                    >
                      {doc.status === "completed" ? "Printed" : "Pending"}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => getShareLink(doc._id)}>
                          <Share2 className="mr-2 h-4 w-4" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Printer className="mr-2 h-4 w-4" />
                          Print Again
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="pending">
          <div className="rounded-md border p-8 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <Clock className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-medium">Pending Documents</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {documents.filter((doc) => doc.status !== "completed").length > 0
                ? `You have ${documents.filter((doc) => doc.status !== "completed").length} document(s) waiting to be printed`
                : "You have no pending documents"}
            </p>
          </div>
        </TabsContent>

        <TabsContent value="printed">
          <div className="rounded-md border p-8 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <Printer className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-medium">Printed Documents</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {documents.filter((doc) => doc.status === "completed").length > 0
                ? `You have ${documents.filter((doc) => doc.status === "completed").length} document(s) that have been printed`
                : "You have no printed documents"}
            </p>
          </div>
        </TabsContent>

        <TabsContent value="shared">
          <div className="rounded-md border p-8 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <Share2 className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-medium">Shared Documents</h3>
            <p className="mt-2 text-sm text-muted-foreground">You haven't shared any documents yet</p>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}

