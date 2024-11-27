function PropertyPreview({
  name,
  alignment
}: {
  name: string;
  alignment: "start" | "end";
}): JSX.Element {
  return (
    <div className={`flex-col gap-4 self-${alignment}`}>
      <div className='flex-1 bg-green-400'>{alignment}</div>
      <div className='flex-1 bg-blue-500'>
        <h3>{name}</h3>
      </div>
    </div>
  );
}

const properties = [
  {
    name: "The Paarl Grand"
  },
  {
    name: "The Kathu Grand"
  }
];

export default function Properties(): JSX.Element {
  return (
    <section id='properties' className='w-full dark:bg-foreground-100'>
      <div className='mx-auto max-w-screen-lg p-6 md:py-16'>
        <h2 className='whitespace-normal text-center text-2xl font-light capitalize text-foreground-600 sm:text-3xl md:whitespace-pre-wrap md:leading-tight lg:text-4xl lg:leading-tight'>
          Discover Unique Stays
        </h2>
        <div className='flex flex-col gap-5'>
          {properties.map(({ name }, index) => (
            <PropertyPreview
              key={name}
              name={name}
              alignment={index % 2 ? "start" : "end"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
