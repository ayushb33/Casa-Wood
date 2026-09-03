import { getCategories } from "@/actions/products";
import { createCategory, deleteCategory } from "@/actions/categories";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FolderPlus, Trash2 } from "lucide-react";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Categories</h1>
        <p className="text-sm text-muted-foreground">
          Manage product categories to organize your furniture collection.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Create Category Form */}
        <div className="border rounded-lg bg-background p-6 shadow-sm space-y-4 h-fit">
          <h2 className="font-semibold text-base flex items-center gap-2">
            <FolderPlus className="w-4 h-4 text-primary" /> Add Category
          </h2>
          <form action={createCategory} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Category Name *</Label>
              <Input id="name" name="name" required placeholder="e.g. Dining Chairs" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                name="description"
                rows={3}
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="Brief summary..."
              />
            </div>

            <Button type="submit" className="w-full">
              Create Category
            </Button>
          </form>
        </div>

        {/* Categories Table */}
        <div className="md:col-span-2 border rounded-lg bg-background shadow-sm overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
              <tr>
                <th className="px-6 py-4 font-medium">Category Name</th>
                <th className="px-6 py-4 font-medium">Slug</th>
                <th className="px-6 py-4 font-medium">Description</th>
                <th className="px-6 py-4 text-right font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                    No categories created yet.
                  </td>
                </tr>
              ) : (
                categories.map((c) => (
                  <tr key={c.id} className="border-b last:border-0 hover:bg-muted/30">
                    <td className="px-6 py-4 font-medium">{c.name}</td>
                    <td className="px-6 py-4 text-muted-foreground font-mono text-xs">{c.slug}</td>
                    <td className="px-6 py-4 text-muted-foreground max-w-xs truncate">
                      {c.description || "—"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <form action={async () => {
                        "use server";
                        await deleteCategory(c.id);
                      }}>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </form>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
