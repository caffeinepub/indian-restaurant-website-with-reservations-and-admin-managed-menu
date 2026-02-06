import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Award, Heart, Users, Utensils } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="section-container section-padding">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Spice Heritage</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Bringing authentic Indian flavors to your table since our inception
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        <div className="prose prose-lg max-w-none">
          <p className="text-lg leading-relaxed">
            At Spice Heritage, we believe that food is more than just sustenance—it's a celebration of culture, 
            tradition, and the bonds we share. Our restaurant was born from a passion to bring the authentic 
            flavors of India to food lovers everywhere, creating a dining experience that transports you to the 
            vibrant streets and aromatic kitchens of the Indian subcontinent.
          </p>

          <p className="text-lg leading-relaxed">
            Every dish we serve is crafted with care, using traditional recipes passed down through generations 
            and the finest ingredients sourced both locally and from India. Our chefs are masters of their craft, 
            expertly blending spices to create the perfect balance of flavors that Indian cuisine is renowned for. 
            From the smoky tandoor to the slow-simmered curries, each preparation method honors centuries of 
            culinary wisdom.
          </p>

          <p className="text-lg leading-relaxed">
            We take pride in offering a diverse menu that caters to all palates—from the adventurous food explorer 
            to those seeking comfort in familiar favorites. Whether you're a vegetarian, a meat lover, or somewhere 
            in between, our extensive selection ensures there's something special waiting for you at every visit.
          </p>
        </div>

        <Separator className="my-12" />

        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Heart className="h-6 w-6 text-primary" />
              Our Promise
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg">
              We promise to deliver not just a meal, but an experience. Every guest who walks through our doors 
              is treated like family, and every dish is prepared with the same love and attention we would give 
              to our own loved ones. Our commitment to quality, authenticity, and hospitality is unwavering.
            </p>
            <p className="text-lg">
              From the warmth of our service to the richness of our flavors, we strive to make every visit 
              memorable. We source fresh ingredients daily, grind our spices in-house, and never compromise on 
              quality. This is our heritage, and we're honored to share it with you.
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-12">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Utensils className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Authentic Recipes</h3>
              <p className="text-sm text-muted-foreground">
                Traditional methods and time-honored techniques
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <Award className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Quality Ingredients</h3>
              <p className="text-sm text-muted-foreground">
                Fresh, premium ingredients sourced with care
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Expert Chefs</h3>
              <p className="text-sm text-muted-foreground">
                Skilled culinary masters with years of experience
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <Heart className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Warm Hospitality</h3>
              <p className="text-sm text-muted-foreground">
                Treating every guest like family
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
