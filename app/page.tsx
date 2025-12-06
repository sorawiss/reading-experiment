import Link from 'next/link';
import { articles } from '@/data/articles';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 sm:p-20">
      <main className="max-w-4xl w-full flex flex-col gap-12 items-center">
        <h1 className="text-4xl font-bold text-center tracking-tight">
          Thank for helping me😊🙏
        </h1>
        <p className="text-lg text-muted-foreground text-center max-w-lg">
          Wait for me to start Don't do anything
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/experiment/${article.slug}`}
              className="group block p-6 border border-border rounded-xl hover:bg-muted/50 transition-colors"
            >
              <h2 className="text-2xl font-semibold mb-2 group-hover:text-primary transition-colors">
                {article.title}
              </h2>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
