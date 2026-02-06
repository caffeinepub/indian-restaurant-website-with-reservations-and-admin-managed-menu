import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Leaf } from 'lucide-react';
import { useGetAllMenuCategories, useGetMenuItemsByCategory } from '../hooks/useQueries';
import { formatPrice } from '../utils/format';

export default function MenuPage() {
  const { data: categories = [], isLoading: categoriesLoading } = useGetAllMenuCategories();
  const [activeCategory, setActiveCategory] = useState<string>('');

  // Set first category as active when loaded
  if (!activeCategory && categories.length > 0) {
    setActiveCategory(categories[0].id);
  }

  return (
    <div className="section-container section-padding">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Menu</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore our diverse selection of authentic Indian dishes, from aromatic curries to freshly baked breads
        </p>
      </div>

      {categoriesLoading ? (
        <div className="space-y-8">
          <div className="h-12 bg-muted animate-pulse rounded" />
          <div className="grid gap-6 md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="h-6 bg-muted animate-pulse rounded mb-2" />
                  <div className="h-4 bg-muted animate-pulse rounded w-2/3" />
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">{category.name}</h2>
                <p className="text-muted-foreground">{category.description}</p>
              </div>
              <MenuCategoryItems categoryId={category.id} />
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
}

function MenuCategoryItems({ categoryId }: { categoryId: string }) {
  const { data: items = [], isLoading } = useGetMenuItemsByCategory(categoryId);

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader>
              <div className="h-6 bg-muted animate-pulse rounded mb-2" />
              <div className="h-4 bg-muted animate-pulse rounded w-2/3" />
            </CardHeader>
          </Card>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          No items available in this category yet.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {items.map((item) => (
        <Card key={item.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-start justify-between gap-4">
              <span className="flex items-center gap-2">
                {item.name}
                {item.isVegetarian && (
                  <Leaf className="h-4 w-4 text-green-600" />
                )}
              </span>
              <span className="text-primary whitespace-nowrap">{formatPrice(item.price)}</span>
            </CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </CardHeader>
          {item.isSpecial && (
            <CardContent>
              <Badge variant="secondary">Chef's Special</Badge>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
}
