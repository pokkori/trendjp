interface ArticleContentProps {
  content: string;
}

export default function ArticleContent({ content }: ArticleContentProps) {
  if (!content) return null;

  const paragraphs = content.split('\n').filter((p) => p.trim().length > 0);

  return (
    <div className="space-y-4">
      {paragraphs.map((paragraph, index) => (
        <p
          key={index}
          style={{
            fontSize: '16px',
            lineHeight: '1.8',
            color: '#e2e8f0',
          }}
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
}
