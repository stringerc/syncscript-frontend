/**
 * GitHub Integration
 * 90-DAY INNOVATION #2: Advanced Integrations
 */

export interface GitHubConfig {
  token: string;
  repos: string[];
  enabled: boolean;
}

interface GitHubIssue {
  id: number;
  title: string;
  body: string;
  html_url: string;
  labels: Array<{ name: string }>;
}

interface Task {
  title: string;
  description: string;
  priority: number;
  energy_requirement: number;
  external_id: string;
  external_url: string;
}

export async function importGitHubIssues(config: GitHubConfig): Promise<Task[]> {
  if (!config.enabled || !config.token) return [];

  const tasks: Task[] = [];
  
  for (const repo of config.repos) {
    const response = await fetch(`https://api.github.com/repos/${repo}/issues`, {
      headers: {
        'Authorization': `Bearer ${config.token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    
    const issues: GitHubIssue[] = await response.json();
    
    issues.forEach((issue) => {
      const hasUrgentLabel = issue.labels.some(label => label.name === 'urgent');
      tasks.push({
        title: issue.title,
        description: issue.body,
        priority: hasUrgentLabel ? 5 : 3,
        energy_requirement: 4,
        external_id: `github-${issue.id}`,
        external_url: issue.html_url
      });
    });
  }
  
  return tasks;
}

