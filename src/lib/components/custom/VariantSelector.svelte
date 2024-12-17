<script lang="ts">
	import { flattenConnection } from '@shopify/hydrogen';
	import type {
		ProductOption,
		ProductOptionValue,
		ProductVariant,
		ProductVariantConnection,
		SelectedOptionInput,
		Maybe
	} from '@shopify/hydrogen-react/storefront-api-types';

	let { data } = $props();

	function useVariantPath(handle: string, productPath: string, waitForNavigation: boolean) {
		const { pathname, search } = useLocation();
		const navigation = useNavigation();

		return useMemo(() => {
			const match = /(\/[a-zA-Z]{2}-[a-zA-Z]{2}\/)/g.exec(pathname);
			const isLocalePathname = match && match.length > 0;
			productPath = productPath.startsWith('/') ? productPath.substring(1) : productPath;

			const path = isLocalePathname
				? `${match![0]}${productPath}/${handle}`
				: `/${productPath}/${handle}`;

			const searchParams = new URLSearchParams(
				// Remix doesn't update the location until pending loaders complete.
				// By default we use the destination search params to make selecting a variant
				// instant, but `waitForNavigation` makes the UI wait to update by only using
				// the active browser search params.
				waitForNavigation || navigation.state !== 'loading' ? search : navigation.location.search
			);

			return {
				searchParams,
				// If the current pathname matches the product page, we need to make sure
				// that we append to the current search params. Otherwise all the search
				// params can be generated new.
				alreadyOnProductPage: path === pathname,
				path
			};
		}, [pathname, search, waitForNavigation, handle, productPath, navigation]);
	}
</script>
