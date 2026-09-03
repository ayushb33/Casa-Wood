"use client";

import { useState } from "react";
import { deleteCategory } from "@/actions/categories";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function DeleteCategoryButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    setIsDeleting(true);
    try {
      await deleteCategory(id);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleDelete}
      disabled={isDeleting}
      className="h-8 w-8 text-destructive hover:bg-destructive/10"
    >
      <Trash2 className="w-4 h-4" />
    </Button>
  );
}
