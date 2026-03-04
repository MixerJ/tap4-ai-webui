type StructuredDataProps = {
  id: string;
  data: Record<string, unknown> | Array<Record<string, unknown>>;
};

export default function StructuredData({ id, data }: StructuredDataProps) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  // JSON-LD requires raw script content instead of escaped text nodes.
  // eslint-disable-next-line react/no-danger
  return <script id={id} type='application/ld+json' dangerouslySetInnerHTML={{ __html: json }} />;
}
