import { createFileRoute } from "@tanstack/react-router";
import { CrudManager } from "@/components/o2/admin/CrudManager";

export const Route = createFileRoute("/admin/case-studies")({
  component: () => (
    <CrudManager
      table="case_studies"
      title="Case Studies"
      listColumns={[
        { key: "client", label: "Client" },
        { key: "challenge", label: "Challenge" },
        { key: "result", label: "Result" },
      ]}
      fields={[
        { key: "client", label: "Client", type: "text", required: true },
        { key: "challenge", label: "Challenge", type: "textarea" },
        { key: "result", label: "Result", type: "textarea" },
        { key: "image_url", label: "Image URL", type: "url" },
      ]}
    />
  ),
});
