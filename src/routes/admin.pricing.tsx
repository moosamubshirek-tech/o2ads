import { createFileRoute } from "@tanstack/react-router";
import { CrudManager } from "@/components/o2/admin/CrudManager";

export const Route = createFileRoute("/admin/pricing")({
  component: () => (
    <CrudManager
      table="pricing"
      title="Pricing"
      orderBy={{ column: "display_order", ascending: true }}
      listColumns={[
        { key: "tier_name", label: "Tier" },
        { key: "price", label: "Price" },
        { key: "is_popular", label: "Popular" },
      ]}
      fields={[
        { key: "tier_name", label: "Tier Name", type: "text", required: true },
        { key: "price", label: "Price", type: "text", required: true, placeholder: "₹15,000/mo" },
        { key: "features", label: "Features (JSON array)", type: "json", placeholder: '["Feature 1", "Feature 2"]' },
        { key: "is_popular", label: "Most Popular", type: "boolean" },
        { key: "display_order", label: "Display Order", type: "number" },
      ]}
    />
  ),
});
