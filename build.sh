echo "Running Next.js build script with npm"
npm run build

echo "Current directory"
pwd
echo "List files in .next"
ls -la ./.next

echo "Copying post markdown files to build output"
cp -r ./post .next/post_md

echo "List files in .next after copy"
ls -la ./.next

echo "Content of ./.vercel/project.json"
cat ./.vercel/project.json