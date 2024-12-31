import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Folder, Upload, MessageSquare, Bell, Slack, Mail } from "lucide-react";

export default function Home() {
  return (
    <main className="flex-1">
      <section
        className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("/hero-background.png")' }}
      >
        <div className="absolute inset-0 bg-black/50" />

        <div className="container px-4 md:px-6 relative mx-auto">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white drop-shadow-md">
                Revolutionize your theme park design with Collab.io
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl drop-shadow">
                The ultimate collaboration platform for theme park creators.
                Streamline your projects, manage assets, and communicate
                effortlessly.
              </p>
            </div>
            <div className="space-x-4">
              <Button asChild size="lg" className="shadow-lg">
                <Link href="/signup">Get started</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-white/10 text-white hover:bg-white/20 shadow-lg"
              >
                <Link href="/login">Log in</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
            Why theme park creators choose Collab.io
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <Folder className="w-10 h-10 text-primary mb-2" />
                <CardTitle>Project storage</CardTitle>
              </CardHeader>
              <CardContent>
                Securely store and organize all your theme park projects in one
                place.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Upload className="w-10 h-10 text-primary mb-2" />
                <CardTitle>Asset management</CardTitle>
              </CardHeader>
              <CardContent>
                Easily upload, categorize, and access all your design assets.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <MessageSquare className="w-10 h-10 text-primary mb-2" />
                <CardTitle>Collaborative commenting</CardTitle>
              </CardHeader>
              <CardContent>
                Streamline feedback with our intuitive commenting system on
                assets.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Bell className="w-10 h-10 text-primary mb-2" />
                <CardTitle>Smart notifications</CardTitle>
              </CardHeader>
              <CardContent>
                Stay updated with our best-in-class notification system across
                multiple platforms.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Seamless integration
              </h2>
              <p className="mt-4 text-gray-500 md:text-xl">
                Collab.io integrates with your favorite tools to keep your team
                in sync.
              </p>
              <ul className="mt-8 space-y-4">
                <li className="flex items-center">
                  <Slack className="w-6 h-6 text-primary mr-2" />
                  <span>Slack notifications for real-time updates</span>
                </li>
                <li className="flex items-center">
                  <Mail className="w-6 h-6 text-primary mr-2" />
                  <span>Email digests for important project milestones</span>
                </li>
                <li className="flex items-center">
                  <Bell className="w-6 h-6 text-primary mr-2" />
                  <span>In-app notifications for immediate feedback</span>
                </li>
              </ul>
            </div>
            <div className="relative h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-20 rounded-lg"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-bold text-primary">
                  Integration demo
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6 text-center mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Ready to transform your theme park design process?
          </h2>
          <p className="mt-4 text-gray-500 md:text-xl">
            Join thousands of theme park creators who are already using
            Collab.io to bring their visions to life.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/signup">Start your free trial</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
