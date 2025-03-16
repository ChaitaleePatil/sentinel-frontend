"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, MoreHorizontal, Download, MessageSquare, CheckCircle, X, Printer, Shield } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { printRequestApi } from "@/lib/api"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function PrintQueue({ onPrintClick }) {
  const [printRequests, setPrintRequests] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetchPrintRequests()
    }
  }, [user])

  const fetchPrintRequests = async () => {
    if (!user) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await printRequestApi.getShopPrintRequests(user.id, user.token)

      if (response.error) {
        setError(response.error)
        return
      }

      setPrintRequests(response.printRequests || [])
    } catch (err) {
      setError("Failed to fetch print requests. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const updateRequestStatus = async (requestId, status) => {
    // This would be implemented to update the status of a print request
    // For now, we'll just update the local state
    setPrintRequests(printRequests.map((req) => (req._id === requestId ? { ...req, status } : req)))
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="mb-8 overflow-hidden hover:shadow-md transition-shadow">
        <CardHeader className="bg-primary/5">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Print Queue</CardTitle>
              <CardDescription>Manage your current print jobs</CardDescription>
            </div>
            <Link href="/dashboard/shopkeeper/queue">
              <Button variant="outline" size="sm" className="group transition-all hover:shadow-md">
                View All
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {printRequests.length === 0 ? (
            <div className="rounded-md border p-8 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <Printer className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-medium">No print requests yet</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                When customers send print requests, they will appear here
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {printRequests.map((request) => (
                <motion.div
                  key={request._id}
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
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{request.fileNames[0]}</h3>
                        {request.urgent && (
                          <Badge
                            variant="outline"
                            className="bg-amber-50 text-amber-700 hover:bg-amber-50 hover:text-amber-700"
                          >
                            Urgent
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Avatar className="h-5 w-5">
                            <AvatarImage src="/placeholder.svg?height=20&width=20" alt="Customer" />
                            <AvatarFallback>{request.customer?.name?.charAt(0) || "C"}</AvatarFallback>
                          </Avatar>
                          <p className="text-sm text-muted-foreground">{request.customer?.name || "Customer"}</p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {request.fileNames.length} file(s), {request.copies} copies
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(request.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select
                      defaultValue={request.status || "pending"}
                      onValueChange={(value) => updateRequestStatus(request._id, value)}
                    >
                      <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      size="sm"
                      className="transition-all hover:bg-primary hover:text-primary-foreground"
                      onClick={() =>
                        onPrintClick({
                          id: request._id,
                          name: request.fileNames[0],
                          customer: request.customer?.name || "Customer",
                          pages: request.pages,
                          color: true,
                          copies: request.copies,
                        })
                      }
                    >
                      <Printer className="h-4 w-4" />
                    </Button>
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
                        <DropdownMenuItem>
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Message Customer
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateRequestStatus(request._id, "completed")}>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Mark as Completed
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <X className="mr-2 h-4 w-4" />
                          Reject Job
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

