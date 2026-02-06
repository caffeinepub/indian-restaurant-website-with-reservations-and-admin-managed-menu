import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Link } from '@tanstack/react-router';
import { Clock, MapPin, Phone, Star } from 'lucide-react';
import { useGetSpecialMenuItems, useGetAllReviews } from '../hooks/useQueries';
import { formatPrice } from '../utils/format';
import RatingStars from '../components/RatingStars';

export default function HomePage() {
  const { data: specialItems = [], isLoading: specialsLoading } = useGetSpecialMenuItems();
  const { data: reviews = [], isLoading: reviewsLoading } = useGetAllReviews();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/assets/generated/home-hero-banner.dim_1600x900.png"
            alt="Indian cuisine"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        </div>
        <div className="relative section-container h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Welcome to Spice Heritage
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90">
              Experience authentic Indian flavors crafted with traditional recipes and the finest ingredients. 
              A culinary journey through India's rich heritage.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/menu">View Menu</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20">
                <Link to="/reservation">Book a Table</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Special Dishes Section */}
      <section className="section-container section-padding">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Signature Dishes</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our chef's special creations, prepared with authentic spices and time-honored techniques
          </p>
        </div>

        {specialsLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="h-48 bg-muted animate-pulse" />
                <CardHeader>
                  <div className="h-6 bg-muted animate-pulse rounded mb-2" />
                  <div className="h-4 bg-muted animate-pulse rounded w-2/3" />
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {specialItems.slice(0, 3).map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={`/assets/generated/dish-${item.id.replace('_', '-')}.dim_1000x750.png`}
                    alt={item.name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/assets/generated/dish-signature-curry.dim_1000x750.png';
                    }}
                  />
                  {item.isVegetarian && (
                    <Badge className="absolute top-2 right-2 bg-green-600">Veg</Badge>
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{item.name}</span>
                    <span className="text-primary">{formatPrice(item.price)}</span>
                  </CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <Button asChild variant="outline" size="lg">
            <Link to="/menu">View Full Menu</Link>
          </Button>
        </div>
      </section>

      <Separator />

      {/* Customer Reviews Section */}
      <section className="section-container section-padding bg-muted/30">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Guests Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Read testimonials from our valued customers who have experienced our hospitality
          </p>
        </div>

        {reviewsLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="h-6 bg-muted animate-pulse rounded mb-2" />
                  <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
                </CardHeader>
                <CardContent>
                  <div className="h-20 bg-muted animate-pulse rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <Card key={review.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{review.reviewerName}</CardTitle>
                  <RatingStars rating={review.rating} />
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground italic">"{review.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      <Separator />

      {/* Opening Hours & Location Section */}
      <section className="section-container section-padding">
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Opening Hours
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Monday - Friday</span>
                <span className="text-muted-foreground">11:00 AM - 10:00 PM</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="font-medium">Saturday - Sunday</span>
                <span className="text-muted-foreground">11:00 AM - 11:00 PM</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="font-medium">Lunch Special</span>
                <span className="text-muted-foreground">12:00 PM - 3:00 PM</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Visit Us
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-medium mb-1">Address</p>
                <p className="text-muted-foreground">-15, Rani bazar Jaipur</p>
              </div>
              <Separator />
              <div>
                <p className="font-medium mb-1">Phone</p>
                <p className="text-muted-foreground flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  8742895627
                </p>
              </div>
              <Button asChild className="w-full mt-4">
                <Link to="/contact">Get Directions</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
