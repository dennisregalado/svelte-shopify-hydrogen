import type { CodegenConfig } from '@graphql-codegen/cli';
import { pluckConfig, preset, getSchema } from '@shopify/hydrogen-codegen';

export default {
	overwrite: true,
	pluckConfig,
	generates: {
		'storefrontapi.generated.d.ts': {
			preset,
			schema: getSchema('storefront'),
			documents: [
				'./*.{ts,svelte}',
				'./src/**/*.{ts,svelte}',
				'!./src/lib/graphql/customer-account/*.{ts,svelte}'
			]
		}
	}
} as CodegenConfig;
