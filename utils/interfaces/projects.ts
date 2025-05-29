export interface Technology {
  techName: string;
  _id: string;
}

export interface Project {
  _id: string;
  title: string;
  header: string;
  description: string;
  image: string;
  repoLink: string;
  demoLink: string;
  technologies: Technology[];
}
