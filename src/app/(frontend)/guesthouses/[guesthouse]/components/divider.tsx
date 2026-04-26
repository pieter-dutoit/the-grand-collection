export default function Divider() {
  return (
    <div className='container mx-auto'>
      <div className='w-full px-8 md:px-20'>
        <div
          className='border-gold-200 w-full border-t'
          style={{
            maskImage:
              'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent, black 20%, black 80%, transparent)'
          }}
        />
      </div>
    </div>
  )
}
