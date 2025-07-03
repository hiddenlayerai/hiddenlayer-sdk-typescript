// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as Shared from './shared';

/**
 * Represents the contents of an artifact.
 */
export interface ArtifactContent {
  /**
   * MIME Base64-encoded content from a binary artifact, or from a text artifact in
   * its original encoding.
   */
  binary?: string;

  /**
   * Key/value pairs that provide additional information about the artifact content.
   */
  properties?: PropertyBag;

  /**
   * An alternate rendered representation of the artifact (e.g., a decompiled
   * representation of a binary region).
   */
  rendered?: MultiformatMessageString;

  /**
   * UTF-8-encoded content from a text artifact.
   */
  text?: string;
}

/**
 * Describes a runtime exception encountered during the execution of an analysis
 * tool.
 */
export interface Exception {
  /**
   * An array of exception objects each of which is considered a cause of this
   * exception.
   */
  innerExceptions?: Array<Exception>;

  /**
   * A string that identifies the kind of exception, for example, the fully qualified
   * type name of an object that was thrown, or the symbolic name of a signal.
   */
  kind?: string;

  /**
   * A message that describes the exception.
   */
  message?: string;

  /**
   * Key/value pairs that provide additional information about the exception.
   */
  properties?: PropertyBag;

  /**
   * The sequence of function calls leading to the exception.
   */
  stack?: Exception.Stack;
}

export namespace Exception {
  /**
   * The sequence of function calls leading to the exception.
   */
  export interface Stack {
    /**
     * An array of stack frames that represents a sequence of calls, rendered in
     * reverse chronological order, that comprise the call stack.
     */
    frames: Array<Stack.Frame>;

    /**
     * A message relevant to this call stack.
     */
    message?: Shared.Message;

    /**
     * Key/value pairs that provide additional information about the stack.
     */
    properties?: Shared.PropertyBag;
  }

  export namespace Stack {
    /**
     * A function call within a stack trace.
     */
    export interface Frame {
      /**
       * The location to which this stack frame refers.
       */
      location?: Frame.Location;

      /**
       * The name of the module that contains the code of this stack frame.
       */
      module?: string;

      /**
       * The parameters of the call that is executing.
       */
      parameters?: Array<string>;

      /**
       * Key/value pairs that provide additional information about the stack frame.
       */
      properties?: Shared.PropertyBag;

      /**
       * The thread identifier of the stack frame.
       */
      threadId?: number;
    }

    export namespace Frame {
      /**
       * The location to which this stack frame refers.
       */
      export interface Location {
        /**
         * Value that distinguishes this location from all other locations within a single
         * result object.
         */
        id?: number;

        /**
         * A set of regions relevant to the location.
         */
        annotations?: Array<Shared.Region>;

        /**
         * The logical locations associated with the result.
         */
        logicalLocations?: Array<Location.LogicalLocation>;

        /**
         * A message relevant to the location.
         */
        message?: Shared.Message;

        /**
         * Identifies the artifact and region.
         */
        physicalLocation?: Location.PhysicalLocation;

        /**
         * Key/value pairs that provide additional information about the location.
         */
        properties?: Shared.PropertyBag;

        /**
         * An array of objects that describe relationships between this location and
         * others.
         */
        relationships?: Array<Location.Relationship>;
      }

      export namespace Location {
        /**
         * A logical location of a construct that produced a result.
         */
        export interface LogicalLocation {
          /**
           * The machine-readable name for the logical location, such as a mangled function
           * name provided by a C++ compiler that encodes calling convention, return type and
           * other details along with the function name.
           */
          decoratedName?: string;

          /**
           * The human-readable fully qualified name of the logical location.
           */
          fullyQualifiedName?: string;

          /**
           * The index within the logical locations array.
           */
          index?: number;

          /**
           * The type of construct this logical location component refers to. Should be one
           * of 'function', 'member', 'module', 'namespace', 'parameter', 'resource',
           * 'returnType', 'type', 'variable', 'object', 'array', 'property', 'value',
           * 'element', 'text', 'attribute', 'comment', 'declaration', 'dtd' or
           * 'processingInstruction', if any of those accurately describe the construct.
           */
          kind?: string;

          /**
           * Identifies the construct in which the result occurred. For example, this
           * property might contain the name of a class or a method.
           */
          name?: string;

          /**
           * Identifies the index of the immediate parent of the construct in which the
           * result was detected. For example, this property might point to a logical
           * location that represents the namespace that holds a type.
           */
          parentIndex?: number;

          /**
           * Key/value pairs that provide additional information about the logical location.
           */
          properties?: Shared.PropertyBag;
        }

        /**
         * Identifies the artifact and region.
         */
        export interface PhysicalLocation {
          /**
           * The address of the location.
           */
          address?: PhysicalLocation.Address;

          /**
           * The location of the artifact.
           */
          artifactLocation?: PhysicalLocation.ArtifactLocation;

          /**
           * Specifies a portion of the artifact that encloses the region. Allows a viewer to
           * display additional context around the region.
           */
          contextRegion?: Shared.Region;

          /**
           * Key/value pairs that provide additional information about the physical location.
           */
          properties?: Shared.PropertyBag;

          /**
           * Specifies a portion of the artifact.
           */
          region?: Shared.Region;
        }

        export namespace PhysicalLocation {
          /**
           * The address of the location.
           */
          export interface Address {
            /**
             * The address expressed as a byte offset from the start of the addressable region.
             */
            absoluteAddress?: number;

            /**
             * A human-readable fully qualified name that is associated with the address.
             */
            fullyQualifiedName?: string;

            /**
             * The index within run.addresses of the cached object for this address.
             */
            index?: number;

            /**
             * An open-ended string that identifies the address kind. 'data', 'function',
             * 'header','instruction', 'module', 'page', 'section', 'segment', 'stack',
             * 'stackFrame', 'table' are well-known values.
             */
            kind?: string;

            /**
             * The number of bytes in this range of addresses.
             */
            length?: number;

            /**
             * A name that is associated with the address, e.g., '.text'.
             */
            name?: string;

            /**
             * The byte offset of this address from the absolute or relative address of the
             * parent object.
             */
            offsetFromParent?: number;

            /**
             * The index within run.addresses of the parent object.
             */
            parentIndex?: number;

            /**
             * Key/value pairs that provide additional information about the address.
             */
            properties?: Shared.PropertyBag;

            /**
             * The address expressed as a byte offset from the absolute address of the top-most
             * parent object.
             */
            relativeAddress?: number;
          }

          /**
           * The location of the artifact.
           */
          export interface ArtifactLocation {
            /**
             * A short description of the artifact location.
             */
            description?: Shared.Message;

            /**
             * The index within the run artifacts array of the artifact object associated with
             * the artifact location.
             */
            index?: number;

            /**
             * Key/value pairs that provide additional information about the artifact location.
             */
            properties?: Shared.PropertyBag;

            /**
             * A string containing a valid relative or absolute URI.
             */
            uri?: string;

            /**
             * A string which indirectly specifies the absolute URI with respect to which a
             * relative URI in the "uri" property is interpreted.
             */
            uriBaseId?: string;
          }
        }

        /**
         * Information about the relation of one location to another.
         */
        export interface Relationship {
          /**
           * A reference to the related location.
           */
          target: number;

          /**
           * A description of the location relationship.
           */
          description?: Shared.Message;

          /**
           * A set of distinct strings that categorize the relationship. Well-known kinds
           * include 'includes', 'isIncludedBy' and 'relevant'.
           */
          kinds?: Array<string>;

          /**
           * Key/value pairs that provide additional information about the location
           * relationship.
           */
          properties?: Shared.PropertyBag;
        }
      }
    }
  }
}

/**
 * Encapsulates a message intended to be read by the end user.
 */
export interface Message {
  /**
   * The identifier for this message.
   */
  id?: string;

  /**
   * An array of strings to substitute into the message string.
   */
  arguments?: Array<string>;

  /**
   * A Markdown message string.
   */
  markdown?: string;

  /**
   * Key/value pairs that provide additional information about the message.
   */
  properties?: PropertyBag;

  /**
   * A plain text message string.
   */
  text?: string;
}

/**
 * A message string or message format string rendered in multiple formats.
 */
export interface MultiformatMessageString {
  /**
   * A plain text message string or format string.
   */
  text: string;

  /**
   * A Markdown message string or format string.
   */
  markdown?: string;

  /**
   * Key/value pairs that provide additional information about the message.
   */
  properties?: PropertyBag;
}

/**
 * Represents a node in a graph.
 */
export interface Node {
  /**
   * A string that uniquely identifies the node within its graph.
   */
  id: string;

  /**
   * Array of child nodes.
   */
  children?: Array<Node>;

  /**
   * A short description of the node.
   */
  label?: Message;

  /**
   * A code location associated with the node.
   */
  location?: Node.Location;

  /**
   * Key/value pairs that provide additional information about the node.
   */
  properties?: PropertyBag;
}

export namespace Node {
  /**
   * A code location associated with the node.
   */
  export interface Location {
    /**
     * Value that distinguishes this location from all other locations within a single
     * result object.
     */
    id?: number;

    /**
     * A set of regions relevant to the location.
     */
    annotations?: Array<Shared.Region>;

    /**
     * The logical locations associated with the result.
     */
    logicalLocations?: Array<Location.LogicalLocation>;

    /**
     * A message relevant to the location.
     */
    message?: Shared.Message;

    /**
     * Identifies the artifact and region.
     */
    physicalLocation?: Location.PhysicalLocation;

    /**
     * Key/value pairs that provide additional information about the location.
     */
    properties?: Shared.PropertyBag;

    /**
     * An array of objects that describe relationships between this location and
     * others.
     */
    relationships?: Array<Location.Relationship>;
  }

  export namespace Location {
    /**
     * A logical location of a construct that produced a result.
     */
    export interface LogicalLocation {
      /**
       * The machine-readable name for the logical location, such as a mangled function
       * name provided by a C++ compiler that encodes calling convention, return type and
       * other details along with the function name.
       */
      decoratedName?: string;

      /**
       * The human-readable fully qualified name of the logical location.
       */
      fullyQualifiedName?: string;

      /**
       * The index within the logical locations array.
       */
      index?: number;

      /**
       * The type of construct this logical location component refers to. Should be one
       * of 'function', 'member', 'module', 'namespace', 'parameter', 'resource',
       * 'returnType', 'type', 'variable', 'object', 'array', 'property', 'value',
       * 'element', 'text', 'attribute', 'comment', 'declaration', 'dtd' or
       * 'processingInstruction', if any of those accurately describe the construct.
       */
      kind?: string;

      /**
       * Identifies the construct in which the result occurred. For example, this
       * property might contain the name of a class or a method.
       */
      name?: string;

      /**
       * Identifies the index of the immediate parent of the construct in which the
       * result was detected. For example, this property might point to a logical
       * location that represents the namespace that holds a type.
       */
      parentIndex?: number;

      /**
       * Key/value pairs that provide additional information about the logical location.
       */
      properties?: Shared.PropertyBag;
    }

    /**
     * Identifies the artifact and region.
     */
    export interface PhysicalLocation {
      /**
       * The address of the location.
       */
      address?: PhysicalLocation.Address;

      /**
       * The location of the artifact.
       */
      artifactLocation?: PhysicalLocation.ArtifactLocation;

      /**
       * Specifies a portion of the artifact that encloses the region. Allows a viewer to
       * display additional context around the region.
       */
      contextRegion?: Shared.Region;

      /**
       * Key/value pairs that provide additional information about the physical location.
       */
      properties?: Shared.PropertyBag;

      /**
       * Specifies a portion of the artifact.
       */
      region?: Shared.Region;
    }

    export namespace PhysicalLocation {
      /**
       * The address of the location.
       */
      export interface Address {
        /**
         * The address expressed as a byte offset from the start of the addressable region.
         */
        absoluteAddress?: number;

        /**
         * A human-readable fully qualified name that is associated with the address.
         */
        fullyQualifiedName?: string;

        /**
         * The index within run.addresses of the cached object for this address.
         */
        index?: number;

        /**
         * An open-ended string that identifies the address kind. 'data', 'function',
         * 'header','instruction', 'module', 'page', 'section', 'segment', 'stack',
         * 'stackFrame', 'table' are well-known values.
         */
        kind?: string;

        /**
         * The number of bytes in this range of addresses.
         */
        length?: number;

        /**
         * A name that is associated with the address, e.g., '.text'.
         */
        name?: string;

        /**
         * The byte offset of this address from the absolute or relative address of the
         * parent object.
         */
        offsetFromParent?: number;

        /**
         * The index within run.addresses of the parent object.
         */
        parentIndex?: number;

        /**
         * Key/value pairs that provide additional information about the address.
         */
        properties?: Shared.PropertyBag;

        /**
         * The address expressed as a byte offset from the absolute address of the top-most
         * parent object.
         */
        relativeAddress?: number;
      }

      /**
       * The location of the artifact.
       */
      export interface ArtifactLocation {
        /**
         * A short description of the artifact location.
         */
        description?: Shared.Message;

        /**
         * The index within the run artifacts array of the artifact object associated with
         * the artifact location.
         */
        index?: number;

        /**
         * Key/value pairs that provide additional information about the artifact location.
         */
        properties?: Shared.PropertyBag;

        /**
         * A string containing a valid relative or absolute URI.
         */
        uri?: string;

        /**
         * A string which indirectly specifies the absolute URI with respect to which a
         * relative URI in the "uri" property is interpreted.
         */
        uriBaseId?: string;
      }
    }

    /**
     * Information about the relation of one location to another.
     */
    export interface Relationship {
      /**
       * A reference to the related location.
       */
      target: number;

      /**
       * A description of the location relationship.
       */
      description?: Shared.Message;

      /**
       * A set of distinct strings that categorize the relationship. Well-known kinds
       * include 'includes', 'isIncludedBy' and 'relevant'.
       */
      kinds?: Array<string>;

      /**
       * Key/value pairs that provide additional information about the location
       * relationship.
       */
      properties?: Shared.PropertyBag;
    }
  }
}

/**
 * Key/value pairs that provide additional information about the object.
 */
export interface PropertyBag {
  /**
   * A set of distinct strings that provide additional information.
   */
  tags?: Array<string>;

  [k: string]: unknown;
}

/**
 * A region within an artifact where a result was detected.
 */
export interface Region {
  /**
   * The length of the region in bytes.
   */
  byteLength?: number;

  /**
   * The zero-based offset from the beginning of the artifact of the first byte in
   * the region.
   */
  byteOffset?: number;

  /**
   * The length of the region in characters.
   */
  charLength?: number;

  /**
   * The zero-based offset from the beginning of the artifact of the first character
   * in the region.
   */
  charOffset?: number;

  /**
   * The column number of the character following the end of the region.
   */
  endColumn?: number;

  /**
   * The line number of the last character in the region.
   */
  endLine?: number;

  /**
   * A message relevant to the region.
   */
  message?: Message;

  /**
   * Key/value pairs that provide additional information about the region.
   */
  properties?: PropertyBag;

  /**
   * The portion of the artifact contents within the specified region.
   */
  snippet?: ArtifactContent;

  /**
   * Specifies the source language, if any, of the portion of the artifact specified
   * by the region object.
   */
  sourceLanguage?: string;

  /**
   * The column number of the first character in the region.
   */
  startColumn?: number;

  /**
   * The line number of the first character in the region.
   */
  startLine?: number;
}
