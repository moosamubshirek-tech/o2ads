import { createFileRoute } from "@tanstack/react-router";
import { CrudManager } from "@/components/o2/admin/CrudManager";

export const Route = createFileRoute("/admin/client-logos")({
  component: () => (
    <CrudManager
      table="client_logos"
      title="Client Logos"
      listColumns={[
        { key: "name", label: "Name" },
        { key: "logo_url", label: "Logo URL" },
      ]}
      fields={[
        { key: "name", label: "Name", type: "text", required: true },
        { key: "logo_url", label: "Logo URL", type: "url", required: true },
      ]}
    />
  ),
});
