import { createFileRoute } from "@tanstack/react-router";
import { CrudManager } from "@/components/o2/admin/CrudManager";

export const Route = createFileRoute("/admin/testimonials")({
  component: () => (
    <CrudManager
      table="testimonials"
      title="Testimonials"
      listColumns={[
        { key: "name", label: "Name" },
        { key: "company", label: "Company" },
        { key: "quote", label: "Quote" },
      ]}
      fields={[
        { key: "name", label: "Name", type: "text", required: true },
        { key: "role", label: "Role", type: "text" },
        { key: "company", label: "Company", type: "text" },
        { key: "quote", label: "Quote", type: "textarea", required: true },
        { key: "avatar_url", label: "Avatar URL", type: "url" },
      ]}
    />
  ),
});
