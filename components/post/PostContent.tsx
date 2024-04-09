const PostContent = ({ content }: { content: string }) => {
  return <div className="w-full">
    {content.split("\n").map((it, i) => (
            <div key={i}>{it}</div>
          ))}
  </div>;
}
 
export default PostContent;