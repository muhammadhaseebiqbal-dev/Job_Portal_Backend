declare const DeleteAllocationWindowSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Allocation Window";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const DeleteAssetSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Asset";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const DeleteAssetTypeFieldSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Asset Type Field";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const DeleteAssetTypeSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Asset Type";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const DeleteAttachmentSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Attachment";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const DeleteBadgeSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Badge";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const DeleteCategorySingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Category";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const DeleteCompanyContactSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Company Contact";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const DeleteCompanySingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Client";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const DeleteEmailTemplateSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Email Template";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const DeleteFeedbackSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Feedback";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const DeleteFormFieldSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Form Field";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const DeleteFormResponseSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Form Response";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const DeleteFormSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Form";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const DeleteJobActivitySingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Job Activity";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const DeleteJobAllocationSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Job Allocation";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const DeleteJobChecklistSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Job Checklist";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const DeleteJobContactSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Job Contact";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const DeleteJobMaterialBundleSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Job Material Bundle";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const DeleteJobMaterialSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Job Material";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const DeleteJobPaymentSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Job Payment";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const DeleteJobSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Job";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const DeleteKnowledgeArticleSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Knowledge Article";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const DeleteLocationSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Location";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const DeleteMaterialBundleSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Bundle";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const DeleteMaterialSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Material";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const DeleteNoteSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Note";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const DeleteQueueSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Job Queue";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const DeleteSecurityRoleSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Security Role";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const DeleteSmsTemplateSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the SMS Template";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const DeleteStaffMessageSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Staff Message";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const DeleteStaffSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Staff Member";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const DeleteTaskSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Task";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const DeleteTaxRateSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Tax Rate";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetAllocationWindowAll: {
    readonly response: {
        readonly "200": {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly description: "Record UUID key";
                        readonly examples: readonly ["123e4567-b7f9-4230-b88e-21db00c9909b"];
                    };
                    readonly active: {
                        readonly type: "number";
                        readonly enum: readonly [0, 1];
                        readonly default: 1;
                        readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                    };
                    readonly edit_date: {
                        readonly type: "string";
                        readonly readOnly: true;
                        readonly description: "Record last modified timestamp";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly name: {
                        readonly type: "string";
                    };
                    readonly start_time: {
                        readonly type: "number";
                    };
                    readonly end_time: {
                        readonly type: "number";
                    };
                    readonly sort_priority: {
                        readonly type: "number";
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetAllocationWindowSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Allocation Window";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "Record UUID key";
                    readonly examples: readonly ["123e4567-b7f9-4230-b88e-21db00c9909b"];
                };
                readonly active: {
                    readonly type: "number";
                    readonly enum: readonly [0, 1];
                    readonly default: 1;
                    readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                };
                readonly edit_date: {
                    readonly type: "string";
                    readonly readOnly: true;
                    readonly description: "Record last modified timestamp";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly name: {
                    readonly type: "string";
                };
                readonly start_time: {
                    readonly type: "number";
                };
                readonly end_time: {
                    readonly type: "number";
                };
                readonly sort_priority: {
                    readonly type: "number";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetAssetAll: {
    readonly response: {
        readonly "200": {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly description: "Record UUID key";
                        readonly examples: readonly ["123e4567-9454-4e1d-a1af-21db0054f25b"];
                    };
                    readonly active: {
                        readonly type: "number";
                        readonly enum: readonly [0, 1];
                        readonly default: 1;
                        readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                    };
                    readonly edit_date: {
                        readonly type: "string";
                        readonly readOnly: true;
                        readonly description: "Record last modified timestamp";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly company_uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly description: "UUID of the Client to which this Asset is attached";
                        readonly examples: readonly ["123e4567-200b-4f8e-a56f-21db08b7388b"];
                    };
                    readonly asset_code: {
                        readonly type: "string";
                        readonly description: "The unique code printed on this Asset's attached label (read only) (Read-only)";
                    };
                    readonly asset_type_uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly description: "UUID of an Asset Type which defines the fields that can be stored for this Asset (read only) (Read-only)";
                        readonly examples: readonly ["123e4567-5b49-4fa0-8a7f-21db0b7c1acb"];
                    };
                    readonly name: {
                        readonly type: "string";
                        readonly description: "User-facing description of this asset";
                        readonly maxLength: 100;
                    };
                    readonly lat: {
                        readonly type: "number";
                        readonly format: "float";
                        readonly description: "Latitude component of the Asset's location in degrees";
                        readonly minimum: -3.402823669209385e+38;
                        readonly maximum: 3.402823669209385e+38;
                    };
                    readonly lng: {
                        readonly type: "number";
                        readonly format: "float";
                        readonly description: "Longitude component of the Asset's location in degrees";
                        readonly minimum: -3.402823669209385e+38;
                        readonly maximum: 3.402823669209385e+38;
                    };
                    readonly geo_timestamp: {
                        readonly type: "string";
                        readonly description: "Timestamp at which the Asset's location was last updated";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly altitude: {
                        readonly type: "number";
                        readonly description: "Altitude component of the Asset's location in metres";
                    };
                    readonly field_data: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "object";
                            readonly properties: {
                                readonly uuid: {
                                    readonly type: "string";
                                    readonly format: "uuid";
                                    readonly description: "Must be the UUID of an AssetTypeField";
                                };
                                readonly fieldType: {
                                    readonly type: "string";
                                };
                                readonly fieldName: {
                                    readonly type: "string";
                                };
                                readonly fieldValue: {
                                    readonly type: "string";
                                    readonly description: "Convert all values to string. Dates shall be in Y-m-d format.";
                                };
                                readonly sortOrder: {
                                    readonly type: "number";
                                };
                            };
                            readonly required: readonly ["uuid", "fieldType", "fieldName", "fieldValue", "sortOrder"];
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetAssetSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Asset";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "Record UUID key";
                    readonly examples: readonly ["123e4567-9454-4e1d-a1af-21db0054f25b"];
                };
                readonly active: {
                    readonly type: "number";
                    readonly enum: readonly [0, 1];
                    readonly default: 1;
                    readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                };
                readonly edit_date: {
                    readonly type: "string";
                    readonly readOnly: true;
                    readonly description: "Record last modified timestamp";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly company_uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "UUID of the Client to which this Asset is attached";
                    readonly examples: readonly ["123e4567-200b-4f8e-a56f-21db08b7388b"];
                };
                readonly asset_code: {
                    readonly type: "string";
                    readonly description: "The unique code printed on this Asset's attached label (read only) (Read-only)";
                };
                readonly asset_type_uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "UUID of an Asset Type which defines the fields that can be stored for this Asset (read only) (Read-only)";
                    readonly examples: readonly ["123e4567-5b49-4fa0-8a7f-21db0b7c1acb"];
                };
                readonly name: {
                    readonly type: "string";
                    readonly description: "User-facing description of this asset";
                    readonly maxLength: 100;
                };
                readonly lat: {
                    readonly type: "number";
                    readonly format: "float";
                    readonly description: "Latitude component of the Asset's location in degrees";
                    readonly minimum: -3.402823669209385e+38;
                    readonly maximum: 3.402823669209385e+38;
                };
                readonly lng: {
                    readonly type: "number";
                    readonly format: "float";
                    readonly description: "Longitude component of the Asset's location in degrees";
                    readonly minimum: -3.402823669209385e+38;
                    readonly maximum: 3.402823669209385e+38;
                };
                readonly geo_timestamp: {
                    readonly type: "string";
                    readonly description: "Timestamp at which the Asset's location was last updated";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly altitude: {
                    readonly type: "number";
                    readonly description: "Altitude component of the Asset's location in metres";
                };
                readonly field_data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly uuid: {
                                readonly type: "string";
                                readonly format: "uuid";
                                readonly description: "Must be the UUID of an AssetTypeField";
                            };
                            readonly fieldType: {
                                readonly type: "string";
                            };
                            readonly fieldName: {
                                readonly type: "string";
                            };
                            readonly fieldValue: {
                                readonly type: "string";
                                readonly description: "Convert all values to string. Dates shall be in Y-m-d format.";
                            };
                            readonly sortOrder: {
                                readonly type: "number";
                            };
                        };
                        readonly required: readonly ["uuid", "fieldType", "fieldName", "fieldValue", "sortOrder"];
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetAssetTypeAll: {
    readonly response: {
        readonly "200": {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly description: "Record UUID key";
                        readonly examples: readonly ["123e4567-5549-4fa6-87a1-21db0bf239eb"];
                    };
                    readonly active: {
                        readonly type: "number";
                        readonly enum: readonly [0, 1];
                        readonly default: 1;
                        readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                    };
                    readonly edit_date: {
                        readonly type: "string";
                        readonly readOnly: true;
                        readonly description: "Record last modified timestamp";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly name: {
                        readonly type: "string";
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetAssetTypeFieldAll: {
    readonly response: {
        readonly "200": {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly description: "Record UUID key";
                        readonly examples: readonly ["123e4567-8c80-4103-8755-21db00d93deb"];
                    };
                    readonly active: {
                        readonly type: "number";
                        readonly enum: readonly [0, 1];
                        readonly default: 1;
                        readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                    };
                    readonly edit_date: {
                        readonly type: "string";
                        readonly readOnly: true;
                        readonly description: "Record last modified timestamp";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly asset_type_uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly description: "(Read-only)";
                        readonly examples: readonly ["123e4567-afc7-4f5b-a771-21db0af9958b"];
                    };
                    readonly name: {
                        readonly type: "string";
                    };
                    readonly field_data: {
                        readonly type: "object";
                        readonly properties: {
                            readonly fieldType: {
                                readonly type: "string";
                                readonly enum: readonly ["Text", "Number", "Date", "Multiple Choice"];
                                readonly description: "`Text` `Number` `Date` `Multiple Choice`";
                            };
                            readonly mandatory: {
                                readonly type: "boolean";
                            };
                            readonly choices: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                };
                            };
                        };
                        readonly required: readonly ["fieldType", "mandatory"];
                    };
                    readonly sort_order: {
                        readonly type: "number";
                    };
                };
                readonly required: readonly ["name"];
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetAssetTypeFieldSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Asset Type Field";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "Record UUID key";
                    readonly examples: readonly ["123e4567-8c80-4103-8755-21db00d93deb"];
                };
                readonly active: {
                    readonly type: "number";
                    readonly enum: readonly [0, 1];
                    readonly default: 1;
                    readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                };
                readonly edit_date: {
                    readonly type: "string";
                    readonly readOnly: true;
                    readonly description: "Record last modified timestamp";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly asset_type_uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "(Read-only)";
                    readonly examples: readonly ["123e4567-afc7-4f5b-a771-21db0af9958b"];
                };
                readonly name: {
                    readonly type: "string";
                };
                readonly field_data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly fieldType: {
                            readonly type: "string";
                            readonly enum: readonly ["Text", "Number", "Date", "Multiple Choice"];
                            readonly description: "`Text` `Number` `Date` `Multiple Choice`";
                        };
                        readonly mandatory: {
                            readonly type: "boolean";
                        };
                        readonly choices: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                    };
                    readonly required: readonly ["fieldType", "mandatory"];
                };
                readonly sort_order: {
                    readonly type: "number";
                };
            };
            readonly required: readonly ["name"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetAssetTypeSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Asset Type";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "Record UUID key";
                    readonly examples: readonly ["123e4567-5549-4fa6-87a1-21db0bf239eb"];
                };
                readonly active: {
                    readonly type: "number";
                    readonly enum: readonly [0, 1];
                    readonly default: 1;
                    readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                };
                readonly edit_date: {
                    readonly type: "string";
                    readonly readOnly: true;
                    readonly description: "Record last modified timestamp";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly name: {
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetAttachmentAll: {
    readonly response: {
        readonly "200": {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly description: "Record UUID key";
                        readonly examples: readonly ["123e4567-1d49-48ad-9fa3-21db0b95d0db"];
                    };
                    readonly active: {
                        readonly type: "number";
                        readonly enum: readonly [0, 1];
                        readonly default: 1;
                        readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                    };
                    readonly edit_date: {
                        readonly type: "string";
                        readonly readOnly: true;
                        readonly description: "Record last modified timestamp";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly related_object: {
                        readonly type: "string";
                    };
                    readonly related_object_uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly examples: readonly ["123e4567-46be-44bc-bba4-21db0709e07b"];
                    };
                    readonly attachment_name: {
                        readonly type: "string";
                    };
                    readonly file_type: {
                        readonly type: "string";
                    };
                    readonly created_by_staff_uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly examples: readonly ["123e4567-3b7e-423f-aaca-21db072afdfb"];
                    };
                    readonly timestamp: {
                        readonly type: "string";
                    };
                    readonly attachment_source: {
                        readonly type: "string";
                    };
                    readonly tags: {
                        readonly type: "string";
                    };
                    readonly lng: {
                        readonly type: "number";
                        readonly format: "float";
                        readonly minimum: -3.402823669209385e+38;
                        readonly maximum: 3.402823669209385e+38;
                    };
                    readonly lat: {
                        readonly type: "number";
                        readonly format: "float";
                        readonly minimum: -3.402823669209385e+38;
                        readonly maximum: 3.402823669209385e+38;
                    };
                    readonly photo_width: {
                        readonly type: "number";
                        readonly description: "(Read-only)";
                    };
                    readonly photo_height: {
                        readonly type: "number";
                        readonly description: "(Read-only)";
                    };
                    readonly extracted_info: {
                        readonly type: "string";
                    };
                    readonly is_favourite: {
                        readonly type: "number";
                        readonly enum: readonly [0, 1];
                        readonly description: "\n\nValid values are [0,1]\n\n`1`";
                    };
                    readonly class_name: {
                        readonly type: "string";
                        readonly description: "(Read-only)";
                    };
                    readonly metadata: {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    };
                    readonly signature_data: {
                        readonly type: "object";
                        readonly description: "(Read-only)";
                        readonly properties: {
                            readonly templateSupportsSignature: {
                                readonly type: "boolean";
                                readonly description: "True if the template from which this document was produced supports signing";
                            };
                            readonly documentSnapshotUUID: {
                                readonly type: "string";
                                readonly format: "uuid";
                                readonly description: "The template mergefield snapshot which captured the unsigned document state";
                            };
                            readonly documentSnapshotExpiresUnixtime: {
                                readonly type: "number";
                                readonly description: "The unixtime at which the snapshot expires";
                            };
                            readonly signedDocumentAttachmentUUID: {
                                readonly type: "string";
                                readonly format: "uuid";
                                readonly description: "If a signed version of this document exists, references the UUID of the attachment";
                            };
                            readonly unsignedDocumentAttachmentUUID: {
                                readonly type: "string";
                                readonly format: "uuid";
                                readonly description: "References the UUID of the unsigned version of this document";
                            };
                            readonly signatureDetails: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly signatureText: {
                                        readonly type: "string";
                                        readonly description: "Text entered by the signer as the electronic representation of thier signature";
                                    };
                                    readonly signatureUnixtime: {
                                        readonly type: "number";
                                        readonly description: "Unixtime at which the document was signed";
                                    };
                                    readonly metadata: {
                                        readonly type: "object";
                                        readonly description: "Optional additional data regarding the signature event";
                                        readonly additionalProperties: true;
                                    };
                                };
                                readonly required: readonly ["signatureText", "signatureUnixtime"];
                            };
                        };
                        readonly required: readonly ["templateSupportsSignature"];
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetAttachmentSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Attachment";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "Record UUID key";
                    readonly examples: readonly ["123e4567-1d49-48ad-9fa3-21db0b95d0db"];
                };
                readonly active: {
                    readonly type: "number";
                    readonly enum: readonly [0, 1];
                    readonly default: 1;
                    readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                };
                readonly edit_date: {
                    readonly type: "string";
                    readonly readOnly: true;
                    readonly description: "Record last modified timestamp";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly related_object: {
                    readonly type: "string";
                };
                readonly related_object_uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["123e4567-46be-44bc-bba4-21db0709e07b"];
                };
                readonly attachment_name: {
                    readonly type: "string";
                };
                readonly file_type: {
                    readonly type: "string";
                };
                readonly created_by_staff_uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["123e4567-3b7e-423f-aaca-21db072afdfb"];
                };
                readonly timestamp: {
                    readonly type: "string";
                };
                readonly attachment_source: {
                    readonly type: "string";
                };
                readonly tags: {
                    readonly type: "string";
                };
                readonly lng: {
                    readonly type: "number";
                    readonly format: "float";
                    readonly minimum: -3.402823669209385e+38;
                    readonly maximum: 3.402823669209385e+38;
                };
                readonly lat: {
                    readonly type: "number";
                    readonly format: "float";
                    readonly minimum: -3.402823669209385e+38;
                    readonly maximum: 3.402823669209385e+38;
                };
                readonly photo_width: {
                    readonly type: "number";
                    readonly description: "(Read-only)";
                };
                readonly photo_height: {
                    readonly type: "number";
                    readonly description: "(Read-only)";
                };
                readonly extracted_info: {
                    readonly type: "string";
                };
                readonly is_favourite: {
                    readonly type: "number";
                    readonly enum: readonly [0, 1];
                    readonly description: "\n\nValid values are [0,1]\n\n`1`";
                };
                readonly class_name: {
                    readonly type: "string";
                    readonly description: "(Read-only)";
                };
                readonly metadata: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
                readonly signature_data: {
                    readonly type: "object";
                    readonly description: "(Read-only)";
                    readonly properties: {
                        readonly templateSupportsSignature: {
                            readonly type: "boolean";
                            readonly description: "True if the template from which this document was produced supports signing";
                        };
                        readonly documentSnapshotUUID: {
                            readonly type: "string";
                            readonly format: "uuid";
                            readonly description: "The template mergefield snapshot which captured the unsigned document state";
                        };
                        readonly documentSnapshotExpiresUnixtime: {
                            readonly type: "number";
                            readonly description: "The unixtime at which the snapshot expires";
                        };
                        readonly signedDocumentAttachmentUUID: {
                            readonly type: "string";
                            readonly format: "uuid";
                            readonly description: "If a signed version of this document exists, references the UUID of the attachment";
                        };
                        readonly unsignedDocumentAttachmentUUID: {
                            readonly type: "string";
                            readonly format: "uuid";
                            readonly description: "References the UUID of the unsigned version of this document";
                        };
                        readonly signatureDetails: {
                            readonly type: "object";
                            readonly properties: {
                                readonly signatureText: {
                                    readonly type: "string";
                                    readonly description: "Text entered by the signer as the electronic representation of thier signature";
                                };
                                readonly signatureUnixtime: {
                                    readonly type: "number";
                                    readonly description: "Unixtime at which the document was signed";
                                };
                                readonly metadata: {
                                    readonly type: "object";
                                    readonly description: "Optional additional data regarding the signature event";
                                    readonly additionalProperties: true;
                                };
                            };
                            readonly required: readonly ["signatureText", "signatureUnixtime"];
                        };
                    };
                    readonly required: readonly ["templateSupportsSignature"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetBadgeAll: {
    readonly response: {
        readonly "200": {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly description: "Record UUID key";
                        readonly examples: readonly ["123e4567-616d-4508-add7-21db0f9e408b"];
                    };
                    readonly active: {
                        readonly type: "number";
                        readonly enum: readonly [0, 1];
                        readonly default: 1;
                        readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                    };
                    readonly edit_date: {
                        readonly type: "string";
                        readonly readOnly: true;
                        readonly description: "Record last modified timestamp";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly name: {
                        readonly type: "string";
                        readonly description: "Badge Name";
                        readonly maxLength: 50;
                    };
                    readonly automatically_allocated: {
                        readonly type: "string";
                    };
                    readonly file_name: {
                        readonly type: "string";
                    };
                    readonly regarding_form_uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly examples: readonly ["123e4567-e7c4-45fd-b4c6-21db004e8bab"];
                    };
                    readonly regarding_asset_type_uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly examples: readonly ["123e4567-6e9b-41be-ba48-21db0150cd6b"];
                    };
                };
                readonly required: readonly ["name"];
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetBadgeSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Badge";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "Record UUID key";
                    readonly examples: readonly ["123e4567-616d-4508-add7-21db0f9e408b"];
                };
                readonly active: {
                    readonly type: "number";
                    readonly enum: readonly [0, 1];
                    readonly default: 1;
                    readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                };
                readonly edit_date: {
                    readonly type: "string";
                    readonly readOnly: true;
                    readonly description: "Record last modified timestamp";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly name: {
                    readonly type: "string";
                    readonly description: "Badge Name";
                    readonly maxLength: 50;
                };
                readonly automatically_allocated: {
                    readonly type: "string";
                };
                readonly file_name: {
                    readonly type: "string";
                };
                readonly regarding_form_uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["123e4567-e7c4-45fd-b4c6-21db004e8bab"];
                };
                readonly regarding_asset_type_uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["123e4567-6e9b-41be-ba48-21db0150cd6b"];
                };
            };
            readonly required: readonly ["name"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetCategoryAll: {
    readonly response: {
        readonly "200": {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly description: "Record UUID key";
                        readonly examples: readonly ["123e4567-0cef-48e6-a167-21db07467d0b"];
                    };
                    readonly active: {
                        readonly type: "number";
                        readonly enum: readonly [0, 1];
                        readonly default: 1;
                        readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                    };
                    readonly edit_date: {
                        readonly type: "string";
                        readonly readOnly: true;
                        readonly description: "Record last modified timestamp";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly name: {
                        readonly type: "string";
                    };
                    readonly colour: {
                        readonly type: "string";
                    };
                };
                readonly required: readonly ["name"];
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetCategorySingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Category";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "Record UUID key";
                    readonly examples: readonly ["123e4567-0cef-48e6-a167-21db07467d0b"];
                };
                readonly active: {
                    readonly type: "number";
                    readonly enum: readonly [0, 1];
                    readonly default: 1;
                    readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                };
                readonly edit_date: {
                    readonly type: "string";
                    readonly readOnly: true;
                    readonly description: "Record last modified timestamp";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly name: {
                    readonly type: "string";
                };
                readonly colour: {
                    readonly type: "string";
                };
            };
            readonly required: readonly ["name"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetCompanyAll: {
    readonly response: {
        readonly "200": {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly description: "Record UUID key";
                        readonly examples: readonly ["123e4567-afa7-4fe7-9e76-21db0657c67b"];
                    };
                    readonly active: {
                        readonly type: "number";
                        readonly enum: readonly [0, 1];
                        readonly default: 1;
                        readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                    };
                    readonly edit_date: {
                        readonly type: "string";
                        readonly readOnly: true;
                        readonly description: "Record last modified timestamp";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly name: {
                        readonly type: "string";
                        readonly maxLength: 100;
                    };
                    readonly website: {
                        readonly type: "string";
                    };
                    readonly abn_number: {
                        readonly type: "string";
                    };
                    readonly is_individual: {
                        readonly type: "string";
                    };
                    readonly address_street: {
                        readonly type: "string";
                        readonly maxLength: 500;
                    };
                    readonly address_city: {
                        readonly type: "string";
                    };
                    readonly address_state: {
                        readonly type: "string";
                    };
                    readonly address_postcode: {
                        readonly type: "string";
                    };
                    readonly address_country: {
                        readonly type: "string";
                    };
                    readonly fax_number: {
                        readonly type: "string";
                    };
                    readonly address: {
                        readonly type: "string";
                        readonly maxLength: 500;
                    };
                    readonly billing_address: {
                        readonly type: "string";
                        readonly maxLength: 500;
                    };
                    readonly badges: {
                        readonly type: "string";
                    };
                    readonly tax_rate_uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly examples: readonly ["123e4567-84a9-4609-bed1-21db0363e31b"];
                    };
                    readonly billing_attention: {
                        readonly type: "string";
                    };
                    readonly payment_terms: {
                        readonly type: "string";
                    };
                };
                readonly required: readonly ["name"];
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetCompanyContactAll: {
    readonly response: {
        readonly "200": {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly description: "Record UUID key";
                        readonly examples: readonly ["123e4567-0267-49a6-8504-21db05a64bfb"];
                    };
                    readonly active: {
                        readonly type: "number";
                        readonly enum: readonly [0, 1];
                        readonly default: 1;
                        readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                    };
                    readonly edit_date: {
                        readonly type: "string";
                        readonly readOnly: true;
                        readonly description: "Record last modified timestamp";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly company_uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly examples: readonly ["123e4567-28c1-47b2-a250-21db0788cd4b"];
                    };
                    readonly first: {
                        readonly type: "string";
                    };
                    readonly last: {
                        readonly type: "string";
                    };
                    readonly phone: {
                        readonly type: "string";
                    };
                    readonly mobile: {
                        readonly type: "string";
                    };
                    readonly email: {
                        readonly type: "string";
                        readonly format: "email";
                    };
                    readonly type: {
                        readonly type: "string";
                    };
                    readonly is_primary_contact: {
                        readonly type: "string";
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetCompanyContactSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Company Contact";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "Record UUID key";
                    readonly examples: readonly ["123e4567-0267-49a6-8504-21db05a64bfb"];
                };
                readonly active: {
                    readonly type: "number";
                    readonly enum: readonly [0, 1];
                    readonly default: 1;
                    readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                };
                readonly edit_date: {
                    readonly type: "string";
                    readonly readOnly: true;
                    readonly description: "Record last modified timestamp";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly company_uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["123e4567-28c1-47b2-a250-21db0788cd4b"];
                };
                readonly first: {
                    readonly type: "string";
                };
                readonly last: {
                    readonly type: "string";
                };
                readonly phone: {
                    readonly type: "string";
                };
                readonly mobile: {
                    readonly type: "string";
                };
                readonly email: {
                    readonly type: "string";
                    readonly format: "email";
                };
                readonly type: {
                    readonly type: "string";
                };
                readonly is_primary_contact: {
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetCompanySingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Client";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "Record UUID key";
                    readonly examples: readonly ["123e4567-afa7-4fe7-9e76-21db0657c67b"];
                };
                readonly active: {
                    readonly type: "number";
                    readonly enum: readonly [0, 1];
                    readonly default: 1;
                    readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                };
                readonly edit_date: {
                    readonly type: "string";
                    readonly readOnly: true;
                    readonly description: "Record last modified timestamp";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly name: {
                    readonly type: "string";
                    readonly maxLength: 100;
                };
                readonly website: {
                    readonly type: "string";
                };
                readonly abn_number: {
                    readonly type: "string";
                };
                readonly is_individual: {
                    readonly type: "string";
                };
                readonly address_street: {
                    readonly type: "string";
                    readonly maxLength: 500;
                };
                readonly address_city: {
                    readonly type: "string";
                };
                readonly address_state: {
                    readonly type: "string";
                };
                readonly address_postcode: {
                    readonly type: "string";
                };
                readonly address_country: {
                    readonly type: "string";
                };
                readonly fax_number: {
                    readonly type: "string";
                };
                readonly address: {
                    readonly type: "string";
                    readonly maxLength: 500;
                };
                readonly billing_address: {
                    readonly type: "string";
                    readonly maxLength: 500;
                };
                readonly badges: {
                    readonly type: "string";
                };
                readonly tax_rate_uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["123e4567-84a9-4609-bed1-21db0363e31b"];
                };
                readonly billing_attention: {
                    readonly type: "string";
                };
                readonly payment_terms: {
                    readonly type: "string";
                };
            };
            readonly required: readonly ["name"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetEmailTemplateAll: {
    readonly response: {
        readonly "200": {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly description: "Record UUID key";
                        readonly examples: readonly ["123e4567-6962-4602-966e-21db00a6b57b"];
                    };
                    readonly active: {
                        readonly type: "number";
                        readonly enum: readonly [0, 1];
                        readonly default: 1;
                        readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                    };
                    readonly edit_date: {
                        readonly type: "string";
                        readonly readOnly: true;
                        readonly description: "Record last modified timestamp";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly name: {
                        readonly type: "string";
                        readonly maxLength: 50;
                    };
                    readonly subject: {
                        readonly type: "string";
                        readonly maxLength: 100;
                    };
                    readonly message: {
                        readonly type: "string";
                        readonly maxLength: 1000;
                    };
                };
                readonly required: readonly ["name"];
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetEmailTemplateSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Email Template";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "Record UUID key";
                    readonly examples: readonly ["123e4567-6962-4602-966e-21db00a6b57b"];
                };
                readonly active: {
                    readonly type: "number";
                    readonly enum: readonly [0, 1];
                    readonly default: 1;
                    readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                };
                readonly edit_date: {
                    readonly type: "string";
                    readonly readOnly: true;
                    readonly description: "Record last modified timestamp";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly name: {
                    readonly type: "string";
                    readonly maxLength: 50;
                };
                readonly subject: {
                    readonly type: "string";
                    readonly maxLength: 100;
                };
                readonly message: {
                    readonly type: "string";
                    readonly maxLength: 1000;
                };
            };
            readonly required: readonly ["name"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetFeedbackAll: {
    readonly response: {
        readonly "200": {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly description: "Record UUID key";
                        readonly examples: readonly ["123e4567-6cdd-447b-ae0b-21db02182d7b"];
                    };
                    readonly active: {
                        readonly type: "number";
                        readonly enum: readonly [0, 1];
                        readonly default: 1;
                        readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                    };
                    readonly edit_date: {
                        readonly type: "string";
                        readonly readOnly: true;
                        readonly description: "Record last modified timestamp";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly timestamp: {
                        readonly type: "string";
                    };
                    readonly related_object: {
                        readonly type: "string";
                    };
                    readonly related_object_uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly examples: readonly ["123e4567-8d79-4d4d-8a6b-21db0dedc92b"];
                    };
                    readonly rating: {
                        readonly type: "string";
                    };
                    readonly comment: {
                        readonly type: "string";
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetFeedbackSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Feedback";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "Record UUID key";
                    readonly examples: readonly ["123e4567-6cdd-447b-ae0b-21db02182d7b"];
                };
                readonly active: {
                    readonly type: "number";
                    readonly enum: readonly [0, 1];
                    readonly default: 1;
                    readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                };
                readonly edit_date: {
                    readonly type: "string";
                    readonly readOnly: true;
                    readonly description: "Record last modified timestamp";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly timestamp: {
                    readonly type: "string";
                };
                readonly related_object: {
                    readonly type: "string";
                };
                readonly related_object_uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["123e4567-8d79-4d4d-8a6b-21db0dedc92b"];
                };
                readonly rating: {
                    readonly type: "string";
                };
                readonly comment: {
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetFormAll: {
    readonly response: {
        readonly "200": {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly description: "Record UUID key";
                        readonly examples: readonly ["123e4567-e417-4322-a5db-21db05dc729b"];
                    };
                    readonly active: {
                        readonly type: "number";
                        readonly enum: readonly [0, 1];
                        readonly default: 1;
                        readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                    };
                    readonly edit_date: {
                        readonly type: "string";
                        readonly readOnly: true;
                        readonly description: "Record last modified timestamp";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly name: {
                        readonly type: "string";
                    };
                    readonly document_template_uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly examples: readonly ["123e4567-b2a1-4a31-8c2a-21db0c26314b"];
                    };
                    readonly can_be_used_independently: {
                        readonly type: "string";
                    };
                    readonly badge_mandatory_state: {
                        readonly type: "string";
                    };
                    readonly template_fields: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "object";
                            readonly properties: {
                                readonly name: {
                                    readonly type: "string";
                                };
                                readonly fieldType: {
                                    readonly type: "string";
                                    readonly enum: readonly ["Text"];
                                    readonly description: "`Text`";
                                };
                                readonly value: {
                                    readonly type: "string";
                                };
                                readonly sortOrder: {
                                    readonly type: "integer";
                                };
                            };
                            readonly required: readonly ["name", "fieldType", "value", "sortOrder"];
                        };
                        readonly minItems: 0;
                        readonly maxItems: 10;
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetFormFieldAll: {
    readonly response: {
        readonly "200": {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly description: "Record UUID key";
                        readonly examples: readonly ["123e4567-302c-4282-8700-21db0d1cf58b"];
                    };
                    readonly active: {
                        readonly type: "number";
                        readonly enum: readonly [0, 1];
                        readonly default: 1;
                        readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                    };
                    readonly edit_date: {
                        readonly type: "string";
                        readonly readOnly: true;
                        readonly description: "Record last modified timestamp";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly form_uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly examples: readonly ["123e4567-5bba-4a01-8532-21db0e34afab"];
                    };
                    readonly name: {
                        readonly type: "string";
                    };
                    readonly field_data_json: {
                        readonly type: "string";
                    };
                    readonly sort_order: {
                        readonly type: "string";
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetFormFieldSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Form Field";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "Record UUID key";
                    readonly examples: readonly ["123e4567-302c-4282-8700-21db0d1cf58b"];
                };
                readonly active: {
                    readonly type: "number";
                    readonly enum: readonly [0, 1];
                    readonly default: 1;
                    readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                };
                readonly edit_date: {
                    readonly type: "string";
                    readonly readOnly: true;
                    readonly description: "Record last modified timestamp";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly form_uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["123e4567-5bba-4a01-8532-21db0e34afab"];
                };
                readonly name: {
                    readonly type: "string";
                };
                readonly field_data_json: {
                    readonly type: "string";
                };
                readonly sort_order: {
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetFormResponseAll: {
    readonly response: {
        readonly "200": {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly description: "Record UUID key";
                        readonly examples: readonly ["123e4567-cd8d-4b1b-99b8-21db0309053b"];
                    };
                    readonly active: {
                        readonly type: "number";
                        readonly enum: readonly [0, 1];
                        readonly default: 1;
                        readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                    };
                    readonly edit_date: {
                        readonly type: "string";
                        readonly readOnly: true;
                        readonly description: "Record last modified timestamp";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly form_uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly examples: readonly ["123e4567-fc29-4d4e-82fd-21db0b08afab"];
                    };
                    readonly staff_uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly examples: readonly ["123e4567-8fa0-4598-9f69-21db0b8234db"];
                    };
                    readonly regarding_object: {
                        readonly type: "string";
                    };
                    readonly regarding_object_uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly examples: readonly ["123e4567-310a-4d16-ac03-21db01f038fb"];
                    };
                    readonly field_data: {
                        readonly type: "string";
                    };
                    readonly timestamp: {
                        readonly type: "string";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly form_by_staff_uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly examples: readonly ["123e4567-e191-4444-a1d5-21db0e424fbb"];
                    };
                    readonly document_attachment_uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly examples: readonly ["123e4567-152a-43f6-bfae-21db085b041b"];
                    };
                    readonly asset_uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly examples: readonly ["123e4567-7077-4fb9-af4d-21db0845693b"];
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetFormResponseSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Form Response";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "Record UUID key";
                    readonly examples: readonly ["123e4567-cd8d-4b1b-99b8-21db0309053b"];
                };
                readonly active: {
                    readonly type: "number";
                    readonly enum: readonly [0, 1];
                    readonly default: 1;
                    readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                };
                readonly edit_date: {
                    readonly type: "string";
                    readonly readOnly: true;
                    readonly description: "Record last modified timestamp";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly form_uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["123e4567-fc29-4d4e-82fd-21db0b08afab"];
                };
                readonly staff_uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["123e4567-8fa0-4598-9f69-21db0b8234db"];
                };
                readonly regarding_object: {
                    readonly type: "string";
                };
                readonly regarding_object_uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["123e4567-310a-4d16-ac03-21db01f038fb"];
                };
                readonly field_data: {
                    readonly type: "string";
                };
                readonly timestamp: {
                    readonly type: "string";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly form_by_staff_uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["123e4567-e191-4444-a1d5-21db0e424fbb"];
                };
                readonly document_attachment_uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["123e4567-152a-43f6-bfae-21db085b041b"];
                };
                readonly asset_uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["123e4567-7077-4fb9-af4d-21db0845693b"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetFormSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Form";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "Record UUID key";
                    readonly examples: readonly ["123e4567-e417-4322-a5db-21db05dc729b"];
                };
                readonly active: {
                    readonly type: "number";
                    readonly enum: readonly [0, 1];
                    readonly default: 1;
                    readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                };
                readonly edit_date: {
                    readonly type: "string";
                    readonly readOnly: true;
                    readonly description: "Record last modified timestamp";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly name: {
                    readonly type: "string";
                };
                readonly document_template_uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["123e4567-b2a1-4a31-8c2a-21db0c26314b"];
                };
                readonly can_be_used_independently: {
                    readonly type: "string";
                };
                readonly badge_mandatory_state: {
                    readonly type: "string";
                };
                readonly template_fields: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly name: {
                                readonly type: "string";
                            };
                            readonly fieldType: {
                                readonly type: "string";
                                readonly enum: readonly ["Text"];
                                readonly description: "`Text`";
                            };
                            readonly value: {
                                readonly type: "string";
                            };
                            readonly sortOrder: {
                                readonly type: "integer";
                            };
                        };
                        readonly required: readonly ["name", "fieldType", "value", "sortOrder"];
                    };
                    readonly minItems: 0;
                    readonly maxItems: 10;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetJobActivityAll: {
    readonly response: {
        readonly "200": {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly description: "Record UUID key";
                        readonly examples: readonly ["123e4567-6070-4258-bd53-21db0f0c845b"];
                    };
                    readonly active: {
                        readonly type: "number";
                        readonly enum: readonly [0, 1];
                        readonly default: 1;
                        readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                    };
                    readonly edit_date: {
                        readonly type: "string";
                        readonly readOnly: true;
                        readonly description: "Record last modified timestamp";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly job_uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly examples: readonly ["123e4567-63cf-4527-9f56-21db088bd0ab"];
                    };
                    readonly staff_uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly examples: readonly ["123e4567-5e9d-4161-b1f3-21db086bd9db"];
                    };
                    readonly start_date: {
                        readonly type: "string";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly end_date: {
                        readonly type: "string";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly activity_was_scheduled: {
                        readonly type: "string";
                    };
                    readonly activity_was_recorded: {
                        readonly type: "string";
                    };
                    readonly activity_was_automated: {
                        readonly type: "string";
                    };
                    readonly has_been_opened: {
                        readonly type: "string";
                    };
                    readonly has_been_opened_timestamp: {
                        readonly type: "string";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly travel_time_in_seconds: {
                        readonly type: "string";
                    };
                    readonly travel_distance_in_meters: {
                        readonly type: "string";
                    };
                    readonly allocated_by_staff_uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly examples: readonly ["123e4567-7276-4c2d-b206-21db0bfddddb"];
                    };
                    readonly allocated_timestamp: {
                        readonly type: "string";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly material_uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly examples: readonly ["123e4567-8484-4411-868b-21db075c5e6b"];
                    };
                    readonly edit_by_staff_uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly readOnly: true;
                        readonly description: "Staff Member who last modified record";
                        readonly examples: readonly ["123e4567-6c64-4a73-bce1-21db0729220b"];
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetJobActivitySingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Job Activity";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "Record UUID key";
                    readonly examples: readonly ["123e4567-6070-4258-bd53-21db0f0c845b"];
                };
                readonly active: {
                    readonly type: "number";
                    readonly enum: readonly [0, 1];
                    readonly default: 1;
                    readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                };
                readonly edit_date: {
                    readonly type: "string";
                    readonly readOnly: true;
                    readonly description: "Record last modified timestamp";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly job_uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["123e4567-63cf-4527-9f56-21db088bd0ab"];
                };
                readonly staff_uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["123e4567-5e9d-4161-b1f3-21db086bd9db"];
                };
                readonly start_date: {
                    readonly type: "string";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly end_date: {
                    readonly type: "string";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly activity_was_scheduled: {
                    readonly type: "string";
                };
                readonly activity_was_recorded: {
                    readonly type: "string";
                };
                readonly activity_was_automated: {
                    readonly type: "string";
                };
                readonly has_been_opened: {
                    readonly type: "string";
                };
                readonly has_been_opened_timestamp: {
                    readonly type: "string";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly travel_time_in_seconds: {
                    readonly type: "string";
                };
                readonly travel_distance_in_meters: {
                    readonly type: "string";
                };
                readonly allocated_by_staff_uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["123e4567-7276-4c2d-b206-21db0bfddddb"];
                };
                readonly allocated_timestamp: {
                    readonly type: "string";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly material_uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["123e4567-8484-4411-868b-21db075c5e6b"];
                };
                readonly edit_by_staff_uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly readOnly: true;
                    readonly description: "Staff Member who last modified record";
                    readonly examples: readonly ["123e4567-6c64-4a73-bce1-21db0729220b"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetJobAll: {
    readonly response: {
        readonly "200": {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly description: "Record UUID key";
                        readonly examples: readonly ["123e4567-e539-40c9-9ea4-21db0343830b"];
                    };
                    readonly active: {
                        readonly type: "number";
                        readonly enum: readonly [0, 1];
                        readonly default: 1;
                        readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                    };
                    readonly edit_date: {
                        readonly type: "string";
                        readonly readOnly: true;
                        readonly description: "Record last modified timestamp";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly created_by_staff_uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly examples: readonly ["123e4567-a9e9-4e78-8910-21db08c02ecb"];
                    };
                    readonly date: {
                        readonly type: "string";
                        readonly examples: readonly ["YYYY-MM-DD"];
                    };
                    readonly company_uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly examples: readonly ["123e4567-41fc-4af5-aca5-21db07bc319b"];
                    };
                    readonly job_address: {
                        readonly type: "string";
                        readonly maxLength: 500;
                    };
                    readonly billing_address: {
                        readonly type: "string";
                        readonly maxLength: 500;
                    };
                    readonly status: {
                        readonly type: "string";
                    };
                    readonly job_description: {
                        readonly type: "string";
                    };
                    readonly work_done_description: {
                        readonly type: "string";
                    };
                    readonly lng: {
                        readonly type: "number";
                        readonly format: "float";
                        readonly minimum: -3.402823669209385e+38;
                        readonly maximum: 3.402823669209385e+38;
                    };
                    readonly lat: {
                        readonly type: "number";
                        readonly format: "float";
                        readonly minimum: -3.402823669209385e+38;
                        readonly maximum: 3.402823669209385e+38;
                    };
                    readonly generated_job_id: {
                        readonly type: "string";
                        readonly description: "(Read-only)";
                    };
                    readonly payment_date: {
                        readonly type: "string";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly payment_actioned_by_uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly examples: readonly ["123e4567-a547-45ae-a094-21db03087d5b"];
                    };
                    readonly payment_method: {
                        readonly type: "string";
                    };
                    readonly payment_amount: {
                        readonly type: "string";
                    };
                    readonly total_invoice_amount: {
                        readonly type: "string";
                    };
                    readonly category_uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly examples: readonly ["123e4567-af18-4701-8d91-21db0f31e1db"];
                    };
                    readonly payment_note: {
                        readonly type: "string";
                    };
                    readonly geo_is_valid: {
                        readonly type: "string";
                    };
                    readonly purchase_order_number: {
                        readonly type: "string";
                        readonly maxLength: 100;
                    };
                    readonly invoice_sent: {
                        readonly type: "string";
                    };
                    readonly invoice_sent_stamp: {
                        readonly type: "string";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly ready_to_invoice: {
                        readonly type: "string";
                    };
                    readonly ready_to_invoice_stamp: {
                        readonly type: "string";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly payment_processed: {
                        readonly type: "string";
                    };
                    readonly payment_processed_stamp: {
                        readonly type: "string";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly geo_country: {
                        readonly type: "string";
                    };
                    readonly geo_postcode: {
                        readonly type: "string";
                    };
                    readonly geo_state: {
                        readonly type: "string";
                    };
                    readonly geo_city: {
                        readonly type: "string";
                    };
                    readonly geo_street: {
                        readonly type: "string";
                    };
                    readonly geo_number: {
                        readonly type: "string";
                    };
                    readonly queue_uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly examples: readonly ["123e4567-1500-485b-93bb-21db07f210eb"];
                    };
                    readonly queue_expiry_date: {
                        readonly type: "string";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly queue_assigned_staff_uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly examples: readonly ["123e4567-f641-4a0e-961e-21db0624c4fb"];
                    };
                    readonly payment_received: {
                        readonly type: "string";
                    };
                    readonly payment_received_stamp: {
                        readonly type: "string";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly badges: {
                        readonly type: "string";
                    };
                    readonly quote_date: {
                        readonly type: "string";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly quote_sent: {
                        readonly type: "number";
                        readonly description: "(Read-only). \n\nValid values are [0,1]\n\n`1`";
                        readonly enum: readonly [0, 1];
                    };
                    readonly quote_sent_stamp: {
                        readonly type: "string";
                        readonly description: "(Read-only)";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly work_order_date: {
                        readonly type: "string";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly completion_date: {
                        readonly type: "string";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly completion_actioned_by_uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly examples: readonly ["123e4567-15c5-4ea0-8a01-21db005dfc8b"];
                    };
                    readonly unsuccessful_date: {
                        readonly type: "string";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly job_is_scheduled_until_stamp: {
                        readonly type: "string";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly active_network_request_uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly examples: readonly ["123e4567-7620-454e-95ca-21db008d0cab"];
                    };
                    readonly related_knowledge_articles: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "object";
                            readonly properties: {
                                readonly knowledge_article_uuid: {
                                    readonly type: "string";
                                    readonly format: "uuid";
                                };
                                readonly relevance: {
                                    readonly type: "number";
                                };
                            };
                            readonly required: readonly ["knowledge_article_uuid", "relevance"];
                        };
                    };
                };
                readonly required: readonly ["status"];
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetJobAllocationAll: {
    readonly response: {
        readonly "200": {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly description: "Record UUID key";
                        readonly examples: readonly ["123e4567-6b51-4ec2-a1ac-21db0e0c1efb"];
                    };
                    readonly active: {
                        readonly type: "number";
                        readonly enum: readonly [0, 1];
                        readonly default: 1;
                        readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                    };
                    readonly edit_date: {
                        readonly type: "string";
                        readonly readOnly: true;
                        readonly description: "Record last modified timestamp";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly job_uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly examples: readonly ["123e4567-6bd2-4182-a569-21db0eb3202b"];
                    };
                    readonly queue_uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly examples: readonly ["123e4567-b20b-4fa8-917f-21db086b0c4b"];
                    };
                    readonly staff_uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly examples: readonly ["123e4567-27f6-4c77-8f39-21db01c8e6eb"];
                    };
                    readonly allocation_date: {
                        readonly type: "string";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly allocation_window_uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly examples: readonly ["123e4567-46a9-4c37-abfc-21db06e33b4b"];
                    };
                    readonly allocated_by_staff_uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly examples: readonly ["123e4567-5787-4324-ae63-21db0c48bb0b"];
                    };
                    readonly allocated_timestamp: {
                        readonly type: "string";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly expiry_timestamp: {
                        readonly type: "string";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly read_timestamp: {
                        readonly type: "string";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly completion_timestamp: {
                        readonly type: "string";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly estimated_duration: {
                        readonly type: "string";
                    };
                    readonly revised_duration: {
                        readonly type: "string";
                    };
                    readonly sort_priority: {
                        readonly type: "string";
                    };
                    readonly requires_acceptance: {
                        readonly type: "string";
                    };
                    readonly acceptance_status: {
                        readonly type: "string";
                    };
                    readonly acceptance_timestamp: {
                        readonly type: "string";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetJobAllocationSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Job Allocation";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "Record UUID key";
                    readonly examples: readonly ["123e4567-6b51-4ec2-a1ac-21db0e0c1efb"];
                };
                readonly active: {
                    readonly type: "number";
                    readonly enum: readonly [0, 1];
                    readonly default: 1;
                    readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                };
                readonly edit_date: {
                    readonly type: "string";
                    readonly readOnly: true;
                    readonly description: "Record last modified timestamp";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly job_uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["123e4567-6bd2-4182-a569-21db0eb3202b"];
                };
                readonly queue_uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["123e4567-b20b-4fa8-917f-21db086b0c4b"];
                };
                readonly staff_uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["123e4567-27f6-4c77-8f39-21db01c8e6eb"];
                };
                readonly allocation_date: {
                    readonly type: "string";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly allocation_window_uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["123e4567-46a9-4c37-abfc-21db06e33b4b"];
                };
                readonly allocated_by_staff_uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["123e4567-5787-4324-ae63-21db0c48bb0b"];
                };
                readonly allocated_timestamp: {
                    readonly type: "string";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly expiry_timestamp: {
                    readonly type: "string";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly read_timestamp: {
                    readonly type: "string";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly completion_timestamp: {
                    readonly type: "string";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly estimated_duration: {
                    readonly type: "string";
                };
                readonly revised_duration: {
                    readonly type: "string";
                };
                readonly sort_priority: {
                    readonly type: "string";
                };
                readonly requires_acceptance: {
                    readonly type: "string";
                };
                readonly acceptance_status: {
                    readonly type: "string";
                };
                readonly acceptance_timestamp: {
                    readonly type: "string";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetJobChecklistAll: {
    readonly response: {
        readonly "200": {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly description: "Record UUID key";
                        readonly examples: readonly ["123e4567-72e6-47d1-b2ef-21db0ae2678b"];
                    };
                    readonly active: {
                        readonly type: "number";
                        readonly enum: readonly [0, 1];
                        readonly default: 1;
                        readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                    };
                    readonly edit_date: {
                        readonly type: "string";
                        readonly readOnly: true;
                        readonly description: "Record last modified timestamp";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly job_uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly examples: readonly ["123e4567-c767-4fd5-bcec-21db07cf1b7b"];
                    };
                    readonly name: {
                        readonly type: "string";
                        readonly maxLength: 256;
                    };
                    readonly section_name: {
                        readonly type: "string";
                        readonly maxLength: 256;
                    };
                    readonly item_type: {
                        readonly type: "string";
                    };
                    readonly sort_order: {
                        readonly type: "number";
                    };
                    readonly completed_timestamp: {
                        readonly type: "string";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly completed_by_staff_uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly examples: readonly ["123e4567-a6a9-4ebb-8fce-21db0fdc5f4b"];
                    };
                    readonly completed_during_checkin_uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly examples: readonly ["123e4567-8c52-4797-9918-21db0c7a9c4b"];
                    };
                    readonly reminder_type: {
                        readonly type: "string";
                    };
                    readonly reminder_data: {
                        readonly type: "object";
                        readonly anyOf: readonly [{
                            readonly required: readonly ["absoluteDateTime"];
                            readonly properties: {
                                readonly absoluteDateTime: {
                                    readonly type: "string";
                                    readonly pattern: "^\\d{4}-\\d{2}-\\d{2}\\ \\d{2}:\\d{2}:\\d{2}$";
                                };
                                readonly relativeDateTime: {
                                    readonly type: "object";
                                    readonly required: readonly ["baseDate", "unit", "quantity"];
                                    readonly properties: {
                                        readonly baseDate: {
                                            readonly type: "string";
                                            readonly enum: readonly ["JOB_CREATE_TIME", "NEXT_BOOKING_TIME"];
                                            readonly description: "`JOB_CREATE_TIME` `NEXT_BOOKING_TIME`";
                                        };
                                        readonly unit: {
                                            readonly type: "string";
                                            readonly enum: readonly ["DAY", "HOUR", "MINUTE"];
                                            readonly description: "`DAY` `HOUR` `MINUTE`";
                                        };
                                        readonly quantity: {
                                            readonly type: "integer";
                                            readonly description: "Number of units to add/subtract from base date. Negative quantities mean the reminder occurs before the base date. Reminders scheduled into the past will not occur.";
                                        };
                                    };
                                };
                            };
                            readonly type: "object";
                        }, {
                            readonly required: readonly ["relativeDateTime"];
                            readonly properties: {
                                readonly absoluteDateTime: {
                                    readonly type: "string";
                                    readonly pattern: "^\\d{4}-\\d{2}-\\d{2}\\ \\d{2}:\\d{2}:\\d{2}$";
                                };
                                readonly relativeDateTime: {
                                    readonly type: "object";
                                    readonly required: readonly ["baseDate", "unit", "quantity"];
                                    readonly properties: {
                                        readonly baseDate: {
                                            readonly type: "string";
                                            readonly enum: readonly ["JOB_CREATE_TIME", "NEXT_BOOKING_TIME"];
                                            readonly description: "`JOB_CREATE_TIME` `NEXT_BOOKING_TIME`";
                                        };
                                        readonly unit: {
                                            readonly type: "string";
                                            readonly enum: readonly ["DAY", "HOUR", "MINUTE"];
                                            readonly description: "`DAY` `HOUR` `MINUTE`";
                                        };
                                        readonly quantity: {
                                            readonly type: "integer";
                                            readonly description: "Number of units to add/subtract from base date. Negative quantities mean the reminder occurs before the base date. Reminders scheduled into the past will not occur.";
                                        };
                                    };
                                };
                            };
                            readonly type: "object";
                        }, {
                            readonly not: {
                                readonly anyOf: readonly [{
                                    readonly anyOf: readonly [{
                                        readonly required: readonly ["absoluteDateTime"];
                                    }, {
                                        readonly required: readonly ["relativeDateTime"];
                                    }];
                                }];
                            };
                            readonly properties: {
                                readonly absoluteDateTime: {
                                    readonly type: "string";
                                    readonly pattern: "^\\d{4}-\\d{2}-\\d{2}\\ \\d{2}:\\d{2}:\\d{2}$";
                                };
                                readonly relativeDateTime: {
                                    readonly type: "object";
                                    readonly required: readonly ["baseDate", "unit", "quantity"];
                                    readonly properties: {
                                        readonly baseDate: {
                                            readonly type: "string";
                                            readonly enum: readonly ["JOB_CREATE_TIME", "NEXT_BOOKING_TIME"];
                                            readonly description: "`JOB_CREATE_TIME` `NEXT_BOOKING_TIME`";
                                        };
                                        readonly unit: {
                                            readonly type: "string";
                                            readonly enum: readonly ["DAY", "HOUR", "MINUTE"];
                                            readonly description: "`DAY` `HOUR` `MINUTE`";
                                        };
                                        readonly quantity: {
                                            readonly type: "integer";
                                            readonly description: "Number of units to add/subtract from base date. Negative quantities mean the reminder occurs before the base date. Reminders scheduled into the past will not occur.";
                                        };
                                    };
                                };
                            };
                            readonly type: "object";
                        }];
                    };
                    readonly regarding_object: {
                        readonly type: "string";
                        readonly description: "The type of object which this checklist item is related to. For example, for Form checklists, this will be 'Form'.";
                    };
                    readonly regarding_object_uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly description: "The UUID of the object which this checklists item is related to. For example, for Form checklists, this is the UUID of the Form that must be completed to complete the checklist item.";
                        readonly examples: readonly ["123e4567-05ae-4e64-bcef-21db0da92c1b"];
                    };
                    readonly fulfilled_by_object_name: {
                        readonly type: "string";
                        readonly description: "The type of object which completes this checklist item. For example, for Form checklists, this will be 'FormResponse'.";
                    };
                    readonly fulfilled_by_object_uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly description: "The UUID of the object which completes this checklist item. For example, for Form checklists, this references the UUID of a FormResponse record.";
                        readonly examples: readonly ["123e4567-c68a-4428-bfb7-21db07ab814b"];
                    };
                    readonly assigned_to_staff_uuids: {
                        readonly type: "array";
                        readonly format: "uuid";
                        readonly items: {
                            readonly type: "string";
                            readonly pattern: "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$";
                            readonly description: "Must be the UUID of a Staff record";
                        };
                        readonly maxItems: 1;
                        readonly examples: readonly ["123e4567-acbf-4b7c-b79f-21db0f9a428b"];
                    };
                    readonly is_locked: {
                        readonly type: "number";
                        readonly description: "The UUID of the object which completes this checklist item. For example, for Form checklists, this references the UUID of a FormResponse record. (Read-only). \n\nValid values are [0,1]\n\n`1`";
                        readonly enum: readonly [0, 1];
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetJobChecklistSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Job Checklist";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "Record UUID key";
                    readonly examples: readonly ["123e4567-72e6-47d1-b2ef-21db0ae2678b"];
                };
                readonly active: {
                    readonly type: "number";
                    readonly enum: readonly [0, 1];
                    readonly default: 1;
                    readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                };
                readonly edit_date: {
                    readonly type: "string";
                    readonly readOnly: true;
                    readonly description: "Record last modified timestamp";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly job_uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["123e4567-c767-4fd5-bcec-21db07cf1b7b"];
                };
                readonly name: {
                    readonly type: "string";
                    readonly maxLength: 256;
                };
                readonly section_name: {
                    readonly type: "string";
                    readonly maxLength: 256;
                };
                readonly item_type: {
                    readonly type: "string";
                };
                readonly sort_order: {
                    readonly type: "number";
                };
                readonly completed_timestamp: {
                    readonly type: "string";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly completed_by_staff_uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["123e4567-a6a9-4ebb-8fce-21db0fdc5f4b"];
                };
                readonly completed_during_checkin_uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["123e4567-8c52-4797-9918-21db0c7a9c4b"];
                };
                readonly reminder_type: {
                    readonly type: "string";
                };
                readonly reminder_data: {
                    readonly type: "object";
                    readonly anyOf: readonly [{
                        readonly required: readonly ["absoluteDateTime"];
                        readonly properties: {
                            readonly absoluteDateTime: {
                                readonly type: "string";
                                readonly pattern: "^\\d{4}-\\d{2}-\\d{2}\\ \\d{2}:\\d{2}:\\d{2}$";
                            };
                            readonly relativeDateTime: {
                                readonly type: "object";
                                readonly required: readonly ["baseDate", "unit", "quantity"];
                                readonly properties: {
                                    readonly baseDate: {
                                        readonly type: "string";
                                        readonly enum: readonly ["JOB_CREATE_TIME", "NEXT_BOOKING_TIME"];
                                        readonly description: "`JOB_CREATE_TIME` `NEXT_BOOKING_TIME`";
                                    };
                                    readonly unit: {
                                        readonly type: "string";
                                        readonly enum: readonly ["DAY", "HOUR", "MINUTE"];
                                        readonly description: "`DAY` `HOUR` `MINUTE`";
                                    };
                                    readonly quantity: {
                                        readonly type: "integer";
                                        readonly description: "Number of units to add/subtract from base date. Negative quantities mean the reminder occurs before the base date. Reminders scheduled into the past will not occur.";
                                    };
                                };
                            };
                        };
                        readonly type: "object";
                    }, {
                        readonly required: readonly ["relativeDateTime"];
                        readonly properties: {
                            readonly absoluteDateTime: {
                                readonly type: "string";
                                readonly pattern: "^\\d{4}-\\d{2}-\\d{2}\\ \\d{2}:\\d{2}:\\d{2}$";
                            };
                            readonly relativeDateTime: {
                                readonly type: "object";
                                readonly required: readonly ["baseDate", "unit", "quantity"];
                                readonly properties: {
                                    readonly baseDate: {
                                        readonly type: "string";
                                        readonly enum: readonly ["JOB_CREATE_TIME", "NEXT_BOOKING_TIME"];
                                        readonly description: "`JOB_CREATE_TIME` `NEXT_BOOKING_TIME`";
                                    };
                                    readonly unit: {
                                        readonly type: "string";
                                        readonly enum: readonly ["DAY", "HOUR", "MINUTE"];
                                        readonly description: "`DAY` `HOUR` `MINUTE`";
                                    };
                                    readonly quantity: {
                                        readonly type: "integer";
                                        readonly description: "Number of units to add/subtract from base date. Negative quantities mean the reminder occurs before the base date. Reminders scheduled into the past will not occur.";
                                    };
                                };
                            };
                        };
                        readonly type: "object";
                    }, {
                        readonly not: {
                            readonly anyOf: readonly [{
                                readonly anyOf: readonly [{
                                    readonly required: readonly ["absoluteDateTime"];
                                }, {
                                    readonly required: readonly ["relativeDateTime"];
                                }];
                            }];
                        };
                        readonly properties: {
                            readonly absoluteDateTime: {
                                readonly type: "string";
                                readonly pattern: "^\\d{4}-\\d{2}-\\d{2}\\ \\d{2}:\\d{2}:\\d{2}$";
                            };
                            readonly relativeDateTime: {
                                readonly type: "object";
                                readonly required: readonly ["baseDate", "unit", "quantity"];
                                readonly properties: {
                                    readonly baseDate: {
                                        readonly type: "string";
                                        readonly enum: readonly ["JOB_CREATE_TIME", "NEXT_BOOKING_TIME"];
                                        readonly description: "`JOB_CREATE_TIME` `NEXT_BOOKING_TIME`";
                                    };
                                    readonly unit: {
                                        readonly type: "string";
                                        readonly enum: readonly ["DAY", "HOUR", "MINUTE"];
                                        readonly description: "`DAY` `HOUR` `MINUTE`";
                                    };
                                    readonly quantity: {
                                        readonly type: "integer";
                                        readonly description: "Number of units to add/subtract from base date. Negative quantities mean the reminder occurs before the base date. Reminders scheduled into the past will not occur.";
                                    };
                                };
                            };
                        };
                        readonly type: "object";
                    }];
                };
                readonly regarding_object: {
                    readonly type: "string";
                    readonly description: "The type of object which this checklist item is related to. For example, for Form checklists, this will be 'Form'.";
                };
                readonly regarding_object_uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "The UUID of the object which this checklists item is related to. For example, for Form checklists, this is the UUID of the Form that must be completed to complete the checklist item.";
                    readonly examples: readonly ["123e4567-05ae-4e64-bcef-21db0da92c1b"];
                };
                readonly fulfilled_by_object_name: {
                    readonly type: "string";
                    readonly description: "The type of object which completes this checklist item. For example, for Form checklists, this will be 'FormResponse'.";
                };
                readonly fulfilled_by_object_uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "The UUID of the object which completes this checklist item. For example, for Form checklists, this references the UUID of a FormResponse record.";
                    readonly examples: readonly ["123e4567-c68a-4428-bfb7-21db07ab814b"];
                };
                readonly assigned_to_staff_uuids: {
                    readonly type: "array";
                    readonly format: "uuid";
                    readonly items: {
                        readonly type: "string";
                        readonly pattern: "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$";
                        readonly description: "Must be the UUID of a Staff record";
                    };
                    readonly maxItems: 1;
                    readonly examples: readonly ["123e4567-acbf-4b7c-b79f-21db0f9a428b"];
                };
                readonly is_locked: {
                    readonly type: "number";
                    readonly description: "The UUID of the object which completes this checklist item. For example, for Form checklists, this references the UUID of a FormResponse record. (Read-only). \n\nValid values are [0,1]\n\n`1`";
                    readonly enum: readonly [0, 1];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetJobContactAll: {
    readonly response: {
        readonly "200": {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly description: "Record UUID key";
                        readonly examples: readonly ["123e4567-8ce0-40af-a8d2-21db0c177cdb"];
                    };
                    readonly active: {
                        readonly type: "number";
                        readonly enum: readonly [0, 1];
                        readonly default: 1;
                        readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                    };
                    readonly edit_date: {
                        readonly type: "string";
                        readonly readOnly: true;
                        readonly description: "Record last modified timestamp";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly job_uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly examples: readonly ["123e4567-d182-4864-891a-21db01d84a6b"];
                    };
                    readonly first: {
                        readonly type: "string";
                    };
                    readonly last: {
                        readonly type: "string";
                    };
                    readonly phone: {
                        readonly type: "string";
                    };
                    readonly mobile: {
                        readonly type: "string";
                    };
                    readonly email: {
                        readonly type: "string";
                        readonly format: "email";
                    };
                    readonly type: {
                        readonly type: "string";
                    };
                    readonly is_primary_contact: {
                        readonly type: "string";
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetJobContactSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Job Contact";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "Record UUID key";
                    readonly examples: readonly ["123e4567-8ce0-40af-a8d2-21db0c177cdb"];
                };
                readonly active: {
                    readonly type: "number";
                    readonly enum: readonly [0, 1];
                    readonly default: 1;
                    readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                };
                readonly edit_date: {
                    readonly type: "string";
                    readonly readOnly: true;
                    readonly description: "Record last modified timestamp";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly job_uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["123e4567-d182-4864-891a-21db01d84a6b"];
                };
                readonly first: {
                    readonly type: "string";
                };
                readonly last: {
                    readonly type: "string";
                };
                readonly phone: {
                    readonly type: "string";
                };
                readonly mobile: {
                    readonly type: "string";
                };
                readonly email: {
                    readonly type: "string";
                    readonly format: "email";
                };
                readonly type: {
                    readonly type: "string";
                };
                readonly is_primary_contact: {
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetJobMaterialAll: {
    readonly response: {
        readonly "200": {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly description: "Record UUID key";
                        readonly examples: readonly ["123e4567-b4c6-4f01-adc1-21db0b4011fb"];
                    };
                    readonly active: {
                        readonly type: "number";
                        readonly enum: readonly [0, 1];
                        readonly default: 1;
                        readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                    };
                    readonly edit_date: {
                        readonly type: "string";
                        readonly readOnly: true;
                        readonly description: "Record last modified timestamp";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly job_uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly examples: readonly ["123e4567-da04-4cb5-95d9-21db06f13f9b"];
                    };
                    readonly material_uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly examples: readonly ["123e4567-22f9-43b2-a08b-21db0504683b"];
                    };
                    readonly name: {
                        readonly type: "string";
                    };
                    readonly quantity: {
                        readonly type: "string";
                    };
                    readonly price: {
                        readonly type: "string";
                    };
                    readonly displayed_amount: {
                        readonly type: "string";
                    };
                    readonly displayed_amount_is_tax_inclusive: {
                        readonly type: "string";
                    };
                    readonly tax_rate_uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly examples: readonly ["123e4567-d779-4fda-98a6-21db03e3173b"];
                    };
                    readonly sort_order: {
                        readonly type: "string";
                    };
                    readonly cost: {
                        readonly type: "string";
                    };
                    readonly displayed_cost: {
                        readonly type: "string";
                    };
                    readonly job_material_bundle_uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly description: "UUID of a JobMaterialBundle which this JobMaterial belongs to. The default value is blank, which means that the JobMaterial is not part of a JobMaterialBundle.";
                        readonly examples: readonly ["123e4567-46a5-4804-86c7-21db014fd21b"];
                    };
                };
                readonly required: readonly ["quantity"];
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetJobMaterialBundleAll: {
    readonly response: {
        readonly "200": {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly description: "Record UUID key";
                        readonly examples: readonly ["123e4567-8009-4301-adcb-21db00d8b3bb"];
                    };
                    readonly active: {
                        readonly type: "number";
                        readonly enum: readonly [0, 1];
                        readonly default: 1;
                        readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                    };
                    readonly edit_date: {
                        readonly type: "string";
                        readonly readOnly: true;
                        readonly description: "Record last modified timestamp";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly item_number: {
                        readonly type: "string";
                    };
                    readonly name: {
                        readonly type: "string";
                    };
                    readonly quantity: {
                        readonly type: "string";
                    };
                    readonly sort_order: {
                        readonly type: "number";
                    };
                    readonly material_bundle_uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly description: "UUID of the MaterialBundle which this JobMaterialBundle was originally created from.";
                        readonly examples: readonly ["123e4567-a4e3-44ec-b890-21db09adf79b"];
                    };
                    readonly job_uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly examples: readonly ["123e4567-7192-4ce3-bcef-21db0e73b31b"];
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetJobMaterialBundleSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Job Material Bundle";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "Record UUID key";
                    readonly examples: readonly ["123e4567-8009-4301-adcb-21db00d8b3bb"];
                };
                readonly active: {
                    readonly type: "number";
                    readonly enum: readonly [0, 1];
                    readonly default: 1;
                    readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                };
                readonly edit_date: {
                    readonly type: "string";
                    readonly readOnly: true;
                    readonly description: "Record last modified timestamp";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly item_number: {
                    readonly type: "string";
                };
                readonly name: {
                    readonly type: "string";
                };
                readonly quantity: {
                    readonly type: "string";
                };
                readonly sort_order: {
                    readonly type: "number";
                };
                readonly material_bundle_uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "UUID of the MaterialBundle which this JobMaterialBundle was originally created from.";
                    readonly examples: readonly ["123e4567-a4e3-44ec-b890-21db09adf79b"];
                };
                readonly job_uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["123e4567-7192-4ce3-bcef-21db0e73b31b"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetJobMaterialSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Job Material";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "Record UUID key";
                    readonly examples: readonly ["123e4567-b4c6-4f01-adc1-21db0b4011fb"];
                };
                readonly active: {
                    readonly type: "number";
                    readonly enum: readonly [0, 1];
                    readonly default: 1;
                    readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                };
                readonly edit_date: {
                    readonly type: "string";
                    readonly readOnly: true;
                    readonly description: "Record last modified timestamp";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly job_uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["123e4567-da04-4cb5-95d9-21db06f13f9b"];
                };
                readonly material_uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["123e4567-22f9-43b2-a08b-21db0504683b"];
                };
                readonly name: {
                    readonly type: "string";
                };
                readonly quantity: {
                    readonly type: "string";
                };
                readonly price: {
                    readonly type: "string";
                };
                readonly displayed_amount: {
                    readonly type: "string";
                };
                readonly displayed_amount_is_tax_inclusive: {
                    readonly type: "string";
                };
                readonly tax_rate_uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["123e4567-d779-4fda-98a6-21db03e3173b"];
                };
                readonly sort_order: {
                    readonly type: "string";
                };
                readonly cost: {
                    readonly type: "string";
                };
                readonly displayed_cost: {
                    readonly type: "string";
                };
                readonly job_material_bundle_uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "UUID of a JobMaterialBundle which this JobMaterial belongs to. The default value is blank, which means that the JobMaterial is not part of a JobMaterialBundle.";
                    readonly examples: readonly ["123e4567-46a5-4804-86c7-21db014fd21b"];
                };
            };
            readonly required: readonly ["quantity"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetJobPaymentAll: {
    readonly response: {
        readonly "200": {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly description: "Record UUID key";
                        readonly examples: readonly ["123e4567-2358-4eee-abfe-21db0128779b"];
                    };
                    readonly active: {
                        readonly type: "number";
                        readonly enum: readonly [0, 1];
                        readonly default: 1;
                        readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                    };
                    readonly edit_date: {
                        readonly type: "string";
                        readonly readOnly: true;
                        readonly description: "Record last modified timestamp";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly job_uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly examples: readonly ["123e4567-f12a-4446-b0a2-21db0526306b"];
                    };
                    readonly actioned_by_uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly examples: readonly ["123e4567-2289-45a5-8ba8-21db0304475b"];
                    };
                    readonly timestamp: {
                        readonly type: "string";
                    };
                    readonly amount: {
                        readonly type: "string";
                    };
                    readonly method: {
                        readonly type: "string";
                    };
                    readonly note: {
                        readonly type: "string";
                    };
                    readonly attachment_uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly examples: readonly ["123e4567-7be9-4126-a2d8-21db076c049b"];
                    };
                    readonly is_deposit: {
                        readonly type: "number";
                        readonly description: "(Read-only). \n\nValid values are [0,1]\n\n`1`";
                        readonly enum: readonly [0, 1];
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetJobPaymentSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Job Payment";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "Record UUID key";
                    readonly examples: readonly ["123e4567-2358-4eee-abfe-21db0128779b"];
                };
                readonly active: {
                    readonly type: "number";
                    readonly enum: readonly [0, 1];
                    readonly default: 1;
                    readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                };
                readonly edit_date: {
                    readonly type: "string";
                    readonly readOnly: true;
                    readonly description: "Record last modified timestamp";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly job_uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["123e4567-f12a-4446-b0a2-21db0526306b"];
                };
                readonly actioned_by_uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["123e4567-2289-45a5-8ba8-21db0304475b"];
                };
                readonly timestamp: {
                    readonly type: "string";
                };
                readonly amount: {
                    readonly type: "string";
                };
                readonly method: {
                    readonly type: "string";
                };
                readonly note: {
                    readonly type: "string";
                };
                readonly attachment_uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["123e4567-7be9-4126-a2d8-21db076c049b"];
                };
                readonly is_deposit: {
                    readonly type: "number";
                    readonly description: "(Read-only). \n\nValid values are [0,1]\n\n`1`";
                    readonly enum: readonly [0, 1];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetJobSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Job";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "Record UUID key";
                    readonly examples: readonly ["123e4567-e539-40c9-9ea4-21db0343830b"];
                };
                readonly active: {
                    readonly type: "number";
                    readonly enum: readonly [0, 1];
                    readonly default: 1;
                    readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                };
                readonly edit_date: {
                    readonly type: "string";
                    readonly readOnly: true;
                    readonly description: "Record last modified timestamp";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly created_by_staff_uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["123e4567-a9e9-4e78-8910-21db08c02ecb"];
                };
                readonly date: {
                    readonly type: "string";
                    readonly examples: readonly ["YYYY-MM-DD"];
                };
                readonly company_uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["123e4567-41fc-4af5-aca5-21db07bc319b"];
                };
                readonly job_address: {
                    readonly type: "string";
                    readonly maxLength: 500;
                };
                readonly billing_address: {
                    readonly type: "string";
                    readonly maxLength: 500;
                };
                readonly status: {
                    readonly type: "string";
                };
                readonly job_description: {
                    readonly type: "string";
                };
                readonly work_done_description: {
                    readonly type: "string";
                };
                readonly lng: {
                    readonly type: "number";
                    readonly format: "float";
                    readonly minimum: -3.402823669209385e+38;
                    readonly maximum: 3.402823669209385e+38;
                };
                readonly lat: {
                    readonly type: "number";
                    readonly format: "float";
                    readonly minimum: -3.402823669209385e+38;
                    readonly maximum: 3.402823669209385e+38;
                };
                readonly generated_job_id: {
                    readonly type: "string";
                    readonly description: "(Read-only)";
                };
                readonly payment_date: {
                    readonly type: "string";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly payment_actioned_by_uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["123e4567-a547-45ae-a094-21db03087d5b"];
                };
                readonly payment_method: {
                    readonly type: "string";
                };
                readonly payment_amount: {
                    readonly type: "string";
                };
                readonly total_invoice_amount: {
                    readonly type: "string";
                };
                readonly category_uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["123e4567-af18-4701-8d91-21db0f31e1db"];
                };
                readonly payment_note: {
                    readonly type: "string";
                };
                readonly geo_is_valid: {
                    readonly type: "string";
                };
                readonly purchase_order_number: {
                    readonly type: "string";
                    readonly maxLength: 100;
                };
                readonly invoice_sent: {
                    readonly type: "string";
                };
                readonly invoice_sent_stamp: {
                    readonly type: "string";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly ready_to_invoice: {
                    readonly type: "string";
                };
                readonly ready_to_invoice_stamp: {
                    readonly type: "string";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly payment_processed: {
                    readonly type: "string";
                };
                readonly payment_processed_stamp: {
                    readonly type: "string";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly geo_country: {
                    readonly type: "string";
                };
                readonly geo_postcode: {
                    readonly type: "string";
                };
                readonly geo_state: {
                    readonly type: "string";
                };
                readonly geo_city: {
                    readonly type: "string";
                };
                readonly geo_street: {
                    readonly type: "string";
                };
                readonly geo_number: {
                    readonly type: "string";
                };
                readonly queue_uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["123e4567-1500-485b-93bb-21db07f210eb"];
                };
                readonly queue_expiry_date: {
                    readonly type: "string";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly queue_assigned_staff_uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["123e4567-f641-4a0e-961e-21db0624c4fb"];
                };
                readonly payment_received: {
                    readonly type: "string";
                };
                readonly payment_received_stamp: {
                    readonly type: "string";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly badges: {
                    readonly type: "string";
                };
                readonly quote_date: {
                    readonly type: "string";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly quote_sent: {
                    readonly type: "number";
                    readonly description: "(Read-only). \n\nValid values are [0,1]\n\n`1`";
                    readonly enum: readonly [0, 1];
                };
                readonly quote_sent_stamp: {
                    readonly type: "string";
                    readonly description: "(Read-only)";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly work_order_date: {
                    readonly type: "string";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly completion_date: {
                    readonly type: "string";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly completion_actioned_by_uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["123e4567-15c5-4ea0-8a01-21db005dfc8b"];
                };
                readonly unsuccessful_date: {
                    readonly type: "string";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly job_is_scheduled_until_stamp: {
                    readonly type: "string";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly active_network_request_uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["123e4567-7620-454e-95ca-21db008d0cab"];
                };
                readonly related_knowledge_articles: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly knowledge_article_uuid: {
                                readonly type: "string";
                                readonly format: "uuid";
                            };
                            readonly relevance: {
                                readonly type: "number";
                            };
                        };
                        readonly required: readonly ["knowledge_article_uuid", "relevance"];
                    };
                };
            };
            readonly required: readonly ["status"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetKnowledgeArticleAll: {
    readonly response: {
        readonly "200": {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly description: "Record UUID key";
                        readonly examples: readonly ["123e4567-1497-42f2-9368-21db0c98b51b"];
                    };
                    readonly active: {
                        readonly type: "number";
                        readonly enum: readonly [0, 1];
                        readonly default: 1;
                        readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                    };
                    readonly edit_date: {
                        readonly type: "string";
                        readonly readOnly: true;
                        readonly description: "Record last modified timestamp";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly name: {
                        readonly type: "string";
                    };
                    readonly content: {
                        readonly type: "string";
                    };
                    readonly article_type: {
                        readonly type: "string";
                    };
                    readonly tags: {
                        readonly type: "string";
                    };
                    readonly relationships: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "object";
                            readonly properties: {
                                readonly object_name: {
                                    readonly type: "string";
                                    readonly enum: readonly ["Job", "job"];
                                    readonly description: "`Job` `job`";
                                };
                                readonly object_uuid: {
                                    readonly type: "string";
                                    readonly format: "uuid";
                                };
                                readonly object_description: {
                                    readonly type: "string";
                                };
                                readonly create_date: {
                                    readonly type: "string";
                                    readonly pattern: "^\\d{4}-\\d{2}-\\d{2}\\ \\d{2}:\\d{2}:\\d{2}$";
                                };
                            };
                            readonly required: readonly ["object_name", "object_uuid"];
                        };
                    };
                };
                readonly required: readonly ["name"];
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetKnowledgeArticleSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Knowledge Article";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "Record UUID key";
                    readonly examples: readonly ["123e4567-1497-42f2-9368-21db0c98b51b"];
                };
                readonly active: {
                    readonly type: "number";
                    readonly enum: readonly [0, 1];
                    readonly default: 1;
                    readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                };
                readonly edit_date: {
                    readonly type: "string";
                    readonly readOnly: true;
                    readonly description: "Record last modified timestamp";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly name: {
                    readonly type: "string";
                };
                readonly content: {
                    readonly type: "string";
                };
                readonly article_type: {
                    readonly type: "string";
                };
                readonly tags: {
                    readonly type: "string";
                };
                readonly relationships: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly object_name: {
                                readonly type: "string";
                                readonly enum: readonly ["Job", "job"];
                                readonly description: "`Job` `job`";
                            };
                            readonly object_uuid: {
                                readonly type: "string";
                                readonly format: "uuid";
                            };
                            readonly object_description: {
                                readonly type: "string";
                            };
                            readonly create_date: {
                                readonly type: "string";
                                readonly pattern: "^\\d{4}-\\d{2}-\\d{2}\\ \\d{2}:\\d{2}:\\d{2}$";
                            };
                        };
                        readonly required: readonly ["object_name", "object_uuid"];
                    };
                };
            };
            readonly required: readonly ["name"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetLocationAll: {
    readonly response: {
        readonly "200": {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly description: "Record UUID key";
                        readonly examples: readonly ["123e4567-9fd3-4c57-a5fb-21db046572bb"];
                    };
                    readonly active: {
                        readonly type: "number";
                        readonly enum: readonly [0, 1];
                        readonly default: 1;
                        readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                    };
                    readonly edit_date: {
                        readonly type: "string";
                        readonly readOnly: true;
                        readonly description: "Record last modified timestamp";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly name: {
                        readonly type: "string";
                        readonly description: "Location's name";
                        readonly maxLength: 50;
                    };
                    readonly line1: {
                        readonly type: "string";
                        readonly maxLength: 100;
                    };
                    readonly line2: {
                        readonly type: "string";
                        readonly maxLength: 100;
                    };
                    readonly line3: {
                        readonly type: "string";
                        readonly maxLength: 100;
                    };
                    readonly city: {
                        readonly type: "string";
                        readonly maxLength: 50;
                    };
                    readonly country: {
                        readonly type: "string";
                        readonly maxLength: 100;
                    };
                    readonly post_code: {
                        readonly type: "string";
                        readonly maxLength: 100;
                    };
                    readonly phone_1: {
                        readonly type: "string";
                        readonly maxLength: 100;
                    };
                    readonly state: {
                        readonly type: "string";
                        readonly description: "Address State";
                    };
                    readonly lng: {
                        readonly type: "number";
                        readonly format: "float";
                        readonly minimum: -3.402823669209385e+38;
                        readonly maximum: 3.402823669209385e+38;
                    };
                    readonly lat: {
                        readonly type: "number";
                        readonly format: "float";
                        readonly minimum: -3.402823669209385e+38;
                        readonly maximum: 3.402823669209385e+38;
                    };
                };
                readonly required: readonly ["name", "state"];
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetLocationSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Location";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "Record UUID key";
                    readonly examples: readonly ["123e4567-9fd3-4c57-a5fb-21db046572bb"];
                };
                readonly active: {
                    readonly type: "number";
                    readonly enum: readonly [0, 1];
                    readonly default: 1;
                    readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                };
                readonly edit_date: {
                    readonly type: "string";
                    readonly readOnly: true;
                    readonly description: "Record last modified timestamp";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly name: {
                    readonly type: "string";
                    readonly description: "Location's name";
                    readonly maxLength: 50;
                };
                readonly line1: {
                    readonly type: "string";
                    readonly maxLength: 100;
                };
                readonly line2: {
                    readonly type: "string";
                    readonly maxLength: 100;
                };
                readonly line3: {
                    readonly type: "string";
                    readonly maxLength: 100;
                };
                readonly city: {
                    readonly type: "string";
                    readonly maxLength: 50;
                };
                readonly country: {
                    readonly type: "string";
                    readonly maxLength: 100;
                };
                readonly post_code: {
                    readonly type: "string";
                    readonly maxLength: 100;
                };
                readonly phone_1: {
                    readonly type: "string";
                    readonly maxLength: 100;
                };
                readonly state: {
                    readonly type: "string";
                    readonly description: "Address State";
                };
                readonly lng: {
                    readonly type: "number";
                    readonly format: "float";
                    readonly minimum: -3.402823669209385e+38;
                    readonly maximum: 3.402823669209385e+38;
                };
                readonly lat: {
                    readonly type: "number";
                    readonly format: "float";
                    readonly minimum: -3.402823669209385e+38;
                    readonly maximum: 3.402823669209385e+38;
                };
            };
            readonly required: readonly ["name", "state"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetMaterialAll: {
    readonly response: {
        readonly "200": {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly description: "Record UUID key";
                        readonly examples: readonly ["123e4567-aa23-4dc7-8c7e-21db0649634b"];
                    };
                    readonly active: {
                        readonly type: "number";
                        readonly enum: readonly [0, 1];
                        readonly default: 1;
                        readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                    };
                    readonly edit_date: {
                        readonly type: "string";
                        readonly readOnly: true;
                        readonly description: "Record last modified timestamp";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly name: {
                        readonly type: "string";
                    };
                    readonly item_number: {
                        readonly type: "string";
                        readonly maxLength: 30;
                    };
                    readonly price: {
                        readonly type: "string";
                    };
                    readonly cost: {
                        readonly type: "string";
                    };
                    readonly item_description: {
                        readonly type: "string";
                    };
                    readonly quantity_in_stock: {
                        readonly type: "number";
                    };
                    readonly price_includes_taxes: {
                        readonly type: "number";
                        readonly enum: readonly [0, 1];
                        readonly description: "\n\nValid values are [0,1]\n\n`1`";
                    };
                    readonly use_description_for_invoicing: {
                        readonly type: "string";
                    };
                    readonly tax_rate_uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly examples: readonly ["123e4567-e229-48b6-85a3-21db091a6cfb"];
                    };
                    readonly barcode: {
                        readonly type: "string";
                    };
                    readonly item_is_inventoried: {
                        readonly type: "number";
                        readonly enum: readonly [0, 1];
                        readonly description: "\n\nValid values are [0,1]\n\n`1`";
                    };
                };
                readonly required: readonly ["name"];
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetMaterialBundleAll: {
    readonly response: {
        readonly "200": {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly description: "Record UUID key";
                        readonly examples: readonly ["123e4567-647c-4c38-975c-21db048ffacb"];
                    };
                    readonly active: {
                        readonly type: "number";
                        readonly enum: readonly [0, 1];
                        readonly default: 1;
                        readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                    };
                    readonly edit_date: {
                        readonly type: "string";
                        readonly readOnly: true;
                        readonly description: "Record last modified timestamp";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly item_number: {
                        readonly type: "string";
                        readonly maxLength: 30;
                    };
                    readonly name: {
                        readonly type: "string";
                    };
                    readonly material_list: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "object";
                            readonly properties: {
                                readonly uuid: {
                                    readonly type: "string";
                                    readonly format: "uuid";
                                    readonly description: "Must be the UUID of a Material record";
                                };
                                readonly quantity: {
                                    readonly type: "number";
                                    readonly minimum: 0;
                                };
                            };
                            readonly required: readonly ["uuid", "quantity"];
                        };
                        readonly minItems: 1;
                        readonly maxItems: 50;
                    };
                };
                readonly required: readonly ["item_number"];
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetMaterialBundleSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Bundle";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "Record UUID key";
                    readonly examples: readonly ["123e4567-647c-4c38-975c-21db048ffacb"];
                };
                readonly active: {
                    readonly type: "number";
                    readonly enum: readonly [0, 1];
                    readonly default: 1;
                    readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                };
                readonly edit_date: {
                    readonly type: "string";
                    readonly readOnly: true;
                    readonly description: "Record last modified timestamp";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly item_number: {
                    readonly type: "string";
                    readonly maxLength: 30;
                };
                readonly name: {
                    readonly type: "string";
                };
                readonly material_list: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly uuid: {
                                readonly type: "string";
                                readonly format: "uuid";
                                readonly description: "Must be the UUID of a Material record";
                            };
                            readonly quantity: {
                                readonly type: "number";
                                readonly minimum: 0;
                            };
                        };
                        readonly required: readonly ["uuid", "quantity"];
                    };
                    readonly minItems: 1;
                    readonly maxItems: 50;
                };
            };
            readonly required: readonly ["item_number"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetMaterialSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Material";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "Record UUID key";
                    readonly examples: readonly ["123e4567-aa23-4dc7-8c7e-21db0649634b"];
                };
                readonly active: {
                    readonly type: "number";
                    readonly enum: readonly [0, 1];
                    readonly default: 1;
                    readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                };
                readonly edit_date: {
                    readonly type: "string";
                    readonly readOnly: true;
                    readonly description: "Record last modified timestamp";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly name: {
                    readonly type: "string";
                };
                readonly item_number: {
                    readonly type: "string";
                    readonly maxLength: 30;
                };
                readonly price: {
                    readonly type: "string";
                };
                readonly cost: {
                    readonly type: "string";
                };
                readonly item_description: {
                    readonly type: "string";
                };
                readonly quantity_in_stock: {
                    readonly type: "number";
                };
                readonly price_includes_taxes: {
                    readonly type: "number";
                    readonly enum: readonly [0, 1];
                    readonly description: "\n\nValid values are [0,1]\n\n`1`";
                };
                readonly use_description_for_invoicing: {
                    readonly type: "string";
                };
                readonly tax_rate_uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["123e4567-e229-48b6-85a3-21db091a6cfb"];
                };
                readonly barcode: {
                    readonly type: "string";
                };
                readonly item_is_inventoried: {
                    readonly type: "number";
                    readonly enum: readonly [0, 1];
                    readonly description: "\n\nValid values are [0,1]\n\n`1`";
                };
            };
            readonly required: readonly ["name"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetNoteAll: {
    readonly response: {
        readonly "200": {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly description: "Record UUID key";
                        readonly examples: readonly ["123e4567-5b77-468b-a8f1-21db04bfd46b"];
                    };
                    readonly active: {
                        readonly type: "number";
                        readonly enum: readonly [0, 1];
                        readonly default: 1;
                        readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                    };
                    readonly edit_date: {
                        readonly type: "string";
                        readonly readOnly: true;
                        readonly description: "Record last modified timestamp";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly related_object: {
                        readonly type: "string";
                    };
                    readonly related_object_uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly examples: readonly ["123e4567-2e3d-4bba-9fb0-21db0d46300b"];
                    };
                    readonly note: {
                        readonly type: "string";
                    };
                    readonly action_required: {
                        readonly type: "string";
                    };
                    readonly action_completed_by_staff_uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly examples: readonly ["123e4567-bd70-4ac9-bf9b-21db08eadb5b"];
                    };
                    readonly edit_by_staff_uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly readOnly: true;
                        readonly description: "Staff Member who last modified record";
                        readonly examples: readonly ["123e4567-cbed-422c-b253-21db0067805b"];
                    };
                    readonly create_date: {
                        readonly type: "string";
                        readonly description: "Record creation timestamp";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetNoteSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Note";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "Record UUID key";
                    readonly examples: readonly ["123e4567-5b77-468b-a8f1-21db04bfd46b"];
                };
                readonly active: {
                    readonly type: "number";
                    readonly enum: readonly [0, 1];
                    readonly default: 1;
                    readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                };
                readonly edit_date: {
                    readonly type: "string";
                    readonly readOnly: true;
                    readonly description: "Record last modified timestamp";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly related_object: {
                    readonly type: "string";
                };
                readonly related_object_uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["123e4567-2e3d-4bba-9fb0-21db0d46300b"];
                };
                readonly note: {
                    readonly type: "string";
                };
                readonly action_required: {
                    readonly type: "string";
                };
                readonly action_completed_by_staff_uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["123e4567-bd70-4ac9-bf9b-21db08eadb5b"];
                };
                readonly edit_by_staff_uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly readOnly: true;
                    readonly description: "Staff Member who last modified record";
                    readonly examples: readonly ["123e4567-cbed-422c-b253-21db0067805b"];
                };
                readonly create_date: {
                    readonly type: "string";
                    readonly description: "Record creation timestamp";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetQueueAll: {
    readonly response: {
        readonly "200": {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly description: "Record UUID key";
                        readonly examples: readonly ["123e4567-3db0-421d-bdbd-21db0b467dab"];
                    };
                    readonly active: {
                        readonly type: "number";
                        readonly enum: readonly [0, 1];
                        readonly default: 1;
                        readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                    };
                    readonly edit_date: {
                        readonly type: "string";
                        readonly readOnly: true;
                        readonly description: "Record last modified timestamp";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly name: {
                        readonly type: "string";
                    };
                    readonly default_timeframe: {
                        readonly type: "number";
                    };
                    readonly subscribed_staff: {
                        readonly type: "string";
                    };
                    readonly requires_assignment: {
                        readonly type: "number";
                        readonly enum: readonly [0, 1];
                        readonly description: "\n\nValid values are [0,1]\n\n`1`";
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetQueueSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Job Queue";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "Record UUID key";
                    readonly examples: readonly ["123e4567-3db0-421d-bdbd-21db0b467dab"];
                };
                readonly active: {
                    readonly type: "number";
                    readonly enum: readonly [0, 1];
                    readonly default: 1;
                    readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                };
                readonly edit_date: {
                    readonly type: "string";
                    readonly readOnly: true;
                    readonly description: "Record last modified timestamp";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly name: {
                    readonly type: "string";
                };
                readonly default_timeframe: {
                    readonly type: "number";
                };
                readonly subscribed_staff: {
                    readonly type: "string";
                };
                readonly requires_assignment: {
                    readonly type: "number";
                    readonly enum: readonly [0, 1];
                    readonly description: "\n\nValid values are [0,1]\n\n`1`";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetSecurityRoleAll: {
    readonly response: {
        readonly "200": {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly description: "Record UUID key";
                        readonly examples: readonly ["123e4567-7188-4533-9b12-21db066c13db"];
                    };
                    readonly active: {
                        readonly type: "number";
                        readonly enum: readonly [0, 1];
                        readonly default: 1;
                        readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                    };
                    readonly edit_date: {
                        readonly type: "string";
                        readonly readOnly: true;
                        readonly description: "Record last modified timestamp";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly name: {
                        readonly type: "string";
                        readonly description: "The name given to the security role";
                        readonly maxLength: 50;
                    };
                    readonly role_description: {
                        readonly type: "string";
                    };
                };
                readonly required: readonly ["name"];
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetSecurityRoleSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Security Role";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "Record UUID key";
                    readonly examples: readonly ["123e4567-7188-4533-9b12-21db066c13db"];
                };
                readonly active: {
                    readonly type: "number";
                    readonly enum: readonly [0, 1];
                    readonly default: 1;
                    readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                };
                readonly edit_date: {
                    readonly type: "string";
                    readonly readOnly: true;
                    readonly description: "Record last modified timestamp";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly name: {
                    readonly type: "string";
                    readonly description: "The name given to the security role";
                    readonly maxLength: 50;
                };
                readonly role_description: {
                    readonly type: "string";
                };
            };
            readonly required: readonly ["name"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetSmsTemplateAll: {
    readonly response: {
        readonly "200": {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly description: "Record UUID key";
                        readonly examples: readonly ["123e4567-f872-4ac2-8e70-21db085c492b"];
                    };
                    readonly active: {
                        readonly type: "number";
                        readonly enum: readonly [0, 1];
                        readonly default: 1;
                        readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                    };
                    readonly edit_date: {
                        readonly type: "string";
                        readonly readOnly: true;
                        readonly description: "Record last modified timestamp";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly name: {
                        readonly type: "string";
                        readonly maxLength: 50;
                    };
                    readonly message: {
                        readonly type: "string";
                        readonly maxLength: 612;
                    };
                };
                readonly required: readonly ["name"];
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetSmsTemplateSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the SMS Template";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "Record UUID key";
                    readonly examples: readonly ["123e4567-f872-4ac2-8e70-21db085c492b"];
                };
                readonly active: {
                    readonly type: "number";
                    readonly enum: readonly [0, 1];
                    readonly default: 1;
                    readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                };
                readonly edit_date: {
                    readonly type: "string";
                    readonly readOnly: true;
                    readonly description: "Record last modified timestamp";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly name: {
                    readonly type: "string";
                    readonly maxLength: 50;
                };
                readonly message: {
                    readonly type: "string";
                    readonly maxLength: 612;
                };
            };
            readonly required: readonly ["name"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetStaffAll: {
    readonly response: {
        readonly "200": {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly description: "Record UUID key";
                        readonly examples: readonly ["123e4567-e2a2-4517-a16f-21db0472b58b"];
                    };
                    readonly active: {
                        readonly type: "number";
                        readonly enum: readonly [0, 1];
                        readonly default: 1;
                        readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                    };
                    readonly edit_date: {
                        readonly type: "string";
                        readonly readOnly: true;
                        readonly description: "Record last modified timestamp";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly first: {
                        readonly type: "string";
                        readonly description: "Staff First Name";
                        readonly maxLength: 30;
                    };
                    readonly last: {
                        readonly type: "string";
                        readonly description: "Staff Last Name";
                        readonly maxLength: 30;
                    };
                    readonly email: {
                        readonly type: "string";
                        readonly format: "email";
                        readonly description: "Staff Email Address. This is also your login name.";
                    };
                    readonly mobile: {
                        readonly type: "string";
                    };
                    readonly lng: {
                        readonly type: "number";
                        readonly format: "float";
                        readonly minimum: -3.402823669209385e+38;
                        readonly maximum: 3.402823669209385e+38;
                    };
                    readonly lat: {
                        readonly type: "number";
                        readonly format: "float";
                        readonly minimum: -3.402823669209385e+38;
                        readonly maximum: 3.402823669209385e+38;
                    };
                    readonly geo_timestamp: {
                        readonly type: "string";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly job_title: {
                        readonly type: "string";
                    };
                    readonly navigating_to_job_uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly examples: readonly ["123e4567-50b1-449c-b34e-21db017f019b"];
                    };
                    readonly navigating_timestamp: {
                        readonly type: "string";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly navigating_expiry_timestamp: {
                        readonly type: "string";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly color: {
                        readonly type: "string";
                    };
                    readonly custom_icon_url: {
                        readonly type: "string";
                    };
                    readonly status_message: {
                        readonly type: "string";
                    };
                    readonly status_message_timestamp: {
                        readonly type: "string";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly can_receive_push_notification: {
                        readonly type: "string";
                    };
                    readonly hide_from_schedule: {
                        readonly type: "number";
                        readonly enum: readonly [0, 1];
                        readonly description: "\n\nValid values are [0,1]\n\n`1`";
                    };
                    readonly security_role_uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly examples: readonly ["123e4567-fecf-43fc-a2be-21db0329776b"];
                    };
                };
                readonly required: readonly ["first", "last"];
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetStaffMessageAll: {
    readonly response: {
        readonly "200": {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly description: "Record UUID key";
                        readonly examples: readonly ["123e4567-a21f-4407-9561-21db081478fb"];
                    };
                    readonly active: {
                        readonly type: "number";
                        readonly enum: readonly [0, 1];
                        readonly default: 1;
                        readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                    };
                    readonly edit_date: {
                        readonly type: "string";
                        readonly readOnly: true;
                        readonly description: "Record last modified timestamp";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly from_staff_uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly examples: readonly ["123e4567-6b83-4841-a484-21db03b38f1b"];
                    };
                    readonly to_staff_uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly examples: readonly ["123e4567-a9b8-44d8-9e85-21db0d100f8b"];
                    };
                    readonly sent_timestamp: {
                        readonly type: "string";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly delivered_timestamp: {
                        readonly type: "string";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly read_timestamp: {
                        readonly type: "string";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly message: {
                        readonly type: "string";
                    };
                    readonly regarding_job_uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly examples: readonly ["123e4567-5ad3-4c4a-80db-21db045cb7eb"];
                    };
                    readonly attached_json: {
                        readonly type: "string";
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetStaffMessageSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Staff Message";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "Record UUID key";
                    readonly examples: readonly ["123e4567-a21f-4407-9561-21db081478fb"];
                };
                readonly active: {
                    readonly type: "number";
                    readonly enum: readonly [0, 1];
                    readonly default: 1;
                    readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                };
                readonly edit_date: {
                    readonly type: "string";
                    readonly readOnly: true;
                    readonly description: "Record last modified timestamp";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly from_staff_uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["123e4567-6b83-4841-a484-21db03b38f1b"];
                };
                readonly to_staff_uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["123e4567-a9b8-44d8-9e85-21db0d100f8b"];
                };
                readonly sent_timestamp: {
                    readonly type: "string";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly delivered_timestamp: {
                    readonly type: "string";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly read_timestamp: {
                    readonly type: "string";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly message: {
                    readonly type: "string";
                };
                readonly regarding_job_uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["123e4567-5ad3-4c4a-80db-21db045cb7eb"];
                };
                readonly attached_json: {
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetStaffSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Staff Member";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "Record UUID key";
                    readonly examples: readonly ["123e4567-e2a2-4517-a16f-21db0472b58b"];
                };
                readonly active: {
                    readonly type: "number";
                    readonly enum: readonly [0, 1];
                    readonly default: 1;
                    readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                };
                readonly edit_date: {
                    readonly type: "string";
                    readonly readOnly: true;
                    readonly description: "Record last modified timestamp";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly first: {
                    readonly type: "string";
                    readonly description: "Staff First Name";
                    readonly maxLength: 30;
                };
                readonly last: {
                    readonly type: "string";
                    readonly description: "Staff Last Name";
                    readonly maxLength: 30;
                };
                readonly email: {
                    readonly type: "string";
                    readonly format: "email";
                    readonly description: "Staff Email Address. This is also your login name.";
                };
                readonly mobile: {
                    readonly type: "string";
                };
                readonly lng: {
                    readonly type: "number";
                    readonly format: "float";
                    readonly minimum: -3.402823669209385e+38;
                    readonly maximum: 3.402823669209385e+38;
                };
                readonly lat: {
                    readonly type: "number";
                    readonly format: "float";
                    readonly minimum: -3.402823669209385e+38;
                    readonly maximum: 3.402823669209385e+38;
                };
                readonly geo_timestamp: {
                    readonly type: "string";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly job_title: {
                    readonly type: "string";
                };
                readonly navigating_to_job_uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["123e4567-50b1-449c-b34e-21db017f019b"];
                };
                readonly navigating_timestamp: {
                    readonly type: "string";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly navigating_expiry_timestamp: {
                    readonly type: "string";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly color: {
                    readonly type: "string";
                };
                readonly custom_icon_url: {
                    readonly type: "string";
                };
                readonly status_message: {
                    readonly type: "string";
                };
                readonly status_message_timestamp: {
                    readonly type: "string";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly can_receive_push_notification: {
                    readonly type: "string";
                };
                readonly hide_from_schedule: {
                    readonly type: "number";
                    readonly enum: readonly [0, 1];
                    readonly description: "\n\nValid values are [0,1]\n\n`1`";
                };
                readonly security_role_uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["123e4567-fecf-43fc-a2be-21db0329776b"];
                };
            };
            readonly required: readonly ["first", "last"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetTaskAll: {
    readonly response: {
        readonly "200": {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly description: "Record UUID key";
                        readonly examples: readonly ["123e4567-0078-496e-85d6-21db0c7a35fb"];
                    };
                    readonly active: {
                        readonly type: "number";
                        readonly enum: readonly [0, 1];
                        readonly default: 1;
                        readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                    };
                    readonly edit_date: {
                        readonly type: "string";
                        readonly readOnly: true;
                        readonly description: "Record last modified timestamp";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly due_date: {
                        readonly type: "string";
                        readonly examples: readonly ["YYYY-MM-DD"];
                    };
                    readonly task_details: {
                        readonly type: "string";
                    };
                    readonly name: {
                        readonly type: "string";
                    };
                    readonly related_object: {
                        readonly type: "string";
                    };
                    readonly related_object_uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly examples: readonly ["123e4567-d8ee-4433-976b-21db0b7ecd6b"];
                    };
                    readonly task_complete: {
                        readonly type: "string";
                    };
                    readonly completed_timestamp: {
                        readonly type: "string";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly completed_by_staff_uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly examples: readonly ["123e4567-2acf-48bc-ae41-21db02c2208b"];
                    };
                    readonly assigned_to_staff_uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly examples: readonly ["123e4567-4218-4b45-ae12-21db0172071b"];
                    };
                    readonly lng: {
                        readonly type: "number";
                        readonly format: "float";
                        readonly minimum: -3.402823669209385e+38;
                        readonly maximum: 3.402823669209385e+38;
                    };
                    readonly lat: {
                        readonly type: "number";
                        readonly format: "float";
                        readonly minimum: -3.402823669209385e+38;
                        readonly maximum: 3.402823669209385e+38;
                    };
                    readonly created_by_staff_uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly examples: readonly ["123e4567-f551-46e5-8450-21db01069a0b"];
                    };
                    readonly create_date: {
                        readonly type: "string";
                        readonly description: "Record creation timestamp";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                };
                readonly required: readonly ["name"];
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetTaskSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Task";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "Record UUID key";
                    readonly examples: readonly ["123e4567-0078-496e-85d6-21db0c7a35fb"];
                };
                readonly active: {
                    readonly type: "number";
                    readonly enum: readonly [0, 1];
                    readonly default: 1;
                    readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                };
                readonly edit_date: {
                    readonly type: "string";
                    readonly readOnly: true;
                    readonly description: "Record last modified timestamp";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly due_date: {
                    readonly type: "string";
                    readonly examples: readonly ["YYYY-MM-DD"];
                };
                readonly task_details: {
                    readonly type: "string";
                };
                readonly name: {
                    readonly type: "string";
                };
                readonly related_object: {
                    readonly type: "string";
                };
                readonly related_object_uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["123e4567-d8ee-4433-976b-21db0b7ecd6b"];
                };
                readonly task_complete: {
                    readonly type: "string";
                };
                readonly completed_timestamp: {
                    readonly type: "string";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly completed_by_staff_uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["123e4567-2acf-48bc-ae41-21db02c2208b"];
                };
                readonly assigned_to_staff_uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["123e4567-4218-4b45-ae12-21db0172071b"];
                };
                readonly lng: {
                    readonly type: "number";
                    readonly format: "float";
                    readonly minimum: -3.402823669209385e+38;
                    readonly maximum: 3.402823669209385e+38;
                };
                readonly lat: {
                    readonly type: "number";
                    readonly format: "float";
                    readonly minimum: -3.402823669209385e+38;
                    readonly maximum: 3.402823669209385e+38;
                };
                readonly created_by_staff_uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["123e4567-f551-46e5-8450-21db01069a0b"];
                };
                readonly create_date: {
                    readonly type: "string";
                    readonly description: "Record creation timestamp";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
            };
            readonly required: readonly ["name"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetTaxRateAll: {
    readonly response: {
        readonly "200": {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly description: "Record UUID key";
                        readonly examples: readonly ["123e4567-ea93-44d1-a0b1-21db0045458b"];
                    };
                    readonly active: {
                        readonly type: "number";
                        readonly enum: readonly [0, 1];
                        readonly default: 1;
                        readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                    };
                    readonly edit_date: {
                        readonly type: "string";
                        readonly readOnly: true;
                        readonly description: "Record last modified timestamp";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly name: {
                        readonly type: "string";
                        readonly maxLength: 50;
                    };
                    readonly amount: {
                        readonly type: "string";
                    };
                    readonly is_default_tax_rate: {
                        readonly type: "number";
                        readonly enum: readonly [0, 1];
                        readonly description: "\n\nValid values are [0,1]\n\n`1`";
                    };
                };
                readonly required: readonly ["name"];
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetTaxRateSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Tax Rate";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "Record UUID key";
                    readonly examples: readonly ["123e4567-ea93-44d1-a0b1-21db0045458b"];
                };
                readonly active: {
                    readonly type: "number";
                    readonly enum: readonly [0, 1];
                    readonly default: 1;
                    readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                };
                readonly edit_date: {
                    readonly type: "string";
                    readonly readOnly: true;
                    readonly description: "Record last modified timestamp";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly name: {
                    readonly type: "string";
                    readonly maxLength: 50;
                };
                readonly amount: {
                    readonly type: "string";
                };
                readonly is_default_tax_rate: {
                    readonly type: "number";
                    readonly enum: readonly [0, 1];
                    readonly description: "\n\nValid values are [0,1]\n\n`1`";
                };
            };
            readonly required: readonly ["name"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetVendorAll: {
    readonly response: {
        readonly "200": {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly uuid: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly description: "Record UUID key";
                        readonly examples: readonly ["123e4567-a166-4076-8950-21db0ceabc4b"];
                    };
                    readonly active: {
                        readonly type: "number";
                        readonly enum: readonly [0, 1];
                        readonly default: 1;
                        readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                    };
                    readonly edit_date: {
                        readonly type: "string";
                        readonly readOnly: true;
                        readonly description: "Record last modified timestamp";
                        readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                    };
                    readonly name: {
                        readonly type: "string";
                        readonly description: "Company Name";
                        readonly maxLength: 200;
                    };
                    readonly abn_number: {
                        readonly type: "string";
                        readonly description: "Company ABN Number (Australian Accounts Only)";
                    };
                    readonly business_number: {
                        readonly type: "string";
                    };
                    readonly website: {
                        readonly type: "string";
                        readonly description: "Company Website address";
                        readonly maxLength: 100;
                    };
                    readonly email: {
                        readonly type: "string";
                        readonly format: "email";
                    };
                    readonly email_accounts: {
                        readonly type: "string";
                    };
                    readonly billing_address: {
                        readonly type: "string";
                    };
                    readonly accepted_payment_methods: {
                        readonly type: "string";
                    };
                    readonly default_region: {
                        readonly type: "string";
                    };
                    readonly currency: {
                        readonly type: "string";
                    };
                    readonly opening_time_monday: {
                        readonly type: "string";
                    };
                    readonly closing_time_monday: {
                        readonly type: "string";
                    };
                    readonly opening_time_tuesday: {
                        readonly type: "string";
                    };
                    readonly closing_time_tuesday: {
                        readonly type: "string";
                    };
                    readonly opening_time_wednesday: {
                        readonly type: "string";
                    };
                    readonly closing_time_wednesday: {
                        readonly type: "string";
                    };
                    readonly opening_time_thursday: {
                        readonly type: "string";
                    };
                    readonly closing_time_thursday: {
                        readonly type: "string";
                    };
                    readonly opening_time_friday: {
                        readonly type: "string";
                    };
                    readonly closing_time_friday: {
                        readonly type: "string";
                    };
                    readonly opening_time_saturday: {
                        readonly type: "string";
                    };
                    readonly closing_time_saturday: {
                        readonly type: "string";
                    };
                    readonly opening_time_sunday: {
                        readonly type: "string";
                    };
                    readonly closing_time_sunday: {
                        readonly type: "string";
                    };
                    readonly timezone_name: {
                        readonly type: "string";
                    };
                    readonly invoice_terms: {
                        readonly type: "string";
                    };
                    readonly job_default_status: {
                        readonly type: "string";
                    };
                };
                readonly required: readonly ["name"];
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetVendorSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Vendor";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "Record UUID key";
                    readonly examples: readonly ["123e4567-a166-4076-8950-21db0ceabc4b"];
                };
                readonly active: {
                    readonly type: "number";
                    readonly enum: readonly [0, 1];
                    readonly default: 1;
                    readonly description: "Record active/deleted flag. \n\nValid values are [0,1]\n\n`1`";
                };
                readonly edit_date: {
                    readonly type: "string";
                    readonly readOnly: true;
                    readonly description: "Record last modified timestamp";
                    readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
                };
                readonly name: {
                    readonly type: "string";
                    readonly description: "Company Name";
                    readonly maxLength: 200;
                };
                readonly abn_number: {
                    readonly type: "string";
                    readonly description: "Company ABN Number (Australian Accounts Only)";
                };
                readonly business_number: {
                    readonly type: "string";
                };
                readonly website: {
                    readonly type: "string";
                    readonly description: "Company Website address";
                    readonly maxLength: 100;
                };
                readonly email: {
                    readonly type: "string";
                    readonly format: "email";
                };
                readonly email_accounts: {
                    readonly type: "string";
                };
                readonly billing_address: {
                    readonly type: "string";
                };
                readonly accepted_payment_methods: {
                    readonly type: "string";
                };
                readonly default_region: {
                    readonly type: "string";
                };
                readonly currency: {
                    readonly type: "string";
                };
                readonly opening_time_monday: {
                    readonly type: "string";
                };
                readonly closing_time_monday: {
                    readonly type: "string";
                };
                readonly opening_time_tuesday: {
                    readonly type: "string";
                };
                readonly closing_time_tuesday: {
                    readonly type: "string";
                };
                readonly opening_time_wednesday: {
                    readonly type: "string";
                };
                readonly closing_time_wednesday: {
                    readonly type: "string";
                };
                readonly opening_time_thursday: {
                    readonly type: "string";
                };
                readonly closing_time_thursday: {
                    readonly type: "string";
                };
                readonly opening_time_friday: {
                    readonly type: "string";
                };
                readonly closing_time_friday: {
                    readonly type: "string";
                };
                readonly opening_time_saturday: {
                    readonly type: "string";
                };
                readonly closing_time_saturday: {
                    readonly type: "string";
                };
                readonly opening_time_sunday: {
                    readonly type: "string";
                };
                readonly closing_time_sunday: {
                    readonly type: "string";
                };
                readonly timezone_name: {
                    readonly type: "string";
                };
                readonly invoice_terms: {
                    readonly type: "string";
                };
                readonly job_default_status: {
                    readonly type: "string";
                };
            };
            readonly required: readonly ["name"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostAllocationWindowCreate: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-b7f9-4230-b88e-21db00c9909b"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly name: {
                readonly type: "string";
            };
            readonly start_time: {
                readonly type: "number";
            };
            readonly end_time: {
                readonly type: "number";
            };
            readonly sort_priority: {
                readonly type: "number";
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostAllocationWindowSingle: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-b7f9-4230-b88e-21db00c9909b"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly name: {
                readonly type: "string";
            };
            readonly start_time: {
                readonly type: "number";
            };
            readonly end_time: {
                readonly type: "number";
            };
            readonly sort_priority: {
                readonly type: "number";
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Allocation Window";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostAssetSingle: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-9454-4e1d-a1af-21db0054f25b"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly company_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "UUID of the Client to which this Asset is attached";
                readonly examples: readonly ["123e4567-200b-4f8e-a56f-21db08b7388b"];
            };
            readonly asset_code: {
                readonly type: "string";
                readonly description: "The unique code printed on this Asset's attached label (read only) (Read-only)";
            };
            readonly asset_type_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "UUID of an Asset Type which defines the fields that can be stored for this Asset (read only) (Read-only)";
                readonly examples: readonly ["123e4567-5b49-4fa0-8a7f-21db0b7c1acb"];
            };
            readonly name: {
                readonly type: "string";
                readonly description: "User-facing description of this asset";
                readonly maxLength: 100;
            };
            readonly lat: {
                readonly type: "number";
                readonly format: "float";
                readonly description: "Latitude component of the Asset's location in degrees";
                readonly minimum: -3.402823669209385e+38;
                readonly maximum: 3.402823669209385e+38;
            };
            readonly lng: {
                readonly type: "number";
                readonly format: "float";
                readonly description: "Longitude component of the Asset's location in degrees";
                readonly minimum: -3.402823669209385e+38;
                readonly maximum: 3.402823669209385e+38;
            };
            readonly geo_timestamp: {
                readonly type: "string";
                readonly description: "Timestamp at which the Asset's location was last updated";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly altitude: {
                readonly type: "number";
                readonly description: "Altitude component of the Asset's location in metres";
            };
            readonly field_data: {
                readonly type: "array";
                readonly items: {
                    readonly type: "object";
                    readonly properties: {
                        readonly uuid: {
                            readonly type: "string";
                            readonly format: "uuid";
                            readonly description: "Must be the UUID of an AssetTypeField";
                        };
                        readonly fieldType: {
                            readonly type: "string";
                        };
                        readonly fieldName: {
                            readonly type: "string";
                        };
                        readonly fieldValue: {
                            readonly type: "string";
                            readonly description: "Convert all values to string. Dates shall be in Y-m-d format.";
                        };
                        readonly sortOrder: {
                            readonly type: "number";
                        };
                    };
                    readonly required: readonly ["uuid", "fieldType", "fieldName", "fieldValue", "sortOrder"];
                };
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Asset";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostAssetTypeCreate: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-5549-4fa6-87a1-21db0bf239eb"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly name: {
                readonly type: "string";
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostAssetTypeFieldCreate: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-8c80-4103-8755-21db00d93deb"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly asset_type_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "(Read-only)";
                readonly examples: readonly ["123e4567-afc7-4f5b-a771-21db0af9958b"];
            };
            readonly name: {
                readonly type: "string";
            };
            readonly field_data: {
                readonly type: "object";
                readonly properties: {
                    readonly fieldType: {
                        readonly type: "string";
                        readonly enum: readonly ["Text", "Number", "Date", "Multiple Choice"];
                    };
                    readonly mandatory: {
                        readonly type: "boolean";
                    };
                    readonly choices: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "string";
                        };
                    };
                };
                readonly required: readonly ["fieldType", "mandatory"];
            };
            readonly sort_order: {
                readonly type: "number";
            };
        };
        readonly required: readonly ["name"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostAssetTypeFieldSingle: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-8c80-4103-8755-21db00d93deb"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly asset_type_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "(Read-only)";
                readonly examples: readonly ["123e4567-afc7-4f5b-a771-21db0af9958b"];
            };
            readonly name: {
                readonly type: "string";
            };
            readonly field_data: {
                readonly type: "object";
                readonly properties: {
                    readonly fieldType: {
                        readonly type: "string";
                        readonly enum: readonly ["Text", "Number", "Date", "Multiple Choice"];
                    };
                    readonly mandatory: {
                        readonly type: "boolean";
                    };
                    readonly choices: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "string";
                        };
                    };
                };
                readonly required: readonly ["fieldType", "mandatory"];
            };
            readonly sort_order: {
                readonly type: "number";
            };
        };
        readonly required: readonly ["name"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Asset Type Field";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostAssetTypeSingle: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-5549-4fa6-87a1-21db0bf239eb"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly name: {
                readonly type: "string";
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Asset Type";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostAttachmentCreate: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-1d49-48ad-9fa3-21db0b95d0db"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly related_object: {
                readonly type: "string";
            };
            readonly related_object_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-46be-44bc-bba4-21db0709e07b"];
            };
            readonly attachment_name: {
                readonly type: "string";
            };
            readonly file_type: {
                readonly type: "string";
            };
            readonly created_by_staff_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-3b7e-423f-aaca-21db072afdfb"];
            };
            readonly timestamp: {
                readonly type: "string";
            };
            readonly attachment_source: {
                readonly type: "string";
            };
            readonly tags: {
                readonly type: "string";
            };
            readonly lng: {
                readonly type: "number";
                readonly format: "float";
                readonly minimum: -3.402823669209385e+38;
                readonly maximum: 3.402823669209385e+38;
            };
            readonly lat: {
                readonly type: "number";
                readonly format: "float";
                readonly minimum: -3.402823669209385e+38;
                readonly maximum: 3.402823669209385e+38;
            };
            readonly photo_width: {
                readonly type: "number";
                readonly description: "(Read-only)";
            };
            readonly photo_height: {
                readonly type: "number";
                readonly description: "(Read-only)";
            };
            readonly extracted_info: {
                readonly type: "string";
            };
            readonly is_favourite: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly description: "\n\nValid values are [0,1]";
            };
            readonly class_name: {
                readonly type: "string";
                readonly description: "(Read-only)";
            };
            readonly metadata: {
                readonly type: "object";
                readonly additionalProperties: true;
            };
            readonly signature_data: {
                readonly type: "object";
                readonly description: "(Read-only)";
                readonly properties: {
                    readonly templateSupportsSignature: {
                        readonly type: "boolean";
                        readonly description: "True if the template from which this document was produced supports signing";
                    };
                    readonly documentSnapshotUUID: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly description: "The template mergefield snapshot which captured the unsigned document state";
                    };
                    readonly documentSnapshotExpiresUnixtime: {
                        readonly type: "number";
                        readonly description: "The unixtime at which the snapshot expires";
                    };
                    readonly signedDocumentAttachmentUUID: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly description: "If a signed version of this document exists, references the UUID of the attachment";
                    };
                    readonly unsignedDocumentAttachmentUUID: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly description: "References the UUID of the unsigned version of this document";
                    };
                    readonly signatureDetails: {
                        readonly type: "object";
                        readonly properties: {
                            readonly signatureText: {
                                readonly type: "string";
                                readonly description: "Text entered by the signer as the electronic representation of thier signature";
                            };
                            readonly signatureUnixtime: {
                                readonly type: "number";
                                readonly description: "Unixtime at which the document was signed";
                            };
                            readonly metadata: {
                                readonly type: "object";
                                readonly description: "Optional additional data regarding the signature event";
                                readonly additionalProperties: true;
                            };
                        };
                        readonly required: readonly ["signatureText", "signatureUnixtime"];
                    };
                };
                readonly required: readonly ["templateSupportsSignature"];
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostAttachmentSingle: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-1d49-48ad-9fa3-21db0b95d0db"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly related_object: {
                readonly type: "string";
            };
            readonly related_object_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-46be-44bc-bba4-21db0709e07b"];
            };
            readonly attachment_name: {
                readonly type: "string";
            };
            readonly file_type: {
                readonly type: "string";
            };
            readonly created_by_staff_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-3b7e-423f-aaca-21db072afdfb"];
            };
            readonly timestamp: {
                readonly type: "string";
            };
            readonly attachment_source: {
                readonly type: "string";
            };
            readonly tags: {
                readonly type: "string";
            };
            readonly lng: {
                readonly type: "number";
                readonly format: "float";
                readonly minimum: -3.402823669209385e+38;
                readonly maximum: 3.402823669209385e+38;
            };
            readonly lat: {
                readonly type: "number";
                readonly format: "float";
                readonly minimum: -3.402823669209385e+38;
                readonly maximum: 3.402823669209385e+38;
            };
            readonly photo_width: {
                readonly type: "number";
                readonly description: "(Read-only)";
            };
            readonly photo_height: {
                readonly type: "number";
                readonly description: "(Read-only)";
            };
            readonly extracted_info: {
                readonly type: "string";
            };
            readonly is_favourite: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly description: "\n\nValid values are [0,1]";
            };
            readonly class_name: {
                readonly type: "string";
                readonly description: "(Read-only)";
            };
            readonly metadata: {
                readonly type: "object";
                readonly additionalProperties: true;
            };
            readonly signature_data: {
                readonly type: "object";
                readonly description: "(Read-only)";
                readonly properties: {
                    readonly templateSupportsSignature: {
                        readonly type: "boolean";
                        readonly description: "True if the template from which this document was produced supports signing";
                    };
                    readonly documentSnapshotUUID: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly description: "The template mergefield snapshot which captured the unsigned document state";
                    };
                    readonly documentSnapshotExpiresUnixtime: {
                        readonly type: "number";
                        readonly description: "The unixtime at which the snapshot expires";
                    };
                    readonly signedDocumentAttachmentUUID: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly description: "If a signed version of this document exists, references the UUID of the attachment";
                    };
                    readonly unsignedDocumentAttachmentUUID: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly description: "References the UUID of the unsigned version of this document";
                    };
                    readonly signatureDetails: {
                        readonly type: "object";
                        readonly properties: {
                            readonly signatureText: {
                                readonly type: "string";
                                readonly description: "Text entered by the signer as the electronic representation of thier signature";
                            };
                            readonly signatureUnixtime: {
                                readonly type: "number";
                                readonly description: "Unixtime at which the document was signed";
                            };
                            readonly metadata: {
                                readonly type: "object";
                                readonly description: "Optional additional data regarding the signature event";
                                readonly additionalProperties: true;
                            };
                        };
                        readonly required: readonly ["signatureText", "signatureUnixtime"];
                    };
                };
                readonly required: readonly ["templateSupportsSignature"];
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Attachment";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostBadgeCreate: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-616d-4508-add7-21db0f9e408b"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly name: {
                readonly type: "string";
                readonly description: "Badge Name";
                readonly maxLength: 50;
            };
            readonly automatically_allocated: {
                readonly type: "string";
            };
            readonly file_name: {
                readonly type: "string";
            };
            readonly regarding_form_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-e7c4-45fd-b4c6-21db004e8bab"];
            };
            readonly regarding_asset_type_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-6e9b-41be-ba48-21db0150cd6b"];
            };
        };
        readonly required: readonly ["name"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostBadgeSingle: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-616d-4508-add7-21db0f9e408b"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly name: {
                readonly type: "string";
                readonly description: "Badge Name";
                readonly maxLength: 50;
            };
            readonly automatically_allocated: {
                readonly type: "string";
            };
            readonly file_name: {
                readonly type: "string";
            };
            readonly regarding_form_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-e7c4-45fd-b4c6-21db004e8bab"];
            };
            readonly regarding_asset_type_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-6e9b-41be-ba48-21db0150cd6b"];
            };
        };
        readonly required: readonly ["name"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Badge";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostCategoryCreate: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-0cef-48e6-a167-21db07467d0b"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly name: {
                readonly type: "string";
            };
            readonly colour: {
                readonly type: "string";
            };
        };
        readonly required: readonly ["name"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostCategorySingle: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-0cef-48e6-a167-21db07467d0b"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly name: {
                readonly type: "string";
            };
            readonly colour: {
                readonly type: "string";
            };
        };
        readonly required: readonly ["name"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Category";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostCompanyContactCreate: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-0267-49a6-8504-21db05a64bfb"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly company_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-28c1-47b2-a250-21db0788cd4b"];
            };
            readonly first: {
                readonly type: "string";
            };
            readonly last: {
                readonly type: "string";
            };
            readonly phone: {
                readonly type: "string";
            };
            readonly mobile: {
                readonly type: "string";
            };
            readonly email: {
                readonly type: "string";
                readonly format: "email";
            };
            readonly type: {
                readonly type: "string";
            };
            readonly is_primary_contact: {
                readonly type: "string";
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostCompanyContactSingle: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-0267-49a6-8504-21db05a64bfb"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly company_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-28c1-47b2-a250-21db0788cd4b"];
            };
            readonly first: {
                readonly type: "string";
            };
            readonly last: {
                readonly type: "string";
            };
            readonly phone: {
                readonly type: "string";
            };
            readonly mobile: {
                readonly type: "string";
            };
            readonly email: {
                readonly type: "string";
                readonly format: "email";
            };
            readonly type: {
                readonly type: "string";
            };
            readonly is_primary_contact: {
                readonly type: "string";
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Company Contact";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostCompanyCreate: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-afa7-4fe7-9e76-21db0657c67b"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly name: {
                readonly type: "string";
                readonly maxLength: 100;
            };
            readonly website: {
                readonly type: "string";
            };
            readonly abn_number: {
                readonly type: "string";
            };
            readonly is_individual: {
                readonly type: "string";
            };
            readonly address_street: {
                readonly type: "string";
                readonly maxLength: 500;
            };
            readonly address_city: {
                readonly type: "string";
            };
            readonly address_state: {
                readonly type: "string";
            };
            readonly address_postcode: {
                readonly type: "string";
            };
            readonly address_country: {
                readonly type: "string";
            };
            readonly fax_number: {
                readonly type: "string";
            };
            readonly address: {
                readonly type: "string";
                readonly maxLength: 500;
            };
            readonly billing_address: {
                readonly type: "string";
                readonly maxLength: 500;
            };
            readonly badges: {
                readonly type: "string";
            };
            readonly tax_rate_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-84a9-4609-bed1-21db0363e31b"];
            };
            readonly billing_attention: {
                readonly type: "string";
            };
            readonly payment_terms: {
                readonly type: "string";
            };
        };
        readonly required: readonly ["name"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostCompanySingle: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-afa7-4fe7-9e76-21db0657c67b"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly name: {
                readonly type: "string";
                readonly maxLength: 100;
            };
            readonly website: {
                readonly type: "string";
            };
            readonly abn_number: {
                readonly type: "string";
            };
            readonly is_individual: {
                readonly type: "string";
            };
            readonly address_street: {
                readonly type: "string";
                readonly maxLength: 500;
            };
            readonly address_city: {
                readonly type: "string";
            };
            readonly address_state: {
                readonly type: "string";
            };
            readonly address_postcode: {
                readonly type: "string";
            };
            readonly address_country: {
                readonly type: "string";
            };
            readonly fax_number: {
                readonly type: "string";
            };
            readonly address: {
                readonly type: "string";
                readonly maxLength: 500;
            };
            readonly billing_address: {
                readonly type: "string";
                readonly maxLength: 500;
            };
            readonly badges: {
                readonly type: "string";
            };
            readonly tax_rate_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-84a9-4609-bed1-21db0363e31b"];
            };
            readonly billing_attention: {
                readonly type: "string";
            };
            readonly payment_terms: {
                readonly type: "string";
            };
        };
        readonly required: readonly ["name"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Client";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostEmailTemplateCreate: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-6962-4602-966e-21db00a6b57b"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly name: {
                readonly type: "string";
                readonly maxLength: 50;
            };
            readonly subject: {
                readonly type: "string";
                readonly maxLength: 100;
            };
            readonly message: {
                readonly type: "string";
                readonly maxLength: 1000;
            };
        };
        readonly required: readonly ["name"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostEmailTemplateSingle: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-6962-4602-966e-21db00a6b57b"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly name: {
                readonly type: "string";
                readonly maxLength: 50;
            };
            readonly subject: {
                readonly type: "string";
                readonly maxLength: 100;
            };
            readonly message: {
                readonly type: "string";
                readonly maxLength: 1000;
            };
        };
        readonly required: readonly ["name"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Email Template";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostFeedbackCreate: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-6cdd-447b-ae0b-21db02182d7b"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly timestamp: {
                readonly type: "string";
            };
            readonly related_object: {
                readonly type: "string";
            };
            readonly related_object_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-8d79-4d4d-8a6b-21db0dedc92b"];
            };
            readonly rating: {
                readonly type: "string";
            };
            readonly comment: {
                readonly type: "string";
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostFeedbackSingle: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-6cdd-447b-ae0b-21db02182d7b"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly timestamp: {
                readonly type: "string";
            };
            readonly related_object: {
                readonly type: "string";
            };
            readonly related_object_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-8d79-4d4d-8a6b-21db0dedc92b"];
            };
            readonly rating: {
                readonly type: "string";
            };
            readonly comment: {
                readonly type: "string";
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Feedback";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostFormCreate: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-e417-4322-a5db-21db05dc729b"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly name: {
                readonly type: "string";
            };
            readonly document_template_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-b2a1-4a31-8c2a-21db0c26314b"];
            };
            readonly can_be_used_independently: {
                readonly type: "string";
            };
            readonly badge_mandatory_state: {
                readonly type: "string";
            };
            readonly template_fields: {
                readonly type: "array";
                readonly items: {
                    readonly type: "object";
                    readonly properties: {
                        readonly name: {
                            readonly type: "string";
                        };
                        readonly fieldType: {
                            readonly type: "string";
                            readonly enum: readonly ["Text"];
                        };
                        readonly value: {
                            readonly type: "string";
                        };
                        readonly sortOrder: {
                            readonly type: "integer";
                        };
                    };
                    readonly required: readonly ["name", "fieldType", "value", "sortOrder"];
                };
                readonly minItems: 0;
                readonly maxItems: 10;
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostFormFieldCreate: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-302c-4282-8700-21db0d1cf58b"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly form_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-5bba-4a01-8532-21db0e34afab"];
            };
            readonly name: {
                readonly type: "string";
            };
            readonly field_data_json: {
                readonly type: "string";
            };
            readonly sort_order: {
                readonly type: "string";
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostFormFieldSingle: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-302c-4282-8700-21db0d1cf58b"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly form_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-5bba-4a01-8532-21db0e34afab"];
            };
            readonly name: {
                readonly type: "string";
            };
            readonly field_data_json: {
                readonly type: "string";
            };
            readonly sort_order: {
                readonly type: "string";
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Form Field";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostFormResponseCreate: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-cd8d-4b1b-99b8-21db0309053b"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly form_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-fc29-4d4e-82fd-21db0b08afab"];
            };
            readonly staff_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-8fa0-4598-9f69-21db0b8234db"];
            };
            readonly regarding_object: {
                readonly type: "string";
            };
            readonly regarding_object_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-310a-4d16-ac03-21db01f038fb"];
            };
            readonly field_data: {
                readonly type: "string";
            };
            readonly timestamp: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly form_by_staff_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-e191-4444-a1d5-21db0e424fbb"];
            };
            readonly document_attachment_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-152a-43f6-bfae-21db085b041b"];
            };
            readonly asset_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-7077-4fb9-af4d-21db0845693b"];
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostFormResponseSingle: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-cd8d-4b1b-99b8-21db0309053b"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly form_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-fc29-4d4e-82fd-21db0b08afab"];
            };
            readonly staff_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-8fa0-4598-9f69-21db0b8234db"];
            };
            readonly regarding_object: {
                readonly type: "string";
            };
            readonly regarding_object_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-310a-4d16-ac03-21db01f038fb"];
            };
            readonly field_data: {
                readonly type: "string";
            };
            readonly timestamp: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly form_by_staff_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-e191-4444-a1d5-21db0e424fbb"];
            };
            readonly document_attachment_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-152a-43f6-bfae-21db085b041b"];
            };
            readonly asset_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-7077-4fb9-af4d-21db0845693b"];
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Form Response";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostFormSingle: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-e417-4322-a5db-21db05dc729b"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly name: {
                readonly type: "string";
            };
            readonly document_template_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-b2a1-4a31-8c2a-21db0c26314b"];
            };
            readonly can_be_used_independently: {
                readonly type: "string";
            };
            readonly badge_mandatory_state: {
                readonly type: "string";
            };
            readonly template_fields: {
                readonly type: "array";
                readonly items: {
                    readonly type: "object";
                    readonly properties: {
                        readonly name: {
                            readonly type: "string";
                        };
                        readonly fieldType: {
                            readonly type: "string";
                            readonly enum: readonly ["Text"];
                        };
                        readonly value: {
                            readonly type: "string";
                        };
                        readonly sortOrder: {
                            readonly type: "integer";
                        };
                    };
                    readonly required: readonly ["name", "fieldType", "value", "sortOrder"];
                };
                readonly minItems: 0;
                readonly maxItems: 10;
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Form";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostJobActivityCreate: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-6070-4258-bd53-21db0f0c845b"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly job_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-63cf-4527-9f56-21db088bd0ab"];
            };
            readonly staff_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-5e9d-4161-b1f3-21db086bd9db"];
            };
            readonly start_date: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly end_date: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly activity_was_scheduled: {
                readonly type: "string";
            };
            readonly activity_was_recorded: {
                readonly type: "string";
            };
            readonly activity_was_automated: {
                readonly type: "string";
            };
            readonly has_been_opened: {
                readonly type: "string";
            };
            readonly has_been_opened_timestamp: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly travel_time_in_seconds: {
                readonly type: "string";
            };
            readonly travel_distance_in_meters: {
                readonly type: "string";
            };
            readonly allocated_by_staff_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-7276-4c2d-b206-21db0bfddddb"];
            };
            readonly allocated_timestamp: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly material_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-8484-4411-868b-21db075c5e6b"];
            };
            readonly edit_by_staff_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly readOnly: true;
                readonly description: "Staff Member who last modified record";
                readonly examples: readonly ["123e4567-6c64-4a73-bce1-21db0729220b"];
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostJobActivitySingle: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-6070-4258-bd53-21db0f0c845b"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly job_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-63cf-4527-9f56-21db088bd0ab"];
            };
            readonly staff_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-5e9d-4161-b1f3-21db086bd9db"];
            };
            readonly start_date: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly end_date: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly activity_was_scheduled: {
                readonly type: "string";
            };
            readonly activity_was_recorded: {
                readonly type: "string";
            };
            readonly activity_was_automated: {
                readonly type: "string";
            };
            readonly has_been_opened: {
                readonly type: "string";
            };
            readonly has_been_opened_timestamp: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly travel_time_in_seconds: {
                readonly type: "string";
            };
            readonly travel_distance_in_meters: {
                readonly type: "string";
            };
            readonly allocated_by_staff_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-7276-4c2d-b206-21db0bfddddb"];
            };
            readonly allocated_timestamp: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly material_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-8484-4411-868b-21db075c5e6b"];
            };
            readonly edit_by_staff_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly readOnly: true;
                readonly description: "Staff Member who last modified record";
                readonly examples: readonly ["123e4567-6c64-4a73-bce1-21db0729220b"];
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Job Activity";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostJobAllocationCreate: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-6b51-4ec2-a1ac-21db0e0c1efb"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly job_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-6bd2-4182-a569-21db0eb3202b"];
            };
            readonly queue_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-b20b-4fa8-917f-21db086b0c4b"];
            };
            readonly staff_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-27f6-4c77-8f39-21db01c8e6eb"];
            };
            readonly allocation_date: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly allocation_window_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-46a9-4c37-abfc-21db06e33b4b"];
            };
            readonly allocated_by_staff_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-5787-4324-ae63-21db0c48bb0b"];
            };
            readonly allocated_timestamp: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly expiry_timestamp: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly read_timestamp: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly completion_timestamp: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly estimated_duration: {
                readonly type: "string";
            };
            readonly revised_duration: {
                readonly type: "string";
            };
            readonly sort_priority: {
                readonly type: "string";
            };
            readonly requires_acceptance: {
                readonly type: "string";
            };
            readonly acceptance_status: {
                readonly type: "string";
            };
            readonly acceptance_timestamp: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostJobAllocationSingle: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-6b51-4ec2-a1ac-21db0e0c1efb"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly job_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-6bd2-4182-a569-21db0eb3202b"];
            };
            readonly queue_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-b20b-4fa8-917f-21db086b0c4b"];
            };
            readonly staff_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-27f6-4c77-8f39-21db01c8e6eb"];
            };
            readonly allocation_date: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly allocation_window_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-46a9-4c37-abfc-21db06e33b4b"];
            };
            readonly allocated_by_staff_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-5787-4324-ae63-21db0c48bb0b"];
            };
            readonly allocated_timestamp: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly expiry_timestamp: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly read_timestamp: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly completion_timestamp: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly estimated_duration: {
                readonly type: "string";
            };
            readonly revised_duration: {
                readonly type: "string";
            };
            readonly sort_priority: {
                readonly type: "string";
            };
            readonly requires_acceptance: {
                readonly type: "string";
            };
            readonly acceptance_status: {
                readonly type: "string";
            };
            readonly acceptance_timestamp: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Job Allocation";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostJobChecklistCreate: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-72e6-47d1-b2ef-21db0ae2678b"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly job_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-c767-4fd5-bcec-21db07cf1b7b"];
            };
            readonly name: {
                readonly type: "string";
                readonly maxLength: 256;
            };
            readonly section_name: {
                readonly type: "string";
                readonly maxLength: 256;
            };
            readonly item_type: {
                readonly type: "string";
            };
            readonly sort_order: {
                readonly type: "number";
            };
            readonly completed_timestamp: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly completed_by_staff_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-a6a9-4ebb-8fce-21db0fdc5f4b"];
            };
            readonly completed_during_checkin_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-8c52-4797-9918-21db0c7a9c4b"];
            };
            readonly reminder_type: {
                readonly type: "string";
            };
            readonly reminder_data: {
                readonly type: "object";
                readonly anyOf: readonly [{
                    readonly required: readonly ["absoluteDateTime"];
                    readonly properties: {
                        readonly absoluteDateTime: {
                            readonly type: "string";
                            readonly pattern: "^\\d{4}-\\d{2}-\\d{2}\\ \\d{2}:\\d{2}:\\d{2}$";
                        };
                        readonly relativeDateTime: {
                            readonly type: "object";
                            readonly required: readonly ["baseDate", "unit", "quantity"];
                            readonly properties: {
                                readonly baseDate: {
                                    readonly type: "string";
                                    readonly enum: readonly ["JOB_CREATE_TIME", "NEXT_BOOKING_TIME"];
                                };
                                readonly unit: {
                                    readonly type: "string";
                                    readonly enum: readonly ["DAY", "HOUR", "MINUTE"];
                                };
                                readonly quantity: {
                                    readonly type: "integer";
                                    readonly description: "Number of units to add/subtract from base date. Negative quantities mean the reminder occurs before the base date. Reminders scheduled into the past will not occur.";
                                };
                            };
                        };
                    };
                    readonly type: "object";
                }, {
                    readonly required: readonly ["relativeDateTime"];
                    readonly properties: {
                        readonly absoluteDateTime: {
                            readonly type: "string";
                            readonly pattern: "^\\d{4}-\\d{2}-\\d{2}\\ \\d{2}:\\d{2}:\\d{2}$";
                        };
                        readonly relativeDateTime: {
                            readonly type: "object";
                            readonly required: readonly ["baseDate", "unit", "quantity"];
                            readonly properties: {
                                readonly baseDate: {
                                    readonly type: "string";
                                    readonly enum: readonly ["JOB_CREATE_TIME", "NEXT_BOOKING_TIME"];
                                };
                                readonly unit: {
                                    readonly type: "string";
                                    readonly enum: readonly ["DAY", "HOUR", "MINUTE"];
                                };
                                readonly quantity: {
                                    readonly type: "integer";
                                    readonly description: "Number of units to add/subtract from base date. Negative quantities mean the reminder occurs before the base date. Reminders scheduled into the past will not occur.";
                                };
                            };
                        };
                    };
                    readonly type: "object";
                }, {
                    readonly not: {
                        readonly anyOf: readonly [{
                            readonly anyOf: readonly [{
                                readonly required: readonly ["absoluteDateTime"];
                            }, {
                                readonly required: readonly ["relativeDateTime"];
                            }];
                        }];
                    };
                    readonly properties: {
                        readonly absoluteDateTime: {
                            readonly type: "string";
                            readonly pattern: "^\\d{4}-\\d{2}-\\d{2}\\ \\d{2}:\\d{2}:\\d{2}$";
                        };
                        readonly relativeDateTime: {
                            readonly type: "object";
                            readonly required: readonly ["baseDate", "unit", "quantity"];
                            readonly properties: {
                                readonly baseDate: {
                                    readonly type: "string";
                                    readonly enum: readonly ["JOB_CREATE_TIME", "NEXT_BOOKING_TIME"];
                                };
                                readonly unit: {
                                    readonly type: "string";
                                    readonly enum: readonly ["DAY", "HOUR", "MINUTE"];
                                };
                                readonly quantity: {
                                    readonly type: "integer";
                                    readonly description: "Number of units to add/subtract from base date. Negative quantities mean the reminder occurs before the base date. Reminders scheduled into the past will not occur.";
                                };
                            };
                        };
                    };
                    readonly type: "object";
                }];
            };
            readonly regarding_object: {
                readonly type: "string";
                readonly description: "The type of object which this checklist item is related to. For example, for Form checklists, this will be 'Form'.";
            };
            readonly regarding_object_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "The UUID of the object which this checklists item is related to. For example, for Form checklists, this is the UUID of the Form that must be completed to complete the checklist item.";
                readonly examples: readonly ["123e4567-05ae-4e64-bcef-21db0da92c1b"];
            };
            readonly fulfilled_by_object_name: {
                readonly type: "string";
                readonly description: "The type of object which completes this checklist item. For example, for Form checklists, this will be 'FormResponse'.";
            };
            readonly fulfilled_by_object_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "The UUID of the object which completes this checklist item. For example, for Form checklists, this references the UUID of a FormResponse record.";
                readonly examples: readonly ["123e4567-c68a-4428-bfb7-21db07ab814b"];
            };
            readonly assigned_to_staff_uuids: {
                readonly type: "array";
                readonly format: "uuid";
                readonly items: {
                    readonly type: "string";
                    readonly pattern: "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$";
                    readonly description: "Must be the UUID of a Staff record";
                };
                readonly maxItems: 1;
                readonly examples: readonly ["123e4567-acbf-4b7c-b79f-21db0f9a428b"];
            };
            readonly is_locked: {
                readonly type: "number";
                readonly description: "The UUID of the object which completes this checklist item. For example, for Form checklists, this references the UUID of a FormResponse record. (Read-only). \n\nValid values are [0,1]";
                readonly enum: readonly [0, 1];
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostJobChecklistSingle: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-72e6-47d1-b2ef-21db0ae2678b"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly job_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-c767-4fd5-bcec-21db07cf1b7b"];
            };
            readonly name: {
                readonly type: "string";
                readonly maxLength: 256;
            };
            readonly section_name: {
                readonly type: "string";
                readonly maxLength: 256;
            };
            readonly item_type: {
                readonly type: "string";
            };
            readonly sort_order: {
                readonly type: "number";
            };
            readonly completed_timestamp: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly completed_by_staff_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-a6a9-4ebb-8fce-21db0fdc5f4b"];
            };
            readonly completed_during_checkin_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-8c52-4797-9918-21db0c7a9c4b"];
            };
            readonly reminder_type: {
                readonly type: "string";
            };
            readonly reminder_data: {
                readonly type: "object";
                readonly anyOf: readonly [{
                    readonly required: readonly ["absoluteDateTime"];
                    readonly properties: {
                        readonly absoluteDateTime: {
                            readonly type: "string";
                            readonly pattern: "^\\d{4}-\\d{2}-\\d{2}\\ \\d{2}:\\d{2}:\\d{2}$";
                        };
                        readonly relativeDateTime: {
                            readonly type: "object";
                            readonly required: readonly ["baseDate", "unit", "quantity"];
                            readonly properties: {
                                readonly baseDate: {
                                    readonly type: "string";
                                    readonly enum: readonly ["JOB_CREATE_TIME", "NEXT_BOOKING_TIME"];
                                };
                                readonly unit: {
                                    readonly type: "string";
                                    readonly enum: readonly ["DAY", "HOUR", "MINUTE"];
                                };
                                readonly quantity: {
                                    readonly type: "integer";
                                    readonly description: "Number of units to add/subtract from base date. Negative quantities mean the reminder occurs before the base date. Reminders scheduled into the past will not occur.";
                                };
                            };
                        };
                    };
                    readonly type: "object";
                }, {
                    readonly required: readonly ["relativeDateTime"];
                    readonly properties: {
                        readonly absoluteDateTime: {
                            readonly type: "string";
                            readonly pattern: "^\\d{4}-\\d{2}-\\d{2}\\ \\d{2}:\\d{2}:\\d{2}$";
                        };
                        readonly relativeDateTime: {
                            readonly type: "object";
                            readonly required: readonly ["baseDate", "unit", "quantity"];
                            readonly properties: {
                                readonly baseDate: {
                                    readonly type: "string";
                                    readonly enum: readonly ["JOB_CREATE_TIME", "NEXT_BOOKING_TIME"];
                                };
                                readonly unit: {
                                    readonly type: "string";
                                    readonly enum: readonly ["DAY", "HOUR", "MINUTE"];
                                };
                                readonly quantity: {
                                    readonly type: "integer";
                                    readonly description: "Number of units to add/subtract from base date. Negative quantities mean the reminder occurs before the base date. Reminders scheduled into the past will not occur.";
                                };
                            };
                        };
                    };
                    readonly type: "object";
                }, {
                    readonly not: {
                        readonly anyOf: readonly [{
                            readonly anyOf: readonly [{
                                readonly required: readonly ["absoluteDateTime"];
                            }, {
                                readonly required: readonly ["relativeDateTime"];
                            }];
                        }];
                    };
                    readonly properties: {
                        readonly absoluteDateTime: {
                            readonly type: "string";
                            readonly pattern: "^\\d{4}-\\d{2}-\\d{2}\\ \\d{2}:\\d{2}:\\d{2}$";
                        };
                        readonly relativeDateTime: {
                            readonly type: "object";
                            readonly required: readonly ["baseDate", "unit", "quantity"];
                            readonly properties: {
                                readonly baseDate: {
                                    readonly type: "string";
                                    readonly enum: readonly ["JOB_CREATE_TIME", "NEXT_BOOKING_TIME"];
                                };
                                readonly unit: {
                                    readonly type: "string";
                                    readonly enum: readonly ["DAY", "HOUR", "MINUTE"];
                                };
                                readonly quantity: {
                                    readonly type: "integer";
                                    readonly description: "Number of units to add/subtract from base date. Negative quantities mean the reminder occurs before the base date. Reminders scheduled into the past will not occur.";
                                };
                            };
                        };
                    };
                    readonly type: "object";
                }];
            };
            readonly regarding_object: {
                readonly type: "string";
                readonly description: "The type of object which this checklist item is related to. For example, for Form checklists, this will be 'Form'.";
            };
            readonly regarding_object_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "The UUID of the object which this checklists item is related to. For example, for Form checklists, this is the UUID of the Form that must be completed to complete the checklist item.";
                readonly examples: readonly ["123e4567-05ae-4e64-bcef-21db0da92c1b"];
            };
            readonly fulfilled_by_object_name: {
                readonly type: "string";
                readonly description: "The type of object which completes this checklist item. For example, for Form checklists, this will be 'FormResponse'.";
            };
            readonly fulfilled_by_object_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "The UUID of the object which completes this checklist item. For example, for Form checklists, this references the UUID of a FormResponse record.";
                readonly examples: readonly ["123e4567-c68a-4428-bfb7-21db07ab814b"];
            };
            readonly assigned_to_staff_uuids: {
                readonly type: "array";
                readonly format: "uuid";
                readonly items: {
                    readonly type: "string";
                    readonly pattern: "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$";
                    readonly description: "Must be the UUID of a Staff record";
                };
                readonly maxItems: 1;
                readonly examples: readonly ["123e4567-acbf-4b7c-b79f-21db0f9a428b"];
            };
            readonly is_locked: {
                readonly type: "number";
                readonly description: "The UUID of the object which completes this checklist item. For example, for Form checklists, this references the UUID of a FormResponse record. (Read-only). \n\nValid values are [0,1]";
                readonly enum: readonly [0, 1];
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Job Checklist";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostJobContactCreate: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-8ce0-40af-a8d2-21db0c177cdb"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly job_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-d182-4864-891a-21db01d84a6b"];
            };
            readonly first: {
                readonly type: "string";
            };
            readonly last: {
                readonly type: "string";
            };
            readonly phone: {
                readonly type: "string";
            };
            readonly mobile: {
                readonly type: "string";
            };
            readonly email: {
                readonly type: "string";
                readonly format: "email";
            };
            readonly type: {
                readonly type: "string";
            };
            readonly is_primary_contact: {
                readonly type: "string";
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostJobContactSingle: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-8ce0-40af-a8d2-21db0c177cdb"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly job_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-d182-4864-891a-21db01d84a6b"];
            };
            readonly first: {
                readonly type: "string";
            };
            readonly last: {
                readonly type: "string";
            };
            readonly phone: {
                readonly type: "string";
            };
            readonly mobile: {
                readonly type: "string";
            };
            readonly email: {
                readonly type: "string";
                readonly format: "email";
            };
            readonly type: {
                readonly type: "string";
            };
            readonly is_primary_contact: {
                readonly type: "string";
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Job Contact";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostJobCreate: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-e539-40c9-9ea4-21db0343830b"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly created_by_staff_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-a9e9-4e78-8910-21db08c02ecb"];
            };
            readonly date: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD"];
            };
            readonly company_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-41fc-4af5-aca5-21db07bc319b"];
            };
            readonly job_address: {
                readonly type: "string";
                readonly maxLength: 500;
            };
            readonly billing_address: {
                readonly type: "string";
                readonly maxLength: 500;
            };
            readonly status: {
                readonly type: "string";
            };
            readonly job_description: {
                readonly type: "string";
            };
            readonly work_done_description: {
                readonly type: "string";
            };
            readonly lng: {
                readonly type: "number";
                readonly format: "float";
                readonly minimum: -3.402823669209385e+38;
                readonly maximum: 3.402823669209385e+38;
            };
            readonly lat: {
                readonly type: "number";
                readonly format: "float";
                readonly minimum: -3.402823669209385e+38;
                readonly maximum: 3.402823669209385e+38;
            };
            readonly generated_job_id: {
                readonly type: "string";
                readonly description: "(Read-only)";
            };
            readonly payment_date: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly payment_actioned_by_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-a547-45ae-a094-21db03087d5b"];
            };
            readonly payment_method: {
                readonly type: "string";
            };
            readonly payment_amount: {
                readonly type: "string";
            };
            readonly total_invoice_amount: {
                readonly type: "string";
            };
            readonly category_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-af18-4701-8d91-21db0f31e1db"];
            };
            readonly payment_note: {
                readonly type: "string";
            };
            readonly geo_is_valid: {
                readonly type: "string";
            };
            readonly purchase_order_number: {
                readonly type: "string";
                readonly maxLength: 100;
            };
            readonly invoice_sent: {
                readonly type: "string";
            };
            readonly invoice_sent_stamp: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly ready_to_invoice: {
                readonly type: "string";
            };
            readonly ready_to_invoice_stamp: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly payment_processed: {
                readonly type: "string";
            };
            readonly payment_processed_stamp: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly geo_country: {
                readonly type: "string";
            };
            readonly geo_postcode: {
                readonly type: "string";
            };
            readonly geo_state: {
                readonly type: "string";
            };
            readonly geo_city: {
                readonly type: "string";
            };
            readonly geo_street: {
                readonly type: "string";
            };
            readonly geo_number: {
                readonly type: "string";
            };
            readonly queue_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-1500-485b-93bb-21db07f210eb"];
            };
            readonly queue_expiry_date: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly queue_assigned_staff_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-f641-4a0e-961e-21db0624c4fb"];
            };
            readonly payment_received: {
                readonly type: "string";
            };
            readonly payment_received_stamp: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly badges: {
                readonly type: "string";
            };
            readonly quote_date: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly quote_sent: {
                readonly type: "number";
                readonly description: "(Read-only). \n\nValid values are [0,1]";
                readonly enum: readonly [0, 1];
            };
            readonly quote_sent_stamp: {
                readonly type: "string";
                readonly description: "(Read-only)";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly work_order_date: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly completion_date: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly completion_actioned_by_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-15c5-4ea0-8a01-21db005dfc8b"];
            };
            readonly unsuccessful_date: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly job_is_scheduled_until_stamp: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly active_network_request_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-7620-454e-95ca-21db008d0cab"];
            };
            readonly related_knowledge_articles: {
                readonly type: "array";
                readonly items: {
                    readonly type: "object";
                    readonly properties: {
                        readonly knowledge_article_uuid: {
                            readonly type: "string";
                            readonly format: "uuid";
                        };
                        readonly relevance: {
                            readonly type: "number";
                        };
                    };
                    readonly required: readonly ["knowledge_article_uuid", "relevance"];
                };
            };
        };
        readonly required: readonly ["status"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostJobMaterialBundleCreate: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-8009-4301-adcb-21db00d8b3bb"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly item_number: {
                readonly type: "string";
            };
            readonly name: {
                readonly type: "string";
            };
            readonly quantity: {
                readonly type: "string";
            };
            readonly sort_order: {
                readonly type: "number";
            };
            readonly material_bundle_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "UUID of the MaterialBundle which this JobMaterialBundle was originally created from.";
                readonly examples: readonly ["123e4567-a4e3-44ec-b890-21db09adf79b"];
            };
            readonly job_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-7192-4ce3-bcef-21db0e73b31b"];
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostJobMaterialBundleSingle: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-8009-4301-adcb-21db00d8b3bb"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly item_number: {
                readonly type: "string";
            };
            readonly name: {
                readonly type: "string";
            };
            readonly quantity: {
                readonly type: "string";
            };
            readonly sort_order: {
                readonly type: "number";
            };
            readonly material_bundle_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "UUID of the MaterialBundle which this JobMaterialBundle was originally created from.";
                readonly examples: readonly ["123e4567-a4e3-44ec-b890-21db09adf79b"];
            };
            readonly job_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-7192-4ce3-bcef-21db0e73b31b"];
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Job Material Bundle";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostJobMaterialCreate: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-b4c6-4f01-adc1-21db0b4011fb"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly job_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-da04-4cb5-95d9-21db06f13f9b"];
            };
            readonly material_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-22f9-43b2-a08b-21db0504683b"];
            };
            readonly name: {
                readonly type: "string";
            };
            readonly quantity: {
                readonly type: "string";
            };
            readonly price: {
                readonly type: "string";
            };
            readonly displayed_amount: {
                readonly type: "string";
            };
            readonly displayed_amount_is_tax_inclusive: {
                readonly type: "string";
            };
            readonly tax_rate_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-d779-4fda-98a6-21db03e3173b"];
            };
            readonly sort_order: {
                readonly type: "string";
            };
            readonly cost: {
                readonly type: "string";
            };
            readonly displayed_cost: {
                readonly type: "string";
            };
            readonly job_material_bundle_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "UUID of a JobMaterialBundle which this JobMaterial belongs to. The default value is blank, which means that the JobMaterial is not part of a JobMaterialBundle.";
                readonly examples: readonly ["123e4567-46a5-4804-86c7-21db014fd21b"];
            };
        };
        readonly required: readonly ["quantity"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostJobMaterialSingle: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-b4c6-4f01-adc1-21db0b4011fb"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly job_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-da04-4cb5-95d9-21db06f13f9b"];
            };
            readonly material_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-22f9-43b2-a08b-21db0504683b"];
            };
            readonly name: {
                readonly type: "string";
            };
            readonly quantity: {
                readonly type: "string";
            };
            readonly price: {
                readonly type: "string";
            };
            readonly displayed_amount: {
                readonly type: "string";
            };
            readonly displayed_amount_is_tax_inclusive: {
                readonly type: "string";
            };
            readonly tax_rate_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-d779-4fda-98a6-21db03e3173b"];
            };
            readonly sort_order: {
                readonly type: "string";
            };
            readonly cost: {
                readonly type: "string";
            };
            readonly displayed_cost: {
                readonly type: "string";
            };
            readonly job_material_bundle_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "UUID of a JobMaterialBundle which this JobMaterial belongs to. The default value is blank, which means that the JobMaterial is not part of a JobMaterialBundle.";
                readonly examples: readonly ["123e4567-46a5-4804-86c7-21db014fd21b"];
            };
        };
        readonly required: readonly ["quantity"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Job Material";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostJobPaymentCreate: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-2358-4eee-abfe-21db0128779b"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly job_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-f12a-4446-b0a2-21db0526306b"];
            };
            readonly actioned_by_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-2289-45a5-8ba8-21db0304475b"];
            };
            readonly timestamp: {
                readonly type: "string";
            };
            readonly amount: {
                readonly type: "string";
            };
            readonly method: {
                readonly type: "string";
            };
            readonly note: {
                readonly type: "string";
            };
            readonly attachment_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-7be9-4126-a2d8-21db076c049b"];
            };
            readonly is_deposit: {
                readonly type: "number";
                readonly description: "(Read-only). \n\nValid values are [0,1]";
                readonly enum: readonly [0, 1];
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostJobPaymentSingle: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-2358-4eee-abfe-21db0128779b"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly job_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-f12a-4446-b0a2-21db0526306b"];
            };
            readonly actioned_by_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-2289-45a5-8ba8-21db0304475b"];
            };
            readonly timestamp: {
                readonly type: "string";
            };
            readonly amount: {
                readonly type: "string";
            };
            readonly method: {
                readonly type: "string";
            };
            readonly note: {
                readonly type: "string";
            };
            readonly attachment_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-7be9-4126-a2d8-21db076c049b"];
            };
            readonly is_deposit: {
                readonly type: "number";
                readonly description: "(Read-only). \n\nValid values are [0,1]";
                readonly enum: readonly [0, 1];
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Job Payment";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostJobSingle: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-e539-40c9-9ea4-21db0343830b"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly created_by_staff_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-a9e9-4e78-8910-21db08c02ecb"];
            };
            readonly date: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD"];
            };
            readonly company_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-41fc-4af5-aca5-21db07bc319b"];
            };
            readonly job_address: {
                readonly type: "string";
                readonly maxLength: 500;
            };
            readonly billing_address: {
                readonly type: "string";
                readonly maxLength: 500;
            };
            readonly status: {
                readonly type: "string";
            };
            readonly job_description: {
                readonly type: "string";
            };
            readonly work_done_description: {
                readonly type: "string";
            };
            readonly lng: {
                readonly type: "number";
                readonly format: "float";
                readonly minimum: -3.402823669209385e+38;
                readonly maximum: 3.402823669209385e+38;
            };
            readonly lat: {
                readonly type: "number";
                readonly format: "float";
                readonly minimum: -3.402823669209385e+38;
                readonly maximum: 3.402823669209385e+38;
            };
            readonly generated_job_id: {
                readonly type: "string";
                readonly description: "(Read-only)";
            };
            readonly payment_date: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly payment_actioned_by_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-a547-45ae-a094-21db03087d5b"];
            };
            readonly payment_method: {
                readonly type: "string";
            };
            readonly payment_amount: {
                readonly type: "string";
            };
            readonly total_invoice_amount: {
                readonly type: "string";
            };
            readonly category_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-af18-4701-8d91-21db0f31e1db"];
            };
            readonly payment_note: {
                readonly type: "string";
            };
            readonly geo_is_valid: {
                readonly type: "string";
            };
            readonly purchase_order_number: {
                readonly type: "string";
                readonly maxLength: 100;
            };
            readonly invoice_sent: {
                readonly type: "string";
            };
            readonly invoice_sent_stamp: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly ready_to_invoice: {
                readonly type: "string";
            };
            readonly ready_to_invoice_stamp: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly payment_processed: {
                readonly type: "string";
            };
            readonly payment_processed_stamp: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly geo_country: {
                readonly type: "string";
            };
            readonly geo_postcode: {
                readonly type: "string";
            };
            readonly geo_state: {
                readonly type: "string";
            };
            readonly geo_city: {
                readonly type: "string";
            };
            readonly geo_street: {
                readonly type: "string";
            };
            readonly geo_number: {
                readonly type: "string";
            };
            readonly queue_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-1500-485b-93bb-21db07f210eb"];
            };
            readonly queue_expiry_date: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly queue_assigned_staff_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-f641-4a0e-961e-21db0624c4fb"];
            };
            readonly payment_received: {
                readonly type: "string";
            };
            readonly payment_received_stamp: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly badges: {
                readonly type: "string";
            };
            readonly quote_date: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly quote_sent: {
                readonly type: "number";
                readonly description: "(Read-only). \n\nValid values are [0,1]";
                readonly enum: readonly [0, 1];
            };
            readonly quote_sent_stamp: {
                readonly type: "string";
                readonly description: "(Read-only)";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly work_order_date: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly completion_date: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly completion_actioned_by_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-15c5-4ea0-8a01-21db005dfc8b"];
            };
            readonly unsuccessful_date: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly job_is_scheduled_until_stamp: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly active_network_request_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-7620-454e-95ca-21db008d0cab"];
            };
            readonly related_knowledge_articles: {
                readonly type: "array";
                readonly items: {
                    readonly type: "object";
                    readonly properties: {
                        readonly knowledge_article_uuid: {
                            readonly type: "string";
                            readonly format: "uuid";
                        };
                        readonly relevance: {
                            readonly type: "number";
                        };
                    };
                    readonly required: readonly ["knowledge_article_uuid", "relevance"];
                };
            };
        };
        readonly required: readonly ["status"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Job";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostKnowledgeArticleCreate: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-1497-42f2-9368-21db0c98b51b"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly name: {
                readonly type: "string";
            };
            readonly content: {
                readonly type: "string";
            };
            readonly article_type: {
                readonly type: "string";
            };
            readonly tags: {
                readonly type: "string";
            };
            readonly relationships: {
                readonly type: "array";
                readonly items: {
                    readonly type: "object";
                    readonly properties: {
                        readonly object_name: {
                            readonly type: "string";
                            readonly enum: readonly ["Job", "job"];
                        };
                        readonly object_uuid: {
                            readonly type: "string";
                            readonly format: "uuid";
                        };
                        readonly object_description: {
                            readonly type: "string";
                        };
                        readonly create_date: {
                            readonly type: "string";
                            readonly pattern: "^\\d{4}-\\d{2}-\\d{2}\\ \\d{2}:\\d{2}:\\d{2}$";
                        };
                    };
                    readonly required: readonly ["object_name", "object_uuid"];
                };
            };
        };
        readonly required: readonly ["name"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostKnowledgeArticleSingle: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-1497-42f2-9368-21db0c98b51b"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly name: {
                readonly type: "string";
            };
            readonly content: {
                readonly type: "string";
            };
            readonly article_type: {
                readonly type: "string";
            };
            readonly tags: {
                readonly type: "string";
            };
            readonly relationships: {
                readonly type: "array";
                readonly items: {
                    readonly type: "object";
                    readonly properties: {
                        readonly object_name: {
                            readonly type: "string";
                            readonly enum: readonly ["Job", "job"];
                        };
                        readonly object_uuid: {
                            readonly type: "string";
                            readonly format: "uuid";
                        };
                        readonly object_description: {
                            readonly type: "string";
                        };
                        readonly create_date: {
                            readonly type: "string";
                            readonly pattern: "^\\d{4}-\\d{2}-\\d{2}\\ \\d{2}:\\d{2}:\\d{2}$";
                        };
                    };
                    readonly required: readonly ["object_name", "object_uuid"];
                };
            };
        };
        readonly required: readonly ["name"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Knowledge Article";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostLocationCreate: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-9fd3-4c57-a5fb-21db046572bb"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly name: {
                readonly type: "string";
                readonly description: "Location's name";
                readonly maxLength: 50;
            };
            readonly line1: {
                readonly type: "string";
                readonly maxLength: 100;
            };
            readonly line2: {
                readonly type: "string";
                readonly maxLength: 100;
            };
            readonly line3: {
                readonly type: "string";
                readonly maxLength: 100;
            };
            readonly city: {
                readonly type: "string";
                readonly maxLength: 50;
            };
            readonly country: {
                readonly type: "string";
                readonly maxLength: 100;
            };
            readonly post_code: {
                readonly type: "string";
                readonly maxLength: 100;
            };
            readonly phone_1: {
                readonly type: "string";
                readonly maxLength: 100;
            };
            readonly state: {
                readonly type: "string";
                readonly description: "Address State";
            };
            readonly lng: {
                readonly type: "number";
                readonly format: "float";
                readonly minimum: -3.402823669209385e+38;
                readonly maximum: 3.402823669209385e+38;
            };
            readonly lat: {
                readonly type: "number";
                readonly format: "float";
                readonly minimum: -3.402823669209385e+38;
                readonly maximum: 3.402823669209385e+38;
            };
        };
        readonly required: readonly ["name", "state"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostLocationSingle: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-9fd3-4c57-a5fb-21db046572bb"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly name: {
                readonly type: "string";
                readonly description: "Location's name";
                readonly maxLength: 50;
            };
            readonly line1: {
                readonly type: "string";
                readonly maxLength: 100;
            };
            readonly line2: {
                readonly type: "string";
                readonly maxLength: 100;
            };
            readonly line3: {
                readonly type: "string";
                readonly maxLength: 100;
            };
            readonly city: {
                readonly type: "string";
                readonly maxLength: 50;
            };
            readonly country: {
                readonly type: "string";
                readonly maxLength: 100;
            };
            readonly post_code: {
                readonly type: "string";
                readonly maxLength: 100;
            };
            readonly phone_1: {
                readonly type: "string";
                readonly maxLength: 100;
            };
            readonly state: {
                readonly type: "string";
                readonly description: "Address State";
            };
            readonly lng: {
                readonly type: "number";
                readonly format: "float";
                readonly minimum: -3.402823669209385e+38;
                readonly maximum: 3.402823669209385e+38;
            };
            readonly lat: {
                readonly type: "number";
                readonly format: "float";
                readonly minimum: -3.402823669209385e+38;
                readonly maximum: 3.402823669209385e+38;
            };
        };
        readonly required: readonly ["name", "state"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Location";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostMaterialBundleCreate: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-647c-4c38-975c-21db048ffacb"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly item_number: {
                readonly type: "string";
                readonly maxLength: 30;
            };
            readonly name: {
                readonly type: "string";
            };
            readonly material_list: {
                readonly type: "array";
                readonly items: {
                    readonly type: "object";
                    readonly properties: {
                        readonly uuid: {
                            readonly type: "string";
                            readonly format: "uuid";
                            readonly description: "Must be the UUID of a Material record";
                        };
                        readonly quantity: {
                            readonly type: "number";
                            readonly minimum: 0;
                        };
                    };
                    readonly required: readonly ["uuid", "quantity"];
                };
                readonly minItems: 1;
                readonly maxItems: 50;
            };
        };
        readonly required: readonly ["item_number"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostMaterialBundleSingle: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-647c-4c38-975c-21db048ffacb"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly item_number: {
                readonly type: "string";
                readonly maxLength: 30;
            };
            readonly name: {
                readonly type: "string";
            };
            readonly material_list: {
                readonly type: "array";
                readonly items: {
                    readonly type: "object";
                    readonly properties: {
                        readonly uuid: {
                            readonly type: "string";
                            readonly format: "uuid";
                            readonly description: "Must be the UUID of a Material record";
                        };
                        readonly quantity: {
                            readonly type: "number";
                            readonly minimum: 0;
                        };
                    };
                    readonly required: readonly ["uuid", "quantity"];
                };
                readonly minItems: 1;
                readonly maxItems: 50;
            };
        };
        readonly required: readonly ["item_number"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Bundle";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostMaterialCreate: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-aa23-4dc7-8c7e-21db0649634b"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly name: {
                readonly type: "string";
            };
            readonly item_number: {
                readonly type: "string";
                readonly maxLength: 30;
            };
            readonly price: {
                readonly type: "string";
            };
            readonly cost: {
                readonly type: "string";
            };
            readonly item_description: {
                readonly type: "string";
            };
            readonly quantity_in_stock: {
                readonly type: "number";
            };
            readonly price_includes_taxes: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly description: "\n\nValid values are [0,1]";
            };
            readonly use_description_for_invoicing: {
                readonly type: "string";
            };
            readonly tax_rate_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-e229-48b6-85a3-21db091a6cfb"];
            };
            readonly barcode: {
                readonly type: "string";
            };
            readonly item_is_inventoried: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly description: "\n\nValid values are [0,1]";
            };
        };
        readonly required: readonly ["name"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostMaterialSingle: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-aa23-4dc7-8c7e-21db0649634b"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly name: {
                readonly type: "string";
            };
            readonly item_number: {
                readonly type: "string";
                readonly maxLength: 30;
            };
            readonly price: {
                readonly type: "string";
            };
            readonly cost: {
                readonly type: "string";
            };
            readonly item_description: {
                readonly type: "string";
            };
            readonly quantity_in_stock: {
                readonly type: "number";
            };
            readonly price_includes_taxes: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly description: "\n\nValid values are [0,1]";
            };
            readonly use_description_for_invoicing: {
                readonly type: "string";
            };
            readonly tax_rate_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-e229-48b6-85a3-21db091a6cfb"];
            };
            readonly barcode: {
                readonly type: "string";
            };
            readonly item_is_inventoried: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly description: "\n\nValid values are [0,1]";
            };
        };
        readonly required: readonly ["name"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Material";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostNoteCreate: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-5b77-468b-a8f1-21db04bfd46b"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly related_object: {
                readonly type: "string";
            };
            readonly related_object_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-2e3d-4bba-9fb0-21db0d46300b"];
            };
            readonly note: {
                readonly type: "string";
            };
            readonly action_required: {
                readonly type: "string";
            };
            readonly action_completed_by_staff_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-bd70-4ac9-bf9b-21db08eadb5b"];
            };
            readonly edit_by_staff_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly readOnly: true;
                readonly description: "Staff Member who last modified record";
                readonly examples: readonly ["123e4567-cbed-422c-b253-21db0067805b"];
            };
            readonly create_date: {
                readonly type: "string";
                readonly description: "Record creation timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostNoteSingle: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-5b77-468b-a8f1-21db04bfd46b"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly related_object: {
                readonly type: "string";
            };
            readonly related_object_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-2e3d-4bba-9fb0-21db0d46300b"];
            };
            readonly note: {
                readonly type: "string";
            };
            readonly action_required: {
                readonly type: "string";
            };
            readonly action_completed_by_staff_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-bd70-4ac9-bf9b-21db08eadb5b"];
            };
            readonly edit_by_staff_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly readOnly: true;
                readonly description: "Staff Member who last modified record";
                readonly examples: readonly ["123e4567-cbed-422c-b253-21db0067805b"];
            };
            readonly create_date: {
                readonly type: "string";
                readonly description: "Record creation timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Note";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostQueueCreate: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-3db0-421d-bdbd-21db0b467dab"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly name: {
                readonly type: "string";
            };
            readonly default_timeframe: {
                readonly type: "number";
            };
            readonly subscribed_staff: {
                readonly type: "string";
            };
            readonly requires_assignment: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly description: "\n\nValid values are [0,1]";
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostQueueSingle: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-3db0-421d-bdbd-21db0b467dab"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly name: {
                readonly type: "string";
            };
            readonly default_timeframe: {
                readonly type: "number";
            };
            readonly subscribed_staff: {
                readonly type: "string";
            };
            readonly requires_assignment: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly description: "\n\nValid values are [0,1]";
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Job Queue";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostSecurityRoleCreate: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-7188-4533-9b12-21db066c13db"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly name: {
                readonly type: "string";
                readonly description: "The name given to the security role";
                readonly maxLength: 50;
            };
            readonly role_description: {
                readonly type: "string";
            };
        };
        readonly required: readonly ["name"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostSecurityRoleSingle: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-7188-4533-9b12-21db066c13db"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly name: {
                readonly type: "string";
                readonly description: "The name given to the security role";
                readonly maxLength: 50;
            };
            readonly role_description: {
                readonly type: "string";
            };
        };
        readonly required: readonly ["name"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Security Role";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostSmsTemplateCreate: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-f872-4ac2-8e70-21db085c492b"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly name: {
                readonly type: "string";
                readonly maxLength: 50;
            };
            readonly message: {
                readonly type: "string";
                readonly maxLength: 612;
            };
        };
        readonly required: readonly ["name"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostSmsTemplateSingle: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-f872-4ac2-8e70-21db085c492b"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly name: {
                readonly type: "string";
                readonly maxLength: 50;
            };
            readonly message: {
                readonly type: "string";
                readonly maxLength: 612;
            };
        };
        readonly required: readonly ["name"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the SMS Template";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostStaffCreate: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-e2a2-4517-a16f-21db0472b58b"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly first: {
                readonly type: "string";
                readonly description: "Staff First Name";
                readonly maxLength: 30;
            };
            readonly last: {
                readonly type: "string";
                readonly description: "Staff Last Name";
                readonly maxLength: 30;
            };
            readonly email: {
                readonly type: "string";
                readonly format: "email";
                readonly description: "Staff Email Address. This is also your login name.";
            };
            readonly mobile: {
                readonly type: "string";
            };
            readonly lng: {
                readonly type: "number";
                readonly format: "float";
                readonly minimum: -3.402823669209385e+38;
                readonly maximum: 3.402823669209385e+38;
            };
            readonly lat: {
                readonly type: "number";
                readonly format: "float";
                readonly minimum: -3.402823669209385e+38;
                readonly maximum: 3.402823669209385e+38;
            };
            readonly geo_timestamp: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly job_title: {
                readonly type: "string";
            };
            readonly navigating_to_job_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-50b1-449c-b34e-21db017f019b"];
            };
            readonly navigating_timestamp: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly navigating_expiry_timestamp: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly color: {
                readonly type: "string";
            };
            readonly custom_icon_url: {
                readonly type: "string";
            };
            readonly status_message: {
                readonly type: "string";
            };
            readonly status_message_timestamp: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly can_receive_push_notification: {
                readonly type: "string";
            };
            readonly hide_from_schedule: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly description: "\n\nValid values are [0,1]";
            };
            readonly security_role_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-fecf-43fc-a2be-21db0329776b"];
            };
        };
        readonly required: readonly ["first", "last"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostStaffMessageCreate: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-a21f-4407-9561-21db081478fb"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly from_staff_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-6b83-4841-a484-21db03b38f1b"];
            };
            readonly to_staff_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-a9b8-44d8-9e85-21db0d100f8b"];
            };
            readonly sent_timestamp: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly delivered_timestamp: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly read_timestamp: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly message: {
                readonly type: "string";
            };
            readonly regarding_job_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-5ad3-4c4a-80db-21db045cb7eb"];
            };
            readonly attached_json: {
                readonly type: "string";
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostStaffMessageSingle: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-a21f-4407-9561-21db081478fb"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly from_staff_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-6b83-4841-a484-21db03b38f1b"];
            };
            readonly to_staff_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-a9b8-44d8-9e85-21db0d100f8b"];
            };
            readonly sent_timestamp: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly delivered_timestamp: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly read_timestamp: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly message: {
                readonly type: "string";
            };
            readonly regarding_job_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-5ad3-4c4a-80db-21db045cb7eb"];
            };
            readonly attached_json: {
                readonly type: "string";
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Staff Message";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostStaffSingle: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-e2a2-4517-a16f-21db0472b58b"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly first: {
                readonly type: "string";
                readonly description: "Staff First Name";
                readonly maxLength: 30;
            };
            readonly last: {
                readonly type: "string";
                readonly description: "Staff Last Name";
                readonly maxLength: 30;
            };
            readonly email: {
                readonly type: "string";
                readonly format: "email";
                readonly description: "Staff Email Address. This is also your login name.";
            };
            readonly mobile: {
                readonly type: "string";
            };
            readonly lng: {
                readonly type: "number";
                readonly format: "float";
                readonly minimum: -3.402823669209385e+38;
                readonly maximum: 3.402823669209385e+38;
            };
            readonly lat: {
                readonly type: "number";
                readonly format: "float";
                readonly minimum: -3.402823669209385e+38;
                readonly maximum: 3.402823669209385e+38;
            };
            readonly geo_timestamp: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly job_title: {
                readonly type: "string";
            };
            readonly navigating_to_job_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-50b1-449c-b34e-21db017f019b"];
            };
            readonly navigating_timestamp: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly navigating_expiry_timestamp: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly color: {
                readonly type: "string";
            };
            readonly custom_icon_url: {
                readonly type: "string";
            };
            readonly status_message: {
                readonly type: "string";
            };
            readonly status_message_timestamp: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly can_receive_push_notification: {
                readonly type: "string";
            };
            readonly hide_from_schedule: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly description: "\n\nValid values are [0,1]";
            };
            readonly security_role_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-fecf-43fc-a2be-21db0329776b"];
            };
        };
        readonly required: readonly ["first", "last"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Staff Member";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostTaskCreate: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-0078-496e-85d6-21db0c7a35fb"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly due_date: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD"];
            };
            readonly task_details: {
                readonly type: "string";
            };
            readonly name: {
                readonly type: "string";
            };
            readonly related_object: {
                readonly type: "string";
            };
            readonly related_object_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-d8ee-4433-976b-21db0b7ecd6b"];
            };
            readonly task_complete: {
                readonly type: "string";
            };
            readonly completed_timestamp: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly completed_by_staff_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-2acf-48bc-ae41-21db02c2208b"];
            };
            readonly assigned_to_staff_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-4218-4b45-ae12-21db0172071b"];
            };
            readonly lng: {
                readonly type: "number";
                readonly format: "float";
                readonly minimum: -3.402823669209385e+38;
                readonly maximum: 3.402823669209385e+38;
            };
            readonly lat: {
                readonly type: "number";
                readonly format: "float";
                readonly minimum: -3.402823669209385e+38;
                readonly maximum: 3.402823669209385e+38;
            };
            readonly created_by_staff_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-f551-46e5-8450-21db01069a0b"];
            };
            readonly create_date: {
                readonly type: "string";
                readonly description: "Record creation timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
        };
        readonly required: readonly ["name"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostTaskSingle: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-0078-496e-85d6-21db0c7a35fb"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly due_date: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD"];
            };
            readonly task_details: {
                readonly type: "string";
            };
            readonly name: {
                readonly type: "string";
            };
            readonly related_object: {
                readonly type: "string";
            };
            readonly related_object_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-d8ee-4433-976b-21db0b7ecd6b"];
            };
            readonly task_complete: {
                readonly type: "string";
            };
            readonly completed_timestamp: {
                readonly type: "string";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly completed_by_staff_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-2acf-48bc-ae41-21db02c2208b"];
            };
            readonly assigned_to_staff_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-4218-4b45-ae12-21db0172071b"];
            };
            readonly lng: {
                readonly type: "number";
                readonly format: "float";
                readonly minimum: -3.402823669209385e+38;
                readonly maximum: 3.402823669209385e+38;
            };
            readonly lat: {
                readonly type: "number";
                readonly format: "float";
                readonly minimum: -3.402823669209385e+38;
                readonly maximum: 3.402823669209385e+38;
            };
            readonly created_by_staff_uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly examples: readonly ["123e4567-f551-46e5-8450-21db01069a0b"];
            };
            readonly create_date: {
                readonly type: "string";
                readonly description: "Record creation timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
        };
        readonly required: readonly ["name"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Task";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostTaxRateCreate: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-ea93-44d1-a0b1-21db0045458b"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly name: {
                readonly type: "string";
                readonly maxLength: 50;
            };
            readonly amount: {
                readonly type: "string";
            };
            readonly is_default_tax_rate: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly description: "\n\nValid values are [0,1]";
            };
        };
        readonly required: readonly ["name"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostTaxRateSingle: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-ea93-44d1-a0b1-21db0045458b"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly name: {
                readonly type: "string";
                readonly maxLength: 50;
            };
            readonly amount: {
                readonly type: "string";
            };
            readonly is_default_tax_rate: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly description: "\n\nValid values are [0,1]";
            };
        };
        readonly required: readonly ["name"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Tax Rate";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostVendorSingle: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uuid: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "Record UUID key";
                readonly examples: readonly ["123e4567-a166-4076-8950-21db0ceabc4b"];
            };
            readonly active: {
                readonly type: "number";
                readonly enum: readonly [0, 1];
                readonly default: 1;
                readonly description: "Record active/deleted flag. \n\nValid values are [0,1]";
            };
            readonly edit_date: {
                readonly type: "string";
                readonly readOnly: true;
                readonly description: "Record last modified timestamp";
                readonly examples: readonly ["YYYY-MM-DD HH:MM:SS"];
            };
            readonly name: {
                readonly type: "string";
                readonly description: "Company Name";
                readonly maxLength: 200;
            };
            readonly abn_number: {
                readonly type: "string";
                readonly description: "Company ABN Number (Australian Accounts Only)";
            };
            readonly business_number: {
                readonly type: "string";
            };
            readonly website: {
                readonly type: "string";
                readonly description: "Company Website address";
                readonly maxLength: 100;
            };
            readonly email: {
                readonly type: "string";
                readonly format: "email";
            };
            readonly email_accounts: {
                readonly type: "string";
            };
            readonly billing_address: {
                readonly type: "string";
            };
            readonly accepted_payment_methods: {
                readonly type: "string";
            };
            readonly default_region: {
                readonly type: "string";
            };
            readonly currency: {
                readonly type: "string";
            };
            readonly opening_time_monday: {
                readonly type: "string";
            };
            readonly closing_time_monday: {
                readonly type: "string";
            };
            readonly opening_time_tuesday: {
                readonly type: "string";
            };
            readonly closing_time_tuesday: {
                readonly type: "string";
            };
            readonly opening_time_wednesday: {
                readonly type: "string";
            };
            readonly closing_time_wednesday: {
                readonly type: "string";
            };
            readonly opening_time_thursday: {
                readonly type: "string";
            };
            readonly closing_time_thursday: {
                readonly type: "string";
            };
            readonly opening_time_friday: {
                readonly type: "string";
            };
            readonly closing_time_friday: {
                readonly type: "string";
            };
            readonly opening_time_saturday: {
                readonly type: "string";
            };
            readonly closing_time_saturday: {
                readonly type: "string";
            };
            readonly opening_time_sunday: {
                readonly type: "string";
            };
            readonly closing_time_sunday: {
                readonly type: "string";
            };
            readonly timezone_name: {
                readonly type: "string";
            };
            readonly invoice_terms: {
                readonly type: "string";
            };
            readonly job_default_status: {
                readonly type: "string";
            };
        };
        readonly required: readonly ["name"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly uuid: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "UUID of the Vendor";
                };
            };
            readonly required: readonly ["uuid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["0"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["OK"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly errorCode: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly examples: readonly ["1000"];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["An error occurred completing your request"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
export { DeleteAllocationWindowSingle, DeleteAssetSingle, DeleteAssetTypeFieldSingle, DeleteAssetTypeSingle, DeleteAttachmentSingle, DeleteBadgeSingle, DeleteCategorySingle, DeleteCompanyContactSingle, DeleteCompanySingle, DeleteEmailTemplateSingle, DeleteFeedbackSingle, DeleteFormFieldSingle, DeleteFormResponseSingle, DeleteFormSingle, DeleteJobActivitySingle, DeleteJobAllocationSingle, DeleteJobChecklistSingle, DeleteJobContactSingle, DeleteJobMaterialBundleSingle, DeleteJobMaterialSingle, DeleteJobPaymentSingle, DeleteJobSingle, DeleteKnowledgeArticleSingle, DeleteLocationSingle, DeleteMaterialBundleSingle, DeleteMaterialSingle, DeleteNoteSingle, DeleteQueueSingle, DeleteSecurityRoleSingle, DeleteSmsTemplateSingle, DeleteStaffMessageSingle, DeleteStaffSingle, DeleteTaskSingle, DeleteTaxRateSingle, GetAllocationWindowAll, GetAllocationWindowSingle, GetAssetAll, GetAssetSingle, GetAssetTypeAll, GetAssetTypeFieldAll, GetAssetTypeFieldSingle, GetAssetTypeSingle, GetAttachmentAll, GetAttachmentSingle, GetBadgeAll, GetBadgeSingle, GetCategoryAll, GetCategorySingle, GetCompanyAll, GetCompanyContactAll, GetCompanyContactSingle, GetCompanySingle, GetEmailTemplateAll, GetEmailTemplateSingle, GetFeedbackAll, GetFeedbackSingle, GetFormAll, GetFormFieldAll, GetFormFieldSingle, GetFormResponseAll, GetFormResponseSingle, GetFormSingle, GetJobActivityAll, GetJobActivitySingle, GetJobAll, GetJobAllocationAll, GetJobAllocationSingle, GetJobChecklistAll, GetJobChecklistSingle, GetJobContactAll, GetJobContactSingle, GetJobMaterialAll, GetJobMaterialBundleAll, GetJobMaterialBundleSingle, GetJobMaterialSingle, GetJobPaymentAll, GetJobPaymentSingle, GetJobSingle, GetKnowledgeArticleAll, GetKnowledgeArticleSingle, GetLocationAll, GetLocationSingle, GetMaterialAll, GetMaterialBundleAll, GetMaterialBundleSingle, GetMaterialSingle, GetNoteAll, GetNoteSingle, GetQueueAll, GetQueueSingle, GetSecurityRoleAll, GetSecurityRoleSingle, GetSmsTemplateAll, GetSmsTemplateSingle, GetStaffAll, GetStaffMessageAll, GetStaffMessageSingle, GetStaffSingle, GetTaskAll, GetTaskSingle, GetTaxRateAll, GetTaxRateSingle, GetVendorAll, GetVendorSingle, PostAllocationWindowCreate, PostAllocationWindowSingle, PostAssetSingle, PostAssetTypeCreate, PostAssetTypeFieldCreate, PostAssetTypeFieldSingle, PostAssetTypeSingle, PostAttachmentCreate, PostAttachmentSingle, PostBadgeCreate, PostBadgeSingle, PostCategoryCreate, PostCategorySingle, PostCompanyContactCreate, PostCompanyContactSingle, PostCompanyCreate, PostCompanySingle, PostEmailTemplateCreate, PostEmailTemplateSingle, PostFeedbackCreate, PostFeedbackSingle, PostFormCreate, PostFormFieldCreate, PostFormFieldSingle, PostFormResponseCreate, PostFormResponseSingle, PostFormSingle, PostJobActivityCreate, PostJobActivitySingle, PostJobAllocationCreate, PostJobAllocationSingle, PostJobChecklistCreate, PostJobChecklistSingle, PostJobContactCreate, PostJobContactSingle, PostJobCreate, PostJobMaterialBundleCreate, PostJobMaterialBundleSingle, PostJobMaterialCreate, PostJobMaterialSingle, PostJobPaymentCreate, PostJobPaymentSingle, PostJobSingle, PostKnowledgeArticleCreate, PostKnowledgeArticleSingle, PostLocationCreate, PostLocationSingle, PostMaterialBundleCreate, PostMaterialBundleSingle, PostMaterialCreate, PostMaterialSingle, PostNoteCreate, PostNoteSingle, PostQueueCreate, PostQueueSingle, PostSecurityRoleCreate, PostSecurityRoleSingle, PostSmsTemplateCreate, PostSmsTemplateSingle, PostStaffCreate, PostStaffMessageCreate, PostStaffMessageSingle, PostStaffSingle, PostTaskCreate, PostTaskSingle, PostTaxRateCreate, PostTaxRateSingle, PostVendorSingle };
