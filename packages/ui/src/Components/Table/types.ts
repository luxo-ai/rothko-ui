export type StringHeader = string;
export type JsxHeader = { key: string; content: React.ReactNode };

export type Header = StringHeader | (JsxHeader & { className?: string } & React.CSSProperties);
