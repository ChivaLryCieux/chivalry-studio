import { DisplayPage } from "@/components/home/DisplayPage";

interface DisplayPageRouteProps {
    searchParams: Promise<{
        project?: string;
    }>;
}

export default async function DisplayPageRoute({ searchParams }: DisplayPageRouteProps) {
    const resolvedSearchParams = await searchParams;
    const initialProjectId = Number(resolvedSearchParams.project);
    const displayProjectId = Number.isFinite(initialProjectId) ? initialProjectId : undefined;

    return <DisplayPage key={displayProjectId ?? "default"} initialProjectId={displayProjectId} />;
}
