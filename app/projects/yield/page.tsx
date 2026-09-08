import type { Metadata } from "next";
import {
	generatePathMetadata,
	generateSoftwareApplicationSchema,
	parsePathToState,
	renderJsonLd,
} from "@/lib/seo";
import { OSShell } from "@/os/ssr";

/**
 * Generate metadata for the RMCCDC project page.
 */
export function generateMetadata(): Metadata {
	return generatePathMetadata("/projects/rmccdc");
}

/**
 * RMCCDC Project Page — /projects/rmccdc (Story 5)
 *
 * Opens the RMCCDC app - infrastructure defense competition.
 * Includes SoftwareApplication schema for rich search results.
 */
export default async function YieldPage() {
	const initialState = parsePathToState("/projects/rmccdc");

	// Generate SoftwareApplication schema for RMCCDC
	const appSchema = generateSoftwareApplicationSchema("file.rmccdc");

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
