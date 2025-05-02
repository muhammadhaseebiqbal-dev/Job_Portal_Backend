import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core';
import Oas from 'oas';
import APICore from 'api/dist/core';
declare class SDK {
    spec: Oas;
    core: APICore;
    constructor();
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    config(config: ConfigOptions): void;
    /**
     * If the API you're using requires authentication you can supply the required credentials
     * through this method and the library will magically determine how they should be used
     * within your API request.
     *
     * With the exception of OpenID and MutualTLS, it supports all forms of authentication
     * supported by the OpenAPI specification.
     *
     * @example <caption>HTTP Basic auth</caption>
     * sdk.auth('username', 'password');
     *
     * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
     * sdk.auth('myBearerToken');
     *
     * @example <caption>API Keys</caption>
     * sdk.auth('myApiKey');
     *
     * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
     * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
     * @param values Your auth credentials for the API; can specify up to two strings or numbers.
     */
    auth(...values: string[] | number[]): this;
    /**
     * If the API you're using offers alternate server URLs, and server variables, you can tell
     * the SDK which one to use with this method. To use it you can supply either one of the
     * server URLs that are contained within the OpenAPI definition (along with any server
     * variables), or you can pass it a fully qualified URL to use (that may or may not exist
     * within the OpenAPI definition).
     *
     * @example <caption>Server URL with server variables</caption>
     * sdk.server('https://{region}.api.example.com/{basePath}', {
     *   name: 'eu',
     *   basePath: 'v14',
     * });
     *
     * @example <caption>Fully qualified server URL</caption>
     * sdk.server('https://eu.api.example.com/v14');
     *
     * @param url Server URL
     * @param variables An object of variables to replace into the server URL.
     */
    server(url: string, variables?: {}): void;
    /**
     * #### Filtering
     * This endpoint supports result filtering. For more information on how to filter this
     * request, [go here](/docs/filtering).
     *
     * @summary List all Allocation Windows
     * @throws FetchError<400, types.GetAllocationWindowAllResponse400> Bad Request
     */
    getAllocationWindowAll(): Promise<FetchResponse<200, types.GetAllocationWindowAllResponse200> | FetchResponse<number, types.GetAllocationWindowAllResponseDefault>>;
    /**
     * #### Record UUID
     * UUID is optional for record creation. If no UUID is supplied, a UUID will be
     * automatically generated for the new record and returned in the response header as
     * x-record-uuid.
     *
     * @summary Create a new Allocation Window
     * @throws FetchError<400, types.PostAllocationWindowCreateResponse400> Bad Request
     */
    postAllocationWindowCreate(body: types.PostAllocationWindowCreateBodyParam): Promise<FetchResponse<200, types.PostAllocationWindowCreateResponse200> | FetchResponse<number, types.PostAllocationWindowCreateResponseDefault>>;
    /**
     * Retrieve an Allocation Window
     *
     * @throws FetchError<400, types.GetAllocationWindowSingleResponse400> Bad Request
     */
    getAllocationWindowSingle(metadata: types.GetAllocationWindowSingleMetadataParam): Promise<FetchResponse<200, types.GetAllocationWindowSingleResponse200> | FetchResponse<number, types.GetAllocationWindowSingleResponseDefault>>;
    /**
     * Update an Allocation Window
     *
     * @throws FetchError<400, types.PostAllocationWindowSingleResponse400> Bad Request
     */
    postAllocationWindowSingle(body: types.PostAllocationWindowSingleBodyParam, metadata: types.PostAllocationWindowSingleMetadataParam): Promise<FetchResponse<200, types.PostAllocationWindowSingleResponse200> | FetchResponse<number, types.PostAllocationWindowSingleResponseDefault>>;
    /**
     * In ServiceM8, records are never deleted, but are archived. Archived records will remain
     * accessible via the API as (active = 0), however will no longer be visible in UI.
     * Archived records can be restored to active by setting the record active field to 1.
     *
     * @summary Delete an Allocation Window
     * @throws FetchError<400, types.DeleteAllocationWindowSingleResponse400> Bad Request
     */
    deleteAllocationWindowSingle(metadata: types.DeleteAllocationWindowSingleMetadataParam): Promise<FetchResponse<200, types.DeleteAllocationWindowSingleResponse200> | FetchResponse<number, types.DeleteAllocationWindowSingleResponseDefault>>;
    /**
     * #### Filtering
     * This endpoint supports result filtering. For more information on how to filter this
     * request, [go here](/docs/filtering).
     *
     *
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **read_assets**.
     *
     * @summary List all Assets
     * @throws FetchError<400, types.GetAssetAllResponse400> Bad Request
     */
    getAssetAll(): Promise<FetchResponse<200, types.GetAssetAllResponse200> | FetchResponse<number, types.GetAssetAllResponseDefault>>;
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **read_assets**.
     *
     * @summary Retrieve an Asset
     * @throws FetchError<400, types.GetAssetSingleResponse400> Bad Request
     */
    getAssetSingle(metadata: types.GetAssetSingleMetadataParam): Promise<FetchResponse<200, types.GetAssetSingleResponse200> | FetchResponse<number, types.GetAssetSingleResponseDefault>>;
    /**
     * Update an Asset
     *
     * @throws FetchError<400, types.PostAssetSingleResponse400> Bad Request
     */
    postAssetSingle(body: types.PostAssetSingleBodyParam, metadata: types.PostAssetSingleMetadataParam): Promise<FetchResponse<200, types.PostAssetSingleResponse200> | FetchResponse<number, types.PostAssetSingleResponseDefault>>;
    /**
     * In ServiceM8, records are never deleted, but are archived. Archived records will remain
     * accessible via the API as (active = 0), however will no longer be visible in UI.
     * Archived records can be restored to active by setting the record active field to 1.
     *
     * @summary Delete an Asset
     * @throws FetchError<400, types.DeleteAssetSingleResponse400> Bad Request
     */
    deleteAssetSingle(metadata: types.DeleteAssetSingleMetadataParam): Promise<FetchResponse<200, types.DeleteAssetSingleResponse200> | FetchResponse<number, types.DeleteAssetSingleResponseDefault>>;
    /**
     * #### Filtering
     * This endpoint supports result filtering. For more information on how to filter this
     * request, [go here](/docs/filtering).
     *
     *
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **read_assets**.
     *
     * @summary List all Asset Types
     * @throws FetchError<400, types.GetAssetTypeAllResponse400> Bad Request
     */
    getAssetTypeAll(): Promise<FetchResponse<200, types.GetAssetTypeAllResponse200> | FetchResponse<number, types.GetAssetTypeAllResponseDefault>>;
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **manage_assets**.
     *
     *
     *
     * #### Record UUID
     * UUID is optional for record creation. If no UUID is supplied, a UUID will be
     * automatically generated for the new record and returned in the response header as
     * x-record-uuid.
     *
     * @summary Create a new Asset Type
     * @throws FetchError<400, types.PostAssetTypeCreateResponse400> Bad Request
     */
    postAssetTypeCreate(body: types.PostAssetTypeCreateBodyParam): Promise<FetchResponse<200, types.PostAssetTypeCreateResponse200> | FetchResponse<number, types.PostAssetTypeCreateResponseDefault>>;
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **read_assets**.
     *
     * @summary Retrieve an Asset Type
     * @throws FetchError<400, types.GetAssetTypeSingleResponse400> Bad Request
     */
    getAssetTypeSingle(metadata: types.GetAssetTypeSingleMetadataParam): Promise<FetchResponse<200, types.GetAssetTypeSingleResponse200> | FetchResponse<number, types.GetAssetTypeSingleResponseDefault>>;
    /**
     * Update an Asset Type
     *
     * @throws FetchError<400, types.PostAssetTypeSingleResponse400> Bad Request
     */
    postAssetTypeSingle(body: types.PostAssetTypeSingleBodyParam, metadata: types.PostAssetTypeSingleMetadataParam): Promise<FetchResponse<200, types.PostAssetTypeSingleResponse200> | FetchResponse<number, types.PostAssetTypeSingleResponseDefault>>;
    /**
     * In ServiceM8, records are never deleted, but are archived. Archived records will remain
     * accessible via the API as (active = 0), however will no longer be visible in UI.
     * Archived records can be restored to active by setting the record active field to 1.
     *
     * @summary Delete an Asset Type
     * @throws FetchError<400, types.DeleteAssetTypeSingleResponse400> Bad Request
     */
    deleteAssetTypeSingle(metadata: types.DeleteAssetTypeSingleMetadataParam): Promise<FetchResponse<200, types.DeleteAssetTypeSingleResponse200> | FetchResponse<number, types.DeleteAssetTypeSingleResponseDefault>>;
    /**
     * #### Filtering
     * This endpoint supports result filtering. For more information on how to filter this
     * request, [go here](/docs/filtering).
     *
     *
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **read_assets**.
     *
     * @summary List all Asset Type Fields
     * @throws FetchError<400, types.GetAssetTypeFieldAllResponse400> Bad Request
     */
    getAssetTypeFieldAll(): Promise<FetchResponse<200, types.GetAssetTypeFieldAllResponse200> | FetchResponse<number, types.GetAssetTypeFieldAllResponseDefault>>;
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **manage_assets**.
     *
     *
     *
     * #### Record UUID
     * UUID is optional for record creation. If no UUID is supplied, a UUID will be
     * automatically generated for the new record and returned in the response header as
     * x-record-uuid.
     *
     * @summary Create a new Asset Type Field
     * @throws FetchError<400, types.PostAssetTypeFieldCreateResponse400> Bad Request
     */
    postAssetTypeFieldCreate(body: types.PostAssetTypeFieldCreateBodyParam): Promise<FetchResponse<200, types.PostAssetTypeFieldCreateResponse200> | FetchResponse<number, types.PostAssetTypeFieldCreateResponseDefault>>;
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **read_assets**.
     *
     * @summary Retrieve an Asset Type Field
     * @throws FetchError<400, types.GetAssetTypeFieldSingleResponse400> Bad Request
     */
    getAssetTypeFieldSingle(metadata: types.GetAssetTypeFieldSingleMetadataParam): Promise<FetchResponse<200, types.GetAssetTypeFieldSingleResponse200> | FetchResponse<number, types.GetAssetTypeFieldSingleResponseDefault>>;
    /**
     * Update an Asset Type Field
     *
     * @throws FetchError<400, types.PostAssetTypeFieldSingleResponse400> Bad Request
     */
    postAssetTypeFieldSingle(body: types.PostAssetTypeFieldSingleBodyParam, metadata: types.PostAssetTypeFieldSingleMetadataParam): Promise<FetchResponse<200, types.PostAssetTypeFieldSingleResponse200> | FetchResponse<number, types.PostAssetTypeFieldSingleResponseDefault>>;
    /**
     * In ServiceM8, records are never deleted, but are archived. Archived records will remain
     * accessible via the API as (active = 0), however will no longer be visible in UI.
     * Archived records can be restored to active by setting the record active field to 1.
     *
     * @summary Delete an Asset Type Field
     * @throws FetchError<400, types.DeleteAssetTypeFieldSingleResponse400> Bad Request
     */
    deleteAssetTypeFieldSingle(metadata: types.DeleteAssetTypeFieldSingleMetadataParam): Promise<FetchResponse<200, types.DeleteAssetTypeFieldSingleResponse200> | FetchResponse<number, types.DeleteAssetTypeFieldSingleResponseDefault>>;
    /**
     * #### Filtering
     * This endpoint supports result filtering. For more information on how to filter this
     * request, [go here](/docs/filtering).
     *
     * @summary List all Attachments
     * @throws FetchError<400, types.GetAttachmentAllResponse400> Bad Request
     */
    getAttachmentAll(): Promise<FetchResponse<200, types.GetAttachmentAllResponse200> | FetchResponse<number, types.GetAttachmentAllResponseDefault>>;
    /**
     * #### Record UUID
     * UUID is optional for record creation. If no UUID is supplied, a UUID will be
     * automatically generated for the new record and returned in the response header as
     * x-record-uuid.
     *
     * @summary Create a new Attachment
     * @throws FetchError<400, types.PostAttachmentCreateResponse400> Bad Request
     */
    postAttachmentCreate(body: types.PostAttachmentCreateBodyParam): Promise<FetchResponse<200, types.PostAttachmentCreateResponse200> | FetchResponse<number, types.PostAttachmentCreateResponseDefault>>;
    /**
     * Retrieve an Attachment
     *
     * @throws FetchError<400, types.GetAttachmentSingleResponse400> Bad Request
     */
    getAttachmentSingle(metadata: types.GetAttachmentSingleMetadataParam): Promise<FetchResponse<200, types.GetAttachmentSingleResponse200> | FetchResponse<number, types.GetAttachmentSingleResponseDefault>>;
    /**
     * Update an Attachment
     *
     * @throws FetchError<400, types.PostAttachmentSingleResponse400> Bad Request
     */
    postAttachmentSingle(body: types.PostAttachmentSingleBodyParam, metadata: types.PostAttachmentSingleMetadataParam): Promise<FetchResponse<200, types.PostAttachmentSingleResponse200> | FetchResponse<number, types.PostAttachmentSingleResponseDefault>>;
    /**
     * In ServiceM8, records are never deleted, but are archived. Archived records will remain
     * accessible via the API as (active = 0), however will no longer be visible in UI.
     * Archived records can be restored to active by setting the record active field to 1.
     *
     * @summary Delete an Attachment
     * @throws FetchError<400, types.DeleteAttachmentSingleResponse400> Bad Request
     */
    deleteAttachmentSingle(metadata: types.DeleteAttachmentSingleMetadataParam): Promise<FetchResponse<200, types.DeleteAttachmentSingleResponse200> | FetchResponse<number, types.DeleteAttachmentSingleResponseDefault>>;
    /**
     * #### Filtering
     * This endpoint supports result filtering. For more information on how to filter this
     * request, [go here](/docs/filtering).
     *
     *
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **manage_badges**.
     *
     * @summary List all Badges
     * @throws FetchError<400, types.GetBadgeAllResponse400> Bad Request
     */
    getBadgeAll(): Promise<FetchResponse<200, types.GetBadgeAllResponse200> | FetchResponse<number, types.GetBadgeAllResponseDefault>>;
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **manage_badges**.
     *
     *
     *
     * #### Record UUID
     * UUID is optional for record creation. If no UUID is supplied, a UUID will be
     * automatically generated for the new record and returned in the response header as
     * x-record-uuid.
     *
     * @summary Create a new Badge
     * @throws FetchError<400, types.PostBadgeCreateResponse400> Bad Request
     */
    postBadgeCreate(body: types.PostBadgeCreateBodyParam): Promise<FetchResponse<200, types.PostBadgeCreateResponse200> | FetchResponse<number, types.PostBadgeCreateResponseDefault>>;
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **manage_badges**.
     *
     * @summary Retrieve a Badge
     * @throws FetchError<400, types.GetBadgeSingleResponse400> Bad Request
     */
    getBadgeSingle(metadata: types.GetBadgeSingleMetadataParam): Promise<FetchResponse<200, types.GetBadgeSingleResponse200> | FetchResponse<number, types.GetBadgeSingleResponseDefault>>;
    /**
     * Update a Badge
     *
     * @throws FetchError<400, types.PostBadgeSingleResponse400> Bad Request
     */
    postBadgeSingle(body: types.PostBadgeSingleBodyParam, metadata: types.PostBadgeSingleMetadataParam): Promise<FetchResponse<200, types.PostBadgeSingleResponse200> | FetchResponse<number, types.PostBadgeSingleResponseDefault>>;
    /**
     * In ServiceM8, records are never deleted, but are archived. Archived records will remain
     * accessible via the API as (active = 0), however will no longer be visible in UI.
     * Archived records can be restored to active by setting the record active field to 1.
     *
     * @summary Delete a Badge
     * @throws FetchError<400, types.DeleteBadgeSingleResponse400> Bad Request
     */
    deleteBadgeSingle(metadata: types.DeleteBadgeSingleMetadataParam): Promise<FetchResponse<200, types.DeleteBadgeSingleResponse200> | FetchResponse<number, types.DeleteBadgeSingleResponseDefault>>;
    /**
     * #### Filtering
     * This endpoint supports result filtering. For more information on how to filter this
     * request, [go here](/docs/filtering).
     *
     *
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **read_job_categories**.
     *
     * @summary List all Categories
     * @throws FetchError<400, types.GetCategoryAllResponse400> Bad Request
     */
    getCategoryAll(): Promise<FetchResponse<200, types.GetCategoryAllResponse200> | FetchResponse<number, types.GetCategoryAllResponseDefault>>;
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **manage_job_categories**.
     *
     *
     *
     * #### Record UUID
     * UUID is optional for record creation. If no UUID is supplied, a UUID will be
     * automatically generated for the new record and returned in the response header as
     * x-record-uuid.
     *
     * @summary Create a new Category
     * @throws FetchError<400, types.PostCategoryCreateResponse400> Bad Request
     */
    postCategoryCreate(body: types.PostCategoryCreateBodyParam): Promise<FetchResponse<200, types.PostCategoryCreateResponse200> | FetchResponse<number, types.PostCategoryCreateResponseDefault>>;
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **read_job_categories**.
     *
     * @summary Retrieve a Category
     * @throws FetchError<400, types.GetCategorySingleResponse400> Bad Request
     */
    getCategorySingle(metadata: types.GetCategorySingleMetadataParam): Promise<FetchResponse<200, types.GetCategorySingleResponse200> | FetchResponse<number, types.GetCategorySingleResponseDefault>>;
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **manage_job_categories**.
     *
     * @summary Update a Category
     * @throws FetchError<400, types.PostCategorySingleResponse400> Bad Request
     */
    postCategorySingle(body: types.PostCategorySingleBodyParam, metadata: types.PostCategorySingleMetadataParam): Promise<FetchResponse<200, types.PostCategorySingleResponse200> | FetchResponse<number, types.PostCategorySingleResponseDefault>>;
    /**
     * In ServiceM8, records are never deleted, but are archived. Archived records will remain
     * accessible via the API as (active = 0), however will no longer be visible in UI.
     * Archived records can be restored to active by setting the record active field to 1.
     *
     *
     *
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **manage_job_categories**.
     *
     * @summary Delete a Category
     * @throws FetchError<400, types.DeleteCategorySingleResponse400> Bad Request
     */
    deleteCategorySingle(metadata: types.DeleteCategorySingleMetadataParam): Promise<FetchResponse<200, types.DeleteCategorySingleResponse200> | FetchResponse<number, types.DeleteCategorySingleResponseDefault>>;
    /**
     * #### Filtering
     * This endpoint supports result filtering. For more information on how to filter this
     * request, [go here](/docs/filtering).
     *
     *
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **read_customers**.
     *
     * @summary List all Clients
     * @throws FetchError<400, types.GetCompanyAllResponse400> Bad Request
     */
    getCompanyAll(): Promise<FetchResponse<200, types.GetCompanyAllResponse200> | FetchResponse<number, types.GetCompanyAllResponseDefault>>;
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **manage_customers**.
     *
     *
     *
     * #### Record UUID
     * UUID is optional for record creation. If no UUID is supplied, a UUID will be
     * automatically generated for the new record and returned in the response header as
     * x-record-uuid.
     *
     * @summary Create a new Client
     * @throws FetchError<400, types.PostCompanyCreateResponse400> Bad Request
     */
    postCompanyCreate(body: types.PostCompanyCreateBodyParam): Promise<FetchResponse<200, types.PostCompanyCreateResponse200> | FetchResponse<number, types.PostCompanyCreateResponseDefault>>;
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **read_customers**.
     *
     * @summary Retrieve a Client
     * @throws FetchError<400, types.GetCompanySingleResponse400> Bad Request
     */
    getCompanySingle(metadata: types.GetCompanySingleMetadataParam): Promise<FetchResponse<200, types.GetCompanySingleResponse200> | FetchResponse<number, types.GetCompanySingleResponseDefault>>;
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **manage_customers**.
     *
     * @summary Update a Client
     * @throws FetchError<400, types.PostCompanySingleResponse400> Bad Request
     */
    postCompanySingle(body: types.PostCompanySingleBodyParam, metadata: types.PostCompanySingleMetadataParam): Promise<FetchResponse<200, types.PostCompanySingleResponse200> | FetchResponse<number, types.PostCompanySingleResponseDefault>>;
    /**
     * In ServiceM8, records are never deleted, but are archived. Archived records will remain
     * accessible via the API as (active = 0), however will no longer be visible in UI.
     * Archived records can be restored to active by setting the record active field to 1.
     *
     *
     *
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **manage_customers**.
     *
     * @summary Delete a Client
     * @throws FetchError<400, types.DeleteCompanySingleResponse400> Bad Request
     */
    deleteCompanySingle(metadata: types.DeleteCompanySingleMetadataParam): Promise<FetchResponse<200, types.DeleteCompanySingleResponse200> | FetchResponse<number, types.DeleteCompanySingleResponseDefault>>;
    /**
     * #### Filtering
     * This endpoint supports result filtering. For more information on how to filter this
     * request, [go here](/docs/filtering).
     *
     *
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **read_customer_contacts**.
     *
     * @summary List all Company Contacts
     * @throws FetchError<400, types.GetCompanyContactAllResponse400> Bad Request
     */
    getCompanyContactAll(): Promise<FetchResponse<200, types.GetCompanyContactAllResponse200> | FetchResponse<number, types.GetCompanyContactAllResponseDefault>>;
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **manage_customer_contacts**.
     *
     *
     *
     * #### Record UUID
     * UUID is optional for record creation. If no UUID is supplied, a UUID will be
     * automatically generated for the new record and returned in the response header as
     * x-record-uuid.
     *
     * @summary Create a new Company Contact
     * @throws FetchError<400, types.PostCompanyContactCreateResponse400> Bad Request
     */
    postCompanyContactCreate(body: types.PostCompanyContactCreateBodyParam): Promise<FetchResponse<200, types.PostCompanyContactCreateResponse200> | FetchResponse<number, types.PostCompanyContactCreateResponseDefault>>;
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **read_customer_contacts**.
     *
     * @summary Retrieve a Company Contact
     * @throws FetchError<400, types.GetCompanyContactSingleResponse400> Bad Request
     */
    getCompanyContactSingle(metadata: types.GetCompanyContactSingleMetadataParam): Promise<FetchResponse<200, types.GetCompanyContactSingleResponse200> | FetchResponse<number, types.GetCompanyContactSingleResponseDefault>>;
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **manage_customer_contacts**.
     *
     * @summary Update a Company Contact
     * @throws FetchError<400, types.PostCompanyContactSingleResponse400> Bad Request
     */
    postCompanyContactSingle(body: types.PostCompanyContactSingleBodyParam, metadata: types.PostCompanyContactSingleMetadataParam): Promise<FetchResponse<200, types.PostCompanyContactSingleResponse200> | FetchResponse<number, types.PostCompanyContactSingleResponseDefault>>;
    /**
     * In ServiceM8, records are never deleted, but are archived. Archived records will remain
     * accessible via the API as (active = 0), however will no longer be visible in UI.
     * Archived records can be restored to active by setting the record active field to 1.
     *
     *
     *
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **manage_customer_contacts**.
     *
     * @summary Delete a Company Contact
     * @throws FetchError<400, types.DeleteCompanyContactSingleResponse400> Bad Request
     */
    deleteCompanyContactSingle(metadata: types.DeleteCompanyContactSingleMetadataParam): Promise<FetchResponse<200, types.DeleteCompanyContactSingleResponse200> | FetchResponse<number, types.DeleteCompanyContactSingleResponseDefault>>;
    /**
     * #### Filtering
     * This endpoint supports result filtering. For more information on how to filter this
     * request, [go here](/docs/filtering).
     *
     * @summary List all Email Templates
     * @throws FetchError<400, types.GetEmailTemplateAllResponse400> Bad Request
     */
    getEmailTemplateAll(): Promise<FetchResponse<200, types.GetEmailTemplateAllResponse200> | FetchResponse<number, types.GetEmailTemplateAllResponseDefault>>;
    /**
     * #### Record UUID
     * UUID is optional for record creation. If no UUID is supplied, a UUID will be
     * automatically generated for the new record and returned in the response header as
     * x-record-uuid.
     *
     * @summary Create a new Email Template
     * @throws FetchError<400, types.PostEmailTemplateCreateResponse400> Bad Request
     */
    postEmailTemplateCreate(body: types.PostEmailTemplateCreateBodyParam): Promise<FetchResponse<200, types.PostEmailTemplateCreateResponse200> | FetchResponse<number, types.PostEmailTemplateCreateResponseDefault>>;
    /**
     * Retrieve an Email Template
     *
     * @throws FetchError<400, types.GetEmailTemplateSingleResponse400> Bad Request
     */
    getEmailTemplateSingle(metadata: types.GetEmailTemplateSingleMetadataParam): Promise<FetchResponse<200, types.GetEmailTemplateSingleResponse200> | FetchResponse<number, types.GetEmailTemplateSingleResponseDefault>>;
    /**
     * Update an Email Template
     *
     * @throws FetchError<400, types.PostEmailTemplateSingleResponse400> Bad Request
     */
    postEmailTemplateSingle(body: types.PostEmailTemplateSingleBodyParam, metadata: types.PostEmailTemplateSingleMetadataParam): Promise<FetchResponse<200, types.PostEmailTemplateSingleResponse200> | FetchResponse<number, types.PostEmailTemplateSingleResponseDefault>>;
    /**
     * In ServiceM8, records are never deleted, but are archived. Archived records will remain
     * accessible via the API as (active = 0), however will no longer be visible in UI.
     * Archived records can be restored to active by setting the record active field to 1.
     *
     * @summary Delete an Email Template
     * @throws FetchError<400, types.DeleteEmailTemplateSingleResponse400> Bad Request
     */
    deleteEmailTemplateSingle(metadata: types.DeleteEmailTemplateSingleMetadataParam): Promise<FetchResponse<200, types.DeleteEmailTemplateSingleResponse200> | FetchResponse<number, types.DeleteEmailTemplateSingleResponseDefault>>;
    /**
     * #### Filtering
     * This endpoint supports result filtering. For more information on how to filter this
     * request, [go here](/docs/filtering).
     *
     * @summary List all Feedback
     * @throws FetchError<400, types.GetFeedbackAllResponse400> Bad Request
     */
    getFeedbackAll(): Promise<FetchResponse<200, types.GetFeedbackAllResponse200> | FetchResponse<number, types.GetFeedbackAllResponseDefault>>;
    /**
     * #### Record UUID
     * UUID is optional for record creation. If no UUID is supplied, a UUID will be
     * automatically generated for the new record and returned in the response header as
     * x-record-uuid.
     *
     * @summary Create a new Feedback
     * @throws FetchError<400, types.PostFeedbackCreateResponse400> Bad Request
     */
    postFeedbackCreate(body: types.PostFeedbackCreateBodyParam): Promise<FetchResponse<200, types.PostFeedbackCreateResponse200> | FetchResponse<number, types.PostFeedbackCreateResponseDefault>>;
    /**
     * Retrieve a Feedback
     *
     * @throws FetchError<400, types.GetFeedbackSingleResponse400> Bad Request
     */
    getFeedbackSingle(metadata: types.GetFeedbackSingleMetadataParam): Promise<FetchResponse<200, types.GetFeedbackSingleResponse200> | FetchResponse<number, types.GetFeedbackSingleResponseDefault>>;
    /**
     * Update a Feedback
     *
     * @throws FetchError<400, types.PostFeedbackSingleResponse400> Bad Request
     */
    postFeedbackSingle(body: types.PostFeedbackSingleBodyParam, metadata: types.PostFeedbackSingleMetadataParam): Promise<FetchResponse<200, types.PostFeedbackSingleResponse200> | FetchResponse<number, types.PostFeedbackSingleResponseDefault>>;
    /**
     * In ServiceM8, records are never deleted, but are archived. Archived records will remain
     * accessible via the API as (active = 0), however will no longer be visible in UI.
     * Archived records can be restored to active by setting the record active field to 1.
     *
     * @summary Delete a Feedback
     * @throws FetchError<400, types.DeleteFeedbackSingleResponse400> Bad Request
     */
    deleteFeedbackSingle(metadata: types.DeleteFeedbackSingleMetadataParam): Promise<FetchResponse<200, types.DeleteFeedbackSingleResponse200> | FetchResponse<number, types.DeleteFeedbackSingleResponseDefault>>;
    /**
     * #### Filtering
     * This endpoint supports result filtering. For more information on how to filter this
     * request, [go here](/docs/filtering).
     *
     * @summary List all Forms
     * @throws FetchError<400, types.GetFormAllResponse400> Bad Request
     */
    getFormAll(): Promise<FetchResponse<200, types.GetFormAllResponse200> | FetchResponse<number, types.GetFormAllResponseDefault>>;
    /**
     * #### Record UUID
     * UUID is optional for record creation. If no UUID is supplied, a UUID will be
     * automatically generated for the new record and returned in the response header as
     * x-record-uuid.
     *
     * @summary Create a new Form
     * @throws FetchError<400, types.PostFormCreateResponse400> Bad Request
     */
    postFormCreate(body: types.PostFormCreateBodyParam): Promise<FetchResponse<200, types.PostFormCreateResponse200> | FetchResponse<number, types.PostFormCreateResponseDefault>>;
    /**
     * Retrieve a Form
     *
     * @throws FetchError<400, types.GetFormSingleResponse400> Bad Request
     */
    getFormSingle(metadata: types.GetFormSingleMetadataParam): Promise<FetchResponse<200, types.GetFormSingleResponse200> | FetchResponse<number, types.GetFormSingleResponseDefault>>;
    /**
     * Update a Form
     *
     * @throws FetchError<400, types.PostFormSingleResponse400> Bad Request
     */
    postFormSingle(body: types.PostFormSingleBodyParam, metadata: types.PostFormSingleMetadataParam): Promise<FetchResponse<200, types.PostFormSingleResponse200> | FetchResponse<number, types.PostFormSingleResponseDefault>>;
    /**
     * In ServiceM8, records are never deleted, but are archived. Archived records will remain
     * accessible via the API as (active = 0), however will no longer be visible in UI.
     * Archived records can be restored to active by setting the record active field to 1.
     *
     * @summary Delete a Form
     * @throws FetchError<400, types.DeleteFormSingleResponse400> Bad Request
     */
    deleteFormSingle(metadata: types.DeleteFormSingleMetadataParam): Promise<FetchResponse<200, types.DeleteFormSingleResponse200> | FetchResponse<number, types.DeleteFormSingleResponseDefault>>;
    /**
     * #### Filtering
     * This endpoint supports result filtering. For more information on how to filter this
     * request, [go here](/docs/filtering).
     *
     * @summary List all Form Fields
     * @throws FetchError<400, types.GetFormFieldAllResponse400> Bad Request
     */
    getFormFieldAll(): Promise<FetchResponse<200, types.GetFormFieldAllResponse200> | FetchResponse<number, types.GetFormFieldAllResponseDefault>>;
    /**
     * #### Record UUID
     * UUID is optional for record creation. If no UUID is supplied, a UUID will be
     * automatically generated for the new record and returned in the response header as
     * x-record-uuid.
     *
     * @summary Create a new Form Field
     * @throws FetchError<400, types.PostFormFieldCreateResponse400> Bad Request
     */
    postFormFieldCreate(body: types.PostFormFieldCreateBodyParam): Promise<FetchResponse<200, types.PostFormFieldCreateResponse200> | FetchResponse<number, types.PostFormFieldCreateResponseDefault>>;
    /**
     * Retrieve a Form Field
     *
     * @throws FetchError<400, types.GetFormFieldSingleResponse400> Bad Request
     */
    getFormFieldSingle(metadata: types.GetFormFieldSingleMetadataParam): Promise<FetchResponse<200, types.GetFormFieldSingleResponse200> | FetchResponse<number, types.GetFormFieldSingleResponseDefault>>;
    /**
     * Update a Form Field
     *
     * @throws FetchError<400, types.PostFormFieldSingleResponse400> Bad Request
     */
    postFormFieldSingle(body: types.PostFormFieldSingleBodyParam, metadata: types.PostFormFieldSingleMetadataParam): Promise<FetchResponse<200, types.PostFormFieldSingleResponse200> | FetchResponse<number, types.PostFormFieldSingleResponseDefault>>;
    /**
     * In ServiceM8, records are never deleted, but are archived. Archived records will remain
     * accessible via the API as (active = 0), however will no longer be visible in UI.
     * Archived records can be restored to active by setting the record active field to 1.
     *
     * @summary Delete a Form Field
     * @throws FetchError<400, types.DeleteFormFieldSingleResponse400> Bad Request
     */
    deleteFormFieldSingle(metadata: types.DeleteFormFieldSingleMetadataParam): Promise<FetchResponse<200, types.DeleteFormFieldSingleResponse200> | FetchResponse<number, types.DeleteFormFieldSingleResponseDefault>>;
    /**
     * #### Filtering
     * This endpoint supports result filtering. For more information on how to filter this
     * request, [go here](/docs/filtering).
     *
     * @summary List all Form Responses
     * @throws FetchError<400, types.GetFormResponseAllResponse400> Bad Request
     */
    getFormResponseAll(): Promise<FetchResponse<200, types.GetFormResponseAllResponse200> | FetchResponse<number, types.GetFormResponseAllResponseDefault>>;
    /**
     * #### Record UUID
     * UUID is optional for record creation. If no UUID is supplied, a UUID will be
     * automatically generated for the new record and returned in the response header as
     * x-record-uuid.
     *
     * @summary Create a new Form Response
     * @throws FetchError<400, types.PostFormResponseCreateResponse400> Bad Request
     */
    postFormResponseCreate(body: types.PostFormResponseCreateBodyParam): Promise<FetchResponse<200, types.PostFormResponseCreateResponse200> | FetchResponse<number, types.PostFormResponseCreateResponseDefault>>;
    /**
     * Retrieve a Form Response
     *
     * @throws FetchError<400, types.GetFormResponseSingleResponse400> Bad Request
     */
    getFormResponseSingle(metadata: types.GetFormResponseSingleMetadataParam): Promise<FetchResponse<200, types.GetFormResponseSingleResponse200> | FetchResponse<number, types.GetFormResponseSingleResponseDefault>>;
    /**
     * Update a Form Response
     *
     * @throws FetchError<400, types.PostFormResponseSingleResponse400> Bad Request
     */
    postFormResponseSingle(body: types.PostFormResponseSingleBodyParam, metadata: types.PostFormResponseSingleMetadataParam): Promise<FetchResponse<200, types.PostFormResponseSingleResponse200> | FetchResponse<number, types.PostFormResponseSingleResponseDefault>>;
    /**
     * In ServiceM8, records are never deleted, but are archived. Archived records will remain
     * accessible via the API as (active = 0), however will no longer be visible in UI.
     * Archived records can be restored to active by setting the record active field to 1.
     *
     * @summary Delete a Form Response
     * @throws FetchError<400, types.DeleteFormResponseSingleResponse400> Bad Request
     */
    deleteFormResponseSingle(metadata: types.DeleteFormResponseSingleMetadataParam): Promise<FetchResponse<200, types.DeleteFormResponseSingleResponse200> | FetchResponse<number, types.DeleteFormResponseSingleResponseDefault>>;
    /**
     * #### Filtering
     * This endpoint supports result filtering. For more information on how to filter this
     * request, [go here](/docs/filtering).
     *
     *
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **read_jobs**.
     *
     * @summary List all Jobs
     * @throws FetchError<400, types.GetJobAllResponse400> Bad Request
     */
    getJobAll(): Promise<FetchResponse<200, types.GetJobAllResponse200> | FetchResponse<number, types.GetJobAllResponseDefault>>;
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **create_jobs**.
     *
     *
     *
     * #### Record UUID
     * UUID is optional for record creation. If no UUID is supplied, a UUID will be
     * automatically generated for the new record and returned in the response header as
     * x-record-uuid.
     *
     * @summary Create a new Job
     * @throws FetchError<400, types.PostJobCreateResponse400> Bad Request
     */
    postJobCreate(body: types.PostJobCreateBodyParam): Promise<FetchResponse<200, types.PostJobCreateResponse200> | FetchResponse<number, types.PostJobCreateResponseDefault>>;
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **read_jobs**.
     *
     * @summary Retrieve a Job
     * @throws FetchError<400, types.GetJobSingleResponse400> Bad Request
     */
    getJobSingle(metadata: types.GetJobSingleMetadataParam): Promise<FetchResponse<200, types.GetJobSingleResponse200> | FetchResponse<number, types.GetJobSingleResponseDefault>>;
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **manage_jobs**.
     *
     * @summary Update a Job
     * @throws FetchError<400, types.PostJobSingleResponse400> Bad Request
     */
    postJobSingle(body: types.PostJobSingleBodyParam, metadata: types.PostJobSingleMetadataParam): Promise<FetchResponse<200, types.PostJobSingleResponse200> | FetchResponse<number, types.PostJobSingleResponseDefault>>;
    /**
     * In ServiceM8, records are never deleted, but are archived. Archived records will remain
     * accessible via the API as (active = 0), however will no longer be visible in UI.
     * Archived records can be restored to active by setting the record active field to 1.
     *
     *
     *
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **manage_jobs**.
     *
     * @summary Delete a Job
     * @throws FetchError<400, types.DeleteJobSingleResponse400> Bad Request
     */
    deleteJobSingle(metadata: types.DeleteJobSingleMetadataParam): Promise<FetchResponse<200, types.DeleteJobSingleResponse200> | FetchResponse<number, types.DeleteJobSingleResponseDefault>>;
    /**
     * #### Filtering
     * This endpoint supports result filtering. For more information on how to filter this
     * request, [go here](/docs/filtering).
     *
     *
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **read_schedule**.
     *
     * @summary List all Job Activities
     * @throws FetchError<400, types.GetJobActivityAllResponse400> Bad Request
     */
    getJobActivityAll(): Promise<FetchResponse<200, types.GetJobActivityAllResponse200> | FetchResponse<number, types.GetJobActivityAllResponseDefault>>;
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **manage_schedule**.
     *
     *
     *
     * #### Record UUID
     * UUID is optional for record creation. If no UUID is supplied, a UUID will be
     * automatically generated for the new record and returned in the response header as
     * x-record-uuid.
     *
     * @summary Create a new Job Activity
     * @throws FetchError<400, types.PostJobActivityCreateResponse400> Bad Request
     */
    postJobActivityCreate(body: types.PostJobActivityCreateBodyParam): Promise<FetchResponse<200, types.PostJobActivityCreateResponse200> | FetchResponse<number, types.PostJobActivityCreateResponseDefault>>;
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **read_schedule**.
     *
     * @summary Retrieve a Job Activity
     * @throws FetchError<400, types.GetJobActivitySingleResponse400> Bad Request
     */
    getJobActivitySingle(metadata: types.GetJobActivitySingleMetadataParam): Promise<FetchResponse<200, types.GetJobActivitySingleResponse200> | FetchResponse<number, types.GetJobActivitySingleResponseDefault>>;
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **manage_schedule**.
     *
     * @summary Update a Job Activity
     * @throws FetchError<400, types.PostJobActivitySingleResponse400> Bad Request
     */
    postJobActivitySingle(body: types.PostJobActivitySingleBodyParam, metadata: types.PostJobActivitySingleMetadataParam): Promise<FetchResponse<200, types.PostJobActivitySingleResponse200> | FetchResponse<number, types.PostJobActivitySingleResponseDefault>>;
    /**
     * In ServiceM8, records are never deleted, but are archived. Archived records will remain
     * accessible via the API as (active = 0), however will no longer be visible in UI.
     * Archived records can be restored to active by setting the record active field to 1.
     *
     *
     *
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **manage_schedule**.
     *
     * @summary Delete a Job Activity
     * @throws FetchError<400, types.DeleteJobActivitySingleResponse400> Bad Request
     */
    deleteJobActivitySingle(metadata: types.DeleteJobActivitySingleMetadataParam): Promise<FetchResponse<200, types.DeleteJobActivitySingleResponse200> | FetchResponse<number, types.DeleteJobActivitySingleResponseDefault>>;
    /**
     * #### Filtering
     * This endpoint supports result filtering. For more information on how to filter this
     * request, [go here](/docs/filtering).
     *
     *
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **read_schedule**.
     *
     * @summary List all Job Allocations
     * @throws FetchError<400, types.GetJobAllocationAllResponse400> Bad Request
     */
    getJobAllocationAll(): Promise<FetchResponse<200, types.GetJobAllocationAllResponse200> | FetchResponse<number, types.GetJobAllocationAllResponseDefault>>;
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **manage_schedule**.
     *
     *
     *
     * #### Record UUID
     * UUID is optional for record creation. If no UUID is supplied, a UUID will be
     * automatically generated for the new record and returned in the response header as
     * x-record-uuid.
     *
     * @summary Create a new Job Allocation
     * @throws FetchError<400, types.PostJobAllocationCreateResponse400> Bad Request
     */
    postJobAllocationCreate(body: types.PostJobAllocationCreateBodyParam): Promise<FetchResponse<200, types.PostJobAllocationCreateResponse200> | FetchResponse<number, types.PostJobAllocationCreateResponseDefault>>;
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **read_schedule**.
     *
     * @summary Retrieve a Job Allocation
     * @throws FetchError<400, types.GetJobAllocationSingleResponse400> Bad Request
     */
    getJobAllocationSingle(metadata: types.GetJobAllocationSingleMetadataParam): Promise<FetchResponse<200, types.GetJobAllocationSingleResponse200> | FetchResponse<number, types.GetJobAllocationSingleResponseDefault>>;
    /**
     * Update a Job Allocation
     *
     * @throws FetchError<400, types.PostJobAllocationSingleResponse400> Bad Request
     */
    postJobAllocationSingle(body: types.PostJobAllocationSingleBodyParam, metadata: types.PostJobAllocationSingleMetadataParam): Promise<FetchResponse<200, types.PostJobAllocationSingleResponse200> | FetchResponse<number, types.PostJobAllocationSingleResponseDefault>>;
    /**
     * In ServiceM8, records are never deleted, but are archived. Archived records will remain
     * accessible via the API as (active = 0), however will no longer be visible in UI.
     * Archived records can be restored to active by setting the record active field to 1.
     *
     * @summary Delete a Job Allocation
     * @throws FetchError<400, types.DeleteJobAllocationSingleResponse400> Bad Request
     */
    deleteJobAllocationSingle(metadata: types.DeleteJobAllocationSingleMetadataParam): Promise<FetchResponse<200, types.DeleteJobAllocationSingleResponse200> | FetchResponse<number, types.DeleteJobAllocationSingleResponseDefault>>;
    /**
     * #### Filtering
     * This endpoint supports result filtering. For more information on how to filter this
     * request, [go here](/docs/filtering).
     *
     * @summary List all Job Checklists
     * @throws FetchError<400, types.GetJobChecklistAllResponse400> Bad Request
     */
    getJobChecklistAll(): Promise<FetchResponse<200, types.GetJobChecklistAllResponse200> | FetchResponse<number, types.GetJobChecklistAllResponseDefault>>;
    /**
     * #### Record UUID
     * UUID is optional for record creation. If no UUID is supplied, a UUID will be
     * automatically generated for the new record and returned in the response header as
     * x-record-uuid.
     *
     * @summary Create a new Job Checklist
     * @throws FetchError<400, types.PostJobChecklistCreateResponse400> Bad Request
     */
    postJobChecklistCreate(body: types.PostJobChecklistCreateBodyParam): Promise<FetchResponse<200, types.PostJobChecklistCreateResponse200> | FetchResponse<number, types.PostJobChecklistCreateResponseDefault>>;
    /**
     * Retrieve a Job Checklist
     *
     * @throws FetchError<400, types.GetJobChecklistSingleResponse400> Bad Request
     */
    getJobChecklistSingle(metadata: types.GetJobChecklistSingleMetadataParam): Promise<FetchResponse<200, types.GetJobChecklistSingleResponse200> | FetchResponse<number, types.GetJobChecklistSingleResponseDefault>>;
    /**
     * Update a Job Checklist
     *
     * @throws FetchError<400, types.PostJobChecklistSingleResponse400> Bad Request
     */
    postJobChecklistSingle(body: types.PostJobChecklistSingleBodyParam, metadata: types.PostJobChecklistSingleMetadataParam): Promise<FetchResponse<200, types.PostJobChecklistSingleResponse200> | FetchResponse<number, types.PostJobChecklistSingleResponseDefault>>;
    /**
     * In ServiceM8, records are never deleted, but are archived. Archived records will remain
     * accessible via the API as (active = 0), however will no longer be visible in UI.
     * Archived records can be restored to active by setting the record active field to 1.
     *
     * @summary Delete a Job Checklist
     * @throws FetchError<400, types.DeleteJobChecklistSingleResponse400> Bad Request
     */
    deleteJobChecklistSingle(metadata: types.DeleteJobChecklistSingleMetadataParam): Promise<FetchResponse<200, types.DeleteJobChecklistSingleResponse200> | FetchResponse<number, types.DeleteJobChecklistSingleResponseDefault>>;
    /**
     * #### Filtering
     * This endpoint supports result filtering. For more information on how to filter this
     * request, [go here](/docs/filtering).
     *
     *
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **read_job_contacts**.
     *
     * @summary List all Job Contacts
     * @throws FetchError<400, types.GetJobContactAllResponse400> Bad Request
     */
    getJobContactAll(): Promise<FetchResponse<200, types.GetJobContactAllResponse200> | FetchResponse<number, types.GetJobContactAllResponseDefault>>;
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **manage_job_contacts**.
     *
     *
     *
     * #### Record UUID
     * UUID is optional for record creation. If no UUID is supplied, a UUID will be
     * automatically generated for the new record and returned in the response header as
     * x-record-uuid.
     *
     * @summary Create a new Job Contact
     * @throws FetchError<400, types.PostJobContactCreateResponse400> Bad Request
     */
    postJobContactCreate(body: types.PostJobContactCreateBodyParam): Promise<FetchResponse<200, types.PostJobContactCreateResponse200> | FetchResponse<number, types.PostJobContactCreateResponseDefault>>;
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **read_job_contacts**.
     *
     * @summary Retrieve a Job Contact
     * @throws FetchError<400, types.GetJobContactSingleResponse400> Bad Request
     */
    getJobContactSingle(metadata: types.GetJobContactSingleMetadataParam): Promise<FetchResponse<200, types.GetJobContactSingleResponse200> | FetchResponse<number, types.GetJobContactSingleResponseDefault>>;
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **manage_job_contacts**.
     *
     * @summary Update a Job Contact
     * @throws FetchError<400, types.PostJobContactSingleResponse400> Bad Request
     */
    postJobContactSingle(body: types.PostJobContactSingleBodyParam, metadata: types.PostJobContactSingleMetadataParam): Promise<FetchResponse<200, types.PostJobContactSingleResponse200> | FetchResponse<number, types.PostJobContactSingleResponseDefault>>;
    /**
     * In ServiceM8, records are never deleted, but are archived. Archived records will remain
     * accessible via the API as (active = 0), however will no longer be visible in UI.
     * Archived records can be restored to active by setting the record active field to 1.
     *
     *
     *
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **manage_job_contacts**.
     *
     * @summary Delete a Job Contact
     * @throws FetchError<400, types.DeleteJobContactSingleResponse400> Bad Request
     */
    deleteJobContactSingle(metadata: types.DeleteJobContactSingleMetadataParam): Promise<FetchResponse<200, types.DeleteJobContactSingleResponse200> | FetchResponse<number, types.DeleteJobContactSingleResponseDefault>>;
    /**
     * #### Filtering
     * This endpoint supports result filtering. For more information on how to filter this
     * request, [go here](/docs/filtering).
     *
     *
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **read_job_materials**.
     *
     * @summary List all Job Materials
     * @throws FetchError<400, types.GetJobMaterialAllResponse400> Bad Request
     */
    getJobMaterialAll(): Promise<FetchResponse<200, types.GetJobMaterialAllResponse200> | FetchResponse<number, types.GetJobMaterialAllResponseDefault>>;
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **manage_job_materials**.
     *
     *
     *
     * #### Record UUID
     * UUID is optional for record creation. If no UUID is supplied, a UUID will be
     * automatically generated for the new record and returned in the response header as
     * x-record-uuid.
     *
     * @summary Create a new Job Material
     * @throws FetchError<400, types.PostJobMaterialCreateResponse400> Bad Request
     */
    postJobMaterialCreate(body: types.PostJobMaterialCreateBodyParam): Promise<FetchResponse<200, types.PostJobMaterialCreateResponse200> | FetchResponse<number, types.PostJobMaterialCreateResponseDefault>>;
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **read_job_materials**.
     *
     * @summary Retrieve a Job Material
     * @throws FetchError<400, types.GetJobMaterialSingleResponse400> Bad Request
     */
    getJobMaterialSingle(metadata: types.GetJobMaterialSingleMetadataParam): Promise<FetchResponse<200, types.GetJobMaterialSingleResponse200> | FetchResponse<number, types.GetJobMaterialSingleResponseDefault>>;
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **manage_job_materials**.
     *
     * @summary Update a Job Material
     * @throws FetchError<400, types.PostJobMaterialSingleResponse400> Bad Request
     */
    postJobMaterialSingle(body: types.PostJobMaterialSingleBodyParam, metadata: types.PostJobMaterialSingleMetadataParam): Promise<FetchResponse<200, types.PostJobMaterialSingleResponse200> | FetchResponse<number, types.PostJobMaterialSingleResponseDefault>>;
    /**
     * In ServiceM8, records are never deleted, but are archived. Archived records will remain
     * accessible via the API as (active = 0), however will no longer be visible in UI.
     * Archived records can be restored to active by setting the record active field to 1.
     *
     *
     *
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **manage_job_materials**.
     *
     * @summary Delete a Job Material
     * @throws FetchError<400, types.DeleteJobMaterialSingleResponse400> Bad Request
     */
    deleteJobMaterialSingle(metadata: types.DeleteJobMaterialSingleMetadataParam): Promise<FetchResponse<200, types.DeleteJobMaterialSingleResponse200> | FetchResponse<number, types.DeleteJobMaterialSingleResponseDefault>>;
    /**
     * #### Filtering
     * This endpoint supports result filtering. For more information on how to filter this
     * request, [go here](/docs/filtering).
     *
     * @summary List all Job Material Bundles
     * @throws FetchError<400, types.GetJobMaterialBundleAllResponse400> Bad Request
     */
    getJobMaterialBundleAll(): Promise<FetchResponse<200, types.GetJobMaterialBundleAllResponse200> | FetchResponse<number, types.GetJobMaterialBundleAllResponseDefault>>;
    /**
     * #### Record UUID
     * UUID is optional for record creation. If no UUID is supplied, a UUID will be
     * automatically generated for the new record and returned in the response header as
     * x-record-uuid.
     *
     * @summary Create a new Job Material Bundle
     * @throws FetchError<400, types.PostJobMaterialBundleCreateResponse400> Bad Request
     */
    postJobMaterialBundleCreate(body: types.PostJobMaterialBundleCreateBodyParam): Promise<FetchResponse<200, types.PostJobMaterialBundleCreateResponse200> | FetchResponse<number, types.PostJobMaterialBundleCreateResponseDefault>>;
    /**
     * Retrieve a Job Material Bundle
     *
     * @throws FetchError<400, types.GetJobMaterialBundleSingleResponse400> Bad Request
     */
    getJobMaterialBundleSingle(metadata: types.GetJobMaterialBundleSingleMetadataParam): Promise<FetchResponse<200, types.GetJobMaterialBundleSingleResponse200> | FetchResponse<number, types.GetJobMaterialBundleSingleResponseDefault>>;
    /**
     * Update a Job Material Bundle
     *
     * @throws FetchError<400, types.PostJobMaterialBundleSingleResponse400> Bad Request
     */
    postJobMaterialBundleSingle(body: types.PostJobMaterialBundleSingleBodyParam, metadata: types.PostJobMaterialBundleSingleMetadataParam): Promise<FetchResponse<200, types.PostJobMaterialBundleSingleResponse200> | FetchResponse<number, types.PostJobMaterialBundleSingleResponseDefault>>;
    /**
     * In ServiceM8, records are never deleted, but are archived. Archived records will remain
     * accessible via the API as (active = 0), however will no longer be visible in UI.
     * Archived records can be restored to active by setting the record active field to 1.
     *
     * @summary Delete a Job Material Bundle
     * @throws FetchError<400, types.DeleteJobMaterialBundleSingleResponse400> Bad Request
     */
    deleteJobMaterialBundleSingle(metadata: types.DeleteJobMaterialBundleSingleMetadataParam): Promise<FetchResponse<200, types.DeleteJobMaterialBundleSingleResponse200> | FetchResponse<number, types.DeleteJobMaterialBundleSingleResponseDefault>>;
    /**
     * #### Filtering
     * This endpoint supports result filtering. For more information on how to filter this
     * request, [go here](/docs/filtering).
     *
     * @summary List all Job Payments
     * @throws FetchError<400, types.GetJobPaymentAllResponse400> Bad Request
     */
    getJobPaymentAll(): Promise<FetchResponse<200, types.GetJobPaymentAllResponse200> | FetchResponse<number, types.GetJobPaymentAllResponseDefault>>;
    /**
     * #### Record UUID
     * UUID is optional for record creation. If no UUID is supplied, a UUID will be
     * automatically generated for the new record and returned in the response header as
     * x-record-uuid.
     *
     * @summary Create a new Job Payment
     * @throws FetchError<400, types.PostJobPaymentCreateResponse400> Bad Request
     */
    postJobPaymentCreate(body: types.PostJobPaymentCreateBodyParam): Promise<FetchResponse<200, types.PostJobPaymentCreateResponse200> | FetchResponse<number, types.PostJobPaymentCreateResponseDefault>>;
    /**
     * Retrieve a Job Payment
     *
     * @throws FetchError<400, types.GetJobPaymentSingleResponse400> Bad Request
     */
    getJobPaymentSingle(metadata: types.GetJobPaymentSingleMetadataParam): Promise<FetchResponse<200, types.GetJobPaymentSingleResponse200> | FetchResponse<number, types.GetJobPaymentSingleResponseDefault>>;
    /**
     * Update a Job Payment
     *
     * @throws FetchError<400, types.PostJobPaymentSingleResponse400> Bad Request
     */
    postJobPaymentSingle(body: types.PostJobPaymentSingleBodyParam, metadata: types.PostJobPaymentSingleMetadataParam): Promise<FetchResponse<200, types.PostJobPaymentSingleResponse200> | FetchResponse<number, types.PostJobPaymentSingleResponseDefault>>;
    /**
     * In ServiceM8, records are never deleted, but are archived. Archived records will remain
     * accessible via the API as (active = 0), however will no longer be visible in UI.
     * Archived records can be restored to active by setting the record active field to 1.
     *
     * @summary Delete a Job Payment
     * @throws FetchError<400, types.DeleteJobPaymentSingleResponse400> Bad Request
     */
    deleteJobPaymentSingle(metadata: types.DeleteJobPaymentSingleMetadataParam): Promise<FetchResponse<200, types.DeleteJobPaymentSingleResponse200> | FetchResponse<number, types.DeleteJobPaymentSingleResponseDefault>>;
    /**
     * #### Filtering
     * This endpoint supports result filtering. For more information on how to filter this
     * request, [go here](/docs/filtering).
     *
     *
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **read_knowledge**.
     *
     * @summary List all Knowledge Articles
     * @throws FetchError<400, types.GetKnowledgeArticleAllResponse400> Bad Request
     */
    getKnowledgeArticleAll(): Promise<FetchResponse<200, types.GetKnowledgeArticleAllResponse200> | FetchResponse<number, types.GetKnowledgeArticleAllResponseDefault>>;
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **manage_knowledge**.
     *
     *
     *
     * #### Record UUID
     * UUID is optional for record creation. If no UUID is supplied, a UUID will be
     * automatically generated for the new record and returned in the response header as
     * x-record-uuid.
     *
     * @summary Create a new Knowledge Article
     * @throws FetchError<400, types.PostKnowledgeArticleCreateResponse400> Bad Request
     */
    postKnowledgeArticleCreate(body: types.PostKnowledgeArticleCreateBodyParam): Promise<FetchResponse<200, types.PostKnowledgeArticleCreateResponse200> | FetchResponse<number, types.PostKnowledgeArticleCreateResponseDefault>>;
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **read_knowledge**.
     *
     * @summary Retrieve a Knowledge Article
     * @throws FetchError<400, types.GetKnowledgeArticleSingleResponse400> Bad Request
     */
    getKnowledgeArticleSingle(metadata: types.GetKnowledgeArticleSingleMetadataParam): Promise<FetchResponse<200, types.GetKnowledgeArticleSingleResponse200> | FetchResponse<number, types.GetKnowledgeArticleSingleResponseDefault>>;
    /**
     * Update a Knowledge Article
     *
     * @throws FetchError<400, types.PostKnowledgeArticleSingleResponse400> Bad Request
     */
    postKnowledgeArticleSingle(body: types.PostKnowledgeArticleSingleBodyParam, metadata: types.PostKnowledgeArticleSingleMetadataParam): Promise<FetchResponse<200, types.PostKnowledgeArticleSingleResponse200> | FetchResponse<number, types.PostKnowledgeArticleSingleResponseDefault>>;
    /**
     * In ServiceM8, records are never deleted, but are archived. Archived records will remain
     * accessible via the API as (active = 0), however will no longer be visible in UI.
     * Archived records can be restored to active by setting the record active field to 1.
     *
     * @summary Delete a Knowledge Article
     * @throws FetchError<400, types.DeleteKnowledgeArticleSingleResponse400> Bad Request
     */
    deleteKnowledgeArticleSingle(metadata: types.DeleteKnowledgeArticleSingleMetadataParam): Promise<FetchResponse<200, types.DeleteKnowledgeArticleSingleResponse200> | FetchResponse<number, types.DeleteKnowledgeArticleSingleResponseDefault>>;
    /**
     * #### Filtering
     * This endpoint supports result filtering. For more information on how to filter this
     * request, [go here](/docs/filtering).
     *
     *
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **read_locations**.
     *
     * @summary List all Locations
     * @throws FetchError<400, types.GetLocationAllResponse400> Bad Request
     */
    getLocationAll(): Promise<FetchResponse<200, types.GetLocationAllResponse200> | FetchResponse<number, types.GetLocationAllResponseDefault>>;
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **manage_locations**.
     *
     *
     *
     * #### Record UUID
     * UUID is optional for record creation. If no UUID is supplied, a UUID will be
     * automatically generated for the new record and returned in the response header as
     * x-record-uuid.
     *
     * @summary Create a new Location
     * @throws FetchError<400, types.PostLocationCreateResponse400> Bad Request
     */
    postLocationCreate(body: types.PostLocationCreateBodyParam): Promise<FetchResponse<200, types.PostLocationCreateResponse200> | FetchResponse<number, types.PostLocationCreateResponseDefault>>;
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **read_locations**.
     *
     * @summary Retrieve a Location
     * @throws FetchError<400, types.GetLocationSingleResponse400> Bad Request
     */
    getLocationSingle(metadata: types.GetLocationSingleMetadataParam): Promise<FetchResponse<200, types.GetLocationSingleResponse200> | FetchResponse<number, types.GetLocationSingleResponseDefault>>;
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **manage_locations**.
     *
     * @summary Update a Location
     * @throws FetchError<400, types.PostLocationSingleResponse400> Bad Request
     */
    postLocationSingle(body: types.PostLocationSingleBodyParam, metadata: types.PostLocationSingleMetadataParam): Promise<FetchResponse<200, types.PostLocationSingleResponse200> | FetchResponse<number, types.PostLocationSingleResponseDefault>>;
    /**
     * In ServiceM8, records are never deleted, but are archived. Archived records will remain
     * accessible via the API as (active = 0), however will no longer be visible in UI.
     * Archived records can be restored to active by setting the record active field to 1.
     *
     *
     *
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **manage_locations**.
     *
     * @summary Delete a Location
     * @throws FetchError<400, types.DeleteLocationSingleResponse400> Bad Request
     */
    deleteLocationSingle(metadata: types.DeleteLocationSingleMetadataParam): Promise<FetchResponse<200, types.DeleteLocationSingleResponse200> | FetchResponse<number, types.DeleteLocationSingleResponseDefault>>;
    /**
     * #### Filtering
     * This endpoint supports result filtering. For more information on how to filter this
     * request, [go here](/docs/filtering).
     *
     *
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **read_inventory**.
     *
     * @summary List all Materials
     * @throws FetchError<400, types.GetMaterialAllResponse400> Bad Request
     */
    getMaterialAll(): Promise<FetchResponse<200, types.GetMaterialAllResponse200> | FetchResponse<number, types.GetMaterialAllResponseDefault>>;
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **manage_inventory**.
     *
     *
     *
     * #### Record UUID
     * UUID is optional for record creation. If no UUID is supplied, a UUID will be
     * automatically generated for the new record and returned in the response header as
     * x-record-uuid.
     *
     * @summary Create a new Material
     * @throws FetchError<400, types.PostMaterialCreateResponse400> Bad Request
     */
    postMaterialCreate(body: types.PostMaterialCreateBodyParam): Promise<FetchResponse<200, types.PostMaterialCreateResponse200> | FetchResponse<number, types.PostMaterialCreateResponseDefault>>;
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **read_inventory**.
     *
     * @summary Retrieve a Material
     * @throws FetchError<400, types.GetMaterialSingleResponse400> Bad Request
     */
    getMaterialSingle(metadata: types.GetMaterialSingleMetadataParam): Promise<FetchResponse<200, types.GetMaterialSingleResponse200> | FetchResponse<number, types.GetMaterialSingleResponseDefault>>;
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **manage_inventory**.
     *
     * @summary Update a Material
     * @throws FetchError<400, types.PostMaterialSingleResponse400> Bad Request
     */
    postMaterialSingle(body: types.PostMaterialSingleBodyParam, metadata: types.PostMaterialSingleMetadataParam): Promise<FetchResponse<200, types.PostMaterialSingleResponse200> | FetchResponse<number, types.PostMaterialSingleResponseDefault>>;
    /**
     * In ServiceM8, records are never deleted, but are archived. Archived records will remain
     * accessible via the API as (active = 0), however will no longer be visible in UI.
     * Archived records can be restored to active by setting the record active field to 1.
     *
     *
     *
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **manage_inventory**.
     *
     * @summary Delete a Material
     * @throws FetchError<400, types.DeleteMaterialSingleResponse400> Bad Request
     */
    deleteMaterialSingle(metadata: types.DeleteMaterialSingleMetadataParam): Promise<FetchResponse<200, types.DeleteMaterialSingleResponse200> | FetchResponse<number, types.DeleteMaterialSingleResponseDefault>>;
    /**
     * #### Filtering
     * This endpoint supports result filtering. For more information on how to filter this
     * request, [go here](/docs/filtering).
     *
     * @summary List all Bundles
     * @throws FetchError<400, types.GetMaterialBundleAllResponse400> Bad Request
     */
    getMaterialBundleAll(): Promise<FetchResponse<200, types.GetMaterialBundleAllResponse200> | FetchResponse<number, types.GetMaterialBundleAllResponseDefault>>;
    /**
     * #### Record UUID
     * UUID is optional for record creation. If no UUID is supplied, a UUID will be
     * automatically generated for the new record and returned in the response header as
     * x-record-uuid.
     *
     * @summary Create a new Bundle
     * @throws FetchError<400, types.PostMaterialBundleCreateResponse400> Bad Request
     */
    postMaterialBundleCreate(body: types.PostMaterialBundleCreateBodyParam): Promise<FetchResponse<200, types.PostMaterialBundleCreateResponse200> | FetchResponse<number, types.PostMaterialBundleCreateResponseDefault>>;
    /**
     * Retrieve a Bundle
     *
     * @throws FetchError<400, types.GetMaterialBundleSingleResponse400> Bad Request
     */
    getMaterialBundleSingle(metadata: types.GetMaterialBundleSingleMetadataParam): Promise<FetchResponse<200, types.GetMaterialBundleSingleResponse200> | FetchResponse<number, types.GetMaterialBundleSingleResponseDefault>>;
    /**
     * Update a Bundle
     *
     * @throws FetchError<400, types.PostMaterialBundleSingleResponse400> Bad Request
     */
    postMaterialBundleSingle(body: types.PostMaterialBundleSingleBodyParam, metadata: types.PostMaterialBundleSingleMetadataParam): Promise<FetchResponse<200, types.PostMaterialBundleSingleResponse200> | FetchResponse<number, types.PostMaterialBundleSingleResponseDefault>>;
    /**
     * In ServiceM8, records are never deleted, but are archived. Archived records will remain
     * accessible via the API as (active = 0), however will no longer be visible in UI.
     * Archived records can be restored to active by setting the record active field to 1.
     *
     * @summary Delete a Bundle
     * @throws FetchError<400, types.DeleteMaterialBundleSingleResponse400> Bad Request
     */
    deleteMaterialBundleSingle(metadata: types.DeleteMaterialBundleSingleMetadataParam): Promise<FetchResponse<200, types.DeleteMaterialBundleSingleResponse200> | FetchResponse<number, types.DeleteMaterialBundleSingleResponseDefault>>;
    /**
     * #### Filtering
     * This endpoint supports result filtering. For more information on how to filter this
     * request, [go here](/docs/filtering).
     *
     * @summary List all Notes
     * @throws FetchError<400, types.GetNoteAllResponse400> Bad Request
     */
    getNoteAll(): Promise<FetchResponse<200, types.GetNoteAllResponse200> | FetchResponse<number, types.GetNoteAllResponseDefault>>;
    /**
     * #### Record UUID
     * UUID is optional for record creation. If no UUID is supplied, a UUID will be
     * automatically generated for the new record and returned in the response header as
     * x-record-uuid.
     *
     * @summary Create a new Note
     * @throws FetchError<400, types.PostNoteCreateResponse400> Bad Request
     */
    postNoteCreate(body: types.PostNoteCreateBodyParam): Promise<FetchResponse<200, types.PostNoteCreateResponse200> | FetchResponse<number, types.PostNoteCreateResponseDefault>>;
    /**
     * Retrieve a Note
     *
     * @throws FetchError<400, types.GetNoteSingleResponse400> Bad Request
     */
    getNoteSingle(metadata: types.GetNoteSingleMetadataParam): Promise<FetchResponse<200, types.GetNoteSingleResponse200> | FetchResponse<number, types.GetNoteSingleResponseDefault>>;
    /**
     * Update a Note
     *
     * @throws FetchError<400, types.PostNoteSingleResponse400> Bad Request
     */
    postNoteSingle(body: types.PostNoteSingleBodyParam, metadata: types.PostNoteSingleMetadataParam): Promise<FetchResponse<200, types.PostNoteSingleResponse200> | FetchResponse<number, types.PostNoteSingleResponseDefault>>;
    /**
     * In ServiceM8, records are never deleted, but are archived. Archived records will remain
     * accessible via the API as (active = 0), however will no longer be visible in UI.
     * Archived records can be restored to active by setting the record active field to 1.
     *
     * @summary Delete a Note
     * @throws FetchError<400, types.DeleteNoteSingleResponse400> Bad Request
     */
    deleteNoteSingle(metadata: types.DeleteNoteSingleMetadataParam): Promise<FetchResponse<200, types.DeleteNoteSingleResponse200> | FetchResponse<number, types.DeleteNoteSingleResponseDefault>>;
    /**
     * #### Filtering
     * This endpoint supports result filtering. For more information on how to filter this
     * request, [go here](/docs/filtering).
     *
     *
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **read_job_queues**.
     *
     * @summary List all Job Queues
     * @throws FetchError<400, types.GetQueueAllResponse400> Bad Request
     */
    getQueueAll(): Promise<FetchResponse<200, types.GetQueueAllResponse200> | FetchResponse<number, types.GetQueueAllResponseDefault>>;
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **manage_job_queues**.
     *
     *
     *
     * #### Record UUID
     * UUID is optional for record creation. If no UUID is supplied, a UUID will be
     * automatically generated for the new record and returned in the response header as
     * x-record-uuid.
     *
     * @summary Create a new Job Queue
     * @throws FetchError<400, types.PostQueueCreateResponse400> Bad Request
     */
    postQueueCreate(body: types.PostQueueCreateBodyParam): Promise<FetchResponse<200, types.PostQueueCreateResponse200> | FetchResponse<number, types.PostQueueCreateResponseDefault>>;
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **read_job_queues**.
     *
     * @summary Retrieve a Job Queue
     * @throws FetchError<400, types.GetQueueSingleResponse400> Bad Request
     */
    getQueueSingle(metadata: types.GetQueueSingleMetadataParam): Promise<FetchResponse<200, types.GetQueueSingleResponse200> | FetchResponse<number, types.GetQueueSingleResponseDefault>>;
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **manage_job_queues**.
     *
     * @summary Update a Job Queue
     * @throws FetchError<400, types.PostQueueSingleResponse400> Bad Request
     */
    postQueueSingle(body: types.PostQueueSingleBodyParam, metadata: types.PostQueueSingleMetadataParam): Promise<FetchResponse<200, types.PostQueueSingleResponse200> | FetchResponse<number, types.PostQueueSingleResponseDefault>>;
    /**
     * In ServiceM8, records are never deleted, but are archived. Archived records will remain
     * accessible via the API as (active = 0), however will no longer be visible in UI.
     * Archived records can be restored to active by setting the record active field to 1.
     *
     *
     *
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **manage_job_queues**.
     *
     * @summary Delete a Job Queue
     * @throws FetchError<400, types.DeleteQueueSingleResponse400> Bad Request
     */
    deleteQueueSingle(metadata: types.DeleteQueueSingleMetadataParam): Promise<FetchResponse<200, types.DeleteQueueSingleResponse200> | FetchResponse<number, types.DeleteQueueSingleResponseDefault>>;
    /**
     * #### Filtering
     * This endpoint supports result filtering. For more information on how to filter this
     * request, [go here](/docs/filtering).
     *
     * @summary List all Security Roles
     * @throws FetchError<400, types.GetSecurityRoleAllResponse400> Bad Request
     */
    getSecurityRoleAll(): Promise<FetchResponse<200, types.GetSecurityRoleAllResponse200> | FetchResponse<number, types.GetSecurityRoleAllResponseDefault>>;
    /**
     * #### Record UUID
     * UUID is optional for record creation. If no UUID is supplied, a UUID will be
     * automatically generated for the new record and returned in the response header as
     * x-record-uuid.
     *
     * @summary Create a new Security Role
     * @throws FetchError<400, types.PostSecurityRoleCreateResponse400> Bad Request
     */
    postSecurityRoleCreate(body: types.PostSecurityRoleCreateBodyParam): Promise<FetchResponse<200, types.PostSecurityRoleCreateResponse200> | FetchResponse<number, types.PostSecurityRoleCreateResponseDefault>>;
    /**
     * Retrieve a Security Role
     *
     * @throws FetchError<400, types.GetSecurityRoleSingleResponse400> Bad Request
     */
    getSecurityRoleSingle(metadata: types.GetSecurityRoleSingleMetadataParam): Promise<FetchResponse<200, types.GetSecurityRoleSingleResponse200> | FetchResponse<number, types.GetSecurityRoleSingleResponseDefault>>;
    /**
     * Update a Security Role
     *
     * @throws FetchError<400, types.PostSecurityRoleSingleResponse400> Bad Request
     */
    postSecurityRoleSingle(body: types.PostSecurityRoleSingleBodyParam, metadata: types.PostSecurityRoleSingleMetadataParam): Promise<FetchResponse<200, types.PostSecurityRoleSingleResponse200> | FetchResponse<number, types.PostSecurityRoleSingleResponseDefault>>;
    /**
     * In ServiceM8, records are never deleted, but are archived. Archived records will remain
     * accessible via the API as (active = 0), however will no longer be visible in UI.
     * Archived records can be restored to active by setting the record active field to 1.
     *
     * @summary Delete a Security Role
     * @throws FetchError<400, types.DeleteSecurityRoleSingleResponse400> Bad Request
     */
    deleteSecurityRoleSingle(metadata: types.DeleteSecurityRoleSingleMetadataParam): Promise<FetchResponse<200, types.DeleteSecurityRoleSingleResponse200> | FetchResponse<number, types.DeleteSecurityRoleSingleResponseDefault>>;
    /**
     * #### Filtering
     * This endpoint supports result filtering. For more information on how to filter this
     * request, [go here](/docs/filtering).
     *
     * @summary List all SMS Templates
     * @throws FetchError<400, types.GetSmsTemplateAllResponse400> Bad Request
     */
    getSmsTemplateAll(): Promise<FetchResponse<200, types.GetSmsTemplateAllResponse200> | FetchResponse<number, types.GetSmsTemplateAllResponseDefault>>;
    /**
     * #### Record UUID
     * UUID is optional for record creation. If no UUID is supplied, a UUID will be
     * automatically generated for the new record and returned in the response header as
     * x-record-uuid.
     *
     * @summary Create a new SMS Template
     * @throws FetchError<400, types.PostSmsTemplateCreateResponse400> Bad Request
     */
    postSmsTemplateCreate(body: types.PostSmsTemplateCreateBodyParam): Promise<FetchResponse<200, types.PostSmsTemplateCreateResponse200> | FetchResponse<number, types.PostSmsTemplateCreateResponseDefault>>;
    /**
     * Retrieve a SMS Template
     *
     * @throws FetchError<400, types.GetSmsTemplateSingleResponse400> Bad Request
     */
    getSmsTemplateSingle(metadata: types.GetSmsTemplateSingleMetadataParam): Promise<FetchResponse<200, types.GetSmsTemplateSingleResponse200> | FetchResponse<number, types.GetSmsTemplateSingleResponseDefault>>;
    /**
     * Update a SMS Template
     *
     * @throws FetchError<400, types.PostSmsTemplateSingleResponse400> Bad Request
     */
    postSmsTemplateSingle(body: types.PostSmsTemplateSingleBodyParam, metadata: types.PostSmsTemplateSingleMetadataParam): Promise<FetchResponse<200, types.PostSmsTemplateSingleResponse200> | FetchResponse<number, types.PostSmsTemplateSingleResponseDefault>>;
    /**
     * In ServiceM8, records are never deleted, but are archived. Archived records will remain
     * accessible via the API as (active = 0), however will no longer be visible in UI.
     * Archived records can be restored to active by setting the record active field to 1.
     *
     * @summary Delete a SMS Template
     * @throws FetchError<400, types.DeleteSmsTemplateSingleResponse400> Bad Request
     */
    deleteSmsTemplateSingle(metadata: types.DeleteSmsTemplateSingleMetadataParam): Promise<FetchResponse<200, types.DeleteSmsTemplateSingleResponse200> | FetchResponse<number, types.DeleteSmsTemplateSingleResponseDefault>>;
    /**
     * #### Filtering
     * This endpoint supports result filtering. For more information on how to filter this
     * request, [go here](/docs/filtering).
     *
     *
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **read_staff**.
     *
     * @summary List all Staff Members
     * @throws FetchError<400, types.GetStaffAllResponse400> Bad Request
     */
    getStaffAll(): Promise<FetchResponse<200, types.GetStaffAllResponse200> | FetchResponse<number, types.GetStaffAllResponseDefault>>;
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **manage_staff**.
     *
     *
     *
     * #### Record UUID
     * UUID is optional for record creation. If no UUID is supplied, a UUID will be
     * automatically generated for the new record and returned in the response header as
     * x-record-uuid.
     *
     * @summary Create a new Staff Member
     * @throws FetchError<400, types.PostStaffCreateResponse400> Bad Request
     */
    postStaffCreate(body: types.PostStaffCreateBodyParam): Promise<FetchResponse<200, types.PostStaffCreateResponse200> | FetchResponse<number, types.PostStaffCreateResponseDefault>>;
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **read_staff**.
     *
     * @summary Retrieve a Staff Member
     * @throws FetchError<400, types.GetStaffSingleResponse400> Bad Request
     */
    getStaffSingle(metadata: types.GetStaffSingleMetadataParam): Promise<FetchResponse<200, types.GetStaffSingleResponse200> | FetchResponse<number, types.GetStaffSingleResponseDefault>>;
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **manage_staff**.
     *
     * @summary Update a Staff Member
     * @throws FetchError<400, types.PostStaffSingleResponse400> Bad Request
     */
    postStaffSingle(body: types.PostStaffSingleBodyParam, metadata: types.PostStaffSingleMetadataParam): Promise<FetchResponse<200, types.PostStaffSingleResponse200> | FetchResponse<number, types.PostStaffSingleResponseDefault>>;
    /**
     * In ServiceM8, records are never deleted, but are archived. Archived records will remain
     * accessible via the API as (active = 0), however will no longer be visible in UI.
     * Archived records can be restored to active by setting the record active field to 1.
     *
     *
     *
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **manage_staff**.
     *
     * @summary Delete a Staff Member
     * @throws FetchError<400, types.DeleteStaffSingleResponse400> Bad Request
     */
    deleteStaffSingle(metadata: types.DeleteStaffSingleMetadataParam): Promise<FetchResponse<200, types.DeleteStaffSingleResponse200> | FetchResponse<number, types.DeleteStaffSingleResponseDefault>>;
    /**
     * #### Filtering
     * This endpoint supports result filtering. For more information on how to filter this
     * request, [go here](/docs/filtering).
     *
     * @summary List all Staff Messages
     * @throws FetchError<400, types.GetStaffMessageAllResponse400> Bad Request
     */
    getStaffMessageAll(): Promise<FetchResponse<200, types.GetStaffMessageAllResponse200> | FetchResponse<number, types.GetStaffMessageAllResponseDefault>>;
    /**
     * #### Record UUID
     * UUID is optional for record creation. If no UUID is supplied, a UUID will be
     * automatically generated for the new record and returned in the response header as
     * x-record-uuid.
     *
     * @summary Create a new Staff Message
     * @throws FetchError<400, types.PostStaffMessageCreateResponse400> Bad Request
     */
    postStaffMessageCreate(body: types.PostStaffMessageCreateBodyParam): Promise<FetchResponse<200, types.PostStaffMessageCreateResponse200> | FetchResponse<number, types.PostStaffMessageCreateResponseDefault>>;
    /**
     * Retrieve a Staff Message
     *
     * @throws FetchError<400, types.GetStaffMessageSingleResponse400> Bad Request
     */
    getStaffMessageSingle(metadata: types.GetStaffMessageSingleMetadataParam): Promise<FetchResponse<200, types.GetStaffMessageSingleResponse200> | FetchResponse<number, types.GetStaffMessageSingleResponseDefault>>;
    /**
     * Update a Staff Message
     *
     * @throws FetchError<400, types.PostStaffMessageSingleResponse400> Bad Request
     */
    postStaffMessageSingle(body: types.PostStaffMessageSingleBodyParam, metadata: types.PostStaffMessageSingleMetadataParam): Promise<FetchResponse<200, types.PostStaffMessageSingleResponse200> | FetchResponse<number, types.PostStaffMessageSingleResponseDefault>>;
    /**
     * In ServiceM8, records are never deleted, but are archived. Archived records will remain
     * accessible via the API as (active = 0), however will no longer be visible in UI.
     * Archived records can be restored to active by setting the record active field to 1.
     *
     * @summary Delete a Staff Message
     * @throws FetchError<400, types.DeleteStaffMessageSingleResponse400> Bad Request
     */
    deleteStaffMessageSingle(metadata: types.DeleteStaffMessageSingleMetadataParam): Promise<FetchResponse<200, types.DeleteStaffMessageSingleResponse200> | FetchResponse<number, types.DeleteStaffMessageSingleResponseDefault>>;
    /**
     * #### Filtering
     * This endpoint supports result filtering. For more information on how to filter this
     * request, [go here](/docs/filtering).
     *
     *
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **read_tasks**.
     *
     * @summary List all Tasks
     * @throws FetchError<400, types.GetTaskAllResponse400> Bad Request
     */
    getTaskAll(): Promise<FetchResponse<200, types.GetTaskAllResponse200> | FetchResponse<number, types.GetTaskAllResponseDefault>>;
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **manage_tasks**.
     *
     *
     *
     * #### Record UUID
     * UUID is optional for record creation. If no UUID is supplied, a UUID will be
     * automatically generated for the new record and returned in the response header as
     * x-record-uuid.
     *
     * @summary Create a new Task
     * @throws FetchError<400, types.PostTaskCreateResponse400> Bad Request
     */
    postTaskCreate(body: types.PostTaskCreateBodyParam): Promise<FetchResponse<200, types.PostTaskCreateResponse200> | FetchResponse<number, types.PostTaskCreateResponseDefault>>;
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **read_tasks**.
     *
     * @summary Retrieve a Task
     * @throws FetchError<400, types.GetTaskSingleResponse400> Bad Request
     */
    getTaskSingle(metadata: types.GetTaskSingleMetadataParam): Promise<FetchResponse<200, types.GetTaskSingleResponse200> | FetchResponse<number, types.GetTaskSingleResponseDefault>>;
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **manage_tasks**.
     *
     * @summary Update a Task
     * @throws FetchError<400, types.PostTaskSingleResponse400> Bad Request
     */
    postTaskSingle(body: types.PostTaskSingleBodyParam, metadata: types.PostTaskSingleMetadataParam): Promise<FetchResponse<200, types.PostTaskSingleResponse200> | FetchResponse<number, types.PostTaskSingleResponseDefault>>;
    /**
     * In ServiceM8, records are never deleted, but are archived. Archived records will remain
     * accessible via the API as (active = 0), however will no longer be visible in UI.
     * Archived records can be restored to active by setting the record active field to 1.
     *
     *
     *
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **manage_tasks**.
     *
     * @summary Delete a Task
     * @throws FetchError<400, types.DeleteTaskSingleResponse400> Bad Request
     */
    deleteTaskSingle(metadata: types.DeleteTaskSingleMetadataParam): Promise<FetchResponse<200, types.DeleteTaskSingleResponse200> | FetchResponse<number, types.DeleteTaskSingleResponseDefault>>;
    /**
     * #### Filtering
     * This endpoint supports result filtering. For more information on how to filter this
     * request, [go here](/docs/filtering).
     *
     * @summary List all Tax Rates
     * @throws FetchError<400, types.GetTaxRateAllResponse400> Bad Request
     */
    getTaxRateAll(): Promise<FetchResponse<200, types.GetTaxRateAllResponse200> | FetchResponse<number, types.GetTaxRateAllResponseDefault>>;
    /**
     * #### Record UUID
     * UUID is optional for record creation. If no UUID is supplied, a UUID will be
     * automatically generated for the new record and returned in the response header as
     * x-record-uuid.
     *
     * @summary Create a new Tax Rate
     * @throws FetchError<400, types.PostTaxRateCreateResponse400> Bad Request
     */
    postTaxRateCreate(body: types.PostTaxRateCreateBodyParam): Promise<FetchResponse<200, types.PostTaxRateCreateResponse200> | FetchResponse<number, types.PostTaxRateCreateResponseDefault>>;
    /**
     * Retrieve a Tax Rate
     *
     * @throws FetchError<400, types.GetTaxRateSingleResponse400> Bad Request
     */
    getTaxRateSingle(metadata: types.GetTaxRateSingleMetadataParam): Promise<FetchResponse<200, types.GetTaxRateSingleResponse200> | FetchResponse<number, types.GetTaxRateSingleResponseDefault>>;
    /**
     * Update a Tax Rate
     *
     * @throws FetchError<400, types.PostTaxRateSingleResponse400> Bad Request
     */
    postTaxRateSingle(body: types.PostTaxRateSingleBodyParam, metadata: types.PostTaxRateSingleMetadataParam): Promise<FetchResponse<200, types.PostTaxRateSingleResponse200> | FetchResponse<number, types.PostTaxRateSingleResponseDefault>>;
    /**
     * In ServiceM8, records are never deleted, but are archived. Archived records will remain
     * accessible via the API as (active = 0), however will no longer be visible in UI.
     * Archived records can be restored to active by setting the record active field to 1.
     *
     * @summary Delete a Tax Rate
     * @throws FetchError<400, types.DeleteTaxRateSingleResponse400> Bad Request
     */
    deleteTaxRateSingle(metadata: types.DeleteTaxRateSingleMetadataParam): Promise<FetchResponse<200, types.DeleteTaxRateSingleResponse200> | FetchResponse<number, types.DeleteTaxRateSingleResponseDefault>>;
    /**
     * #### Filtering
     * This endpoint supports result filtering. For more information on how to filter this
     * request, [go here](/docs/filtering).
     *
     *
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **vendor**.
     *
     * @summary List all Vendors
     * @throws FetchError<400, types.GetVendorAllResponse400> Bad Request
     */
    getVendorAll(): Promise<FetchResponse<200, types.GetVendorAllResponse200> | FetchResponse<number, types.GetVendorAllResponseDefault>>;
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **vendor**.
     *
     * @summary Retrieve a Vendor
     * @throws FetchError<400, types.GetVendorSingleResponse400> Bad Request
     */
    getVendorSingle(metadata: types.GetVendorSingleMetadataParam): Promise<FetchResponse<200, types.GetVendorSingleResponse200> | FetchResponse<number, types.GetVendorSingleResponseDefault>>;
    /**
     * Update a Vendor
     *
     * @throws FetchError<400, types.PostVendorSingleResponse400> Bad Request
     */
    postVendorSingle(body: types.PostVendorSingleBodyParam, metadata: types.PostVendorSingleMetadataParam): Promise<FetchResponse<200, types.PostVendorSingleResponse200> | FetchResponse<number, types.PostVendorSingleResponseDefault>>;
}
declare const createSDK: SDK;
export = createSDK;
