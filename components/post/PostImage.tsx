export default function PostImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="flex justify-center py-8">
      <img src={src} alt={alt} className="max-w-2xl w-full" />
    </div>
  );
}
