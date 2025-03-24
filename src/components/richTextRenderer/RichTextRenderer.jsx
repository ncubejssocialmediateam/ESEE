import React from 'react';

const RichTextRenderer = ({ content }) => {
    // Recursive function to render each node
    const renderNode = (node, index) => {
        if (!node) return null;

        // Handle the root node which contains children
        if (node.type === 'root' && node.children) {
            return node.children.map((child, i) => (
                <React.Fragment key={i}>
                    {renderNode(child, i)}
                </React.Fragment>
            ));
        }

        // Render paragraphs
        if (node.type === 'paragraph') {
            return (
                <p key={index}>
                    {node.children && node.children.map((child, i) => renderNode(child, i))}
                </p>
            );
        }

        // Render text nodes (you can add further styling based on properties)
        if (node.type === 'text') {
            // Example: if you had styling options like bold/italic, you might check node.style or node.mode here
            return node.text;
        }

        // Add other cases (e.g., headings, links) if needed
        return null;
    };

    return <div>{renderNode(content.root)}</div>;
};

export default RichTextRenderer;
