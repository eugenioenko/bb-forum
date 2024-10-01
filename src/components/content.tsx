interface PostProps {
  content: string;
}

export const Content = ({ content }: PostProps) => {
  return <div className="max-w-[75ch]">{content}</div>;
};
