# Java JAX-RS Server API generator for OpenAPI Generator+

An [OpenAPI Generator+](https://github.com/karlvr/openapi-generator-plus) module for a Java API server using JAX-RS.

## Overview

The generated code has useful features:

* Exceptions are used for non-default responses, such as `400` responses, so you can only return the specified status codes.
* Response Exceptions can have an entity type to return with the error response.
* Model objects and enums will be nested in the API service if they are inlined in the specification.

## Using

See the [OpenAPI Generator+](https://github.com/karlvr/openapi-generator-plus) documentation for how to use
generator modules.

## Config file

The available config file properties are:

### Project layout

|Property|Type|Description|Default|
|--------|----|-----------|-------|
|`package`|`string`|Base package name that other default package names will be based on.|`"com.example"`|
|`apiPackage`|`string`|Package for API service interfaces.|`"${package}"`|
|`apiServiceImplPackage`|`string`|Package for API service implementation classes.|`"${apiPackage}.impl"`|
|`modelPackage`|`string`|Package for API model classes.|`"${package}.model"`|
|`invokerPackage`|`string`|Package for API invoker classes.|`"${package}.app"`|
|`relativeSourceOutputPath`|`string`|The path to output generated source code, relative to the output path.|`./` or `./src/main/java` if `maven` is specified.|

### Code style

|Property|Type|Description|Default|
|--------|----|-----------|-------|
|`useBeanValidation`|`boolean`|Whether to use bean validation.|`true`|
|`dateImplementation`|`string`|Date type class.|`"java.time.LocalDate"`|
|`timeImplementation`|`string`|Time type class.|`"java.time.LocalTime"`|
|`dateTimeImplementation`|`string`|Date time type class.|`"java.time.OffsetDateTime"`|
|`constantStyle`|`"allCapsSnake"|"allCaps"|"camelCase"`|The style to use for constant naming.|`"allCapsSnake"`|
|`authenticatedOperationAnnotation`|`string`|Annotation to add to API methods that require authentication.|`undefined`|

### Packaging

|Property|Type|Description|Default|
|--------|----|-----------|-------|
|`maven`|`MavenConfig`|Configuration for generating a Maven `pom.xml`|`undefined`|

#### `MavenConfig`

|Property|Type|Description|Default|
|--------|----|-----------|-------|
|`groupId`|`string`|The Maven module groupId|`com.example`|
|`artifactId`|`string`|The Maven module artifactId|`api-server`|
|`version`|`string`|The Maven module version|`0.0.1`|

### General

|Property|Type|Description|Default|
|--------|----|-----------|-------|
|`hideGenerationTimestamp`|`boolean`|Whether to hide the timestamp in the `@Generated` annotation.|`false`|

### Overrides

|Property|Type|Description|Default|
|--------|----|-----------|-------|
|`imports`|`string[]`|Additional imports to add to all generated classes.|`undefined`|
|`customTemplates`|`string`|The path to a directory containing custom Handlebars templates, relative to the config file. See Customising below.|`undefined`|

## Customising

This generator supports a `customTemplates` config file property to specify a directory containing Handlebars templates that will be used to override built-in templates.

Any custom template will have the original template available as a partial named by prefixing the template name with `original`, and then upper-casing the first letter, e.g. `originalBodyParams`.

Some of the templates in the generator are designed to support overriding for custom requirements. Please inspect the templates in the `templates` directory.