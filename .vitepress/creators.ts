export interface SocialEntry {
  type: 'github' | 'twitter' | 'email'
  icon: string
  link: string
}

export interface Creator {
  avatar: string
  name: string
  username?: string
  title?: string
  org?: string
  desc?: string
  links?: SocialEntry[]
  nameAliases?: string[]
  emailAliases?: string[]
}

const getAvatarUrl = (name: string) => `https://github.com/${name}.png`

export const creators: Creator[] = [
  {
    name: 'Walter_Fang',
    avatar: '',
    username: 'Walter_Fang',
    title: '本知识库的作者',
    desc: '正在学习与人交流 || INFJ-T || Software Developer&Rhythm Game Player || He/Him',
    links: [
      { type: 'github', icon: 'github', link: 'https://github.com/walterfang1209' },
      { type: 'twitter', icon: 'twitter', link: 'https://twitter.com/__Walter_Fang__' },
    ],
    nameAliases: ['walterfang1209','Walte_Fang'],
    emailAliases: ['Walter20101209@gmail.com'],
  },
].map<Creator>((c) => {
  c.avatar = c.avatar || getAvatarUrl(c.username)
  return c as Creator
})

export const creatorNames = creators.map(c => c.name)
export const creatorUsernames = creators.map(c => c.username || '')
