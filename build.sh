echo "Running Next.js build script with npm"
npm run build

echo "Current directory"
pwd
echo "List files in .next"
ls -la ./.next
echo "List files in .vercel"
ls -la ./.vercel

echo "Copying post markdown files to build output"
cp -r ./post /vercel/output/.next/post_md