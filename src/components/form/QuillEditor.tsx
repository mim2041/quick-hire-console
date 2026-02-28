import { useMemo } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

interface QuillEditorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  helperText?: string;
}

export default function QuillEditor({
  label,
  value,
  onChange,
  placeholder,
  required,
  rows = 8,
  helperText,
}: QuillEditorProps) {
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: [] }],
        ["blockquote", "link"],
        ["clean"],
      ],
    }),
    [],
  );

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "align",
    "blockquote",
    "link",
  ];

  const editorHeight = rows * 24;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {helperText && (
          <span className="text-xs text-gray-500">{helperText}</span>
        )}
      </div>

      <div className="quill-wrapper bg-white">
        <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder={placeholder}
          style={{ height: `${editorHeight}px`, marginBottom: "42px" }}
        />
      </div>

      <style>{`
        .quill-wrapper .ql-container {
          border-bottom-left-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
          font-size: 1rem;
        }
        .quill-wrapper .ql-toolbar {
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
          background-color: #f9fafb;
        }
        .quill-wrapper .ql-editor {
          min-height: ${editorHeight}px;
        }
        .quill-wrapper .ql-container.ql-snow,
        .quill-wrapper .ql-toolbar.ql-snow {
          border-color: #d1d5db;
        }
        .quill-wrapper:focus-within .ql-container.ql-snow,
        .quill-wrapper:focus-within .ql-toolbar.ql-snow {
          border-color: #22c55e;
        }
        .quill-wrapper:focus-within .ql-container.ql-snow {
          box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.2);
        }
      `}</style>
    </div>
  );
}

