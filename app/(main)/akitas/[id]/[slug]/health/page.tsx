import { MOCK_DOG } from "@/__mock__/mock-akita";
import { HealthClearances } from "@/components/web/akitas/health-clearances";

export default function HealthPage() {
    return (
        <HealthClearances health={MOCK_DOG.health} />
    )
}