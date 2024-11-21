"use client";

import {
  Button,
  Checkbox,
  Chip,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Select,
  SelectItem,
  Switch,
  Tabs,
  Tab,
  Pagination
} from "@nextui-org/react";
import { Moon, Sun } from "lucide-react";

export default function Samples() {
  const colors = [
    "default",
    "primary",
    "secondary",
    "success",
    "warning",
    "danger"
  ] as const;

  const variants = ["flat", "bordered", "underlined", "faded"] as const;

  const animals = [
    { key: "cat", label: "Cat" },
    { key: "dog", label: "Dog" },
    { key: "rabbit", label: "Rabbit" },
    { key: "hamster", label: "Hamster" },
    { key: "parrot", label: "Parrot" },
    { key: "fish", label: "Fish" }
  ];

  const content = (
    <PopoverContent>
      <div className='px-1 py-2'>
        <div className='text-small font-bold'>Popover Content</div>
        <div className='text-tiny'>This is the popover content</div>
      </div>
    </PopoverContent>
  );
  return (
    <>
      <h1>Samples</h1>

      <div className='flex flex-wrap items-center gap-4 p-4'>
        <Button color='default'>Default</Button>
        <Button color='primary'>Primary</Button>
        <Button color='secondary'>Secondary</Button>
        <Button color='success'>Success</Button>
        <Button color='warning'>Warning</Button>
        <Button color='danger'>Danger</Button>
        <Button color='primary' variant='solid'>
          Solid
        </Button>
        <Button color='primary' variant='faded'>
          Faded
        </Button>
        <Button color='primary' variant='bordered'>
          Bordered
        </Button>
        <Button color='primary' variant='light'>
          Light
        </Button>
        <Button color='primary' variant='flat'>
          Flat
        </Button>
        <Button color='primary' variant='ghost'>
          Ghost
        </Button>
        <Button color='primary' variant='shadow'>
          Shadow
        </Button>
      </div>

      <div className='flex flex-wrap gap-4 p-4'>
        <Checkbox defaultSelected color='default'>
          Default
        </Checkbox>
        <Checkbox defaultSelected color='primary'>
          Primary
        </Checkbox>
        <Checkbox defaultSelected color='secondary'>
          Secondary
        </Checkbox>
        <Checkbox defaultSelected color='success'>
          Success
        </Checkbox>
        <Checkbox defaultSelected color='warning'>
          Warning
        </Checkbox>
        <Checkbox defaultSelected color='danger'>
          Danger
        </Checkbox>
        <Switch
          defaultSelected
          size='lg'
          color='secondary'
          thumbIcon={({ isSelected, className }) =>
            isSelected ? (
              <Sun className={className} />
            ) : (
              <Moon className={className} />
            )
          }
        >
          Dark mode
        </Switch>
      </div>

      <div className='flex flex-wrap gap-4'>
        {colors.map((color) => (
          <Tabs
            key={color}
            color={color}
            aria-label='Tabs colors'
            radius='full'
          >
            <Tab key='photos' title='Photos' />
            <Tab key='music' title='Music' />
            <Tab key='videos' title='Videos' />
          </Tabs>
        ))}
      </div>

      <div>
        <div className='flex flex-wrap gap-4 p-4'>
          <Chip color='warning' variant='solid'>
            Solid
          </Chip>
          <Chip color='warning' variant='bordered'>
            Bordered
          </Chip>
          <Chip color='warning' variant='light'>
            Light
          </Chip>
          <Chip color='warning' variant='flat'>
            Flat
          </Chip>
          <Chip color='warning' variant='faded'>
            Faded
          </Chip>
          <Chip color='warning' variant='shadow'>
            Shadow
          </Chip>
          <Chip color='warning' variant='dot'>
            Dot
          </Chip>
        </div>
      </div>

      <div className='flex flex-wrap gap-4 p-4'>
        {colors.map((color) => (
          <Popover key={color} placement='top' color={color}>
            <PopoverTrigger>
              <Button color={color} className='capitalize'>
                {color}
              </Button>
            </PopoverTrigger>
            {content}
          </Popover>
        ))}
      </div>

      <div className='flex w-full flex-row flex-wrap gap-4'>
        {colors.map((color) => (
          <Select
            key={color}
            color={color}
            label='Favorite Animal'
            placeholder='Select an animal'
            defaultSelectedKeys={["cat"]}
            className='max-w-xs'
          >
            {animals.map((animal) => (
              <SelectItem key={animal.key}>{animal.label}</SelectItem>
            ))}
          </Select>
        ))}
      </div>

      <div className='flex w-full flex-col flex-wrap gap-4'>
        {variants.map((variant) => (
          <div
            key={variant}
            className='mb-6 flex w-full flex-wrap gap-4 md:mb-0 md:flex-nowrap'
          >
            <Select
              variant={variant}
              label='Select an animal'
              className='max-w-xs'
            >
              {animals.map((animal) => (
                <SelectItem key={animal.key}>{animal.label}</SelectItem>
              ))}
            </Select>
            <Select
              variant={variant}
              label='Favorite Animal'
              placeholder='Select an animal'
              className='max-w-xs'
            >
              {animals.map((animal) => (
                <SelectItem key={animal.key}>{animal.label}</SelectItem>
              ))}
            </Select>
          </div>
        ))}
      </div>
      <Pagination total={10} initialPage={1} />
    </>
  );
}
