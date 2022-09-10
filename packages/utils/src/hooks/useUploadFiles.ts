import axios from 'axios';
import FormData from 'form-data';
import partition from 'lodash/partition';
import { useState } from 'react';

type File = Blob;
type GetMetaData = (mimeType: string) => Promise<{ url: string; uuid: string; fields: string[][] }>;
type HookArgs = {
  getMeta: GetMetaData;
  beforeUpload?: () => void;
  afterUpload?: () => void;
};

export const useUploadFiles = ({ getMeta, beforeUpload, afterUpload }: HookArgs) => {
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0.0);

  const reset = () => {
    setProgress(0.0);
    setError(null);
  };

  const upload = async (files: File[]) => {
    reset();
    const uploads = await Promise.all(
      files.map(async f => {
        try {
          setProgress(p => (p + 33.33) / files.length);
          beforeUpload?.();
          const { url, uuid, fields } = await getMeta(f.type);
          const formData = new FormData();
          fields.forEach(([name, value]) => formData.append(name, value));
          formData.append('file', f);
          console.log('f', formData);
          setProgress(p => (p + 33.33) / files.length);
          await axios.get(url, { data: formData });
          setProgress(p => (p + 33.33) / files.length);
          afterUpload?.();
          return { url, uuid, type: f.type };
        } catch (err) {
          setError('There was a problem uploading your file(s)');
          return err as Error;
        }
      })
    );

    const [uploadErrs, successfulUploads] = partition(
      uploads,
      (u): u is Error => u instanceof Error
    );
    if (uploadErrs.length) throw uploadErrs[0]; // to be picked up by sentry

    return successfulUploads;
  };

  return {
    errors: error,
    progress: Math.ceil(progress),
    upload,
  };
};

export default useUploadFiles;
