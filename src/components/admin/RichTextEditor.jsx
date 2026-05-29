import { useCallback, useState, useRef, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';

const ACCENT = '#0f9df8';
const COLORS = [
  '#000000', '#1f2937', '#374151', '#0f9df8', '#0c7fd0', '#2563EB', '#7C3AED',
  '#DC2626', '#EA580C', '#D97706', '#16A34A', '#0891B2', '#DB2777', '#64748B',
  '#9CA3AF', '#FFFFFF',
];

const BTN = 'px-2 py-1.5 text-sm rounded hover:bg-gray-100 transition-colors';

function ToolbarButton({ onClick, isActive, children, title, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${BTN} ${isActive ? '' : 'text-gray-600'} ${disabled ? 'opacity-30 cursor-not-allowed' : ''}`}
      style={isActive ? { backgroundColor: 'rgba(15,157,248,0.1)', color: ACCENT } : undefined}
      title={title}
    >
      {children}
    </button>
  );
}

function ColorPicker({ editor, type = 'color' }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const apply = (color) => {
    if (type === 'color') editor.chain().focus().setColor(color).run();
    else editor.chain().focus().toggleHighlight({ color }).run();
    setOpen(false);
  };

  const currentColor = type === 'color' ? (editor?.getAttributes('textStyle')?.color || '#000000') : '#FFFF00';

  return (
    <div className="relative" ref={ref}>
      <button type="button" onClick={() => setOpen(!open)} className={`${BTN} text-gray-600 flex items-center gap-1`} title={type === 'color' ? 'Text Color' : 'Highlight'}>
        {type === 'color' ? (
          <span className="flex flex-col items-center">
            <span className="text-sm font-bold leading-none">A</span>
            <span className="w-4 h-1 rounded-sm mt-0.5" style={{ background: currentColor }} />
          </span>
        ) : (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        )}
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-2 w-[180px]">
          <div className="grid grid-cols-6 gap-1">
            {COLORS.map((c) => (
              <button key={c} type="button" onClick={() => apply(c)} className="w-6 h-6 rounded border border-gray-200 hover:scale-110 transition-transform" style={{ background: c }} title={c} />
            ))}
          </div>
          <div className="mt-2 pt-2 border-t border-gray-100">
            <input type="color" defaultValue={currentColor} onChange={(e) => apply(e.target.value)} className="w-full h-7 cursor-pointer rounded border-0" title="Custom color" />
          </div>
          <button
            type="button"
            onClick={() => { type === 'color' ? editor.chain().focus().unsetColor().run() : editor.chain().focus().unsetHighlight().run(); setOpen(false); }}
            className="w-full text-xs text-gray-400 hover:text-gray-600 mt-1 py-1"
          >
            {type === 'color' ? 'Remove color' : 'Remove highlight'}
          </button>
        </div>
      )}
    </div>
  );
}

function Toolbar({ editor, onImageUpload }) {
  if (!editor) return null;

  const addLink = () => {
    const url = prompt('Enter URL:');
    if (url) editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  return (
    <div className="flex flex-wrap items-center gap-0.5 px-3 py-2 border-b border-gray-200 bg-gray-50/95 backdrop-blur-sm sticky top-0 z-20">
      <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive('heading', { level: 1 })} title="Heading 1">H1</ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })} title="Heading 2">H2</ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} isActive={editor.isActive('heading', { level: 3 })} title="Heading 3">H3</ToolbarButton>

      <div className="w-px h-6 bg-gray-200 mx-1" />

      <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')} title="Bold"><strong>B</strong></ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')} title="Italic"><em>I</em></ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive('underline')} title="Underline"><span className="underline">U</span></ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive('strike')} title="Strikethrough"><s>S</s></ToolbarButton>

      <div className="w-px h-6 bg-gray-200 mx-1" />

      <ColorPicker editor={editor} type="color" />
      <ColorPicker editor={editor} type="highlight" />

      <div className="w-px h-6 bg-gray-200 mx-1" />

      <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('left').run()} isActive={editor.isActive({ textAlign: 'left' })} title="Align Left">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M3 12h12M3 18h18" /></svg>
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('center').run()} isActive={editor.isActive({ textAlign: 'center' })} title="Align Center">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M6 12h12M3 18h18" /></svg>
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('right').run()} isActive={editor.isActive({ textAlign: 'right' })} title="Align Right">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M9 12h12M3 18h18" /></svg>
      </ToolbarButton>

      <div className="w-px h-6 bg-gray-200 mx-1" />

      <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')} title="Bullet List">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')} title="Ordered List">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive('blockquote')} title="Quote">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 17h3l2-4V7H5v6h3l-2 4zm8 0h3l2-4V7h-6v6h3l-2 4z" /></svg>
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} isActive={editor.isActive('codeBlock')} title="Code Block">{'</>'}</ToolbarButton>

      <div className="w-px h-6 bg-gray-200 mx-1" />

      <ToolbarButton onClick={addLink} isActive={editor.isActive('link')} title="Add Link">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
      </ToolbarButton>
      <ToolbarButton onClick={onImageUpload} title="Insert Image">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Horizontal Line">―</ToolbarButton>

      <div className="ml-auto flex items-center gap-0.5">
        <ToolbarButton onClick={() => editor.chain().focus().undo().run()} title="Undo">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a5 5 0 015 5v2M3 10l4-4m-4 4l4 4" /></svg>
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()} title="Redo">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 10H11a5 5 0 00-5 5v2m15-7l-4-4m4 4l-4 4" /></svg>
        </ToolbarButton>
      </div>
    </div>
  );
}

const RichTextEditor = ({ content, onChange, onImageUpload }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      Image.configure({ HTMLAttributes: { class: 'rounded-lg max-w-full h-auto' } }),
      Link.configure({ openOnClick: false, HTMLAttributes: { class: 'text-[#0f9df8] underline' } }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
    ],
    content: content || '<p></p>',
    editorProps: {
      attributes: { class: 'prose prose-sm sm:prose max-w-none focus:outline-none min-h-[400px] px-4 py-3' },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  const handleImageUpload = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = e.target.files?.[0];
      if (!file || !onImageUpload) return;
      const url = await onImageUpload(file);
      if (url && editor) editor.chain().focus().setImage({ src: url, alt: file.name }).run();
    };
    input.click();
  }, [editor, onImageUpload]);

  return (
    <div className="border border-gray-200 rounded-lg bg-white overflow-hidden max-h-[75vh] overflow-y-auto relative">
      <Toolbar editor={editor} onImageUpload={handleImageUpload} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
