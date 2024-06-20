import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { getAccessToken  } from '../resources/globalState';


let Response: AxiosResponse<any, any> | undefined;
let productsError: AxiosError<any, any> | undefined;


Given('I have a valid access token', () => {
  if (!getAccessToken()) {
    throw new Error('Access token is not available');
  }
});

When('I fetch products with a limit of {int}', async (limit: number) => {
  try {
    Response = await axios.get('/products', {
      params: { limit },
      headers: { Authorization: `Bearer ${getAccessToken()}` }
    });
    productsError = undefined;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      productsError = err;
      Response = undefined;
    } else {
      throw err;
    }
  }
});

Then('the response should contain {int} products', (count: number) => {
  if (Response) {
    expect(Response.data.products.length).toBe(count);
  } else {
    throw new Error('No response received');
  };
  console.log('Number of products:', Response.data.products.length);
});

When("I update the first product name to {string}", async (newName: string) => {
  const accessToken = getAccessToken();
  try {
    const productsResponse = await axios.get("/products", {
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    });
    const firstProduct = productsResponse.data.products[0];

    Response = await axios.put(
      `/products/${firstProduct.id}`,
      {
        name: newName,
      },
      {
        headers: { Authorization: `Bearer ${getAccessToken()}` },
      }
    );
  } catch (err) {
    if (axios.isAxiosError(err)) {
      Response = err.response;
    } else {
      throw err;
    }
  }
});

Then("the update response status should be {int}", (statusCode: number) => {
  if (Response) {
    expect(Response.status).toBe(statusCode);
  } else {
    throw new Error("No response received");
  };
  console.log('Update response status:', Response.status);
});

When("I delete the first product", async () => {
  const accessToken = getAccessToken();
  try {
    const productsResponse = await axios.get("/products", {
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    });
    const firstProduct = productsResponse.data.products[0];

    Response = await axios.delete(`/products/${firstProduct.id}`, {
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    });
  } catch (err) {
    if (axios.isAxiosError(err)) {
      Response = err.response;
    } else {
      throw err;
    }
  }
});

Then("the delete response status should be {int}", (statusCode: number) => {
  if (Response) {
    expect(Response.status).toBe(statusCode);
  } else {
    throw new Error("No response received");
  };
  console.log('Delete response status:', Response.status);
});



