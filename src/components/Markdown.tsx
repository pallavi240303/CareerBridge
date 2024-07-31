import ReactMarkdown from "react-markdown"

interface MarkdownProps {
    children: string
}

export default function Markdown({children} : MarkdownProps){
    return <ReactMarkdown
        className="space-y-3"
        components={{
            ul: (props) => <ul className="list-inside list-disc" {...props}/>,
            a: (props) => (<a className="text-green-500 hover:underline " target="_blank" {...props} />
            ),
        }}
    >
        {children}
    </ReactMarkdown>
}

//since it is a server component , the markdown is also rendered on the server so markdown never actually reaches the client, we execute this on server and client only sees the finished html.