export interface AnalyzeRequest {
  jobDescription: string;
  cvText: string;
}

export interface AnalyzeResponse {
  match: {
    strengths: string[];
    missing: string[];
    learnable: string[];
  };
  cvFix: Array<{
    type: string;
    before: string;
    after: string;
  }>;
  decision: {
    result: 'APPLY' | 'SKIP';
    confidence: number;
    reason: string;
  };
  questions: string[];
  score: number;
  matchedTech: string[];
}

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

// Simulated API Service
export const analyzeJobMatch = async (payload: AnalyzeRequest): Promise<AnalyzeResponse> => {
  // In production, this would be:
  // const response = await fetch('/api/analyze', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(payload)
  // });
  // if (!response.ok) throw new ApiError(response.status, 'Failed to analyze match');
  // return response.json();

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate random network error (10% chance) for demonstration
      if (Math.random() < 0.1) {
        reject(new ApiError(500, "Network error: Failed to connect to analysis engine."));
        return;
      }

      resolve({
        match: {
          strengths: [
            "5+ years Java/Spring ecosystem",
            "Microservices architecture experience",
            "PostgreSQL & database optimization",
            "CI/CD pipeline configuration"
          ],
          missing: [
            "Redis caching strategies",
            "GraphQL API development",
            "AWS ECS deployment"
          ],
          learnable: [
            "Redis (similar to Memcached experience)",
            "GraphQL (strong REST background helps)",
            "AWS ECS (transferable Docker skills)"
          ]
        },
        cvFix: [
          {
            type: "Impact Metric",
            before: "Worked on backend APIs using Java.",
            after: "Architected and scaled RESTful Java APIs handling 10k+ requests/min."
          },
          {
            type: "Keyword Optimization",
            before: "Familiar with databases and caching.",
            after: "Optimized PostgreSQL queries reducing latency by 40%; eager to apply similar strategies with Redis."
          }
        ],
        decision: {
          result: 'APPLY',
          confidence: 92,
          reason: "Strong alignment with core backend requirements. Your Java experience is highly relevant, and missing skills are easily learnable on the job."
        },
        questions: [
          "Can you describe a time you had to optimize a slow-performing Java microservice?",
          "How would you approach learning Redis for our caching layer given your current background?",
          "Explain your approach to designing a scalable REST API from scratch."
        ],
        score: 8.5,
        matchedTech: ["Java", "Spring Boot", "PostgreSQL", "Microservices", "Docker", "CI/CD", "REST APIs"]
      });
    }, 2000);
  });
};
