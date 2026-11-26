// Оборачивает каждую страницу заново при переходе: короткое появление,
// чтобы было видно, что открылась новая страница.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-in">{children}</div>;
}
