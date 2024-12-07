export default function ScrollAnchor({ id }: { id: string }) {
  return <div id={id} className='absolute -top-16' tabIndex={0} />
}
