import { DemoServerData } from './data/ServerData';

export const fetchDemo = async () => {
  const repoUrl = 'https://api.github.com/repos/LandSandBoat/server';
  try {
    const response = await fetch(repoUrl);
    if (!response.ok) {
      throw new Error(
        `(${response.status.toString()} - ${response.statusText || 'unknown'})`
      );
    }
    const gitHubData = await response.json();
    const demoData = {
      ...DemoServerData,
      active_sessions: gitHubData.stargazers_count,
      updated: gitHubData.updated_at,
    };
    return demoData;
  } catch (err) {
    return DemoServerData;
  }
};

export const fetchDataFromBackend = async (
  dir = 'servers',
  queryParams = {}
) => {
  const queryString = new URLSearchParams(queryParams).toString();
  const url = `${import.meta.env.PROD ? 'https://api.ixion.dev' : 'http://localhost:8000'}/${dir}${queryString ? `?${queryString}` : ''}`;
  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      let errorMessage =
        'An unknown error occurred while fetching data from the backend.';

      // Check if the response has JSON content
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json();
        errorMessage = errorData.url || errorData.detail;
      }

      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error(
        'An unhandled error occurred while fetching data from the backend.'
      );
    }
  }
};

export const postData = async (inputText: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.PROD ? 'https://api.ixion.dev' : 'http://localhost:8000'}/servers/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: inputText }),
      }
    );
    let message = `An unknown error occurred while sending data to the backend.`;
    let success = false;
    if (!response.ok) {
      // bad url or duplicate
      if (response.status === 400) {
        const responseData = await response.json();
        message = responseData.url || responseData.detail;
      }
      return {
        message,
        success,
      };
    }
    const responseData = await response.json();
    if (response.status === 201) {
      message = 'Added new server!';
      success = true;
    }
    return { message, success, data: responseData };
  } catch (err) {
    let message = 'An unhandled error while sending data to the backend.';
    if (err instanceof Error) {
      message = err.message;
    }
    return { message, success: false };
  }
};
