import SectionIntro from './SectionIntro'

export default {
  title: 'Components/SectionIntro',
  component: SectionIntro,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isShowEyeBrow: { control: 'boolean' },
  },
  args: {
    eyebrow: 'eyebrow',
    title: 'What is Lorem Ipsum?',
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets.",
    isShowEyeBrow: true,
  },
}

export const Default = {}

export const WithoutEyebrow = {
  args: { isShowEyeBrow: false },
}
