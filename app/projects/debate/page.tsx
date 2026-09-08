import type { Metadata } from "next";
import {
	generatePathMetadata,
	generateSoftwareApplicationSchema,
	parsePathToState,
	renderJsonLd,
} from "@/lib/seo";
import { OSShell } from "@/os/ssr";

/**
 * Generate metadata for the National CCDC project page.
 */
export function generateMetadata(): Metadata {
	return generatePathMetadata("/projects/nccdc");
}

/**
 * National CCDC Project Page — /projects/nccdc (Story 5)
 *
 * Opens the National CCDC app - championship cyber defense competition.
 * Includes SoftwareApplication schema for rich search results.
 */
export default async function DebatePage() {
	const initialState = parsePathToState("/projects/nccdc");

	// Generate SoftwareApplication schema for National CCDC
	const appSchema = generateSoftwareApplicationSchema("file.nccdc");

	return (
		<>
			<OSShell initialState={initialState} />
			{/* SoftwareApplication schema for project (Story 5) */}
			{appSchema && (
				<script
					type="application/ld+json"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD schema injection is a standard pattern; content is developer-controlled
					dangerouslySetInnerHTML={{ __html: renderJsonLd(appSchema) }}
				/>
			)}
		</>
	);
}
