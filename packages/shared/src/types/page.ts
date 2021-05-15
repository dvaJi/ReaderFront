export interface Page {
  id: number;
  filename: string;
  height: number;
  width: number;
  size: number;
}

export interface PageFile extends Page {
  uploaded: boolean;
  isUploading: boolean;
  hasError: boolean;
  file: {
    preview: string;
    size: number;
    type: string;
  };
}
