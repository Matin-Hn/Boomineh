import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2, Upload, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import NotFound from "@/pages/NotFound";
import Loading from "@/components/ui/Loading";
import AccessDenied from "@/components/ui/AccessDenied";
import { fetchUserInfo } from "@/api/userAPI";
import LoginFirst from "@/components/ui/LoginFirst";


import { 
  fetchPaintings, 
  createPainting, 
  updatePainting, 
  deletePainting,
  getPainting
} from "../api/paintingsAPI";

interface Painting {
  id: number;
  title: string;
  description: string;
  image: string;
  artist?: string;
  price?: number;
  category?: string;
  material?: string;
  size?: string;
  year?: number;
  availability?: boolean;
}

interface FormData {
  title: string;
  description: string;
  image: File | null;
  artist?: string;
  price?: string;
  category?: string;
  material?: string;
  size?: string;
  year?: string;
  availability?: boolean;
}

const AdminPanel = () => {
  const [isSuperuser, setIsSuperuser] = useState<boolean | null>(null);  // related to userAPI
  const { toast } = useToast();
  const [paintings, setPaintings] = useState<Painting[]>([]);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    image: null,
    artist: "",
    price: "",
    category: "",
    material: "",
    size: "",
    year: "",
    availability: true,
  });

  const token = localStorage.getItem("access");

  // Load paintings from API
  const loadPaintings = async () => {
    try {
      setLoading(true);
      const data = await fetchPaintings();
      setPaintings(data);
    } catch (error) {
      toast({
        title: "خطا",
        description: "خطا در بارگذاری آثار هنری",
        variant: "destructive"
      });
      console.error("Error loading paintings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkAccess = async () => {
      if (!token) {
        setIsSuperuser(false);
        return;
      }
      try {
        const data = await fetchUserInfo(token);
        setIsSuperuser(data.is_superuser === true);
      } catch (error) {
        console.error("Error fetching user info", error);
        setIsSuperuser(false);
      }
    };
    
    loadPaintings();
    checkAccess();
  }, []);

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      image: null,
      artist: "",
      price: "",
      category: "",
      material: "",
      size: "",
      year: ""
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEdit = async (paintingId: number) => {
    try {
      const painting = await getPainting(paintingId);
      setFormData({
        title: painting.title || "",
        description: painting.description || "",
        image: null,
        artist: painting.artist || "",
        price: painting.price?.toString() || "",
        category: painting.category || "",
        material: painting.material || "",
        size: painting.size || "",
        year: painting.year?.toString() || "",
        availability: painting.availability ?? true
      });
      setEditingId(paintingId);
      setIsEditing(true);
    } catch (error) {
      toast({
        title: "خطا",
        description: "خطا در بارگذاری اطلاعات اثر",
        variant: "destructive"
      });
      console.error("Error loading painting:", error);
    }
  };

  const handleSave = async () => {
    if (!formData.title || !formData.description) {
      toast({
        title: "خطا",
        description: "لطفاً عنوان و توضیحات را وارد کنید",
        variant: "destructive"
      });
      return;
    }

    if (!token) {
      toast({
        title: "خطا",
        description: "لطفاً ابتدا وارد شوید",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);
      const data = {
        title: formData.title,
        description: formData.description,
        price: formData.price ? parseFloat(formData.price) : undefined,
        category: formData.category,
        material: formData.material,
        size: formData.size,
        year: formData.year ? parseInt(formData.year) : undefined,
        ...(formData.image && { image: formData.image }),
        availability: formData.availability, // ✅ تغییر
      ...(formData.image && { image: formData.image })
      };

      if (editingId) {
        await updatePainting(editingId, data, token);
        toast({
          title: "موفقیت",
          description: "اثر با موفقیت ویرایش شد"
        });
      } else {
        await createPainting(data, token);
        toast({
          title: "موفقیت", 
          description: "اثر جدید با موفقیت اضافه شد"
        });
      }

      resetForm();
      loadPaintings();
    } catch (error) {
      toast({
        title: "خطا",
        description: editingId ? "خطا در ویرایش اثر" : "خطا در افزودن اثر",
        variant: "destructive"
      });
      console.error("Error saving painting:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!token) {
      toast({
        title: "خطا",
        description: "لطفاً ابتدا وارد شوید",
        variant: "destructive"
      });
      return;
    }

    const confirmed = window.confirm("آیا از حذف این اثر مطمئن هستید؟");
    if (!confirmed) return;

    try {
      setLoading(true);
      const success = await deletePainting(id, token);
      if (success) {
        toast({
          title: "موفقیت",
          description: "اثر با موفقیت حذف شد"
        });
        loadPaintings();
      }
    } catch (error) {
      toast({
        title: "خطا",
        description: "خطا در حذف اثر",
        variant: "destructive"
      });
      console.error("Error deleting painting:", error);
    } finally {
      setLoading(false);
    }
  };


  if (isSuperuser === null) {       // Checking login status
    return <Loading />;
  }

  if (!token) {                     // Show the "Login First"
    return <LoginFirst />;
  }
  
  if (isSuperuser === false) {      // User aren't admin
    return <AccessDenied />;
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">پنل مدیریت</h1>
            <p className="text-muted-foreground">مدیریت آثار هنری معصومه شاه رمضانی</p>
          </div>
          <Button 
            variant="persian" 
            onClick={() => setIsEditing(true)}
            disabled={loading}
          >
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
            {loading ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">در حال بارگذاری...</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {paintings.length === 0 ? (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <p className="text-muted-foreground">هیچ اثری یافت نشد</p>
                    </CardContent>
                  </Card>
                ) : (
                  paintings.map((painting) => (
                    <Card key={painting.id}>
                      <CardContent className="p-6">
                        <div className="flex gap-6">
                          <div className="w-32 h-24 rounded-lg overflow-hidden bg-muted">
                            <img
                              src={painting.image?.startsWith('http') ? painting.image : `http://localhost:8000${painting.image}`}
                              alt={painting.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = '/placeholder.svg';
                              }}
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="text-lg font-semibold">{painting.title}</h3>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEdit(painting.id)}
                                  disabled={loading}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => handleDelete(painting.id)}
                                  disabled={loading}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              {painting.price && (
                                <div>
                                  <span className="text-muted-foreground">قیمت: </span>
                                  <span className="font-medium">{painting.price.toLocaleString()} تومان</span>
                                </div>
                              )}
                              {painting.size && (
                                <div>
                                  <span className="text-muted-foreground">اندازه: </span>
                                  <span className="font-medium">{painting.size}</span>
                                </div>
                              )}
                              {painting.year && (
                                <div>
                                  <span className="text-muted-foreground">سال: </span>
                                  <span className="font-medium">{painting.year}</span>
                                </div>
                              )}
                              {painting.size && (
                                <div>
                                  <span className="text-muted-foreground">متریال: </span>
                                  <span className="font-medium">{painting.material}</span>
                                </div>
                              )}
                            </div>
                            <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
                              {painting.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            )}
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
                    <Label htmlFor="price">قیمت (تومان)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                      placeholder="2500000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year">سال تولید</Label>
                    <Input
                      id="year"
                      type="number"
                      value={formData.year}
                      onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
                      placeholder="1402"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dimensions">اندازه</Label>
                    <Input
                      id="dimensions"
                      value={formData.size}
                      onChange={(e) => setFormData(prev => ({ ...prev, dimensions: e.target.value }))}
                      placeholder="70 × 50 سانتی‌متر"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="medium">متریال</Label>
                    <Input
                      id="medium"
                      value={formData.material}
                      onChange={(e) => setFormData(prev => ({ ...prev, medium: e.target.value }))}
                      placeholder="رنگ روغن روی بوم"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">دسته‌بندی</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                      placeholder="نقاشی، مجسمه، ..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="image">تصویر</Label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        image: e.target.files?.[0] || null 
                      }))}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">توضیحات *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="توضیحات کامل اثر..."
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Button
                    type="button"
                    variant={formData.availability ? "default" : "secondary"}
                    onClick={() => setFormData(prev => ({ ...prev, availability: !prev.availability}))}
                    >
                    {formData.availability ? "موجود" : "ناموجود"}
                  </Button>
                  <Label className="ml-4">وضعیت موجودی</Label>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button 
                    variant="persian" 
                    onClick={handleSave}
                    disabled={loading}
                  >
                    <Save className="ml-2 h-4 w-4" />
                    {loading ? "در حال ذخیره..." : (editingId ? "به‌روزرسانی" : "ذخیره")}
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
                  <CardTitle className="text-center">آثار با قیمت</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-center text-green-600">
                    {paintings.filter(p => p.price).length}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">میانگین قیمت</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-center text-blue-600">
                    {paintings.length > 0 && paintings.filter(p => p.price).length > 0
                      ? Math.round(
                          paintings
                            .filter(p => p.price)
                            .reduce((sum, p) => sum + (p.price || 0), 0) / 
                          paintings.filter(p => p.price).length
                        ).toLocaleString()
                      : "0"
                    }
                  </div>
                  <p className="text-xs text-center text-muted-foreground mt-1">تومان</p>
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