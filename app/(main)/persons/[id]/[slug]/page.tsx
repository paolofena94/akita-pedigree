export default async function PersonPage({
  params,
}: {
  params: Promise<{ id: string; slug: string }>;
}) {
  const { id, slug } = await params;

  return (
    <div>
      Ciao, ID: {id} - Slug: {slug}
    </div>
  );
}