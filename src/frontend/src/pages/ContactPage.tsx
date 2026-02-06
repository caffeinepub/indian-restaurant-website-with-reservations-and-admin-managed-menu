import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="section-container section-padding">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We'd love to hear from you. Visit us, call us, or drop by for an unforgettable dining experience
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Location
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-medium mb-2">Address</p>
              <p className="text-muted-foreground">-15, Rani bazar Jaipur</p>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground">
                Located in the heart of Jaipur, easily accessible from all major areas of the city.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-primary" />
              Phone
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-medium mb-2">Call Us</p>
              <p className="text-muted-foreground text-lg">8742895627</p>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground">
                Call us for reservations, inquiries, or catering services. We're here to help!
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Opening Hours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Monday</span>
                  <span className="text-muted-foreground">11:00 AM - 10:00 PM</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="font-medium">Tuesday</span>
                  <span className="text-muted-foreground">11:00 AM - 10:00 PM</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="font-medium">Wednesday</span>
                  <span className="text-muted-foreground">11:00 AM - 10:00 PM</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="font-medium">Thursday</span>
                  <span className="text-muted-foreground">11:00 AM - 10:00 PM</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Friday</span>
                  <span className="text-muted-foreground">11:00 AM - 10:00 PM</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="font-medium">Saturday</span>
                  <span className="text-muted-foreground">11:00 AM - 11:00 PM</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="font-medium">Sunday</span>
                  <span className="text-muted-foreground">11:00 AM - 11:00 PM</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="font-medium text-primary">Lunch Special</span>
                  <span className="text-muted-foreground">12:00 PM - 3:00 PM</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
