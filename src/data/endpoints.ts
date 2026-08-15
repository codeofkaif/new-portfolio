export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface EndpointParam {
  name: string;
  in: 'path' | 'query' | 'header' | 'body';
  required: boolean;
  type: string;
  description: string;
}

export interface ApiEndpoint {
  id: string;
  method: HttpMethod;
  path: string;
  tag: string;
  summary: string;
  description: string;
  requestBody?: string;  // JSON string
  requestHeaders: Record<string, string>;
  responseExample: string; // JSON string
  responseStatus: number;
  params?: EndpointParam[];
}

export const endpoints: ApiEndpoint[] = [
  {
    id: 'get-patients',
    method: 'GET',
    path: '/api/v1/patients',
    tag: 'Patients',
    summary: 'List all patients',
    description: 'Returns a paginated list of registered patients. Requires ADMIN or DOCTOR role.',
    requestHeaders: {
      Authorization: 'Bearer <jwt_token>',
      Accept: 'application/json',
    },
    responseStatus: 200,
    responseExample: JSON.stringify({
      content: [
        { id: 1, name: 'Aarav Sharma', age: 32, bloodGroup: 'O+', phone: '+91-9876543210' },
        { id: 2, name: 'Priya Mehta',  age: 27, bloodGroup: 'A+', phone: '+91-9123456789' },
      ],
      page: 0,
      size: 10,
      totalElements: 2,
    }, null, 2),
    params: [
      { name: 'page',  in: 'query', required: false, type: 'integer', description: 'Page number (default 0)' },
      { name: 'size',  in: 'query', required: false, type: 'integer', description: 'Page size (default 10)' },
    ],
  },
  {
    id: 'post-appointments',
    method: 'POST',
    path: '/api/v1/appointments',
    tag: 'Appointments',
    summary: 'Book an appointment',
    description: 'Creates a new appointment for a patient with the specified doctor. Returns 201 with the created resource URI in the Location header.',
    requestHeaders: {
      Authorization: 'Bearer <jwt_token>',
      'Content-Type': 'application/json',
    },
    requestBody: JSON.stringify({
      patientId: 1,
      doctorId: 3,
      slotTime: '2026-09-15T10:30:00',
      reason: 'Annual check-up',
    }, null, 2),
    responseStatus: 201,
    responseExample: JSON.stringify({
      id: 42,
      patientId: 1,
      doctorId: 3,
      slotTime: '2026-09-15T10:30:00',
      status: 'SCHEDULED',
      createdAt: '2026-08-15T12:00:00',
    }, null, 2),
    params: [],
  },
  {
    id: 'post-login',
    method: 'POST',
    path: '/api/v1/auth/login',
    tag: 'Auth',
    summary: 'Authenticate user',
    description: 'Validates credentials and returns a short-lived JWT access token plus a long-lived refresh token (HttpOnly cookie).',
    requestHeaders: {
      'Content-Type': 'application/json',
    },
    requestBody: JSON.stringify({
      email: 'admin@hospital.com',
      password: 'S3cur3P@ss!',
    }, null, 2),
    responseStatus: 200,
    responseExample: JSON.stringify({
      accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      tokenType: 'Bearer',
      expiresIn: 900,
      role: 'ADMIN',
    }, null, 2),
    params: [],
  },
  {
    id: 'get-doctor-slots',
    method: 'GET',
    path: '/api/v1/doctors/{doctorId}/slots',
    tag: 'Doctors',
    summary: 'Get available slots',
    description: 'Returns available appointment slots for a specific doctor on a given date. Results are cached in Redis with a 5-minute TTL.',
    requestHeaders: {
      Authorization: 'Bearer <jwt_token>',
    },
    responseStatus: 200,
    responseExample: JSON.stringify({
      doctorId: 3,
      date: '2026-09-15',
      available: ['09:00', '10:30', '14:00', '15:30'],
    }, null, 2),
    params: [
      { name: 'doctorId', in: 'path',  required: true,  type: 'integer', description: 'Doctor ID' },
      { name: 'date',     in: 'query', required: true,  type: 'string',  description: 'Date (YYYY-MM-DD)' },
    ],
  },
];

export const METHOD_COLORS: Record<HttpMethod, { bg: string; text: string; border: string }> = {
  GET:    { bg: 'rgba(34,211,238,0.12)',  text: '#22D3EE', border: 'rgba(34,211,238,0.3)' },
  POST:   { bg: 'rgba(74,222,128,0.12)',  text: '#4ADE80', border: 'rgba(74,222,128,0.3)' },
  PUT:    { bg: 'rgba(251,146,60,0.12)',  text: '#FB923C', border: 'rgba(251,146,60,0.3)' },
  PATCH:  { bg: 'rgba(245,199,106,0.12)', text: '#F5C76A', border: 'rgba(245,199,106,0.3)' },
  DELETE: { bg: 'rgba(248,113,113,0.12)', text: '#F87171', border: 'rgba(248,113,113,0.3)' },
};
