import qs from "qs";
import { flattenAttributes, getStrapiURL } from "@/lib/utils";
import { getAuthToken } from "./services/get-token";

const baseUrl = getStrapiURL();

async function fetchData(url: string) {
  const authToken = await getAuthToken();

  const headers = {
    method: "GET",
    // headers: {
    //   "Content-Type": "application/json",
    //   Authorization: `Bearer ${authToken}`,
    // },
  };

  try {
    const response = await fetch(url, authToken ? headers : {});
    const data = await response.json();
    return flattenAttributes(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // or return null;
  }
}

export async function getHomePageData() {
  const url = new URL("/api/courses", baseUrl);

  url.search = qs.stringify({
    populate: {
      courseimage: {
        populate: true
      },
    },
  });
  return await fetchData(url.href);
}

export async function getCourseById(courseId: string) {
  const url = new URL(`/api/courses/${courseId}`, baseUrl);

  url.search = qs.stringify({
    populate: {
      sections: {
        populate: {
          title: {
            populate: true
          },
          videos: {
            populate: {
              title: {
                populate: true
              },
              url: {
                populate: true
              }
            }
          }
        }
      },
    },
  });
  return await fetchData(url.href);
}