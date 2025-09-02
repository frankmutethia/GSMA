import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ChatInterface } from "@/components/consultants/chat-interface"

export default function ConsultantCommunicationPage() {
  return (
    <DashboardLayout role="consultant">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Communication</h1>
          <p className="text-muted-foreground">Chat with your assigned MMP clients and provide guidance</p>
        </div>

        <ChatInterface />
      </div>
    </DashboardLayout>
  )
}
