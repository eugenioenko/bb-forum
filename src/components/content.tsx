interface PostProps {
  content: string;
}

export const Content = ({ content }: PostProps) => {
  const paragraphs = (content || "").split("\n");
  return (
    <div className="post max-w-[75ch]">
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
};
