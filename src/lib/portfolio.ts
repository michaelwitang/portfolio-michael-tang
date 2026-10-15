export const contact = { email: 'michaeltangme@gmail.com', whatsapp: 'https://wa.me/5531971739211' };
export const technologies = ['HTML', 'CSS', 'JavaScript', 'Python', 'Git', 'GitHub', 'Terminal / CLI', 'VS Code'];
export const platforms = ['Google Tag Manager', 'Google Analytics 4', 'Looker Studio', 'RD Station CRM', 'Meta Ads', 'Google Ads'];
export interface Project { name: string; description: string; date: string; technologies: string[]; repository: string; image: string; }
export const projects: Project[] = [];
export function pageHead(title: string, description: string) { return { meta: [{ title: `${title} | Michael Tang` }, { name: 'description', content: description }, { property: 'og:title', content: `${title} | Michael Tang` }, { property: 'og:description', content: description }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }; }
