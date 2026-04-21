import { createFileRoute } from "@tanstack/react-router";
import { CrudManager } from "@/components/o2/admin/CrudManager";

export const Route = createFileRoute("/admin/team")({
  component: () => (
    <CrudManager
      table="team"
      title="Team"
      orderBy={{ column: "display_order", ascending: true }}
      listColumns={[
        { key: "name", label: "Name" },
        { key: "role", label: "Role" },
        { key: "display_order", label: "Order" },
      ]}
      fields={[
        { key: "name", label: "Name", type: "text", required: true },
        { key: "role", label: "Role", type: "text", required: true },
        { key: "bio", label: "Bio", type: "textarea" },
        { key: "photo_url", label: "Photo URL", type: "url" },
        { key: "display_order", label: "Display Order", type: "number" },
      ]}
    />
  ),
});
