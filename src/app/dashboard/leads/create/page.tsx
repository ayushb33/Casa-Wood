import { createLead } from "@/actions/leads";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const SOURCES = [
  { value: "WALK_IN", label: "Walk-in (Showroom)" },
  { value: "WHATSAPP", label: "WhatsApp" },
  { value: "WEBSITE", label: "Website Enquiry" },
  { value: "QR_CODE", label: "QR Code" },
  { value: "REFERRAL", label: "Referral" },
  { value: "SOCIAL_MEDIA", label: "Social Media" },
  { value: "OTHER", label: "Other" },
];

export default function CreateLeadPage() {
  async function onSubmit(formData: FormData) {
    "use server";
    await createLead(formData);
    redirect("/dashboard/leads");
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/leads"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium hover:bg-muted h-10 w-10 text-muted-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">New Lead</h1>
          <p className="text-sm text-muted-foreground">
            Register a customer enquiry in the pipeline.
          </p>
        </div>
      </div>

      <div className="border rounded-lg bg-background p-6 shadow-sm">
        <form action={onSubmit} className="space-y-6">
          <fieldset className="space-y-4">
            <legend className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Customer Details
            </legend>

            <div className="space-y-2">
              <Label htmlFor="customerName">Full Name *</Label>
              <Input
                id="customerName"
                name="customerName"
                required
                placeholder="e.g. Priya Sharma"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customerPhone">Phone Number</Label>
                <Input
                  id="customerPhone"
                  name="customerPhone"
                  type="tel"
                  placeholder="+91 98765 43210"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customerEmail">Email</Label>
                <Input
                  id="customerEmail"
                  name="customerEmail"
                  type="email"
                  placeholder="priya@example.com"
                />
              </div>
            </div>
          </fieldset>

          <fieldset className="space-y-4 border-t pt-6">
            <legend className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Lead Details
            </legend>

            <div className="space-y-2">
              <Label htmlFor="source">Enquiry Source</Label>
              <select
                id="source"
                name="source"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {SOURCES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <textarea
                id="notes"
                name="notes"
                className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder="What furniture is the customer interested in? Any specific requirements?"
              />
            </div>
          </fieldset>

          <div className="pt-4 flex justify-end gap-4 border-t">
            <Link
              href="/dashboard/leads"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Save Lead
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
