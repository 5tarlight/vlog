export default function Tag({ children }: { children: string[] }) {
  return (
    <div className="flex tag-container">
      {children.map((tag, i) => (
        <div className="tag" key={i}>
          {tag}
        </div>
      ))}
    </div>
  );
}
