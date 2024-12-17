/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import type * as StorefrontAPI from '@shopify/hydrogen/storefront-api-types';

export type ProductVariantFragment = Pick<
	StorefrontAPI.ProductVariant,
	'availableForSale' | 'id' | 'sku' | 'title'
> & {
	compareAtPrice?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>>;
	image?: StorefrontAPI.Maybe<
		{ __typename: 'Image' } & Pick<
			StorefrontAPI.Image,
			'id' | 'url' | 'altText' | 'width' | 'height'
		>
	>;
	price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
	product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
	selectedOptions: Array<Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>>;
	unitPrice?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>>;
};

export type ProductFragment = Pick<
	StorefrontAPI.Product,
	| 'id'
	| 'title'
	| 'vendor'
	| 'handle'
	| 'descriptionHtml'
	| 'description'
	| 'encodedVariantExistence'
	| 'encodedVariantAvailability'
> & {
	options: Array<
		Pick<StorefrontAPI.ProductOption, 'name'> & {
			optionValues: Array<
				Pick<StorefrontAPI.ProductOptionValue, 'name'> & {
					firstSelectableVariant?: StorefrontAPI.Maybe<
						Pick<StorefrontAPI.ProductVariant, 'availableForSale' | 'id' | 'sku' | 'title'> & {
							compareAtPrice?: StorefrontAPI.Maybe<
								Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
							>;
							image?: StorefrontAPI.Maybe<
								{ __typename: 'Image' } & Pick<
									StorefrontAPI.Image,
									'id' | 'url' | 'altText' | 'width' | 'height'
								>
							>;
							price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
							product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
							selectedOptions: Array<Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>>;
							unitPrice?: StorefrontAPI.Maybe<
								Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
							>;
						}
					>;
					swatch?: StorefrontAPI.Maybe<
						Pick<StorefrontAPI.ProductOptionValueSwatch, 'color'> & {
							image?: StorefrontAPI.Maybe<{
								previewImage?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url'>>;
							}>;
						}
					>;
				}
			>;
		}
	>;
	selectedOrFirstAvailableVariant?: StorefrontAPI.Maybe<
		Pick<StorefrontAPI.ProductVariant, 'availableForSale' | 'id' | 'sku' | 'title'> & {
			compareAtPrice?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>>;
			image?: StorefrontAPI.Maybe<
				{ __typename: 'Image' } & Pick<
					StorefrontAPI.Image,
					'id' | 'url' | 'altText' | 'width' | 'height'
				>
			>;
			price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
			product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
			selectedOptions: Array<Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>>;
			unitPrice?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>>;
		}
	>;
	adjacentVariants: Array<
		Pick<StorefrontAPI.ProductVariant, 'availableForSale' | 'id' | 'sku' | 'title'> & {
			compareAtPrice?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>>;
			image?: StorefrontAPI.Maybe<
				{ __typename: 'Image' } & Pick<
					StorefrontAPI.Image,
					'id' | 'url' | 'altText' | 'width' | 'height'
				>
			>;
			price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
			product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
			selectedOptions: Array<Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>>;
			unitPrice?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>>;
		}
	>;
	seo: Pick<StorefrontAPI.Seo, 'description' | 'title'>;
};

export type ProductQueryVariables = StorefrontAPI.Exact<{
	country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
	handle: StorefrontAPI.Scalars['String']['input'];
	language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
	selectedOptions: Array<StorefrontAPI.SelectedOptionInput> | StorefrontAPI.SelectedOptionInput;
}>;

export type ProductQuery = {
	product?: StorefrontAPI.Maybe<
		Pick<
			StorefrontAPI.Product,
			| 'id'
			| 'title'
			| 'vendor'
			| 'handle'
			| 'descriptionHtml'
			| 'description'
			| 'encodedVariantExistence'
			| 'encodedVariantAvailability'
		> & {
			options: Array<
				Pick<StorefrontAPI.ProductOption, 'name'> & {
					optionValues: Array<
						Pick<StorefrontAPI.ProductOptionValue, 'name'> & {
							firstSelectableVariant?: StorefrontAPI.Maybe<
								Pick<StorefrontAPI.ProductVariant, 'availableForSale' | 'id' | 'sku' | 'title'> & {
									compareAtPrice?: StorefrontAPI.Maybe<
										Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
									>;
									image?: StorefrontAPI.Maybe<
										{ __typename: 'Image' } & Pick<
											StorefrontAPI.Image,
											'id' | 'url' | 'altText' | 'width' | 'height'
										>
									>;
									price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
									product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
									selectedOptions: Array<Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>>;
									unitPrice?: StorefrontAPI.Maybe<
										Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
									>;
								}
							>;
							swatch?: StorefrontAPI.Maybe<
								Pick<StorefrontAPI.ProductOptionValueSwatch, 'color'> & {
									image?: StorefrontAPI.Maybe<{
										previewImage?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url'>>;
									}>;
								}
							>;
						}
					>;
				}
			>;
			selectedOrFirstAvailableVariant?: StorefrontAPI.Maybe<
				Pick<StorefrontAPI.ProductVariant, 'availableForSale' | 'id' | 'sku' | 'title'> & {
					compareAtPrice?: StorefrontAPI.Maybe<
						Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
					>;
					image?: StorefrontAPI.Maybe<
						{ __typename: 'Image' } & Pick<
							StorefrontAPI.Image,
							'id' | 'url' | 'altText' | 'width' | 'height'
						>
					>;
					price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
					product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
					selectedOptions: Array<Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>>;
					unitPrice?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>>;
				}
			>;
			adjacentVariants: Array<
				Pick<StorefrontAPI.ProductVariant, 'availableForSale' | 'id' | 'sku' | 'title'> & {
					compareAtPrice?: StorefrontAPI.Maybe<
						Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
					>;
					image?: StorefrontAPI.Maybe<
						{ __typename: 'Image' } & Pick<
							StorefrontAPI.Image,
							'id' | 'url' | 'altText' | 'width' | 'height'
						>
					>;
					price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
					product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
					selectedOptions: Array<Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>>;
					unitPrice?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>>;
				}
			>;
			seo: Pick<StorefrontAPI.Seo, 'description' | 'title'>;
		}
	>;
};

export type StoreRobotsQueryVariables = StorefrontAPI.Exact<{
	country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
	language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type StoreRobotsQuery = { shop: Pick<StorefrontAPI.Shop, 'id'> };

interface GeneratedQueryTypes {
	'#graphql\n  query Product(\n    $country: CountryCode\n    $handle: String!\n    $language: LanguageCode\n    $selectedOptions: [SelectedOptionInput!]!\n  ) @inContext(country: $country, language: $language) {\n    product(handle: $handle) {\n      ...Product\n    }\n  }\n  #graphql\n  fragment Product on Product {\n    id\n    title\n    vendor\n    handle\n    descriptionHtml\n    description\n    encodedVariantExistence\n    encodedVariantAvailability\n    options {\n      name\n      optionValues {\n        name\n        firstSelectableVariant {\n          ...ProductVariant\n        }\n        swatch {\n          color\n          image {\n            previewImage {\n              url\n            }\n          }\n        }\n      }\n    }\n    selectedOrFirstAvailableVariant(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {\n      ...ProductVariant\n    }\n    adjacentVariants (selectedOptions: $selectedOptions) {\n      ...ProductVariant\n    }\n    seo {\n      description\n      title\n    }\n  }\n  #graphql\n  fragment ProductVariant on ProductVariant {\n    availableForSale\n    compareAtPrice {\n      amount\n      currencyCode\n    }\n    id\n    image {\n      __typename\n      id\n      url\n      altText\n      width\n      height\n    }\n    price {\n      amount\n      currencyCode\n    }\n    product {\n      title\n      handle\n    }\n    selectedOptions {\n      name\n      value\n    }\n    sku\n    title\n    unitPrice {\n      amount\n      currencyCode\n    }\n  }\n\n\n': {
		return: ProductQuery;
		variables: ProductQueryVariables;
	};
	'#graphql\n  query StoreRobots($country: CountryCode, $language: LanguageCode)\n   @inContext(country: $country, language: $language) {\n    shop {\n      id\n    }\n  }\n': {
		return: StoreRobotsQuery;
		variables: StoreRobotsQueryVariables;
	};
}

interface GeneratedMutationTypes {}

declare module '@shopify/hydrogen' {
	interface StorefrontQueries extends GeneratedQueryTypes {}
	interface StorefrontMutations extends GeneratedMutationTypes {}
}
