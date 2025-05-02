"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var oas_1 = __importDefault(require("oas"));
var core_1 = __importDefault(require("api/dist/core"));
var openapi_json_1 = __importDefault(require("./openapi.json"));
var SDK = /** @class */ (function () {
    function SDK() {
        this.spec = oas_1.default.init(openapi_json_1.default);
        this.core = new core_1.default(this.spec, 'servicem8/1.0.0 (api/6.1.3)');
    }
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    SDK.prototype.config = function (config) {
        this.core.setConfig(config);
    };
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
    SDK.prototype.auth = function () {
        var _a;
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        (_a = this.core).setAuth.apply(_a, values);
        return this;
    };
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
    SDK.prototype.server = function (url, variables) {
        if (variables === void 0) { variables = {}; }
        this.core.setServer(url, variables);
    };
    /**
     * #### Filtering
     * This endpoint supports result filtering. For more information on how to filter this
     * request, [go here](/docs/filtering).
     *
     * @summary List all Allocation Windows
     * @throws FetchError<400, types.GetAllocationWindowAllResponse400> Bad Request
     */
    SDK.prototype.getAllocationWindowAll = function () {
        return this.core.fetch('/allocationwindow.json', 'get');
    };
    /**
     * #### Record UUID
     * UUID is optional for record creation. If no UUID is supplied, a UUID will be
     * automatically generated for the new record and returned in the response header as
     * x-record-uuid.
     *
     * @summary Create a new Allocation Window
     * @throws FetchError<400, types.PostAllocationWindowCreateResponse400> Bad Request
     */
    SDK.prototype.postAllocationWindowCreate = function (body) {
        return this.core.fetch('/allocationwindow.json', 'post', body);
    };
    /**
     * Retrieve an Allocation Window
     *
     * @throws FetchError<400, types.GetAllocationWindowSingleResponse400> Bad Request
     */
    SDK.prototype.getAllocationWindowSingle = function (metadata) {
        return this.core.fetch('/allocationwindow/{uuid}.json', 'get', metadata);
    };
    /**
     * Update an Allocation Window
     *
     * @throws FetchError<400, types.PostAllocationWindowSingleResponse400> Bad Request
     */
    SDK.prototype.postAllocationWindowSingle = function (body, metadata) {
        return this.core.fetch('/allocationwindow/{uuid}.json', 'post', body, metadata);
    };
    /**
     * In ServiceM8, records are never deleted, but are archived. Archived records will remain
     * accessible via the API as (active = 0), however will no longer be visible in UI.
     * Archived records can be restored to active by setting the record active field to 1.
     *
     * @summary Delete an Allocation Window
     * @throws FetchError<400, types.DeleteAllocationWindowSingleResponse400> Bad Request
     */
    SDK.prototype.deleteAllocationWindowSingle = function (metadata) {
        return this.core.fetch('/allocationwindow/{uuid}.json', 'delete', metadata);
    };
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
    SDK.prototype.getAssetAll = function () {
        return this.core.fetch('/asset.json', 'get');
    };
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **read_assets**.
     *
     * @summary Retrieve an Asset
     * @throws FetchError<400, types.GetAssetSingleResponse400> Bad Request
     */
    SDK.prototype.getAssetSingle = function (metadata) {
        return this.core.fetch('/asset/{uuid}.json', 'get', metadata);
    };
    /**
     * Update an Asset
     *
     * @throws FetchError<400, types.PostAssetSingleResponse400> Bad Request
     */
    SDK.prototype.postAssetSingle = function (body, metadata) {
        return this.core.fetch('/asset/{uuid}.json', 'post', body, metadata);
    };
    /**
     * In ServiceM8, records are never deleted, but are archived. Archived records will remain
     * accessible via the API as (active = 0), however will no longer be visible in UI.
     * Archived records can be restored to active by setting the record active field to 1.
     *
     * @summary Delete an Asset
     * @throws FetchError<400, types.DeleteAssetSingleResponse400> Bad Request
     */
    SDK.prototype.deleteAssetSingle = function (metadata) {
        return this.core.fetch('/asset/{uuid}.json', 'delete', metadata);
    };
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
    SDK.prototype.getAssetTypeAll = function () {
        return this.core.fetch('/assettype.json', 'get');
    };
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
    SDK.prototype.postAssetTypeCreate = function (body) {
        return this.core.fetch('/assettype.json', 'post', body);
    };
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **read_assets**.
     *
     * @summary Retrieve an Asset Type
     * @throws FetchError<400, types.GetAssetTypeSingleResponse400> Bad Request
     */
    SDK.prototype.getAssetTypeSingle = function (metadata) {
        return this.core.fetch('/assettype/{uuid}.json', 'get', metadata);
    };
    /**
     * Update an Asset Type
     *
     * @throws FetchError<400, types.PostAssetTypeSingleResponse400> Bad Request
     */
    SDK.prototype.postAssetTypeSingle = function (body, metadata) {
        return this.core.fetch('/assettype/{uuid}.json', 'post', body, metadata);
    };
    /**
     * In ServiceM8, records are never deleted, but are archived. Archived records will remain
     * accessible via the API as (active = 0), however will no longer be visible in UI.
     * Archived records can be restored to active by setting the record active field to 1.
     *
     * @summary Delete an Asset Type
     * @throws FetchError<400, types.DeleteAssetTypeSingleResponse400> Bad Request
     */
    SDK.prototype.deleteAssetTypeSingle = function (metadata) {
        return this.core.fetch('/assettype/{uuid}.json', 'delete', metadata);
    };
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
    SDK.prototype.getAssetTypeFieldAll = function () {
        return this.core.fetch('/assettypefield.json', 'get');
    };
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
    SDK.prototype.postAssetTypeFieldCreate = function (body) {
        return this.core.fetch('/assettypefield.json', 'post', body);
    };
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **read_assets**.
     *
     * @summary Retrieve an Asset Type Field
     * @throws FetchError<400, types.GetAssetTypeFieldSingleResponse400> Bad Request
     */
    SDK.prototype.getAssetTypeFieldSingle = function (metadata) {
        return this.core.fetch('/assettypefield/{uuid}.json', 'get', metadata);
    };
    /**
     * Update an Asset Type Field
     *
     * @throws FetchError<400, types.PostAssetTypeFieldSingleResponse400> Bad Request
     */
    SDK.prototype.postAssetTypeFieldSingle = function (body, metadata) {
        return this.core.fetch('/assettypefield/{uuid}.json', 'post', body, metadata);
    };
    /**
     * In ServiceM8, records are never deleted, but are archived. Archived records will remain
     * accessible via the API as (active = 0), however will no longer be visible in UI.
     * Archived records can be restored to active by setting the record active field to 1.
     *
     * @summary Delete an Asset Type Field
     * @throws FetchError<400, types.DeleteAssetTypeFieldSingleResponse400> Bad Request
     */
    SDK.prototype.deleteAssetTypeFieldSingle = function (metadata) {
        return this.core.fetch('/assettypefield/{uuid}.json', 'delete', metadata);
    };
    /**
     * #### Filtering
     * This endpoint supports result filtering. For more information on how to filter this
     * request, [go here](/docs/filtering).
     *
     * @summary List all Attachments
     * @throws FetchError<400, types.GetAttachmentAllResponse400> Bad Request
     */
    SDK.prototype.getAttachmentAll = function () {
        return this.core.fetch('/attachment.json', 'get');
    };
    /**
     * #### Record UUID
     * UUID is optional for record creation. If no UUID is supplied, a UUID will be
     * automatically generated for the new record and returned in the response header as
     * x-record-uuid.
     *
     * @summary Create a new Attachment
     * @throws FetchError<400, types.PostAttachmentCreateResponse400> Bad Request
     */
    SDK.prototype.postAttachmentCreate = function (body) {
        return this.core.fetch('/attachment.json', 'post', body);
    };
    /**
     * Retrieve an Attachment
     *
     * @throws FetchError<400, types.GetAttachmentSingleResponse400> Bad Request
     */
    SDK.prototype.getAttachmentSingle = function (metadata) {
        return this.core.fetch('/attachment/{uuid}.json', 'get', metadata);
    };
    /**
     * Update an Attachment
     *
     * @throws FetchError<400, types.PostAttachmentSingleResponse400> Bad Request
     */
    SDK.prototype.postAttachmentSingle = function (body, metadata) {
        return this.core.fetch('/attachment/{uuid}.json', 'post', body, metadata);
    };
    /**
     * In ServiceM8, records are never deleted, but are archived. Archived records will remain
     * accessible via the API as (active = 0), however will no longer be visible in UI.
     * Archived records can be restored to active by setting the record active field to 1.
     *
     * @summary Delete an Attachment
     * @throws FetchError<400, types.DeleteAttachmentSingleResponse400> Bad Request
     */
    SDK.prototype.deleteAttachmentSingle = function (metadata) {
        return this.core.fetch('/attachment/{uuid}.json', 'delete', metadata);
    };
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
    SDK.prototype.getBadgeAll = function () {
        return this.core.fetch('/badge.json', 'get');
    };
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
    SDK.prototype.postBadgeCreate = function (body) {
        return this.core.fetch('/badge.json', 'post', body);
    };
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **manage_badges**.
     *
     * @summary Retrieve a Badge
     * @throws FetchError<400, types.GetBadgeSingleResponse400> Bad Request
     */
    SDK.prototype.getBadgeSingle = function (metadata) {
        return this.core.fetch('/badge/{uuid}.json', 'get', metadata);
    };
    /**
     * Update a Badge
     *
     * @throws FetchError<400, types.PostBadgeSingleResponse400> Bad Request
     */
    SDK.prototype.postBadgeSingle = function (body, metadata) {
        return this.core.fetch('/badge/{uuid}.json', 'post', body, metadata);
    };
    /**
     * In ServiceM8, records are never deleted, but are archived. Archived records will remain
     * accessible via the API as (active = 0), however will no longer be visible in UI.
     * Archived records can be restored to active by setting the record active field to 1.
     *
     * @summary Delete a Badge
     * @throws FetchError<400, types.DeleteBadgeSingleResponse400> Bad Request
     */
    SDK.prototype.deleteBadgeSingle = function (metadata) {
        return this.core.fetch('/badge/{uuid}.json', 'delete', metadata);
    };
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
    SDK.prototype.getCategoryAll = function () {
        return this.core.fetch('/category.json', 'get');
    };
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
    SDK.prototype.postCategoryCreate = function (body) {
        return this.core.fetch('/category.json', 'post', body);
    };
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **read_job_categories**.
     *
     * @summary Retrieve a Category
     * @throws FetchError<400, types.GetCategorySingleResponse400> Bad Request
     */
    SDK.prototype.getCategorySingle = function (metadata) {
        return this.core.fetch('/category/{uuid}.json', 'get', metadata);
    };
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **manage_job_categories**.
     *
     * @summary Update a Category
     * @throws FetchError<400, types.PostCategorySingleResponse400> Bad Request
     */
    SDK.prototype.postCategorySingle = function (body, metadata) {
        return this.core.fetch('/category/{uuid}.json', 'post', body, metadata);
    };
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
    SDK.prototype.deleteCategorySingle = function (metadata) {
        return this.core.fetch('/category/{uuid}.json', 'delete', metadata);
    };
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
    SDK.prototype.getCompanyAll = function () {
        return this.core.fetch('/company.json', 'get');
    };
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
    SDK.prototype.postCompanyCreate = function (body) {
        return this.core.fetch('/company.json', 'post', body);
    };
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **read_customers**.
     *
     * @summary Retrieve a Client
     * @throws FetchError<400, types.GetCompanySingleResponse400> Bad Request
     */
    SDK.prototype.getCompanySingle = function (metadata) {
        return this.core.fetch('/company/{uuid}.json', 'get', metadata);
    };
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **manage_customers**.
     *
     * @summary Update a Client
     * @throws FetchError<400, types.PostCompanySingleResponse400> Bad Request
     */
    SDK.prototype.postCompanySingle = function (body, metadata) {
        return this.core.fetch('/company/{uuid}.json', 'post', body, metadata);
    };
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
    SDK.prototype.deleteCompanySingle = function (metadata) {
        return this.core.fetch('/company/{uuid}.json', 'delete', metadata);
    };
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
    SDK.prototype.getCompanyContactAll = function () {
        return this.core.fetch('/companycontact.json', 'get');
    };
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
    SDK.prototype.postCompanyContactCreate = function (body) {
        return this.core.fetch('/companycontact.json', 'post', body);
    };
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **read_customer_contacts**.
     *
     * @summary Retrieve a Company Contact
     * @throws FetchError<400, types.GetCompanyContactSingleResponse400> Bad Request
     */
    SDK.prototype.getCompanyContactSingle = function (metadata) {
        return this.core.fetch('/companycontact/{uuid}.json', 'get', metadata);
    };
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **manage_customer_contacts**.
     *
     * @summary Update a Company Contact
     * @throws FetchError<400, types.PostCompanyContactSingleResponse400> Bad Request
     */
    SDK.prototype.postCompanyContactSingle = function (body, metadata) {
        return this.core.fetch('/companycontact/{uuid}.json', 'post', body, metadata);
    };
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
    SDK.prototype.deleteCompanyContactSingle = function (metadata) {
        return this.core.fetch('/companycontact/{uuid}.json', 'delete', metadata);
    };
    /**
     * #### Filtering
     * This endpoint supports result filtering. For more information on how to filter this
     * request, [go here](/docs/filtering).
     *
     * @summary List all Email Templates
     * @throws FetchError<400, types.GetEmailTemplateAllResponse400> Bad Request
     */
    SDK.prototype.getEmailTemplateAll = function () {
        return this.core.fetch('/emailtemplate.json', 'get');
    };
    /**
     * #### Record UUID
     * UUID is optional for record creation. If no UUID is supplied, a UUID will be
     * automatically generated for the new record and returned in the response header as
     * x-record-uuid.
     *
     * @summary Create a new Email Template
     * @throws FetchError<400, types.PostEmailTemplateCreateResponse400> Bad Request
     */
    SDK.prototype.postEmailTemplateCreate = function (body) {
        return this.core.fetch('/emailtemplate.json', 'post', body);
    };
    /**
     * Retrieve an Email Template
     *
     * @throws FetchError<400, types.GetEmailTemplateSingleResponse400> Bad Request
     */
    SDK.prototype.getEmailTemplateSingle = function (metadata) {
        return this.core.fetch('/emailtemplate/{uuid}.json', 'get', metadata);
    };
    /**
     * Update an Email Template
     *
     * @throws FetchError<400, types.PostEmailTemplateSingleResponse400> Bad Request
     */
    SDK.prototype.postEmailTemplateSingle = function (body, metadata) {
        return this.core.fetch('/emailtemplate/{uuid}.json', 'post', body, metadata);
    };
    /**
     * In ServiceM8, records are never deleted, but are archived. Archived records will remain
     * accessible via the API as (active = 0), however will no longer be visible in UI.
     * Archived records can be restored to active by setting the record active field to 1.
     *
     * @summary Delete an Email Template
     * @throws FetchError<400, types.DeleteEmailTemplateSingleResponse400> Bad Request
     */
    SDK.prototype.deleteEmailTemplateSingle = function (metadata) {
        return this.core.fetch('/emailtemplate/{uuid}.json', 'delete', metadata);
    };
    /**
     * #### Filtering
     * This endpoint supports result filtering. For more information on how to filter this
     * request, [go here](/docs/filtering).
     *
     * @summary List all Feedback
     * @throws FetchError<400, types.GetFeedbackAllResponse400> Bad Request
     */
    SDK.prototype.getFeedbackAll = function () {
        return this.core.fetch('/feedback.json', 'get');
    };
    /**
     * #### Record UUID
     * UUID is optional for record creation. If no UUID is supplied, a UUID will be
     * automatically generated for the new record and returned in the response header as
     * x-record-uuid.
     *
     * @summary Create a new Feedback
     * @throws FetchError<400, types.PostFeedbackCreateResponse400> Bad Request
     */
    SDK.prototype.postFeedbackCreate = function (body) {
        return this.core.fetch('/feedback.json', 'post', body);
    };
    /**
     * Retrieve a Feedback
     *
     * @throws FetchError<400, types.GetFeedbackSingleResponse400> Bad Request
     */
    SDK.prototype.getFeedbackSingle = function (metadata) {
        return this.core.fetch('/feedback/{uuid}.json', 'get', metadata);
    };
    /**
     * Update a Feedback
     *
     * @throws FetchError<400, types.PostFeedbackSingleResponse400> Bad Request
     */
    SDK.prototype.postFeedbackSingle = function (body, metadata) {
        return this.core.fetch('/feedback/{uuid}.json', 'post', body, metadata);
    };
    /**
     * In ServiceM8, records are never deleted, but are archived. Archived records will remain
     * accessible via the API as (active = 0), however will no longer be visible in UI.
     * Archived records can be restored to active by setting the record active field to 1.
     *
     * @summary Delete a Feedback
     * @throws FetchError<400, types.DeleteFeedbackSingleResponse400> Bad Request
     */
    SDK.prototype.deleteFeedbackSingle = function (metadata) {
        return this.core.fetch('/feedback/{uuid}.json', 'delete', metadata);
    };
    /**
     * #### Filtering
     * This endpoint supports result filtering. For more information on how to filter this
     * request, [go here](/docs/filtering).
     *
     * @summary List all Forms
     * @throws FetchError<400, types.GetFormAllResponse400> Bad Request
     */
    SDK.prototype.getFormAll = function () {
        return this.core.fetch('/form.json', 'get');
    };
    /**
     * #### Record UUID
     * UUID is optional for record creation. If no UUID is supplied, a UUID will be
     * automatically generated for the new record and returned in the response header as
     * x-record-uuid.
     *
     * @summary Create a new Form
     * @throws FetchError<400, types.PostFormCreateResponse400> Bad Request
     */
    SDK.prototype.postFormCreate = function (body) {
        return this.core.fetch('/form.json', 'post', body);
    };
    /**
     * Retrieve a Form
     *
     * @throws FetchError<400, types.GetFormSingleResponse400> Bad Request
     */
    SDK.prototype.getFormSingle = function (metadata) {
        return this.core.fetch('/form/{uuid}.json', 'get', metadata);
    };
    /**
     * Update a Form
     *
     * @throws FetchError<400, types.PostFormSingleResponse400> Bad Request
     */
    SDK.prototype.postFormSingle = function (body, metadata) {
        return this.core.fetch('/form/{uuid}.json', 'post', body, metadata);
    };
    /**
     * In ServiceM8, records are never deleted, but are archived. Archived records will remain
     * accessible via the API as (active = 0), however will no longer be visible in UI.
     * Archived records can be restored to active by setting the record active field to 1.
     *
     * @summary Delete a Form
     * @throws FetchError<400, types.DeleteFormSingleResponse400> Bad Request
     */
    SDK.prototype.deleteFormSingle = function (metadata) {
        return this.core.fetch('/form/{uuid}.json', 'delete', metadata);
    };
    /**
     * #### Filtering
     * This endpoint supports result filtering. For more information on how to filter this
     * request, [go here](/docs/filtering).
     *
     * @summary List all Form Fields
     * @throws FetchError<400, types.GetFormFieldAllResponse400> Bad Request
     */
    SDK.prototype.getFormFieldAll = function () {
        return this.core.fetch('/formfield.json', 'get');
    };
    /**
     * #### Record UUID
     * UUID is optional for record creation. If no UUID is supplied, a UUID will be
     * automatically generated for the new record and returned in the response header as
     * x-record-uuid.
     *
     * @summary Create a new Form Field
     * @throws FetchError<400, types.PostFormFieldCreateResponse400> Bad Request
     */
    SDK.prototype.postFormFieldCreate = function (body) {
        return this.core.fetch('/formfield.json', 'post', body);
    };
    /**
     * Retrieve a Form Field
     *
     * @throws FetchError<400, types.GetFormFieldSingleResponse400> Bad Request
     */
    SDK.prototype.getFormFieldSingle = function (metadata) {
        return this.core.fetch('/formfield/{uuid}.json', 'get', metadata);
    };
    /**
     * Update a Form Field
     *
     * @throws FetchError<400, types.PostFormFieldSingleResponse400> Bad Request
     */
    SDK.prototype.postFormFieldSingle = function (body, metadata) {
        return this.core.fetch('/formfield/{uuid}.json', 'post', body, metadata);
    };
    /**
     * In ServiceM8, records are never deleted, but are archived. Archived records will remain
     * accessible via the API as (active = 0), however will no longer be visible in UI.
     * Archived records can be restored to active by setting the record active field to 1.
     *
     * @summary Delete a Form Field
     * @throws FetchError<400, types.DeleteFormFieldSingleResponse400> Bad Request
     */
    SDK.prototype.deleteFormFieldSingle = function (metadata) {
        return this.core.fetch('/formfield/{uuid}.json', 'delete', metadata);
    };
    /**
     * #### Filtering
     * This endpoint supports result filtering. For more information on how to filter this
     * request, [go here](/docs/filtering).
     *
     * @summary List all Form Responses
     * @throws FetchError<400, types.GetFormResponseAllResponse400> Bad Request
     */
    SDK.prototype.getFormResponseAll = function () {
        return this.core.fetch('/formresponse.json', 'get');
    };
    /**
     * #### Record UUID
     * UUID is optional for record creation. If no UUID is supplied, a UUID will be
     * automatically generated for the new record and returned in the response header as
     * x-record-uuid.
     *
     * @summary Create a new Form Response
     * @throws FetchError<400, types.PostFormResponseCreateResponse400> Bad Request
     */
    SDK.prototype.postFormResponseCreate = function (body) {
        return this.core.fetch('/formresponse.json', 'post', body);
    };
    /**
     * Retrieve a Form Response
     *
     * @throws FetchError<400, types.GetFormResponseSingleResponse400> Bad Request
     */
    SDK.prototype.getFormResponseSingle = function (metadata) {
        return this.core.fetch('/formresponse/{uuid}.json', 'get', metadata);
    };
    /**
     * Update a Form Response
     *
     * @throws FetchError<400, types.PostFormResponseSingleResponse400> Bad Request
     */
    SDK.prototype.postFormResponseSingle = function (body, metadata) {
        return this.core.fetch('/formresponse/{uuid}.json', 'post', body, metadata);
    };
    /**
     * In ServiceM8, records are never deleted, but are archived. Archived records will remain
     * accessible via the API as (active = 0), however will no longer be visible in UI.
     * Archived records can be restored to active by setting the record active field to 1.
     *
     * @summary Delete a Form Response
     * @throws FetchError<400, types.DeleteFormResponseSingleResponse400> Bad Request
     */
    SDK.prototype.deleteFormResponseSingle = function (metadata) {
        return this.core.fetch('/formresponse/{uuid}.json', 'delete', metadata);
    };
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
    SDK.prototype.getJobAll = function () {
        return this.core.fetch('/job.json', 'get');
    };
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
    SDK.prototype.postJobCreate = function (body) {
        return this.core.fetch('/job.json', 'post', body);
    };
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **read_jobs**.
     *
     * @summary Retrieve a Job
     * @throws FetchError<400, types.GetJobSingleResponse400> Bad Request
     */
    SDK.prototype.getJobSingle = function (metadata) {
        return this.core.fetch('/job/{uuid}.json', 'get', metadata);
    };
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **manage_jobs**.
     *
     * @summary Update a Job
     * @throws FetchError<400, types.PostJobSingleResponse400> Bad Request
     */
    SDK.prototype.postJobSingle = function (body, metadata) {
        return this.core.fetch('/job/{uuid}.json', 'post', body, metadata);
    };
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
    SDK.prototype.deleteJobSingle = function (metadata) {
        return this.core.fetch('/job/{uuid}.json', 'delete', metadata);
    };
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
    SDK.prototype.getJobActivityAll = function () {
        return this.core.fetch('/jobactivity.json', 'get');
    };
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
    SDK.prototype.postJobActivityCreate = function (body) {
        return this.core.fetch('/jobactivity.json', 'post', body);
    };
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **read_schedule**.
     *
     * @summary Retrieve a Job Activity
     * @throws FetchError<400, types.GetJobActivitySingleResponse400> Bad Request
     */
    SDK.prototype.getJobActivitySingle = function (metadata) {
        return this.core.fetch('/jobactivity/{uuid}.json', 'get', metadata);
    };
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **manage_schedule**.
     *
     * @summary Update a Job Activity
     * @throws FetchError<400, types.PostJobActivitySingleResponse400> Bad Request
     */
    SDK.prototype.postJobActivitySingle = function (body, metadata) {
        return this.core.fetch('/jobactivity/{uuid}.json', 'post', body, metadata);
    };
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
    SDK.prototype.deleteJobActivitySingle = function (metadata) {
        return this.core.fetch('/jobactivity/{uuid}.json', 'delete', metadata);
    };
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
    SDK.prototype.getJobAllocationAll = function () {
        return this.core.fetch('/joballocation.json', 'get');
    };
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
    SDK.prototype.postJobAllocationCreate = function (body) {
        return this.core.fetch('/joballocation.json', 'post', body);
    };
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **read_schedule**.
     *
     * @summary Retrieve a Job Allocation
     * @throws FetchError<400, types.GetJobAllocationSingleResponse400> Bad Request
     */
    SDK.prototype.getJobAllocationSingle = function (metadata) {
        return this.core.fetch('/joballocation/{uuid}.json', 'get', metadata);
    };
    /**
     * Update a Job Allocation
     *
     * @throws FetchError<400, types.PostJobAllocationSingleResponse400> Bad Request
     */
    SDK.prototype.postJobAllocationSingle = function (body, metadata) {
        return this.core.fetch('/joballocation/{uuid}.json', 'post', body, metadata);
    };
    /**
     * In ServiceM8, records are never deleted, but are archived. Archived records will remain
     * accessible via the API as (active = 0), however will no longer be visible in UI.
     * Archived records can be restored to active by setting the record active field to 1.
     *
     * @summary Delete a Job Allocation
     * @throws FetchError<400, types.DeleteJobAllocationSingleResponse400> Bad Request
     */
    SDK.prototype.deleteJobAllocationSingle = function (metadata) {
        return this.core.fetch('/joballocation/{uuid}.json', 'delete', metadata);
    };
    /**
     * #### Filtering
     * This endpoint supports result filtering. For more information on how to filter this
     * request, [go here](/docs/filtering).
     *
     * @summary List all Job Checklists
     * @throws FetchError<400, types.GetJobChecklistAllResponse400> Bad Request
     */
    SDK.prototype.getJobChecklistAll = function () {
        return this.core.fetch('/jobchecklist.json', 'get');
    };
    /**
     * #### Record UUID
     * UUID is optional for record creation. If no UUID is supplied, a UUID will be
     * automatically generated for the new record and returned in the response header as
     * x-record-uuid.
     *
     * @summary Create a new Job Checklist
     * @throws FetchError<400, types.PostJobChecklistCreateResponse400> Bad Request
     */
    SDK.prototype.postJobChecklistCreate = function (body) {
        return this.core.fetch('/jobchecklist.json', 'post', body);
    };
    /**
     * Retrieve a Job Checklist
     *
     * @throws FetchError<400, types.GetJobChecklistSingleResponse400> Bad Request
     */
    SDK.prototype.getJobChecklistSingle = function (metadata) {
        return this.core.fetch('/jobchecklist/{uuid}.json', 'get', metadata);
    };
    /**
     * Update a Job Checklist
     *
     * @throws FetchError<400, types.PostJobChecklistSingleResponse400> Bad Request
     */
    SDK.prototype.postJobChecklistSingle = function (body, metadata) {
        return this.core.fetch('/jobchecklist/{uuid}.json', 'post', body, metadata);
    };
    /**
     * In ServiceM8, records are never deleted, but are archived. Archived records will remain
     * accessible via the API as (active = 0), however will no longer be visible in UI.
     * Archived records can be restored to active by setting the record active field to 1.
     *
     * @summary Delete a Job Checklist
     * @throws FetchError<400, types.DeleteJobChecklistSingleResponse400> Bad Request
     */
    SDK.prototype.deleteJobChecklistSingle = function (metadata) {
        return this.core.fetch('/jobchecklist/{uuid}.json', 'delete', metadata);
    };
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
    SDK.prototype.getJobContactAll = function () {
        return this.core.fetch('/jobcontact.json', 'get');
    };
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
    SDK.prototype.postJobContactCreate = function (body) {
        return this.core.fetch('/jobcontact.json', 'post', body);
    };
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **read_job_contacts**.
     *
     * @summary Retrieve a Job Contact
     * @throws FetchError<400, types.GetJobContactSingleResponse400> Bad Request
     */
    SDK.prototype.getJobContactSingle = function (metadata) {
        return this.core.fetch('/jobcontact/{uuid}.json', 'get', metadata);
    };
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **manage_job_contacts**.
     *
     * @summary Update a Job Contact
     * @throws FetchError<400, types.PostJobContactSingleResponse400> Bad Request
     */
    SDK.prototype.postJobContactSingle = function (body, metadata) {
        return this.core.fetch('/jobcontact/{uuid}.json', 'post', body, metadata);
    };
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
    SDK.prototype.deleteJobContactSingle = function (metadata) {
        return this.core.fetch('/jobcontact/{uuid}.json', 'delete', metadata);
    };
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
    SDK.prototype.getJobMaterialAll = function () {
        return this.core.fetch('/jobmaterial.json', 'get');
    };
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
    SDK.prototype.postJobMaterialCreate = function (body) {
        return this.core.fetch('/jobmaterial.json', 'post', body);
    };
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **read_job_materials**.
     *
     * @summary Retrieve a Job Material
     * @throws FetchError<400, types.GetJobMaterialSingleResponse400> Bad Request
     */
    SDK.prototype.getJobMaterialSingle = function (metadata) {
        return this.core.fetch('/jobmaterial/{uuid}.json', 'get', metadata);
    };
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **manage_job_materials**.
     *
     * @summary Update a Job Material
     * @throws FetchError<400, types.PostJobMaterialSingleResponse400> Bad Request
     */
    SDK.prototype.postJobMaterialSingle = function (body, metadata) {
        return this.core.fetch('/jobmaterial/{uuid}.json', 'post', body, metadata);
    };
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
    SDK.prototype.deleteJobMaterialSingle = function (metadata) {
        return this.core.fetch('/jobmaterial/{uuid}.json', 'delete', metadata);
    };
    /**
     * #### Filtering
     * This endpoint supports result filtering. For more information on how to filter this
     * request, [go here](/docs/filtering).
     *
     * @summary List all Job Material Bundles
     * @throws FetchError<400, types.GetJobMaterialBundleAllResponse400> Bad Request
     */
    SDK.prototype.getJobMaterialBundleAll = function () {
        return this.core.fetch('/jobmaterialbundle.json', 'get');
    };
    /**
     * #### Record UUID
     * UUID is optional for record creation. If no UUID is supplied, a UUID will be
     * automatically generated for the new record and returned in the response header as
     * x-record-uuid.
     *
     * @summary Create a new Job Material Bundle
     * @throws FetchError<400, types.PostJobMaterialBundleCreateResponse400> Bad Request
     */
    SDK.prototype.postJobMaterialBundleCreate = function (body) {
        return this.core.fetch('/jobmaterialbundle.json', 'post', body);
    };
    /**
     * Retrieve a Job Material Bundle
     *
     * @throws FetchError<400, types.GetJobMaterialBundleSingleResponse400> Bad Request
     */
    SDK.prototype.getJobMaterialBundleSingle = function (metadata) {
        return this.core.fetch('/jobmaterialbundle/{uuid}.json', 'get', metadata);
    };
    /**
     * Update a Job Material Bundle
     *
     * @throws FetchError<400, types.PostJobMaterialBundleSingleResponse400> Bad Request
     */
    SDK.prototype.postJobMaterialBundleSingle = function (body, metadata) {
        return this.core.fetch('/jobmaterialbundle/{uuid}.json', 'post', body, metadata);
    };
    /**
     * In ServiceM8, records are never deleted, but are archived. Archived records will remain
     * accessible via the API as (active = 0), however will no longer be visible in UI.
     * Archived records can be restored to active by setting the record active field to 1.
     *
     * @summary Delete a Job Material Bundle
     * @throws FetchError<400, types.DeleteJobMaterialBundleSingleResponse400> Bad Request
     */
    SDK.prototype.deleteJobMaterialBundleSingle = function (metadata) {
        return this.core.fetch('/jobmaterialbundle/{uuid}.json', 'delete', metadata);
    };
    /**
     * #### Filtering
     * This endpoint supports result filtering. For more information on how to filter this
     * request, [go here](/docs/filtering).
     *
     * @summary List all Job Payments
     * @throws FetchError<400, types.GetJobPaymentAllResponse400> Bad Request
     */
    SDK.prototype.getJobPaymentAll = function () {
        return this.core.fetch('/jobpayment.json', 'get');
    };
    /**
     * #### Record UUID
     * UUID is optional for record creation. If no UUID is supplied, a UUID will be
     * automatically generated for the new record and returned in the response header as
     * x-record-uuid.
     *
     * @summary Create a new Job Payment
     * @throws FetchError<400, types.PostJobPaymentCreateResponse400> Bad Request
     */
    SDK.prototype.postJobPaymentCreate = function (body) {
        return this.core.fetch('/jobpayment.json', 'post', body);
    };
    /**
     * Retrieve a Job Payment
     *
     * @throws FetchError<400, types.GetJobPaymentSingleResponse400> Bad Request
     */
    SDK.prototype.getJobPaymentSingle = function (metadata) {
        return this.core.fetch('/jobpayment/{uuid}.json', 'get', metadata);
    };
    /**
     * Update a Job Payment
     *
     * @throws FetchError<400, types.PostJobPaymentSingleResponse400> Bad Request
     */
    SDK.prototype.postJobPaymentSingle = function (body, metadata) {
        return this.core.fetch('/jobpayment/{uuid}.json', 'post', body, metadata);
    };
    /**
     * In ServiceM8, records are never deleted, but are archived. Archived records will remain
     * accessible via the API as (active = 0), however will no longer be visible in UI.
     * Archived records can be restored to active by setting the record active field to 1.
     *
     * @summary Delete a Job Payment
     * @throws FetchError<400, types.DeleteJobPaymentSingleResponse400> Bad Request
     */
    SDK.prototype.deleteJobPaymentSingle = function (metadata) {
        return this.core.fetch('/jobpayment/{uuid}.json', 'delete', metadata);
    };
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
    SDK.prototype.getKnowledgeArticleAll = function () {
        return this.core.fetch('/knowledgearticle.json', 'get');
    };
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
    SDK.prototype.postKnowledgeArticleCreate = function (body) {
        return this.core.fetch('/knowledgearticle.json', 'post', body);
    };
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **read_knowledge**.
     *
     * @summary Retrieve a Knowledge Article
     * @throws FetchError<400, types.GetKnowledgeArticleSingleResponse400> Bad Request
     */
    SDK.prototype.getKnowledgeArticleSingle = function (metadata) {
        return this.core.fetch('/knowledgearticle/{uuid}.json', 'get', metadata);
    };
    /**
     * Update a Knowledge Article
     *
     * @throws FetchError<400, types.PostKnowledgeArticleSingleResponse400> Bad Request
     */
    SDK.prototype.postKnowledgeArticleSingle = function (body, metadata) {
        return this.core.fetch('/knowledgearticle/{uuid}.json', 'post', body, metadata);
    };
    /**
     * In ServiceM8, records are never deleted, but are archived. Archived records will remain
     * accessible via the API as (active = 0), however will no longer be visible in UI.
     * Archived records can be restored to active by setting the record active field to 1.
     *
     * @summary Delete a Knowledge Article
     * @throws FetchError<400, types.DeleteKnowledgeArticleSingleResponse400> Bad Request
     */
    SDK.prototype.deleteKnowledgeArticleSingle = function (metadata) {
        return this.core.fetch('/knowledgearticle/{uuid}.json', 'delete', metadata);
    };
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
    SDK.prototype.getLocationAll = function () {
        return this.core.fetch('/location.json', 'get');
    };
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
    SDK.prototype.postLocationCreate = function (body) {
        return this.core.fetch('/location.json', 'post', body);
    };
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **read_locations**.
     *
     * @summary Retrieve a Location
     * @throws FetchError<400, types.GetLocationSingleResponse400> Bad Request
     */
    SDK.prototype.getLocationSingle = function (metadata) {
        return this.core.fetch('/location/{uuid}.json', 'get', metadata);
    };
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **manage_locations**.
     *
     * @summary Update a Location
     * @throws FetchError<400, types.PostLocationSingleResponse400> Bad Request
     */
    SDK.prototype.postLocationSingle = function (body, metadata) {
        return this.core.fetch('/location/{uuid}.json', 'post', body, metadata);
    };
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
    SDK.prototype.deleteLocationSingle = function (metadata) {
        return this.core.fetch('/location/{uuid}.json', 'delete', metadata);
    };
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
    SDK.prototype.getMaterialAll = function () {
        return this.core.fetch('/material.json', 'get');
    };
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
    SDK.prototype.postMaterialCreate = function (body) {
        return this.core.fetch('/material.json', 'post', body);
    };
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **read_inventory**.
     *
     * @summary Retrieve a Material
     * @throws FetchError<400, types.GetMaterialSingleResponse400> Bad Request
     */
    SDK.prototype.getMaterialSingle = function (metadata) {
        return this.core.fetch('/material/{uuid}.json', 'get', metadata);
    };
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **manage_inventory**.
     *
     * @summary Update a Material
     * @throws FetchError<400, types.PostMaterialSingleResponse400> Bad Request
     */
    SDK.prototype.postMaterialSingle = function (body, metadata) {
        return this.core.fetch('/material/{uuid}.json', 'post', body, metadata);
    };
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
    SDK.prototype.deleteMaterialSingle = function (metadata) {
        return this.core.fetch('/material/{uuid}.json', 'delete', metadata);
    };
    /**
     * #### Filtering
     * This endpoint supports result filtering. For more information on how to filter this
     * request, [go here](/docs/filtering).
     *
     * @summary List all Bundles
     * @throws FetchError<400, types.GetMaterialBundleAllResponse400> Bad Request
     */
    SDK.prototype.getMaterialBundleAll = function () {
        return this.core.fetch('/materialbundle.json', 'get');
    };
    /**
     * #### Record UUID
     * UUID is optional for record creation. If no UUID is supplied, a UUID will be
     * automatically generated for the new record and returned in the response header as
     * x-record-uuid.
     *
     * @summary Create a new Bundle
     * @throws FetchError<400, types.PostMaterialBundleCreateResponse400> Bad Request
     */
    SDK.prototype.postMaterialBundleCreate = function (body) {
        return this.core.fetch('/materialbundle.json', 'post', body);
    };
    /**
     * Retrieve a Bundle
     *
     * @throws FetchError<400, types.GetMaterialBundleSingleResponse400> Bad Request
     */
    SDK.prototype.getMaterialBundleSingle = function (metadata) {
        return this.core.fetch('/materialbundle/{uuid}.json', 'get', metadata);
    };
    /**
     * Update a Bundle
     *
     * @throws FetchError<400, types.PostMaterialBundleSingleResponse400> Bad Request
     */
    SDK.prototype.postMaterialBundleSingle = function (body, metadata) {
        return this.core.fetch('/materialbundle/{uuid}.json', 'post', body, metadata);
    };
    /**
     * In ServiceM8, records are never deleted, but are archived. Archived records will remain
     * accessible via the API as (active = 0), however will no longer be visible in UI.
     * Archived records can be restored to active by setting the record active field to 1.
     *
     * @summary Delete a Bundle
     * @throws FetchError<400, types.DeleteMaterialBundleSingleResponse400> Bad Request
     */
    SDK.prototype.deleteMaterialBundleSingle = function (metadata) {
        return this.core.fetch('/materialbundle/{uuid}.json', 'delete', metadata);
    };
    /**
     * #### Filtering
     * This endpoint supports result filtering. For more information on how to filter this
     * request, [go here](/docs/filtering).
     *
     * @summary List all Notes
     * @throws FetchError<400, types.GetNoteAllResponse400> Bad Request
     */
    SDK.prototype.getNoteAll = function () {
        return this.core.fetch('/note.json', 'get');
    };
    /**
     * #### Record UUID
     * UUID is optional for record creation. If no UUID is supplied, a UUID will be
     * automatically generated for the new record and returned in the response header as
     * x-record-uuid.
     *
     * @summary Create a new Note
     * @throws FetchError<400, types.PostNoteCreateResponse400> Bad Request
     */
    SDK.prototype.postNoteCreate = function (body) {
        return this.core.fetch('/note.json', 'post', body);
    };
    /**
     * Retrieve a Note
     *
     * @throws FetchError<400, types.GetNoteSingleResponse400> Bad Request
     */
    SDK.prototype.getNoteSingle = function (metadata) {
        return this.core.fetch('/note/{uuid}.json', 'get', metadata);
    };
    /**
     * Update a Note
     *
     * @throws FetchError<400, types.PostNoteSingleResponse400> Bad Request
     */
    SDK.prototype.postNoteSingle = function (body, metadata) {
        return this.core.fetch('/note/{uuid}.json', 'post', body, metadata);
    };
    /**
     * In ServiceM8, records are never deleted, but are archived. Archived records will remain
     * accessible via the API as (active = 0), however will no longer be visible in UI.
     * Archived records can be restored to active by setting the record active field to 1.
     *
     * @summary Delete a Note
     * @throws FetchError<400, types.DeleteNoteSingleResponse400> Bad Request
     */
    SDK.prototype.deleteNoteSingle = function (metadata) {
        return this.core.fetch('/note/{uuid}.json', 'delete', metadata);
    };
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
    SDK.prototype.getQueueAll = function () {
        return this.core.fetch('/queue.json', 'get');
    };
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
    SDK.prototype.postQueueCreate = function (body) {
        return this.core.fetch('/queue.json', 'post', body);
    };
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **read_job_queues**.
     *
     * @summary Retrieve a Job Queue
     * @throws FetchError<400, types.GetQueueSingleResponse400> Bad Request
     */
    SDK.prototype.getQueueSingle = function (metadata) {
        return this.core.fetch('/queue/{uuid}.json', 'get', metadata);
    };
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **manage_job_queues**.
     *
     * @summary Update a Job Queue
     * @throws FetchError<400, types.PostQueueSingleResponse400> Bad Request
     */
    SDK.prototype.postQueueSingle = function (body, metadata) {
        return this.core.fetch('/queue/{uuid}.json', 'post', body, metadata);
    };
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
    SDK.prototype.deleteQueueSingle = function (metadata) {
        return this.core.fetch('/queue/{uuid}.json', 'delete', metadata);
    };
    /**
     * #### Filtering
     * This endpoint supports result filtering. For more information on how to filter this
     * request, [go here](/docs/filtering).
     *
     * @summary List all Security Roles
     * @throws FetchError<400, types.GetSecurityRoleAllResponse400> Bad Request
     */
    SDK.prototype.getSecurityRoleAll = function () {
        return this.core.fetch('/securityrole.json', 'get');
    };
    /**
     * #### Record UUID
     * UUID is optional for record creation. If no UUID is supplied, a UUID will be
     * automatically generated for the new record and returned in the response header as
     * x-record-uuid.
     *
     * @summary Create a new Security Role
     * @throws FetchError<400, types.PostSecurityRoleCreateResponse400> Bad Request
     */
    SDK.prototype.postSecurityRoleCreate = function (body) {
        return this.core.fetch('/securityrole.json', 'post', body);
    };
    /**
     * Retrieve a Security Role
     *
     * @throws FetchError<400, types.GetSecurityRoleSingleResponse400> Bad Request
     */
    SDK.prototype.getSecurityRoleSingle = function (metadata) {
        return this.core.fetch('/securityrole/{uuid}.json', 'get', metadata);
    };
    /**
     * Update a Security Role
     *
     * @throws FetchError<400, types.PostSecurityRoleSingleResponse400> Bad Request
     */
    SDK.prototype.postSecurityRoleSingle = function (body, metadata) {
        return this.core.fetch('/securityrole/{uuid}.json', 'post', body, metadata);
    };
    /**
     * In ServiceM8, records are never deleted, but are archived. Archived records will remain
     * accessible via the API as (active = 0), however will no longer be visible in UI.
     * Archived records can be restored to active by setting the record active field to 1.
     *
     * @summary Delete a Security Role
     * @throws FetchError<400, types.DeleteSecurityRoleSingleResponse400> Bad Request
     */
    SDK.prototype.deleteSecurityRoleSingle = function (metadata) {
        return this.core.fetch('/securityrole/{uuid}.json', 'delete', metadata);
    };
    /**
     * #### Filtering
     * This endpoint supports result filtering. For more information on how to filter this
     * request, [go here](/docs/filtering).
     *
     * @summary List all SMS Templates
     * @throws FetchError<400, types.GetSmsTemplateAllResponse400> Bad Request
     */
    SDK.prototype.getSmsTemplateAll = function () {
        return this.core.fetch('/smstemplate.json', 'get');
    };
    /**
     * #### Record UUID
     * UUID is optional for record creation. If no UUID is supplied, a UUID will be
     * automatically generated for the new record and returned in the response header as
     * x-record-uuid.
     *
     * @summary Create a new SMS Template
     * @throws FetchError<400, types.PostSmsTemplateCreateResponse400> Bad Request
     */
    SDK.prototype.postSmsTemplateCreate = function (body) {
        return this.core.fetch('/smstemplate.json', 'post', body);
    };
    /**
     * Retrieve a SMS Template
     *
     * @throws FetchError<400, types.GetSmsTemplateSingleResponse400> Bad Request
     */
    SDK.prototype.getSmsTemplateSingle = function (metadata) {
        return this.core.fetch('/smstemplate/{uuid}.json', 'get', metadata);
    };
    /**
     * Update a SMS Template
     *
     * @throws FetchError<400, types.PostSmsTemplateSingleResponse400> Bad Request
     */
    SDK.prototype.postSmsTemplateSingle = function (body, metadata) {
        return this.core.fetch('/smstemplate/{uuid}.json', 'post', body, metadata);
    };
    /**
     * In ServiceM8, records are never deleted, but are archived. Archived records will remain
     * accessible via the API as (active = 0), however will no longer be visible in UI.
     * Archived records can be restored to active by setting the record active field to 1.
     *
     * @summary Delete a SMS Template
     * @throws FetchError<400, types.DeleteSmsTemplateSingleResponse400> Bad Request
     */
    SDK.prototype.deleteSmsTemplateSingle = function (metadata) {
        return this.core.fetch('/smstemplate/{uuid}.json', 'delete', metadata);
    };
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
    SDK.prototype.getStaffAll = function () {
        return this.core.fetch('/staff.json', 'get');
    };
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
    SDK.prototype.postStaffCreate = function (body) {
        return this.core.fetch('/staff.json', 'post', body);
    };
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **read_staff**.
     *
     * @summary Retrieve a Staff Member
     * @throws FetchError<400, types.GetStaffSingleResponse400> Bad Request
     */
    SDK.prototype.getStaffSingle = function (metadata) {
        return this.core.fetch('/staff/{uuid}.json', 'get', metadata);
    };
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **manage_staff**.
     *
     * @summary Update a Staff Member
     * @throws FetchError<400, types.PostStaffSingleResponse400> Bad Request
     */
    SDK.prototype.postStaffSingle = function (body, metadata) {
        return this.core.fetch('/staff/{uuid}.json', 'post', body, metadata);
    };
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
    SDK.prototype.deleteStaffSingle = function (metadata) {
        return this.core.fetch('/staff/{uuid}.json', 'delete', metadata);
    };
    /**
     * #### Filtering
     * This endpoint supports result filtering. For more information on how to filter this
     * request, [go here](/docs/filtering).
     *
     * @summary List all Staff Messages
     * @throws FetchError<400, types.GetStaffMessageAllResponse400> Bad Request
     */
    SDK.prototype.getStaffMessageAll = function () {
        return this.core.fetch('/staffmessage.json', 'get');
    };
    /**
     * #### Record UUID
     * UUID is optional for record creation. If no UUID is supplied, a UUID will be
     * automatically generated for the new record and returned in the response header as
     * x-record-uuid.
     *
     * @summary Create a new Staff Message
     * @throws FetchError<400, types.PostStaffMessageCreateResponse400> Bad Request
     */
    SDK.prototype.postStaffMessageCreate = function (body) {
        return this.core.fetch('/staffmessage.json', 'post', body);
    };
    /**
     * Retrieve a Staff Message
     *
     * @throws FetchError<400, types.GetStaffMessageSingleResponse400> Bad Request
     */
    SDK.prototype.getStaffMessageSingle = function (metadata) {
        return this.core.fetch('/staffmessage/{uuid}.json', 'get', metadata);
    };
    /**
     * Update a Staff Message
     *
     * @throws FetchError<400, types.PostStaffMessageSingleResponse400> Bad Request
     */
    SDK.prototype.postStaffMessageSingle = function (body, metadata) {
        return this.core.fetch('/staffmessage/{uuid}.json', 'post', body, metadata);
    };
    /**
     * In ServiceM8, records are never deleted, but are archived. Archived records will remain
     * accessible via the API as (active = 0), however will no longer be visible in UI.
     * Archived records can be restored to active by setting the record active field to 1.
     *
     * @summary Delete a Staff Message
     * @throws FetchError<400, types.DeleteStaffMessageSingleResponse400> Bad Request
     */
    SDK.prototype.deleteStaffMessageSingle = function (metadata) {
        return this.core.fetch('/staffmessage/{uuid}.json', 'delete', metadata);
    };
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
    SDK.prototype.getTaskAll = function () {
        return this.core.fetch('/task.json', 'get');
    };
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
    SDK.prototype.postTaskCreate = function (body) {
        return this.core.fetch('/task.json', 'post', body);
    };
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **read_tasks**.
     *
     * @summary Retrieve a Task
     * @throws FetchError<400, types.GetTaskSingleResponse400> Bad Request
     */
    SDK.prototype.getTaskSingle = function (metadata) {
        return this.core.fetch('/task/{uuid}.json', 'get', metadata);
    };
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **manage_tasks**.
     *
     * @summary Update a Task
     * @throws FetchError<400, types.PostTaskSingleResponse400> Bad Request
     */
    SDK.prototype.postTaskSingle = function (body, metadata) {
        return this.core.fetch('/task/{uuid}.json', 'post', body, metadata);
    };
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
    SDK.prototype.deleteTaskSingle = function (metadata) {
        return this.core.fetch('/task/{uuid}.json', 'delete', metadata);
    };
    /**
     * #### Filtering
     * This endpoint supports result filtering. For more information on how to filter this
     * request, [go here](/docs/filtering).
     *
     * @summary List all Tax Rates
     * @throws FetchError<400, types.GetTaxRateAllResponse400> Bad Request
     */
    SDK.prototype.getTaxRateAll = function () {
        return this.core.fetch('/taxrate.json', 'get');
    };
    /**
     * #### Record UUID
     * UUID is optional for record creation. If no UUID is supplied, a UUID will be
     * automatically generated for the new record and returned in the response header as
     * x-record-uuid.
     *
     * @summary Create a new Tax Rate
     * @throws FetchError<400, types.PostTaxRateCreateResponse400> Bad Request
     */
    SDK.prototype.postTaxRateCreate = function (body) {
        return this.core.fetch('/taxrate.json', 'post', body);
    };
    /**
     * Retrieve a Tax Rate
     *
     * @throws FetchError<400, types.GetTaxRateSingleResponse400> Bad Request
     */
    SDK.prototype.getTaxRateSingle = function (metadata) {
        return this.core.fetch('/taxrate/{uuid}.json', 'get', metadata);
    };
    /**
     * Update a Tax Rate
     *
     * @throws FetchError<400, types.PostTaxRateSingleResponse400> Bad Request
     */
    SDK.prototype.postTaxRateSingle = function (body, metadata) {
        return this.core.fetch('/taxrate/{uuid}.json', 'post', body, metadata);
    };
    /**
     * In ServiceM8, records are never deleted, but are archived. Archived records will remain
     * accessible via the API as (active = 0), however will no longer be visible in UI.
     * Archived records can be restored to active by setting the record active field to 1.
     *
     * @summary Delete a Tax Rate
     * @throws FetchError<400, types.DeleteTaxRateSingleResponse400> Bad Request
     */
    SDK.prototype.deleteTaxRateSingle = function (metadata) {
        return this.core.fetch('/taxrate/{uuid}.json', 'delete', metadata);
    };
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
    SDK.prototype.getVendorAll = function () {
        return this.core.fetch('/vendor.json', 'get');
    };
    /**
     * #### OAuth Scope
     * This endpoint requires the following OAuth scope **vendor**.
     *
     * @summary Retrieve a Vendor
     * @throws FetchError<400, types.GetVendorSingleResponse400> Bad Request
     */
    SDK.prototype.getVendorSingle = function (metadata) {
        return this.core.fetch('/vendor/{uuid}.json', 'get', metadata);
    };
    /**
     * Update a Vendor
     *
     * @throws FetchError<400, types.PostVendorSingleResponse400> Bad Request
     */
    SDK.prototype.postVendorSingle = function (body, metadata) {
        return this.core.fetch('/vendor/{uuid}.json', 'post', body, metadata);
    };
    return SDK;
}());
var createSDK = (function () { return new SDK(); })();
module.exports = createSDK;
