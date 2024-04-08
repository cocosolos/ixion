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

export const fetchData = async (queryParams = {}) => {
  const queryString = new URLSearchParams(queryParams).toString();
  const url = `${import.meta.env.PROD ? 'https://api.ixion.dev' : 'http://localhost:8000'}/v1/servers/${queryString ? `?${queryString}` : ''}`;
  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) {
      throw new Error(
        `(${response.status.toString()} - ${response.statusText || 'unknown'})`
      );
    }

    return await response.json();
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`${err.message} - ${url}`);
    } else {
      throw new Error('Something went wrong.');
    }
  }
};

export const postData = async (inputText: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.PROD ? 'https://api.ixion.dev' : 'http://localhost:8000'}/v1/servers/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: inputText }),
      }
    );
    let message = `Server verification failed!`;
    let success = false;
    if (!response.ok) {
      // bad url or duplicate
      if (response.status === 400) {
        const responseData = await response.json();
        message = responseData.url;
      }
      return {
        message,
        success,
      };
    }
    const responseData = await response.json();
    if (responseData.id !== null) {
      message = 'Added new server!';
      success = true;
    }
    return { message, success, data: responseData };
  } catch (err) {
    let message = 'An unknown error occurred.';
    if (err instanceof Error) {
      message = err.message;
    }
    return { message, success: false };
  }
};
