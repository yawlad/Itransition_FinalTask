import ReactMarkdown from "react-markdown";

interface MarkdownWrapperProps {
  children: string;
}

const MarkdownWrapper = ({ children }: MarkdownWrapperProps) => {
  return (
    <ReactMarkdown
      components={{
        h1: ({ node, ...props }) => (
          <h1 className="text-4xl font-bold my-4" {...props} />
        ),
        h2: ({ node, ...props }) => (
          <h2 className="text-3xl font-bold my-3" {...props} />
        ),
        h3: ({ node, ...props }) => (
          <h3 className="text-2xl font-bold my-2" {...props} />
        ),
        h4: ({ node, ...props }) => (
          <h4 className="text-xl font-bold my-2" {...props} />
        ),
        h5: ({ node, ...props }) => (
          <h5 className="text-lg font-bold my-1" {...props} />
        ),
        p: ({ node, ...props }) => <p className="my-4 leading-7" {...props} />,
        ul: ({ node, ...props }) => (
          <ul className="list-disc pl-6 my-4" {...props} />
        ),
        ol: ({ node, ...props }) => (
          <ol className="list-decimal pl-6 my-4" {...props} />
        ),
        li: ({ node, ...props }) => <li className="my-2" {...props} />,
        blockquote: ({ node, ...props }) => (
          <blockquote
            className="border-l-4 pl-4 italic text-gray-600 my-4"
            {...props}
          />
        ),
        a: ({ node, ...props }) => (
          <a className="text-blue-500 underline" {...props} />
        ),
        hr: ({ node, ...props }) => (
          <hr className="my-8 border-t-2 border-gray-300" {...props} />
        ),
        table: ({ node, ...props }) => (
          <table className="w-full my-4 border-collapse" {...props} />
        ),
        th: ({ node, ...props }) => (
          <th className="bg-gray-100 border p-2 font-semibold" {...props} />
        ),
        td: ({ node, ...props }) => <td className="border p-2" {...props} />,
        img: ({ node, ...props }) => <img className="my-4" {...props} />,
        em: ({ node, ...props }) => <em className="italic" {...props} />,
        strong: ({ node, ...props }) => (
          <strong className="font-bold" {...props} />
        ),
        del: ({ node, ...props }) => (
          <del className="line-through" {...props} />
        ),
        pre: ({ node, ...props }) => (
          <pre
            className="my-4 p-4 bg-gray-100 rounded-md overflow-y-auto"
            {...props}
          />
        ),
        br: ({ node, ...props }) => <br {...props} />,
        code: ({ node, ...props }) => (
          <code className="language-shell overflow-y-auto" {...props} />
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
};

export default MarkdownWrapper;
