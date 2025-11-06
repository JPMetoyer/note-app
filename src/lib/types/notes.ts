export interface Note {
  id: number;
  title: string;
  description: string;
  course: string;
  semester: string;
  year: string;
  professor?: string;
  pages: number;
  pdfUrl: string;
  uploader: {
    name: string;
    avatar: string;
  };
}