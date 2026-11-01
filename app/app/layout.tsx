/** EDU PROMPT 26: the app view's own shell (no magazine chrome; see components/site-chrome.tsx). A phone-width column. */
export const viewport = { themeColor: '#0F2C55', width: 'device-width', initialScale: 1, viewportFit: 'cover' };

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="appStage">
      <div className="appShell">{children}</div>
    </div>
  );
}
