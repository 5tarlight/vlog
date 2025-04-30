import cn from "@yeahx4/cn";

export default function Tag({ children }: { children: string }) {
  return (
    <span
      className={cn(
        "bg-neutral-200/70 rounded-full px-2 text-sm",
        "transition-all duration-200 dark:bg-neutral-600/70",
        "text-neutral-500 dark:text-neutral-400"
      )}
    >
      {children}
    </span>
  );
}
