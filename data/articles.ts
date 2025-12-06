export interface Article {
    slug: string;
    title: string;
    // Content is now loaded from file
}

export const articles: Article[] = [
    {
        slug: 'future-of-ai',
        title: 'หนังสยองขวัญช่วยให้เราคลายกังวลได้อย่างไร',
    },
    {
        slug: 'mindfulness-meditation',
        title: 'อาหารชนิดใดบ้างที่ทำให้คุณมีกลิ่นกายน่าดึงดูดยิ่งขึ้น',
    }
];
