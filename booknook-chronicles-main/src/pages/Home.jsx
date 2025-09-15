import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Users, Library, Quote, Star } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Home = () => {
  const features = [
    {
      icon: Book,
      title: "Book Management",
      description: "Discover, add, and organize your favorite books",
      link: "/books"
    },
    {
      icon: Users,
      title: "User Community",
      description: "Connect with fellow book lovers and readers",
      link: "/users"
    },
    {
      icon: Library,
      title: "Reading Lists",
      description: "Create and manage personalized reading lists",
      link: "/reading-lists"
    },
    {
      icon: Quote,
      title: "Reviews & Quotes",
      description: "Share your thoughts and favorite book quotes",
      link: "/books"
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl">
        <div 
          className="hero-gradient relative px-8 py-24 text-center"
          style={{
            backgroundImage: `linear-gradient(rgba(34, 34, 34, 0.7), rgba(34, 34, 34, 0.8)), url(${heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="relative z-10 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Welcome to BookNook
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Your digital reading companion for discovering, organizing, and sharing your literary journey
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" asChild>
                <Link to="/books" className="flex items-center space-x-2">
                  <Book className="h-5 w-5" />
                  <span>Explore Books</span>
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/users" className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Join Community</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Everything You Need for Reading</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            BookNook provides all the tools you need to manage your reading experience
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="card-elegant group cursor-pointer">
                <Link to={feature.link}>
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-3 rounded-full bg-gradient-to-r from-primary to-accent w-fit">
                      <Icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <CardTitle className="group-hover:text-accent transition-colors">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Link>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-accent mb-2">10,000+</div>
            <div className="text-muted-foreground">Books in Library</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-accent mb-2">5,000+</div>
            <div className="text-muted-foreground">Active Readers</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-accent mb-2">50,000+</div>
            <div className="text-muted-foreground">Reviews & Quotes</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;