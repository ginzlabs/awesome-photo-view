import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'API',
};

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto my-6">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            {headers.map((h) => (
              <th key={h} className="px-3 py-2 font-semibold text-gray-900">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
              {row.map((cell, j) => (
                <td key={j} className="px-3 py-2 text-gray-600">
                  {j === 0 ? <code className="text-sm font-medium text-gray-900">{cell}</code> : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ApiPage() {
  return (
    <div className="prose prose-gray max-w-none">
      <div className="flex items-center justify-between gap-4 not-prose mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">API Reference</h1>
        <a
          href="/llms.txt"
          download
          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors shrink-0"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
            <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
          </svg>
          llms.txt
        </a>
      </div>

      <h2>PhotoProvider</h2>
      <Table
        headers={['Name', 'Description', 'Type', 'Default']}
        rows={[
          ['children', '', 'React.ReactNode', 'Required'],
          ['onIndexChange', '', '(index: number, state: PhotoProviderState) => void', ''],
          ['onVisibleChange', '', '(visible: boolean, index: number, state: PhotoProviderState) => void', ''],
          ['loop', 'Enable loop preview, number enables when count exceeds value', 'boolean | number', '3'],
          ['speed', 'Animation speed', '(type: ActiveAnimationType) => number', '() => 400'],
          ['easing', 'Easing function', '(type: ActiveAnimationType) => string', "() => 'cubic-bezier(0.25, 0.8, 0.25, 1)'"],
          ['photoClosable', 'Whether clicking the image can close', 'boolean', ''],
          ['maskClosable', 'Whether clicking the backdrop can close', 'boolean', 'true'],
          ['maskOpacity', 'Default backdrop opacity', 'number | null', '1'],
          ['pullClosable', 'Whether pull-down can close', 'boolean', 'true'],
          ['bannerVisible', 'Navigation bar visible', 'boolean', 'true'],
          ['overlayRender', 'Custom overlay render', '(props: OverlayRenderProps) => React.ReactNode', ''],
          ['toolbarRender', 'Custom toolbar render', '(props: OverlayRenderProps) => React.ReactNode', ''],
          ['className', '', 'string', ''],
          ['maskClassName', '', 'string', ''],
          ['photoWrapClassName', '', 'string', ''],
          ['photoClassName', '', 'string', ''],
          ['loadingElement', 'Custom loading element', 'JSX.Element', ''],
          ['brokenElement', 'Custom error element', 'JSX.Element | ((props: BrokenElementParams) => JSX.Element)', ''],
          ['portalContainer', 'Custom portal target', 'HTMLElement', 'document.body'],
        ]}
      />

      <h2>PhotoView</h2>
      <Table
        headers={['Name', 'Description', 'Type', 'Default']}
        rows={[
          ['src', 'Image URL', 'string', ''],
          ['render', 'Custom render function (lower priority than src)', '(props: PhotoRenderParams) => React.ReactNode', ''],
          ['overlay', 'Overlay node', 'React.ReactNode', ''],
          ['width', 'Custom render node width', 'number', ''],
          ['height', 'Custom render node height', 'number', ''],
          ['children', 'Child node, typically a thumbnail', 'React.ReactElement', ''],
          ['triggers', 'Trigger events', "('onClick' | 'onDoubleClick')[]", "['onClick']"],
        ]}
      />

      <h2>DataType</h2>
      <Table
        headers={['Name', 'Description', 'Type', 'Default']}
        rows={[
          ['key', 'Unique identifier', 'number | string', 'Required'],
          ['src', 'Resource URL', 'string', ''],
          ['render', 'Custom render function', '(props: PhotoRenderParams) => React.ReactNode', ''],
          ['overlay', 'Overlay node', 'React.ReactNode', ''],
          ['width', 'Custom render node width', 'number', ''],
          ['height', 'Custom render node height', 'number', ''],
          ['originRef', 'Trigger ref', 'React.MutableRefObject<HTMLElement | null>', ''],
        ]}
      />

      <h2>OverlayRenderProps</h2>
      <Table
        headers={['Name', 'Description', 'Type']}
        rows={[
          ['images', 'Image list', 'DataType[]'],
          ['index', 'Current index', 'number'],
          ['onIndexChange', 'Index change callback', '(index: number) => void'],
          ['visible', 'Whether visible', 'boolean'],
          ['onClose', 'Close event callback', '(evt?: React.MouseEvent | React.TouchEvent) => void'],
          ['overlayVisible', 'Whether overlay is visible', 'boolean'],
          ['overlay', 'Overlay node', 'React.ReactNode'],
          ['rotate', 'Current rotation angle', 'number'],
          ['onRotate', 'Rotation callback', '(rotate: number) => void'],
          ['scale', 'Current scale', 'number'],
          ['onScale', 'Scale callback', '(scale: number) => void'],
        ]}
      />
    </div>
  );
}
