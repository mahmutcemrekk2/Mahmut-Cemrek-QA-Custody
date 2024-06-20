import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { setAccessToken  } from '../resources/globalState';

let response: AxiosResponse<any, any> | undefined;
let error: AxiosError<any, any> | undefined;

Given('I navigate to the API url', () => {
  axios.defaults.baseURL = process.env.api_url;
});

When('I login with username {string} and password {string}', async (username: string, password: string) => {
  try {
    response = await axios.post('/auth/login', {
      username,
      password
    });
    setAccessToken(response?.data.token);
    error = undefined;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      error = err;
      response = undefined;
    } else {
      throw err;
    }
  }
});

Then('the response status should be {int}', (statusCode: number) => {
  if (response) {
    expect(response.status).toBe(statusCode);
  } else if (error) {
    expect(error.response?.status).toBe(statusCode);
  } else {
    throw new Error('No response or error received');
  }
});

Then('the response should contain a {string}', async (expectMessage: string) => {
  if (expectMessage == "accessToken") {
    if (response) {
      expect(response.data.token).toBeTruthy();
      console.log('Access token:', response.data.token);
    } else {
      throw new Error('No response received');
    }
  } else {
    if (error) {
      expect(error.response?.data.message).toBe('Invalid credentials');
      console.log('Error message found:', error.response?.data.message);
    } else {
      throw new Error('No error received');
    };
  }

  
});
