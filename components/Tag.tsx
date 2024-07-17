export default function Tag({ children }: { children: string[] }) {
  return (
    <div className="flex tag-container">
      {children.map((tag, i) => (
        <div className="post-tag" key={i}>
          {tag}
        </div>
      ))}
    </div>
  );
}
