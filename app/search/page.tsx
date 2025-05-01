import SearchInput from "@/components/SearchInput";

export default function Search() {
  return (
    <div className="w-full mt-64 flex justify-center">
      <div className="flex flex-col items-center gap-8 px-6 text-center max-w-2xl w-full">
        <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-neutral-100">
          포스트를 검색해보세요
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400">
          궁금한 주제를 입력하거나 키워드, 태그, 글 내용을 검색해보세요.
        </p>
        <div className="w-full max-w-xl">
          <SearchInput autoFocus />
        </div>
      </div>
    </div>
  );
}
