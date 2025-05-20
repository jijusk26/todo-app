import { HttpClient, ServiceResult } from "../helpers/http-helpers";

export async function loginUser(data: { username: string; password: string }) {
  try {
    const httpClient = new HttpClient();

    const response = await httpClient.post<
      { message: string; username: string; accessToken: string },
      { username: string; password: string }
    >(`login`, data);

    return response;
  } catch (error) {
    return ServiceResult.failed(null, "Something went wrong");
  }
}
