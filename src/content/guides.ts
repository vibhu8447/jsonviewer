export interface Guide {
  slug: string;
  title: string;
  description: string;
  sections: GuideSection[];
}

export interface GuideSection {
  heading: string;
  paragraphs: string[];
  list?: string[];
  code?: string;
}

export const GUIDES: Guide[] = [
  {
    slug: 'what-is-json',
    title: 'What is JSON?',
    description:
      'A plain-language introduction to JSON: what it is, how it is structured, and when to use it.',
    sections: [
      {
        heading: 'A compact data format',
        paragraphs: [
          'JSON (JavaScript Object Notation) is a text format for representing structured data. It is used by APIs, configuration files, log exports, and many desktop and web applications because it is easy for people to read and easy for programs to parse.',
          'A JSON document is built from a small set of value types: objects, arrays, strings, numbers, booleans, and null. Objects are collections of named fields. Arrays are ordered lists. Everything else is a primitive value.',
        ],
      },
      {
        heading: 'The basic building blocks',
        paragraphs: [
          'An object is wrapped in curly braces and contains key/value pairs. Keys must be strings written in double quotes. An array is wrapped in square brackets. Strings also use double quotes. Numbers are written without quotes. The literals true, false, and null are written exactly that way, in lowercase.',
        ],
        code: `{
  "name": "Ada",
  "active": true,
  "roles": ["editor", "reviewer"],
  "score": 18.5,
  "manager": null
}`,
      },
      {
        heading: 'Rules that often surprise people',
        paragraphs: [
          'JSON looks similar to a JavaScript object, but it is stricter. Trailing commas are not allowed. Single quotes are not allowed. Comments are not part of the standard. Keys must be quoted. These rules are why a file that “looks fine” can still fail validation.',
        ],
        list: [
          'Use double quotes for every key and every string.',
          'Do not leave a comma after the last item in an object or array.',
          'Do not include // or /* */ comments in standard JSON.',
          'Write true, false, and null in lowercase.',
        ],
      },
      {
        heading: 'When JSON is a good fit',
        paragraphs: [
          'JSON works well when you need a portable snapshot of data: an API response, a saved editor state, a list of records, or a settings file. It is a poor fit for large binary files, streaming media, or documents that need comments and a more human-oriented config syntax.',
          'If you are inspecting an API payload or a saved export, paste it into the viewer on this site. The tree view shows each key, type, and nested value so you can confirm the shape before you write code against it.',
        ],
      },
    ],
  },
  {
    slug: 'format-json',
    title: 'How to format and beautify JSON',
    description:
      'How pretty-printing works, why indentation matters, and how to clean up minified JSON safely.',
    sections: [
      {
        heading: 'What formatting does',
        paragraphs: [
          'Formatting, also called pretty-printing or beautifying, takes valid JSON and rewrites it with consistent indentation and line breaks. The data does not change. Only the whitespace changes. That makes nested objects easier to scan and compare.',
          'Minified JSON is the opposite: all unnecessary whitespace is removed so the payload is smaller. APIs often send minified JSON. People usually want the formatted version when they are reading it.',
        ],
      },
      {
        heading: 'Format JSON in this viewer',
        paragraphs: [
          'Paste your JSON into the input panel, or load a .json file. If the text is valid, the Format button rewrites it with two-space indentation. If the text is invalid, the viewer shows a parse error instead of guessing. That is intentional. Auto-repair can hide the real problem in an API response.',
        ],
        list: [
          'Paste or open the JSON file.',
          'Check the error banner if the document does not parse.',
          'Use Format to beautify valid JSON.',
          'Use Remove white space when you need a compact copy.',
        ],
      },
      {
        heading: 'Keep formatting separate from editing meaning',
        paragraphs: [
          'Pretty-printing should not reorder keys, convert numbers to strings, or drop null fields. If a tool changes values while “formatting,” it is no longer only formatting. This viewer pretty-prints from the parsed value and then serializes it back to standard JSON.',
          'If you need to compare two payloads, format both first. Differences in spacing will otherwise look like data changes.',
        ],
      },
      {
        heading: 'A compact example',
        paragraphs: ['This minified line:'],
        code: `{"user":{"id":42,"name":"Sam"},"ok":true}`,
      },
      {
        heading: 'Becomes readable JSON',
        paragraphs: ['After formatting, the same document is easier to inspect:'],
        code: `{
  "user": {
    "id": 42,
    "name": "Sam"
  },
  "ok": true
}`,
      },
    ],
  },
  {
    slug: 'validate-json',
    title: 'How to validate JSON and fix common errors',
    description:
      'The most common JSON parse errors and a practical way to find and fix them.',
    sections: [
      {
        heading: 'Validation means “does this parse?”',
        paragraphs: [
          'A JSON validator checks whether text follows the JSON grammar. It does not check whether your business fields are correct. A document can be valid JSON and still be the wrong shape for your application. Start with parse errors, then check the schema your code expects.',
          'This viewer validates as you type. When parsing fails, the message includes the issue the browser reported. Use that together with the input panel to find the first broken token.',
        ],
      },
      {
        heading: 'Errors you will see most often',
        paragraphs: [
          'Most invalid JSON comes from a handful of habits copied from JavaScript or from hand-edited files.',
        ],
        list: [
          'Trailing comma after the last property: { "a": 1, }',
          'Single quotes: { \'a\': 1 }',
          'Unquoted keys: { a: 1 }',
          'Comments: { "a": 1 /* flag */ }',
          'A missing comma between two properties.',
          'An extra closing brace or bracket.',
          'A string that contains a raw line break instead of \\n.',
        ],
      },
      {
        heading: 'A reliable repair process',
        paragraphs: [
          'Fix the first error, then re-validate. Later errors are often knock-on effects of the first one. If the payload came from an API, compare it with a known-good example rather than rewriting the document from memory.',
          'If only one field looks wrong, check whether a number was quoted, whether null was written as "null", or whether a trailing comma was introduced by a code generator.',
        ],
      },
      {
        heading: 'Valid versus useful',
        paragraphs: [
          'After the document parses, use the tree view to confirm types. A field that should be a number but arrives as a string will parse successfully and still break your code. The type badges in the viewer are there for that check.',
        ],
      },
    ],
  },
  {
    slug: 'minify-json',
    title: 'How to minify JSON',
    description:
      'When to remove whitespace from JSON, what minification does not do, and how to keep a readable copy.',
    sections: [
      {
        heading: 'Why minify',
        paragraphs: [
          'Minifying JSON removes spaces, tabs, and line breaks that are not required by the format. The result is smaller to store and faster to transfer. That matters for large API responses, fixtures checked into a repository, or payloads you paste into a request body.',
          'Minification does not compress the file in the gzip or brotli sense. It only strips insignificant whitespace. Network compression can still be applied on top.',
        ],
      },
      {
        heading: 'What stays the same',
        paragraphs: [
          'Keys, strings, numbers, and structure stay the same. "Remove white space" on this site parses the JSON and serializes it without extra formatting. If the input is invalid, nothing is rewritten.',
        ],
        code: `{"items":[{"id":1,"label":"alpha"},{"id":2,"label":"beta"}]}`,
      },
      {
        heading: 'Keep a readable source',
        paragraphs: [
          'Store the formatted version in documentation and in files that people edit. Minify only when you need a compact copy for transport. If you minify the only copy you have, the next person who opens the file will have to beautify it again before they can review it.',
          'For very large documents, minify in the browser, copy the result, and keep working from the formatted original.',
        ],
      },
    ],
  },
  {
    slug: 'json-vs-xml',
    title: 'JSON vs XML',
    description:
      'A practical comparison of JSON and XML so you can choose the right format for an API or file.',
    sections: [
      {
        heading: 'Two formats, different jobs',
        paragraphs: [
          'JSON and XML can both represent nested data, but they grew up in different ecosystems. JSON is the default for most modern HTTP APIs. XML is still common in enterprise messaging, document formats, and older SOAP services.',
          'Choose based on the consumers you have, not on which format is newer. If your partners already speak XML, converting everything to JSON may cost more than it saves.',
        ],
      },
      {
        heading: 'Where JSON is usually simpler',
        paragraphs: [
          'JSON maps cleanly to objects and arrays in most programming languages. There is no attribute-versus-element decision. A field is just a name and a value. That is why client code for JSON APIs is often shorter.',
        ],
        list: [
          'Objects and arrays match everyday data structures.',
          'Typical payloads are smaller than the equivalent XML.',
          'Browser and server tooling for JSON is everywhere.',
          'Types such as numbers and booleans are first-class.',
        ],
      },
      {
        heading: 'Where XML still wins',
        paragraphs: [
          'XML has a mature story for mixed documents, namespaces, schemas, and comments. If you are marking up a document rather than serializing a record, XML (or another document format) is often the better model. JSON Schema exists, but XML Schema and related standards have a longer history in regulated industries.',
          'XML can also carry attributes on an element without turning every property into a child node. JSON has no direct equivalent; you encode that information as nested objects instead.',
        ],
      },
      {
        heading: 'A side-by-side sketch',
        paragraphs: [
          'The same record is usually shorter in JSON. That does not make JSON “better” for every file. It does make JSON a strong default when you are designing a new public API for web and mobile clients.',
        ],
        code: `{
  "id": "8f2a",
  "title": "Quarterly report",
  "published": true
}`,
      },
    ],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((guide) => guide.slug === slug);
}
