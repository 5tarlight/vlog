echo "Running Next.js build script with npm"
npm run build

echo "Current directory"
pwd
echo "List files in current directory"
ls -al

echo "Copying post markdown files to build output"
cp -r ./post /vercel/output/.next/post_md