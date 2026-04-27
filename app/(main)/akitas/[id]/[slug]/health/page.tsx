import { HealthClearances } from "@/components/web/akitas/health-clearances";
import { MOCK_DOG } from "@/lib/mock-data";

export default function HealthPage() {
    return (
        <HealthClearances health={MOCK_DOG.health} />
    )
}