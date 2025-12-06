import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import { articles } from '@/data/articles';
import ExperimentFlow from '@/components/ExperimentFlow';

export function generateStaticParams() {
    return articles.map((article) => ({
        slug: article.slug,
    }));
}

export default async function ExperimentPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const article = articles.find((a) => a.slug === slug);

    if (!article) {
        return notFound();
    }

    const filePath = path.join(process.cwd(), 'data/content', `${slug}.md`);
    let content = '';
    try {
        content = fs.readFileSync(filePath, 'utf8');
    } catch (error) {
        console.error(`Error reading file for slug ${slug}:`, error);
        content = 'Error loading article content.';
    }

    return <ExperimentFlow article={article} content={content} />;
}
