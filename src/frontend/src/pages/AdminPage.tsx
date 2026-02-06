import AdminGuard from '../components/AdminGuard';
import MenuCategoryManager from '../components/admin/MenuCategoryManager';
import MenuItemManager from '../components/admin/MenuItemManager';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AdminPage() {
  return (
    <AdminGuard>
      <div className="section-container section-padding">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your restaurant's menu categories and items
          </p>
        </div>

        <Tabs defaultValue="items" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="items">Menu Items</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>

          <TabsContent value="items" className="mt-6">
            <MenuItemManager />
          </TabsContent>

          <TabsContent value="categories" className="mt-6">
            <MenuCategoryManager />
          </TabsContent>
        </Tabs>
      </div>
    </AdminGuard>
  );
}
