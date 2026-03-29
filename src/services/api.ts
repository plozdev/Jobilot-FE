export interface AnalyzeRequest {
  jdText: string;
  cvText: string;
  targetLevel: 'intern' | 'fresher' | 'junior';
}

export interface AnalyzeResponse {
  match: {
    score: number;  // 0-100
    matchedKeywords: string[];
    missingKeywords: string[];
  };
  strengthsHR: string[];
  gaps: string[];
  decision: {
    result: 'APPLY' | 'SKIP';
    confidence: number;  // 0-100
    reason: string;
  };
  market: {
    levelFit: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    demand: string;
  };
}

export interface CompanyAnalyzeRequest {
  jobDescription: string;
  companyUrl?: string;
}

export interface CompanyInfo {
  name: string;
  industry: string;
  size: string;
  founded?: number;
  description: string;
  location?: string;
  website?: string;
}

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

// Real API Service - Connect to Kotlin Backend
export const analyzeJobMatch = async (payload: AnalyzeRequest): Promise<AnalyzeResponse> => {
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
  
  try {
    const response = await fetch(`${apiUrl}/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new ApiError(
        response.status,
        errorData.message || `API error: ${response.status}`
      );
    }

    const data: AnalyzeResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    if (error instanceof TypeError) {
      throw new ApiError(
        0,
        `Connection failed: Cannot reach backend at ${apiUrl}. Make sure the server is running.`
      );
    }
    throw new ApiError(500, `Unexpected error: ${error instanceof Error ? error.message : 'Unknown'}`);
  }
};

export const analyzeCompany = async (payload: CompanyAnalyzeRequest): Promise<CompanyInfo> => {
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
  
  try {
    const response = await fetch(`${apiUrl}/company/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new ApiError(
        response.status,
        errorData.message || `API error: ${response.status}`
      );
    }

    const data: CompanyInfo = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    if (error instanceof TypeError) {
      throw new ApiError(
        0,
        `Connection failed: Cannot reach backend at ${apiUrl}`
      );
    }
    throw new ApiError(500, `Unexpected error: ${error instanceof Error ? error.message : 'Unknown'}`);
  }
};
