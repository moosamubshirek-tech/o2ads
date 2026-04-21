import { createFileRoute } from "@tanstack/react-router";
import { CrudManager } from "@/components/o2/admin/CrudManager";

export const Route = createFileRoute("/admin/portfolio")({
  component: () => (
    <CrudManager
      table="portfolio"
      title="Portfolio"
      listColumns={[
        { key: "title", label: "Title" },
        { key: "category", label: "Category" },
      ]}
      fields={[
        { key: "title", label: "Title", type: "text", required: true },
        { key: "category", label: "Category", type: "text", required: true, placeholder: "Social Media | Ads | Branding | Posters" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "image_url", label: "Image URL", type: "url" },
      ]}
    />
  ),
});
