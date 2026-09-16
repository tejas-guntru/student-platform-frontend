export interface StudentProject {
  projectId: string;

  title: string;

  description: string | null;

  techStack: string | null;

  githubUrl: string | null;

  projectUrl: string | null;

  startDate: string | null;

  endDate: string | null;

  createdAt: string;

  updatedAt: string;
}


export interface StudentProjectRequest {
  title: string;

  description: string | null;

  techStack: string | null;

  githubUrl: string | null;

  projectUrl: string | null;

  startDate: string | null;

  endDate: string | null;
}