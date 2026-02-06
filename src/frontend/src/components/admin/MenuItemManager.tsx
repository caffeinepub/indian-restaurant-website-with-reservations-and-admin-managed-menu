import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Pencil, Trash2, Leaf } from 'lucide-react';
import { useGetAllMenuCategories, useGetAllMenuItems, useAddMenuItem, useUpdateMenuItem, useDeleteMenuItem } from '../../hooks/useAdmin';
import { formatPrice } from '../../utils/format';
import { toast } from 'sonner';
import type { MenuItem } from '../../backend';

export default function MenuItemManager() {
  const { data: categories = [] } = useGetAllMenuCategories();
  const { data: items = [], isLoading } = useGetAllMenuItems();
  const addItem = useAddMenuItem();
  const updateItem = useUpdateMenuItem();
  const deleteItem = useDeleteMenuItem();

  const [open, setOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState({
    id: '',
    categoryId: '',
    name: '',
    description: '',
    price: '',
    isVegetarian: true,
    imageUrl: '',
    isSpecial: false,
  });

  const resetForm = () => {
    setFormData({
      id: '',
      categoryId: '',
      name: '',
      description: '',
      price: '',
      isVegetarian: true,
      imageUrl: '',
      isSpecial: false,
    });
    setEditingItem(null);
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      id: item.id,
      categoryId: item.categoryId,
      name: item.name,
      description: item.description,
      price: (Number(item.price) / 100).toString(),
      isVegetarian: item.isVegetarian,
      imageUrl: item.imageUrl || '',
      isSpecial: item.isSpecial,
    });
    setOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const priceInPaise = Math.round(parseFloat(formData.price) * 100);

    const itemData: MenuItem = {
      id: formData.id,
      categoryId: formData.categoryId,
      name: formData.name,
      description: formData.description,
      price: BigInt(priceInPaise),
      isVegetarian: formData.isVegetarian,
      imageUrl: formData.imageUrl || undefined,
      isSpecial: formData.isSpecial,
    };

    try {
      if (editingItem) {
        await updateItem.mutateAsync(itemData);
        toast.success('Item updated successfully');
      } else {
        await addItem.mutateAsync(itemData);
        toast.success('Item added successfully');
      }
      resetForm();
      setOpen(false);
    } catch (error) {
      toast.error(editingItem ? 'Failed to update item' : 'Failed to add item');
      console.error('Item operation error:', error);
    }
  };

  const handleDelete = async (itemId: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      await deleteItem.mutateAsync(itemId);
      toast.success('Item deleted successfully');
    } catch (error) {
      toast.error('Failed to delete item');
      console.error('Delete error:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Menu Items</h2>
          <p className="text-muted-foreground">Manage your menu items</p>
        </div>
        <Dialog open={open} onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (!isOpen) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}</DialogTitle>
              <DialogDescription>
                {editingItem ? 'Update the menu item details' : 'Create a new menu item'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="id">Item ID *</Label>
                  <Input
                    id="id"
                    value={formData.id}
                    onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                    placeholder="e.g., butter_chicken"
                    required
                    disabled={!!editingItem}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="categoryId">Category *</Label>
                  <Select
                    value={formData.categoryId}
                    onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Butter Chicken"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of the dish"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price (₹) *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="e.g., 295.00"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL (Optional)</Label>
                <Input
                  id="imageUrl"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="isVegetarian">Vegetarian</Label>
                <Switch
                  id="isVegetarian"
                  checked={formData.isVegetarian}
                  onCheckedChange={(checked) => setFormData({ ...formData, isVegetarian: checked })}
                />
              </div>

              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="isSpecial">Chef's Special</Label>
                <Switch
                  id="isSpecial"
                  checked={formData.isSpecial}
                  onCheckedChange={(checked) => setFormData({ ...formData, isSpecial: checked })}
                />
              </div>

              <Button type="submit" className="w-full" disabled={addItem.isPending || updateItem.isPending}>
                {addItem.isPending || updateItem.isPending
                  ? 'Saving...'
                  : editingItem
                  ? 'Update Item'
                  : 'Add Item'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">Loading items...</p>
          </CardContent>
        </Card>
      ) : items.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            No menu items yet. Add your first item to get started.
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>All Menu Items ({items.length})</CardTitle>
            <CardDescription>View and manage all menu items</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Special</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>
                        {categories.find((c) => c.id === item.categoryId)?.name || item.categoryId}
                      </TableCell>
                      <TableCell>{formatPrice(item.price)}</TableCell>
                      <TableCell>
                        {item.isVegetarian ? (
                          <Badge variant="outline" className="gap-1">
                            <Leaf className="h-3 w-3 text-green-600" />
                            Veg
                          </Badge>
                        ) : (
                          <Badge variant="outline">Non-Veg</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {item.isSpecial && <Badge variant="secondary">Special</Badge>}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(item)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(item.id)}
                            disabled={deleteItem.isPending}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
