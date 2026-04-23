"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Heading2,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo2,
  Undo2,
} from "lucide-react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

type RichTextTheme = "emerald" | "yellow" | "blue";

interface RichTextEditorProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  theme?: RichTextTheme;
  minHeightClassName?: string;
}

const themeStyles: Record<
  RichTextTheme,
  {
    border: string;
    toolbarBg: string;
    text: string;
    hoverBg: string;
    activeBg: string;
    activeText: string;
    quoteBorder: string;
    headingText: string;
  }
> = {
  emerald: {
    border: "border-emerald-200",
    toolbarBg: "bg-emerald-50/60",
    text: "text-emerald-700",
    hoverBg: "hover:bg-emerald-50",
    activeBg: "bg-emerald-100",
    activeText: "text-emerald-900",
    quoteBorder: "[&_blockquote]:border-emerald-300",
    headingText: "[&_h2]:text-emerald-900",
  },
  yellow: {
    border: "border-yellow-200",
    toolbarBg: "bg-yellow-50/60",
    text: "text-yellow-700",
    hoverBg: "hover:bg-yellow-50",
    activeBg: "bg-yellow-100",
    activeText: "text-yellow-900",
    quoteBorder: "[&_blockquote]:border-yellow-300",
    headingText: "[&_h2]:text-yellow-900",
  },
  blue: {
    border: "border-blue-200",
    toolbarBg: "bg-blue-50/60",
    text: "text-blue-700",
    hoverBg: "hover:bg-blue-50",
    activeBg: "bg-blue-100",
    activeText: "text-blue-900",
    quoteBorder: "[&_blockquote]:border-blue-300",
    headingText: "[&_h2]:text-blue-900",
  },
};

export function RichTextEditor({
  value,
  onChange,
  placeholder,
  theme = "emerald",
  minHeightClassName = "min-h-[180px]",
}: RichTextEditorProps) {
  const styles = themeStyles[theme];

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3],
        },
      }),
      Placeholder.configure({
        placeholder:
          placeholder || "Write a detailed description with formatting...",
      }),
    ],
    content: value || "",
    editorProps: {
      attributes: {
        class: `${minHeightClassName} px-3 py-2 text-sm rounded-b-md border border-t-0 ${styles.border} focus:outline-none [&_h2]:text-xl [&_h2]:font-bold ${styles.headingText} [&_h2]:mb-2 [&_p]:my-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-2 [&_blockquote]:border-l-4 ${styles.quoteBorder} [&_blockquote]:pl-3 [&_blockquote]:italic`,
      },
    },
    immediatelyRender: false,
    onUpdate: ({ editor: nextEditor }) => {
      onChange(nextEditor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) {
      return;
    }

    const nextContent = value || "";
    if (editor.getHTML() !== nextContent) {
      editor.commands.setContent(nextContent, { emitUpdate: false });
    }
  }, [editor, value]);

  const toolbarButtonClass = `h-8 w-8 p-0 ${styles.border} ${styles.text} ${styles.hoverBg}`;
  const activeToolbarButtonClass = `${styles.activeBg} ${styles.activeText}`;

  return (
    <div className="rounded-md overflow-hidden">
      <div
        className={`flex flex-wrap gap-2 p-2 border ${styles.border} ${styles.toolbarBg} rounded-t-md`}
      >
        <Button
          type="button"
          variant="outline"
          size="icon"
          className={`${toolbarButtonClass} ${editor?.isActive("bold") ? activeToolbarButtonClass : ""}`}
          onClick={() => editor?.chain().focus().toggleBold().run()}
          disabled={!editor?.can().chain().focus().toggleBold().run()}
          aria-label="Toggle bold"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className={`${toolbarButtonClass} ${editor?.isActive("italic") ? activeToolbarButtonClass : ""}`}
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          disabled={!editor?.can().chain().focus().toggleItalic().run()}
          aria-label="Toggle italic"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className={`${toolbarButtonClass} ${editor?.isActive("heading", { level: 2 }) ? activeToolbarButtonClass : ""}`}
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 2 }).run()
          }
          disabled={
            !editor?.can().chain().focus().toggleHeading({ level: 2 }).run()
          }
          aria-label="Toggle heading"
        >
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className={`${toolbarButtonClass} ${editor?.isActive("bulletList") ? activeToolbarButtonClass : ""}`}
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          disabled={!editor?.can().chain().focus().toggleBulletList().run()}
          aria-label="Toggle bullet list"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className={`${toolbarButtonClass} ${editor?.isActive("orderedList") ? activeToolbarButtonClass : ""}`}
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          disabled={!editor?.can().chain().focus().toggleOrderedList().run()}
          aria-label="Toggle ordered list"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className={`${toolbarButtonClass} ${editor?.isActive("blockquote") ? activeToolbarButtonClass : ""}`}
          onClick={() => editor?.chain().focus().toggleBlockquote().run()}
          disabled={!editor?.can().chain().focus().toggleBlockquote().run()}
          aria-label="Toggle quote"
        >
          <Quote className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className={toolbarButtonClass}
          onClick={() => editor?.chain().focus().undo().run()}
          disabled={!editor?.can().chain().focus().undo().run()}
          aria-label="Undo"
        >
          <Undo2 className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className={toolbarButtonClass}
          onClick={() => editor?.chain().focus().redo().run()}
          disabled={!editor?.can().chain().focus().redo().run()}
          aria-label="Redo"
        >
          <Redo2 className="h-4 w-4" />
        </Button>
      </div>
      <div
        className={`bg-white ${styles.border} [&_.ProseMirror:focus]:outline-none`}
      >
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
