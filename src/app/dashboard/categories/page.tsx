import { getCategories } from "@/actions/products";
import { createCategory } from "@/actions/categories";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FolderPlus } from "lucide-react";
import DeleteCategoryButton from "@/components/categories/delete-category-button";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="space-y-8 w-full animate-in fade-in-50 duration-500">
      <div>
        <h1 className="text-3xl font-serif font-semibold tracking-tight">Categories</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage product categories to organize your furniture collection.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Create Category Form */}
        <div className="border rounded-2xl bg-card p-6 shadow-sm space-y-4 h-fit border-l-4 border-l-stone-900">
          <h2 className="font-serif font-semibold text-lg flex items-center gap-2">
            <FolderPlus className="w-5 h-5 text-amber-700" /> Add New Category
          </h2>
          <form action={createCategory} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-xs font-semibold uppercase text-muted-foreground">Category Name *</Label>
              <Input id="name" name="name" required placeholder="e.g. Dining Chairs" className="rounded-xl" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-xs font-semibold uppercase text-muted-foreground">Description</Label>
              <textarea
                id="description"
                name="description"
                rows={3}
                className="flex w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="Brief summary..."
              />
            </div>

            <Button type="submit" className="w-full rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-100 font-medium">
              Create Category
            </Button>
          </form>
        </div>

        {/* Categories Table */}
        <div className="lg:col-span-2 border rounded-2xl bg-card shadow-sm overflow-hidden">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-stone-50 border-b">
                <tr>
                  <th className="px-6 py-4 font-semibold">Category Name</th>
                  <th className="px-6 py-4 font-semibold">Slug</th>
                  <th className="px-6 py-4 font-semibold">Description</th>
                  <th className="px-6 py-4 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {categories.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">
                      No categories created yet.
                    </td>
                  </tr>
                ) : (
                  categories.map((c) => (
                    <tr key={c.id} className="hover:bg-stone-50/60 transition-colors">
                      <td className="px-6 py-4 font-medium text-stone-900">{c.name}</td>
                      <td className="px-6 py-4 text-muted-foreground font-mono text-xs">{c.slug}</td>
                      <td className="px-6 py-4 text-muted-foreground max-w-xs truncate">
                        {c.description || "—"}
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <DeleteCategoryButton id={c.id} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
