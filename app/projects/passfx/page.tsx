import type { Metadata } from "next";
import {
	generatePathMetadata,
	generateSoftwareApplicationSchema,
	parsePathToState,
	renderJsonLd,
} from "@/lib/seo";
import { OSShell } from "@/os/ssr";

/**
 * Generate metadata for the CyberForce project page.
 */
export function generateMetadata(): Metadata {
	return generatePathMetadata("/projects/cyberforce");
}

/**
 * CyberForce Project Page — /projects/cyberforce (Story 5)
 *
 * Opens the CyberForce app - DOE energy sector defense competition.
 * Includes SoftwareApplication schema for rich search results.
 */
export default async function PassFXPage() {
	const initialState = parsePathToState("/projects/cyberforce");

	// Generate SoftwareApplication schema for CyberForce
	const appSchema = generateSoftwareApplicationSchema("file.cyberforce");

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
