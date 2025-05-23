import { HttpClient, ServiceResult } from "../helpers/http-helpers";
import type { PostBO } from "../types/posts";

export async function getAllPosts() {
  try {
    const httpClient = new HttpClient();
    const token = localStorage.getItem("TOKEN");

    const response = await httpClient.get<PostBO[]>(`post`, {
      headers: {
        Authorization: token,
      },
    });

    return response;
  } catch (error) {
    return ServiceResult.failed(null, "Something went wrong");
  }
}

export async function likeAPost(id: string, status: boolean) {
  try {
    const httpClient = new HttpClient();
    const token = localStorage.getItem("TOKEN");

    const response = await httpClient.put<PostBO, any>(
      `post/${id}/${status}`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return response;
  } catch (error) {
    return ServiceResult.failed(null, "Something went wrong");
  }
}
