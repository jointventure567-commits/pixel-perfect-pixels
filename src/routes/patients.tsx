import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, UserPlus, Users } from "lucide-react";
import { EmptyState } from "@/components/common/EmptyState";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Patient } from "@/types/orthosense";

export const Route = createFileRoute("/patients")({
  head: () => ({
    meta: [
      { title: "Patients | OrthoSense" },
      {
        name: "description",
        content:
          "Manage the OrthoSense patient roster and open screening records for osteoarthritis risk review.",
      },
      { property: "og:title", content: "Patients | OrthoSense" },
      {
        property: "og:description",
        content: "Patient roster and screening history in the OrthoSense clinical workspace.",
      },
    ],
  }),
  component: Patients,
});

function Patients() {
  const patients: Patient[] = [];

  return (
    <>
      <PageHeader
        eyebrow="Directory"
        title="Patients"
        description="Patient records created during screenings are listed here."
        actions={
          <Button asChild>
            <Link to="/new-screening">
              <UserPlus className="size-4" />
              Add via screening
            </Link>
          </Button>
        }
      />

      <SectionCard
        icon={Users}
        title="Patient roster"
        description="Search and open a record to review screening history."
        actions={
          <div className="relative hidden sm:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input disabled placeholder="Search patients" className="w-56 pl-9" />
          </div>
        }
      >
        {patients.length === 0 ? (
          <EmptyState
            icon={Users}
            title="No patients registered"
            description="Patients are created as part of a screening. Start one to add the first record."
            action={
              <Button asChild size="sm" variant="outline">
                <Link to="/new-screening">Start screening</Link>
              </Button>
            }
          />
        ) : null}
      </SectionCard>
    </>
  );
}
