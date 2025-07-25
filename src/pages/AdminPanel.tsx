import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2, Upload, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Painting {
  id: string;
  title: string;
  price: string;
  dimensions: string;
  medium: string;
  description: string;
  image: string;
  year: string;
  available: boolean;
}

const AdminPanel = () => {
  const { toast } = useToast();
  const [paintings, setPaintings] = useState<Painting[]>([
    {
      id: "1",
      title: "رویای آبی",
      price: "۲,۵۰۰,۰۰۰ تومان",
      dimensions: "۷۰ × ۵۰ سانتی‌متر",
      medium: "رنگ روغن روی بوم",
      description: "این اثر بازتابی از احساسات عمیق و رنگ‌های آرام آسمان در شب است.",
      image: "/src/assets/artwork-1.jpg",
      year: "۱۴۰۲",
      available: true
    },
    {
      id: "2",
      title: "باغ خاطرات", 
      price: "۳,۲۰۰,۰۰۰ تومان",
      dimensions: "۸۰ × ۶۰ سانتی‌متر",
      medium: "آکریلیک روی بوم",
      description: "مجموعه‌ای از خاطرات شیرین دوران کودکی که در قالب باغی رنگارنگ به تصویر کشیده شده.",
      image: "/src/assets/artwork-2.jpg",
      year: "۱۴۰۱", 
      available: true
    }
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Painting, 'id'>>({
    title: "",
    price: "",
    dimensions: "",
    medium: "",
    description: "",
    image: "",
    year: "",
    available: true
  });

  const resetForm = () => {
    setFormData({
      title: "",
      price: "",
      dimensions: "",
      medium: "",
      description: "",
      image: "",
      year: "",
      available: true
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEdit = (painting: Painting) => {
    setFormData({
      title: painting.title,
      price: painting.price,
      dimensions: painting.dimensions,
      medium: painting.medium,
      description: painting.description,
      image: painting.image,
      year: painting.year,
      available: painting.available
    });
    setEditingId(painting.id);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!formData.title || !formData.price) {
      toast({
        title: "خطا",
        description: "لطفاً عنوان و قیمت را وارد کنید",
        variant: "destructive"
      });
      return;
    }

    if (editingId) {
      // Update existing painting
      setPaintings(prev => prev.map(p => 
        p.id === editingId ? { ...formData, id: editingId } : p
      ));
      toast({
        title: "موفقیت",
        description: "اثر با موفقیت ویرایش شد"
      });
    } else {
      // Add new painting
      const newPainting: Painting = {
        ...formData,
        id: Date.now().toString()
      };
      setPaintings(prev => [...prev, newPainting]);
      toast({
        title: "موفقیت", 
        description: "اثر جدید با موفقیت اضافه شد"
      });
    }

    resetForm();
  };

  const handleDelete = (id: string) => {
    setPaintings(prev => prev.filter(p => p.id !== id));
    toast({
      title: "موفقیت",
      description: "اثر با موفقیت حذف شد"
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">پنل مدیریت</h1>
            <p className="text-muted-foreground">مدیریت آثار هنری معصومه شاه رمضانی</p>
          </div>
          <Button variant="persian" onClick={() => setIsEditing(true)}>
            <Plus className="ml-2 h-4 w-4" />
            افزودن اثر جدید
          </Button>
        </div>

        <Tabs defaultValue="paintings" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="paintings">آثار هنری</TabsTrigger>
            <TabsTrigger value="add-edit">
              {isEditing ? (editingId ? "ویرایش اثر" : "افزودن اثر") : "افزودن اثر"}
            </TabsTrigger>
            <TabsTrigger value="stats">آمار</TabsTrigger>
          </TabsList>

          {/* Paintings List */}
          <TabsContent value="paintings" className="space-y-6">
            <div className="grid gap-6">
              {paintings.map((painting) => (
                <Card key={painting.id}>
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <div className="w-32 h-24 rounded-lg overflow-hidden bg-muted">
                        <img
                          src={painting.image}
                          alt={painting.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-semibold">{painting.title}</h3>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(painting)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDelete(painting.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">قیمت: </span>
                            <span className="font-medium">{painting.price}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">اندازه: </span>
                            <span className="font-medium">{painting.dimensions}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">سال: </span>
                            <span className="font-medium">{painting.year}</span>
                          </div>
                          <div>
                            <Badge variant={painting.available ? "default" : "destructive"}>
                              {painting.available ? "موجود" : "فروخته شده"}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
                          {painting.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Add/Edit Form */}
          <TabsContent value="add-edit" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>
                    {editingId ? "ویرایش اثر" : "افزودن اثر جدید"}
                  </CardTitle>
                  {isEditing && (
                    <Button variant="outline" size="sm" onClick={resetForm}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">عنوان اثر *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="نام اثر هنری"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">قیمت *</Label>
                    <Input
                      id="price"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                      placeholder="مثال: ۲,۵۰۰,۰۰۰ تومان"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dimensions">اندازه</Label>
                    <Input
                      id="dimensions"
                      value={formData.dimensions}
                      onChange={(e) => setFormData(prev => ({ ...prev, dimensions: e.target.value }))}
                      placeholder="مثال: ۷۰ × ۵۰ سانتی‌متر"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="medium">متریال</Label>
                    <Input
                      id="medium"
                      value={formData.medium}
                      onChange={(e) => setFormData(prev => ({ ...prev, medium: e.target.value }))}
                      placeholder="مثال: رنگ روغن روی بوم"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year">سال تولید</Label>
                    <Input
                      id="year"
                      value={formData.year}
                      onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
                      placeholder="مثال: ۱۴۰۲"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="image">تصویر</Label>
                    <div className="flex gap-2">
                      <Input
                        id="image"
                        value={formData.image}
                        onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                        placeholder="آدرس تصویر"
                      />
                      <Button variant="outline" size="icon">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">توضیحات</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="توضیحات کامل اثر..."
                    rows={4}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="available"
                    checked={formData.available}
                    onChange={(e) => setFormData(prev => ({ ...prev, available: e.target.checked }))}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="available">اثر موجود است</Label>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button variant="persian" onClick={handleSave}>
                    <Save className="ml-2 h-4 w-4" />
                    {editingId ? "به‌روزرسانی" : "ذخیره"}
                  </Button>
                  <Button variant="outline" onClick={resetForm}>
                    لغو
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Stats */}
          <TabsContent value="stats" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">کل آثار</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-center text-persian-terracotta">
                    {paintings.length}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">آثار موجود</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-center text-green-600">
                    {paintings.filter(p => p.available).length}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">فروخته شده</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-center text-red-600">
                    {paintings.filter(p => !p.available).length}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;