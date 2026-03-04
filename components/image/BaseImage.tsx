/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
import Image from 'next/image';

export type ImageProps = React.ComponentProps<typeof Image>;
const OPTIMIZABLE_HOSTS = new Set(['img.artiversehub.ai', 'toolsify.ai', 'www.toolsify.ai']);

export default function BaseImage(props: ImageProps) {
  const src = typeof props.src === 'string' ? props.src : '';

  let shouldUnoptimized = false;
  try {
    if (src.startsWith('http')) {
      const { hostname } = new URL(src);
      shouldUnoptimized = !OPTIMIZABLE_HOSTS.has(hostname);
    }
  } catch {
    shouldUnoptimized = true;
  }

  return <Image {...props} alt={props.alt || (props.title as string)} unoptimized={shouldUnoptimized} />;
}
