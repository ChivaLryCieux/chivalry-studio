import { DisplayPage } from "@/components/home/DisplayPage";

interface DisplayPageRouteProps {
    searchParams: Promise<{
        project?: string;
    }>;
}

export default async function DisplayPageRoute({ searchParams }: DisplayPageRouteProps) {
    const resolvedSearchParams = await searchParams;
    const initialProjectId = Number(resolvedSearchParams.project);

    return <DisplayPage initialProjectId={Number.isFinite(initialProjectId) ? initialProjectId : undefined} />;
}
