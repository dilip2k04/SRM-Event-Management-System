import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Users, Building2 } from "lucide-react";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 p-6">
      <Card className="w-full max-w-3xl shadow-lg">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-semibold">
            Event Management System
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Centralized platform to plan, manage, and participate in events
          </p>
        </CardHeader>

        <CardContent className="grid gap-6 sm:grid-cols-3">
          {/* Organizer */}
          <div className="flex flex-col items-center gap-3 p-4 border rounded-lg">
            <Building2 className="h-8 w-8 text-primary" />
            <h3 className="font-medium">Organizers</h3>
            <p className="text-xs text-muted-foreground text-center">
              Create events, request venues, manage schedules
            </p>
            <Button variant="outline" size="sm">
              Organizer Login
            </Button>
          </div>

          {/* Staff / Faculty */}
          <div className="flex flex-col items-center gap-3 p-4 border rounded-lg">
            <CalendarDays className="h-8 w-8 text-primary" />
            <h3 className="font-medium">Staff / Faculty</h3>
            <p className="text-xs text-muted-foreground text-center">
              Review events, approve requests, coordinate activities
            </p>
            <Button variant="outline" size="sm">
              Staff Login
            </Button>
          </div>

          {/* Students / Participants */}
          <div className="flex flex-col items-center gap-3 p-4 border rounded-lg">
            <Users className="h-8 w-8 text-primary" />
            <h3 className="font-medium">Participants</h3>
            <p className="text-xs text-muted-foreground text-center">
              View events, register, track participation
            </p>
            <Button size="sm">
              Participant Portal
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
