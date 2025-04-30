import cn from "@yeahx4/cn";

export default function PostSeparator({
  className,
  bold,
}: {
  className?: string;
  bold?: boolean;
}) {
  return (
    <hr
      className={cn(
        "w-full border-neutral-400 dark:border-neutral-400",
        bold ? "border-2 rounded-full" : "border",
        className
      )}
    />
  );
}
