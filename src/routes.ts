import {
	type RouteConfig,
	index, layout, route,
} from "@react-router/dev/routes";

export default [
	layout("routes/app-layout.tsx", [
		index("./routes/home.tsx"),
		// route("datasets", "routes/datasets.tsx"),
		route(
			"datasets/:datasetId",
			"routes/dataset-detail.tsx",
		),
		// route("settings", "routes/settings.tsx"),
	]),
] satisfies RouteConfig;
