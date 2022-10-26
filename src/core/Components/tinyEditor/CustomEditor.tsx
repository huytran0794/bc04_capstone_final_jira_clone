
import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";
import { EditorProps} from "../../models/common/BaseProps.Interface";
import { initEditorConfig } from "./editorConfig";

const CustomEditor = ({ name, className, formInstance  }: EditorProps) => {
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const handleChange = (newValue: string, editor: TinyMCEEditor) => {
   formInstance?.setFieldValue('description', newValue);   
  };

  return (
    <Editor
      onInit={(evt, editor) => (editorRef.current = editor)}
      init={initEditorConfig}
      onEditorChange={handleChange}
    />
  );
};

export default CustomEditor;
