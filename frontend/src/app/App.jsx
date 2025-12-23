import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, CalendarDays, Users, ArrowRight, Sparkles } from "lucide-react";

function App() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-6xl">
        {/* Main Container with subtle card-like elevation */}
        <Card className="border-0 shadow-xl bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/60">
          <CardHeader className="text-center pb-12 pt-12">
            <div className="flex justify-center mb-4">
              <Badge variant="secondary" className="gap-1.5">
                <Sparkles className="h-3 w-3" />
                Event Management System
              </Badge>
            </div>
            <CardTitle className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Organize. Review. Participate.
            </CardTitle>
            <CardDescription className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">
              A modern, centralized platform designed for seamless event planning, approval workflows, and participant engagement.
            </CardDescription>
          </CardHeader>

          <CardContent className="px-8 pb-16">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Organizer Card */}
              <Card className="group relative overflow-hidden border bg-background/50 transition-all duration-500 hover:shadow-2xl hover:border-primary/30 hover:bg-background">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader className="relative text-center pb-8">
                  <div className="mx-auto mb-6 p-5 rounded-2xl bg-primary/10 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-500 w-fit">
                    <Building2 className="h-14 w-14 text-primary" />
                  </div>
                  <CardTitle className="text-2xl mb-3">Organizers</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    Create events • Request venues & resources • Manage schedules • Track approval status
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative text-center">
                  <Button variant="outline" size="lg" className="w-full group/button">
                    Organizer Login
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-2" />
                  </Button>
                </CardContent>
              </Card>

              {/* Staff / Faculty Card */}
              <Card className="group relative overflow-hidden border bg-background/50 transition-all duration-500 hover:shadow-2xl hover:border-primary/30 hover:bg-background">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader className="relative text-center pb-8">
                  <div className="mx-auto mb-6 p-5 rounded-2xl bg-primary/10 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-500 w-fit">
                    <CalendarDays className="h-14 w-14 text-primary" />
                  </div>
                  <CardTitle className="text-2xl mb-3">Staff / Faculty</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    Review submissions • Approve or reject requests • Coordinate resources • Monitor activities
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative text-center">
                  <Button variant="outline" size="lg" className="w-full group/button">
                    Staff Login
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-2" />
                  </Button>
                </CardContent>
              </Card>

              {/* Participants Card - Primary CTA */}
              <Card className="group relative overflow-hidden border-2 border-primary/40 bg-gradient-to-br from-primary/5 via-transparent to-transparent shadow-2xl transition-all duration-500 hover:shadow-3xl hover:border-primary/60">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50 group-hover:opacity-70 transition-opacity" />
                <CardHeader className="relative text-center pb-8">
                  <div className="mx-auto mb-6 p-5 rounded-2xl bg-primary/20 group-hover:bg-primary/30 group-hover:scale-110 transition-all duration-500 w-fit ring-4 ring-primary/20">
                    <Users className="h-14 w-14 text-primary" />
                  </div>
                  <CardTitle className="text-2xl mb-3">Participants</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    Discover events • Register instantly • Get real-time updates • View your participation history
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative text-center">
                  <Button size="lg" className="w-full shadow-lg group/button">
                    Enter Participant Portal
                    <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover/button:translate-x-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="mt-16 text-center">
              <p className="text-sm text-muted-foreground">
                Select your role above to continue • Secure access with institutional credentials
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;